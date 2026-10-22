import { Fragment } from "react"

import { auth } from "@/lib/auth"
import { headers as nextHeaders } from "next/headers"
import { redirect } from "next/navigation"
import { ContinueWorkspaceDialog } from "./continue-workspace-dialog"
import { db } from "@/drizzle/db"
import { PaymentDialog } from "./payment-dialog"
import { company_config } from "@/utils/config"

export async function ContinueWorkspace() {
    const headers = await nextHeaders()
    const listOrg = await auth.api.listOrganizations({
        headers,
    })

    const org = listOrg[0]
    if (!org) {
        redirect("/")
    }

    const companyOrg =
        org.slug === company_config.COMPANY_ORG_SLUG
    if (!companyOrg) {
        const application =
            await db.query.branchApplications.findFirst({
                where: { organizationId: org.id },
                columns: {
                    oneTimePaymentAmount: true,
                    isOneTimePaid: true,
                },
            })
        if (!application) {
            redirect("/")
        }

        if (
            !application.isOneTimePaid &&
            application.oneTimePaymentAmount !== 0
        ) {
            return (
                <PaymentDialog
                    orgId={org.id}
                    payableAmount={
                        application.oneTimePaymentAmount
                    }
                />
            )
        }
    }

    return (
        <Fragment>
            <ContinueWorkspaceDialog orgId={org.id} />
        </Fragment>
    )
}
