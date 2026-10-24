"use server"

import { db } from "@/drizzle/db"
import { transactions } from "@/drizzle/schema"
import { createSSLSession } from "@/lib/ssl-commerz/actions"
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

    const orderId = crypto.randomUUID().slice(0, 16)
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

    await db.insert(transactions).values({
        branchApplicationId: application.id,
        tranId: orderId,
        amount: application.oneTimePaymentAmount.toString(),
    })

    redirect(session.GatewayPageURL)
}
