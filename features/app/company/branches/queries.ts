import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { cacheTag } from "next/cache"
import {
    CourseDuration,
    getCourseRangeLabel,
    getDuration,
} from "../../branch/students/constants"

export const getBranches = withPermission(
    { branches: ["view"] },
    async ({ org }) => {
        "use cache"
        cacheTag("branches")

        return await db.query.organizations.findMany({
            where: { NOT: { slug: org.slug } },
        })
    },
)

export const getBranchById = withPermission(
    { branches: ["view"] },
    async (_, { id }: { id: string }) => {
        "use cache"
        cacheTag("branches", `branch:${id}`)

        const organization =
            await db.query.organizations.findFirst({
                where: { id },
            })

        if (!organization) {
            throw new NotFoundError()
        }
        const branchInfo = await db.query.branchApplications
            .findFirst({
                where: { organizationId: organization?.id },
                columns: {
                    id: true,
                    email: true,
                    isCompanyBranch: true,
                },
            })
            .then((d) => ({ ...d, email: d?.email }))

        return { ...organization, ...branchInfo }
    },
)

export const getEnrollmentsBranchId = withPermission(
    { branches: ["view"] },
    async (_, { id }: { id: string }) => {
        "use cache"
        cacheTag(
            "branch-enrollments",
            `branch-enrollments:${id}`,
        )

        const org = await db.query.organizations.findFirst({
            where: { id },
        })

        if (!org) {
            throw new NotFoundError()
        }

        const students =
            await db.query.enrollments.findMany({
                where: {
                    student: { organizationId: org.id },
                    paymentStatus: "paid",
                },
                with: { student: true, course: true },
            })

        return students.map((s) => ({
            ...s,
            courseRange: getCourseRangeLabel(
                s.courseRange,
                s.courseDuration as CourseDuration,
            ),
            courseDuration: getDuration(
                s.courseDuration as CourseDuration,
            ),
        }))
    },
)
