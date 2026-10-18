import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { cacheTag } from "next/cache"
import {
    CourseDuration,
    feeField,
    getCourseRangeLabel,
    getDuration,
} from "./constants"

export async function getCourseInfo() {
    "use cache"
    cacheTag("course-info")

    return await db.query.courses.findMany({
        columns: { name: true, id: true },
    })
}

export const getStudents = withPermission(
    { students: ["view"] },
    async ({ org }) => {
        "use cache"
        cacheTag("students")

        const res = await db.query.enrollments.findMany({
            where: {
                paymentStatus: "paid",
                student: { organizationId: org.id },
            },
            columns: {
                id: true,
                paymentStatus: true,
                rollNumber: true,
                courseRange: true,
                registrationNumber: true,
                courseDuration: true,
            },
            with: {
                student: {
                    columns: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                course: { columns: { name: true } },
            },
        })

        return res.map((each) => ({
            ...each,
            courseDuration: getDuration(
                each.courseDuration as CourseDuration,
            ),
            courseRange: getCourseRangeLabel(
                each.courseRange,
                each.courseDuration as CourseDuration,
            ),
        }))
    },
)
export const getUnpaidStudents = withPermission(
    { students: ["view"] },
    async ({ org }) => {
        "use cache"

        cacheTag(`unpaid-students`)

        const res = await db.query.enrollments.findMany({
            where: {
                paymentStatus: {
                    NOT: "paid",
                },
                student: {
                    organizationId: org.id,
                },
            },
            columns: {
                id: true,
                paymentStatus: true,
                courseDuration: true,
                courseRange: true,
            },
            with: {
                student: {
                    columns: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                course: true,
            },
        })

        return res.map((enrollment) => {
            const field =
                feeField[
                    enrollment.courseDuration as keyof typeof feeField
                ]

            const price = field
                ? (enrollment.course?.[field] ?? 0)
                : 0

            return {
                ...enrollment,
                price,
                courseDuration: getDuration(
                    enrollment.courseDuration as CourseDuration,
                ),
                courseRange: getCourseRangeLabel(
                    enrollment.courseRange,
                    enrollment.courseDuration as CourseDuration,
                ),
            }
        })
    },
)

export const getStudentByEnrolledId = withPermission(
    { students: ["view"] },
    async ({ org }, { id }: { id: string }) => {
        "use cache"
        cacheTag(`enrolled-student:${id}`)

        const enrollment =
            await db.query.enrollments.findFirst({
                where: {
                    id,
                    student: { organizationId: org.id },
                },
                with: {
                    student: {
                        with: { qualifications: true },
                    },
                    course: true,
                },
            })

        if (!enrollment) {
            throw new NotFoundError()
        }
        const student = enrollment?.student
        if (!student) {
            throw new NotFoundError()
        }

        return {
            ...student,
            enrollment: {
                ...enrollment,
                course: { name: enrollment.course?.name },
                student: undefined,
            },
        }
    },
)
export const getEnrollmentById = withPermission(
    { students: ["view"] },
    async ({ org }, { id }: { id: string }) => {
        "use cache"
        cacheTag(`enrollment:${id}`)

        const enrollment =
            await db.query.enrollments.findFirst({
                where: {
                    id,
                    student: { organizationId: org.id },
                },
            })

        if (!enrollment) {
            throw new NotFoundError()
        }

        return enrollment
    },
)

export const getStudentDetailsByEnrollmentId =
    withPermission(
        { students: ["view"] },
        async ({ org }, { id }: { id: string }) => {
            "use cache"
            cacheTag(`detailed-student:${id}`)
            const enrollment =
                await db.query.enrollments.findFirst({
                    where: { id },
                    columns: { studentId: true },
                })
            if (!enrollment) {
                throw new NotFoundError()
            }

            const student =
                await db.query.students.findFirst({
                    where: { id: enrollment.studentId },
                    with: {
                        qualifications: true,
                        enrollments: {
                            with: {
                                course: {
                                    columns: { name: true },
                                },
                            },
                        },
                    },
                })
            if (!student) {
                throw new NotFoundError()
            }

            return {
                ...student,
                enrollments: student.enrollments.map(
                    (res) => ({
                        ...res,
                        courseDuration: getDuration(
                            res.courseDuration as CourseDuration,
                        ),
                        courseRange: getCourseRangeLabel(
                            res.courseRange,
                            res.courseDuration as CourseDuration,
                        ),
                    }),
                ),
                branchName: org.name,
            }
        },
    )
