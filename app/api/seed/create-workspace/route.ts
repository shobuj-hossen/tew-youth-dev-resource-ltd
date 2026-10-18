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

    const metadata = { someKey: "someValue" }
    try {
        await auth.api.createOrganization({
            body: {
                name: "TEWYDR Organization", // required, The organization name.
                slug: "tewydr-org", // required, The organization slug.
                logo: "https://res.cloudinary.com/ddyrlplxn/image/upload/v1788849883/Testing/file_snoepb.png", // The organization logo.
                metadata, // The metadata of the organization.
                keepCurrentActiveOrganization: false, // Whether to keep the current active organization active after creating a new one.
            },
            // This endpoint requires session cookies.
            headers: await headers(),
        })
    } catch (error) {
        return NextResponse.json({
            error,
        })
    }
    redirect("/")
}
