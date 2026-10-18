import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
    await auth.api.signOut({ headers: req.headers })
    redirect("/")
}
