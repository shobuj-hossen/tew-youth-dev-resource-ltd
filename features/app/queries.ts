import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { company_config } from "@/utils/config"

export const getSidebarData = withPermission(
    { sidebar: ["view"] },
    async ({ org, orgMemberRole, session, user }) => {
        const institutionType =
            company_config.COMPANY_ORG_SLUG === org.slug
                ? "COMPANY"
                : "BRANCH"

        if (institutionType === "BRANCH") {
            const branchApp =
                await db.query.branchApplications.findFirst(
                    {
                        where: { organizationId: org.id },
                        columns: {
                            oneTimePaymentAmount: true,
                            oneTimePaymentStatus: true,
                        },
                    },
                )
            if (
                branchApp?.oneTimePaymentStatus ===
                    "unpaid" &&
                branchApp.oneTimePaymentAmount !== 0
            ) {
                throw new Error("Payment Required")
            }
        }
        return {
            session: { session, user },
            org,
            orgRole: orgMemberRole,
            institutionType,
        }
    },
)
