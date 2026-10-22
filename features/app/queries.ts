import { withPermission } from "@/lib/dal"
import { company_config } from "@/utils/config"

export const getSidebarData = withPermission(
    { sidebar: ["view"] },
    async ({ org, orgMemberRole, session, user }) => {
        const institutionType =
            company_config.COMPANY_ORG_SLUG === org.slug
                ? "COMPANY"
                : "BRANCH"

        return {
            session: { session, user },
            org,
            orgRole: orgMemberRole,
            institutionType,
        }
    },
)
