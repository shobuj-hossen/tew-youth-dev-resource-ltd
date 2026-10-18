import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Suspense } from "react"
import { Navbar } from "./navbar"
import { NavbarSkeleton } from "./navbar-skeleton"
import { Footer } from "./footer"

export function MarketingLayot(props: LayoutProps<"/">) {
    return (
        <div>
            <Suspense fallback={<NavbarSkeleton />}>
                <NavbarShell />
            </Suspense>
            {props.children}
            <Suspense>
                <Footer />
            </Suspense>
        </div>
    )
}

export async function NavbarShell() {
    const res = await auth.api.getSession({
        headers: await headers(),
    })
    return <Navbar res={res} />
}
