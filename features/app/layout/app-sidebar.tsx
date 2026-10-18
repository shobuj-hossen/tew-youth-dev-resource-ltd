"use client"

import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { navData } from "../constants"
import { SidebarDataType } from "../types"
import { AppNavUser } from "./app-nav-user"
import { AppSidebarHeader } from "./app-sidebar-header"

export function AppSidebar({
    data,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    data: SidebarDataType
}) {
    const pathname = usePathname()

    const nav = [
        navData.navCommon[0],
        ...(data.institutionType === "COMPANY"
            ? navData.navMenuForCompany
            : navData.navMenuForBranch),
        ...navData.navCommon.slice(1),
    ]

    return (
        <Sidebar {...props} variant="inset">
            <AppSidebarHeader data={data} />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {nav.map((item) => (
                            <SidebarMenuItem
                                key={item.title}
                            >
                                <SidebarMenuButton className="font-medium uppercase text-muted-foreground hover:bg-transparent hover:text-muted-foreground">
                                    {item.title}
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub>
                                        {item.items.map(
                                            (item) => (
                                                <SidebarMenuSubItem
                                                    key={
                                                        item.title
                                                    }
                                                >
                                                    <SidebarMenuSubButton
                                                        className={cn(
                                                            "p-4 hover:bg-background/10 focus:bg-background/10 active:bg-background/10 rounded-full",
                                                            item.url &&
                                                                item.url.startsWith(
                                                                    pathname,
                                                                )
                                                                ? "bg-background hover:bg-background focus:bg-background border"
                                                                : "",
                                                        )}
                                                        render={
                                                            <Link
                                                                href={
                                                                    item.url ||
                                                                    ""
                                                                }
                                                            >
                                                                {
                                                                    item.title
                                                                }
                                                            </Link>
                                                        }
                                                    ></SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ),
                                        )}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                <AppNavUser data={data} />
            </SidebarFooter>
        </Sidebar>
    )
}
