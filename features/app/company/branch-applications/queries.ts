import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { cacheTag } from "next/cache"

export const getBranchApplications = withPermission(
    { branch_application: ["view"] },
    async () => {
        "use cache"
        cacheTag("branch-applications")

        return await db.query.branchApplications.findMany()
    },
)

export const getBranchApplicationById = withPermission(
    { branch_application: ["view"] },
    async (_, { id }: { id: string }) => {
        "use cache"
        cacheTag(
            "branch-applications",
            `branch-application:${id}`,
        )

        const branch =
            await db.query.branchApplications.findFirst({
                where: { id },
            })

        if (!branch) {
            throw new NotFoundError()
        }

        return branch
    },
)
