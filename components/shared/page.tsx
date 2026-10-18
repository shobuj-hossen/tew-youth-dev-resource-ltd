"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { ComponentProps, ReactNode } from "react"

// Page Component
export interface PageProps extends ComponentProps<"div"> {
    children: ReactNode
}

export function Page({
    children,
    className,
    ...props
}: PageProps) {
    return (
        <div
            className={cn("space-y-5", className)}
            {...props}
        >
            {children}
        </div>
    )
}

// PageHeader Component
export interface PageHeaderProps extends ComponentProps<"div"> {
    children: ReactNode
}

export function PageHeader({
    children,
    className,
    ...props
}: PageHeaderProps) {
    return (
        <div
            className={cn(
                "flex items-center justify-between",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}
// PageTitle Component
export interface PageTitleProps extends ComponentProps<"div"> {
    children: ReactNode
    backTo?: string
}

export function PageTitle({
    children,
    className,
    backTo,
    ...props
}: PageTitleProps) {
    return (
        <div
            className={cn(
                "text-xl md:text-2xl font-bold",
                className,
            )}
            {...props}
        >
            {backTo ? (
                <Link
                    className="flex items-center gap-1"
                    href={backTo}
                >
                    <ChevronLeft /> {children}
                </Link>
            ) : (
                <span>{children}</span>
            )}
        </div>
    )
}
// PageTitle Component
export interface PageTitleProps extends ComponentProps<"div"> {
    children: ReactNode
}

export function PageAction({
    children,
    className,
    ...props
}: PageTitleProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-1",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}

export interface PageContentProps extends ComponentProps<"div"> {
    children: ReactNode
}

export function PageContent({
    children,
    className,
    ...props
}: PageContentProps) {
    return (
        <div
            className={cn("space-y-6", className)}
            {...props}
        >
            {children}
        </div>
    )
}
