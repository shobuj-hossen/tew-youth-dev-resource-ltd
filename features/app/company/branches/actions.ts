"use server"

import { db, txDB } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { provideResultsSchema } from "./schemas"
import z from "zod"
import { enrollments } from "@/drizzle/schema"
import { eq, inArray } from "drizzle-orm"
import { updateTag } from "next/cache"

export const getCertificatesByIds = withPermission(
    { students: ["create"] },
    async (
        { org },
        { enrollmentIds }: { enrollmentIds: string[] },
    ) => {
        const selectedEnrollments =
            await db.query.enrollments.findMany({
                where: { id: { in: enrollmentIds } },
                with: {
                    course: true,
                    student: {
                        columns: {
                            fatherName: true,
                            motherName: true,
                            name: true,
                        },
                    },
                },
            })
        return selectedEnrollments.map((d) => ({
            ...d,
            branchName: org.name,
        }))
    },
)

export const provideResults = withPermission(
    { students: ["update"] },
    async (
        _,
        input: z.infer<typeof provideResultsSchema>,
    ) => {
        const parsed = provideResultsSchema.safeParse(input)

        if (!parsed.success) {
            throw new Error("Invalid result data")
        }

        const enrollmentIds = parsed.data.results.map(
            (item) => item.enrollmentId,
        )

        const existing = await db
            .select({
                id: enrollments.id,
            })
            .from(enrollments)
            .where(inArray(enrollments.id, enrollmentIds))

        if (existing.length !== enrollmentIds.length) {
            throw new Error(
                "One or more enrollments were not found",
            )
        }

        await txDB.transaction(async (tx) => {
            for (const item of parsed.data.results) {
                await tx
                    .update(enrollments)
                    .set({
                        result: item.result,
                    })
                    .where(
                        eq(
                            enrollments.id,
                            item.enrollmentId,
                        ),
                    )
            }
        })

        updateTag("branch-enrollments")

        return {
            success: true,
            message: "Results published successfully",
        }
    },
)
