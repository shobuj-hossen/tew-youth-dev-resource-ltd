"use server"

import { db } from "@/drizzle/db"
import { branchApplications } from "@/drizzle/schema"
import { createSSLSession } from "@/lib/ssl-commerz/actions"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"

export async function oneTimePayment({
    orgId,
}: {
    orgId: string
}) {
    const application =
        await db.query.branchApplications.findFirst({
            where: { organizationId: orgId },
        })
    if (!application) {
        redirect("/")
    }

    const orderId = crypto.randomUUID().slice(0, 13)
    const session = await createSSLSession({
        orderId,
        amount: application.oneTimePaymentAmount,
        customerName: application.ownerName,
        customerEmail: application.email,
        customerPhone: application.mobile,
        address: application.area,
        city: application.districtId,
        postcode: application.postalCode,
        type: "branch",
    })
    console.log(session)
    await db
        .update(branchApplications)
        .set({ paymentTransactionId: orderId })
        .where(eq(branchApplications.id, application.id))

    redirect(session.GatewayPageURL)
}
