import { db } from "@/drizzle/db"
import { enrollments, transactions } from "@/drizzle/schema"
import { SSLCommerzPaymentPayload } from "@/lib/ssl-commerz/types"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
    const contentType =
        req.headers.get("content-type") ?? ""

    let payload: SSLCommerzPaymentPayload | null = null

    if (
        contentType.includes(
            "application/x-www-form-urlencoded",
        ) ||
        contentType.includes("multipart/form-data")
    ) {
        const formData = await req.formData()
        payload = Object.fromEntries(
            formData.entries(),
        ) as unknown as SSLCommerzPaymentPayload
    } else if (contentType.includes("application/json")) {
        payload = await req.json()
    }

    if (payload) {
        const res = await db.query.transactions.findFirst({
            where: { id: payload.tran_id },
            with: { enrollment: { columns: { id: true } } },
        })

        if (res && res.enrollment) {
            await db
                .update(transactions)
                .set({
                    bankTranId: payload.bank_tran_id,
                    cardBrand: payload.card_brand,
                    cardType: payload.card_type,
                    error: payload.error,
                    tranDate: payload.tran_date,
                    status: payload.status,
                })
                .where(
                    eq(
                        transactions.tranId,
                        payload.tran_id,
                    ),
                )

            await db
                .update(enrollments)
                .set({ paymentStatus: "paid" })
                .where(
                    eq(enrollments.id, res.enrollment.id),
                )
        }
    }

    redirect("/branch/students")
}
