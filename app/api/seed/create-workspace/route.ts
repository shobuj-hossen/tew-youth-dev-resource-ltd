import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const res = await db.select().from(users)
    if (res.length > 1) {
        return NextResponse.json({
            message: "You can not create any worksspace",
        })
    }

    try {
        await auth.api.createOrganization({
            body: {
                name: "Tewydr Org",
                slug: "tewydr-org",
                keepCurrentActiveOrganization: false,
            },
            headers: await headers(),
        })
    } catch (error) {
        return NextResponse.json({
            error,
        })
    }
    redirect("/")
}
