import { withPermission } from "@/lib/dal"
import { company_config } from "@/utils/config"

export const getSidebarData = withPermission(
    { sidebar: ["view"] },
    async ({ org, orgMemberRole, session, user }) => {
        const institutionType =
            company_config.COMPANY_ORG_ID === org.id
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
