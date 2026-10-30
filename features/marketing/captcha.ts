"use server"

import "server-only"

import {
    createHmac,
    randomInt,
    timingSafeEqual,
} from "node:crypto"

import { headers } from "next/headers"
import { and, eq, isNotNull } from "drizzle-orm"

import { db } from "@/drizzle/db"

// Adjust these two imports to your actual schema barrel.
import { enrollments, students } from "@/drizzle/schema"
import { publicResultSchema } from "./schemas"

const CAPTCHA_SECRET = process.env.RESULT_CAPTCHA_SECRET

if (!CAPTCHA_SECRET || CAPTCHA_SECRET.length < 32) {
    throw new Error(
        "RESULT_CAPTCHA_SECRET must be at least 32 characters.",
    )
}

const CAPTCHA_EXPIRY_SECONDS = 5 * 60

// Basic per-process rate limiter.
// See the production deployment note below.
const requestAttempts = new Map<
    string,
    { count: number; resetAt: number }
>()

function checkRateLimit(key: string) {
    const now = Date.now()
    const existing = requestAttempts.get(key)

    if (!existing || existing.resetAt <= now) {
        requestAttempts.set(key, {
            count: 1,
            resetAt: now + 60_000,
        })

        return true
    }

    if (existing.count >= 10) {
        return false
    }

    existing.count++

    return true
}

function signCaptcha(payload: string) {
    return createHmac("sha256", CAPTCHA_SECRET!)
        .update(payload)
        .digest("base64url")
}

function createCaptchaToken(answer: number) {
    const payload = Buffer.from(
        JSON.stringify({
            answer,
            expiresAt:
                Math.floor(Date.now() / 1000) +
                CAPTCHA_EXPIRY_SECONDS,
        }),
    ).toString("base64url")

    return `${payload}.${signCaptcha(payload)}`
}

function verifyCaptchaToken(token: string, answer: string) {
    try {
        const [payload, signature] = token.split(".")

        if (!payload || !signature) return false

        const expected = Buffer.from(signCaptcha(payload))

        const received = Buffer.from(signature)

        if (
            expected.length !== received.length ||
            !timingSafeEqual(expected, received)
        ) {
            return false
        }

        const data = JSON.parse(
            Buffer.from(payload, "base64url").toString(),
        ) as {
            answer: number
            expiresAt: number
        }

        if (
            data.expiresAt < Math.floor(Date.now() / 1000)
        ) {
            return false
        }

        return data.answer === Number(answer)
    } catch {
        return false
    }
}

async function getClientKey() {
    const headerStore = await headers()

    // Only trust forwarded headers when your hosting
    // infrastructure sets them securely.
    return (
        headerStore.get("x-real-ip") ??
        headerStore
            .get("x-forwarded-for")
            ?.split(",")[0]
            ?.trim() ??
        "unknown"
    )
}

/**
 * Generate a mathematical CAPTCHA.
 */
export async function createMathCaptcha() {
    const ip = await getClientKey()

    if (!checkRateLimit(`captcha:${ip}`)) {
        return {
            success: false as const,
            message:
                "Too many requests. Please try again later.",
        }
    }

    const a = randomInt(2, 15)
    const b = randomInt(1, 15)

    return {
        success: true as const,
        question: `${a} + ${b} = ?`,
        token: createCaptchaToken(a + b),
    }
}

/**
 * Public student result lookup.
 */
export async function getPublicStudentResult(
    input: unknown,
) {
    const parsed = publicResultSchema.safeParse(input)

    if (!parsed.success) {
        return {
            success: false as const,
            message: "Please enter valid information.",
        }
    }

    const {
        rollNumber,
        registrationNumber,
        captchaAnswer,
        captchaToken,
    } = parsed.data

    const ip = await getClientKey()

    if (!checkRateLimit(`result:${ip}`)) {
        return {
            success: false as const,
            message:
                "Too many attempts. Please try again later.",
        }
    }

    if (!verifyCaptchaToken(captchaToken, captchaAnswer)) {
        return {
            success: false as const,
            message:
                "Incorrect or expired CAPTCHA. Please try again.",
        }
    }

    try {
        const [record] = await db
            .select({
                studentName: students.name,
                fatherName: students.fatherName,
                motherName: students.motherName,

                rollNumber: enrollments.rollNumber,
                registrationNumber:
                    enrollments.registrationNumber,
                serialNo: enrollments.serialNo,
                courseDuration: enrollments.courseDuration,
                courseRange: enrollments.courseRange,
                medium: enrollments.medium,
                status: enrollments.status,
                result: enrollments.result,
            })
            .from(enrollments)
            .innerJoin(
                students,
                eq(enrollments.studentId, students.id),
            )
            .where(
                and(
                    eq(enrollments.rollNumber, rollNumber),
                    eq(
                        enrollments.registrationNumber,
                        registrationNumber,
                    ),
                    isNotNull(enrollments.result),
                ),
            )
            .limit(1)

        if (!record || !record.result?.trim()) {
            return {
                success: false as const,
                message:
                    "No published result found. Please check your information.",
            }
        }

        return {
            success: true as const,
            data: {
                student: {
                    name: record.studentName,
                    fatherName: record.fatherName,
                    motherName: record.motherName,
                },

                enrollment: {
                    rollNumber: record.rollNumber,
                    registrationNumber:
                        record.registrationNumber,
                    serialNo: record.serialNo,
                    courseDuration: record.courseDuration,
                    courseRange: record.courseRange,
                    medium: record.medium,
                    status: record.status,
                    result: record.result.trim(),
                },
            },
        }
    } catch (error) {
        console.error("Public result lookup failed:", error)

        return {
            success: false as const,
            message:
                "Unable to retrieve your result. Please try again later.",
        }
    }
}
