import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

const AUTH_ROUTES = [
    "/login",
    "/forgot-password",
    "/reset-password",
]
const PUBLIC_ROUTES = [
    "/",
    "/apply-branch",
    "/terms",
    "/privacy",
]

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    })
    const { pathname } = request.nextUrl

    const isAuthRoute = AUTH_ROUTES.includes(pathname)
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    if (!session && !isPublicRoute && !isAuthRoute) {
        return NextResponse.redirect(
            new URL("/login", request.url),
        )
    }
    if (session && isAuthRoute) {
        return NextResponse.redirect(
            new URL("/", request.url),
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
}
