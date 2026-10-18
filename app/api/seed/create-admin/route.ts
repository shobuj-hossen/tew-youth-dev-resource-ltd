import { db } from "@/drizzle/db"
import { users } from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const res = await db.select().from(users)
    if (res.length > 0) {
        return NextResponse.json({
            message: "user already exist",
        })
    }
    await auth.api.signUpEmail({
        body: {
            name: "TEW",
            email: "tew@gmail.com",
            password: "tewpassword",
        },

        headers: await headers(),
    })

    await db.update(users).set({ role: "admin" })
    redirect("/api/seed/create-workspace")
}
