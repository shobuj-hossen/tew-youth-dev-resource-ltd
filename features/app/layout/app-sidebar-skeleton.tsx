import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export function AppSidebarSkeleton() {
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex h-12 items-center gap-3 px-2">
                            <Skeleton className="size-8 shrink-0 rounded-lg" />

                            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-3 w-20" />
                            </div>

                            <Skeleton className="size-4 shrink-0 rounded" />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Skeleton className="h-3 w-16" />
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {Array.from({ length: 6 }).map(
                                (_, index) => (
                                    <SidebarMenuItem
                                        key={index}
                                    >
                                        <div className="flex h-8 items-center gap-3 px-2">
                                            <Skeleton className="size-4 invisible shrink-0 rounded" />
                                            <Skeleton
                                                className="h-4"
                                                style={{
                                                    width: `${64 + (index % 3) * 18}px`,
                                                }}
                                            />
                                        </div>
                                    </SidebarMenuItem>
                                ),
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>
                        <Skeleton className="h-3 w-20" />
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {Array.from({ length: 4 }).map(
                                (_, index) => (
                                    <SidebarMenuItem
                                        key={index}
                                    >
                                        <div className="flex h-8 items-center gap-3 px-2">
                                            <Skeleton className="size-4 invisible shrink-0 rounded" />
                                            <Skeleton
                                                className="h-4"
                                                style={{
                                                    width: `${72 + (index % 2) * 24}px`,
                                                }}
                                            />
                                        </div>
                                    </SidebarMenuItem>
                                ),
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <div className="flex h-12 items-center gap-3 px-2">
                    <Skeleton className="size-8 shrink-0 rounded-lg" />

                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                        <Skeleton className="h-3.5 w-24" />
                        <Skeleton className="h-3 w-32" />
                    </div>

                    <Skeleton className="size-4 shrink-0 rounded" />
                </div>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
