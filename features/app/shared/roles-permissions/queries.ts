import { auth } from "@/lib/auth"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { cacheTag } from "next/cache"

export const getRolesAndPermissions = withPermission(
    { roles_permissions: ["view"] },
    async ({ headers }) => {
        const org = await auth.api.getOrganization({
            headers,
        })

        if (!org) {
            throw new NotFoundError()
        }

        const rolesAndPermissions =
            await getCachedRolesAndPermissions(
                org.id,
                headers,
            )

        const dashboardType =
            process.env.COMPANY_ORG_ID === org.id
                ? "COMPANY"
                : "BRANCH"

        return {
            rolesAndPermissions,
            dashboardType,
        }
    },
)

async function getCachedRolesAndPermissions(
    organizationId: string,
    headers: HeadersInit,
) {
    "use cache"

    cacheTag(
        "roles-permissions",
        `roles-permissions:${organizationId}`,
    )

    return await auth.api.listOrgRoles({
        query: {
            organizationId,
        },
        headers,
    })
}
