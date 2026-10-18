import { Fragment } from "react"

import { auth } from "@/lib/auth"
import { headers as nextHeaders } from "next/headers"
import { redirect } from "next/navigation"
import { ContinueWorkspaceDialog } from "./continue-workspace-dialog"
import { db } from "@/drizzle/db"
import { PaymentDialog } from "./payment-dialog"

export async function ContinueWorkspace() {
    const headers = await nextHeaders()
    const listOrg = await auth.api.listOrganizations({
        headers,
    })

    console.log("working...", listOrg)

    const org = listOrg[0]
    if (!org) {
        redirect("/")
    }

    const companyOrg = org.id === process.env.COMPANY_ORG_ID
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
