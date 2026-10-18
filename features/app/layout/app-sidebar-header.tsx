"use client"

import { useState } from "react"
import Image from "next/image"
import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { GalleryVerticalEnd } from "lucide-react"
import { SidebarDataType } from "../types"

export function AppSidebarHeader({
    data,
}: {
    data: SidebarDataType
}) {
    const [imgError, setImgError] = useState(false)

    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton
                        size="lg"
                        render={
                            <div className="flex items-center gap-3">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-background overflow-hidden relative">
                                    {data.org.logo &&
                                    !imgError ? (
                                        <Image
                                            src={
                                                data.org
                                                    .logo
                                            }
                                            alt={
                                                data.org
                                                    .name ||
                                                "Organization Logo"
                                            }
                                            fill
                                            className="object-cover"
                                            onError={() =>
                                                setImgError(
                                                    true,
                                                )
                                            }
                                        />
                                    ) : (
                                        <GalleryVerticalEnd className="size-4" />
                                    )}
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none truncate">
                                    <span className="font-medium text-lg truncate">
                                        {data.org.name}
                                    </span>
                                    <span className="text-xs text-muted-foreground capitalize">
                                        {data.orgRole}
                                    </span>
                                </div>
                            </div>
                        }
                    />
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}
