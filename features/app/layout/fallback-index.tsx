import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Suspense } from "react"
import { AppBreadcrumb } from "./app-breadcrumb"

import { AppSidebarSkeleton } from "./app-sidebar-skeleton"
import { ContinueWorkspace } from "./continue-worksapce"

export function FallbackAppLayout() {
    return (
        <SidebarProvider>
            <AppSidebarSkeleton />
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
                    <Suspense>
                        <ContinueWorkspace />
                    </Suspense>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
