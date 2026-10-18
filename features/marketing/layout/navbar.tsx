"use client"

import { Logo } from "@/components/shared/logo"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { auth } from "@/lib/auth"
import { MenuTwoLineIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const navOptions: {
    label: string
    href: string
}[] = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "Courses",
        href: "#home-courses",
    },
    {
        label: "About Us",
        href: "#home-about-us",
    },
    {
        label: "Contact",
        href: "#home-contact-us",
    },
    {
        label: "Results",
        href: "/",
    },
]
export function Navbar({
    res,
}: {
    res: Awaited<ReturnType<typeof auth.api.getSession>>
}) {
    const [scrolled, setScrolled] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll, {
            passive: true,
        })

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll,
            )
    }, [])

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
                scrolled
                    ? "px-5 pt-2 sm:px-8 sm:pt-3"
                    : "px-3 pt-3 sm:px-5 sm:pt-5"
            }`}
        >
            <div
                className={`mx-auto flex items-center justify-between border bg-background/85 px-4 backdrop-blur-xl transition-all duration-500 ease-out sm:px-6 ${
                    scrolled
                        ? "h-14 max-w-5xl rounded-full shadow-md shadow-black/5 sm:h-15"
                        : "h-16 max-w-7xl rounded-xl shadow-lg shadow-black/5 sm:h-18"
                }`}
            >
                <div className="flex items-center justify-center gap-4">
                    <MobileNavbarSheet
                        scrolled={scrolled}
                    />
                    <Logo scrolled={scrolled} />
                    <div className="hidden lg:block">
                        {navOptions.map((op) => (
                            <Button
                                onClick={() => {
                                    router.push("/")
                                    router.push(op.href)
                                }}

                                key={op.label}

                                variant={"ghost"}
                            >
                                {op.label}
                            </Button>
                        ))}
                    </div>
                </div>

                {res ? (
                    <Button
                        nativeButton={false}
                        render={
                            <Link href="/dashboard/overviews" />
                        }
                    >
                        Dashboard
                    </Button>
                ) : (
                    <div className="flex items-center gap-1 sm:gap-2">
                        <Button
                            nativeButton={false}
                            render={
                                <Link href="/apply-branch" />
                            }
                            variant="outline"
                            className="hidden lg:flex"
                        >
                            Apply for Branch
                            <ChevronRight />
                        </Button>
                        <Button
                            nativeButton={false}
                            render={
                                <Link href="/apply-branch" />
                            }
                            variant="outline"
                            className="lg:hidden"
                        >
                            Apply Branch
                        </Button>

                        <Button
                            nativeButton={false}
                            render={<Link href="/login" />}
                            variant="ghost"
                            size="sm"
                        >
                            Login
                        </Button>
                    </div>
                )}
            </div>
        </header>
    )
}

function MobileNavbarSheet({
    scrolled,
}: {
    scrolled: boolean
}) {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
                nativeButton={false}
                render={
                    <HugeiconsIcon
                        className="transition-all lg:hidden"
                        icon={MenuTwoLineIcon}
                        size={scrolled ? 0 : 25}
                    />
                }
            ></SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col">
                    {navOptions.map((op) => (
                        <div
                            className="p-3 px-6 cursor-pointer flex items-center justify-between"
                            onClick={() => {
                                setOpen(false)
                                router.push("/")
                                router.push(op.href)
                            }}

                            key={op.label}
                        >
                            <span>{op.label}</span>
                            <ChevronRight className="size-4" />
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
