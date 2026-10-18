"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { navData } from "../constants"

export function AppBreadcrumb() {
    const pathname = usePathname()
    const navDataAll = [
        ...navData.navMenuForBranch,
        ...navData.navMenuForCompany,
        ...navData.navCommon,
    ]
    const menuTitle =
        navDataAll.find((nav) =>
            nav.items?.some((item) =>
                pathname.startsWith(
                    item.url ? item.url : "",
                ),
            ),
        )?.title || ""
    const menuItem =
        navDataAll
            .flatMap((nav) => nav.items || [])
            .find((item) =>
                pathname.startsWith(
                    item.url ? item.url : "",
                ),
            )?.title || ""
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                        {menuTitle}
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {menuItem}
                    </BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
