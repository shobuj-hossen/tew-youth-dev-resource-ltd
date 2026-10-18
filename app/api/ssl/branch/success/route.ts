import { db } from "@/drizzle/db"
import { branchApplications } from "@/drizzle/schema"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams

    if (search.get("status") === "success") {
        await db
            .update(branchApplications)
            .set({ isOneTimePaid: true })
            .where(
                eq(
                    branchApplications.paymentTransactionId,
                    search.get("paymentID")!,
                ),
            )
        redirect("/dashboard/overviews")
    }
}
