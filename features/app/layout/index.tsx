import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Suspense } from "react"
import { AppBreadcrumb } from "./app-breadcrumb"

import { AppSidebarSkeleton } from "./app-sidebar-skeleton"
import { getSidebarData } from "../queries"
import { AppSidebar } from "./app-sidebar"
import { ErrorBoundary } from "react-error-boundary"
import { FallbackAppLayout } from "./fallback-index"

export function AppLayout(props: LayoutProps<"/">) {
    return (
        <ErrorBoundary fallback={<FallbackAppLayout />}>
            <SidebarProvider>
                <Suspense fallback={<AppSidebarSkeleton />}>
                    <AppSidebarShell />
                </Suspense>
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-3">
                            <SidebarTrigger />
                            <Suspense>
                                <AppBreadcrumb />
                            </Suspense>
                        </div>
                    </header>
                    <div className="p-6 pt-0 ">
                        {props.children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ErrorBoundary>
    )
}

async function AppSidebarShell() {
    const data = await getSidebarData()
    return <AppSidebar data={data} />
}
