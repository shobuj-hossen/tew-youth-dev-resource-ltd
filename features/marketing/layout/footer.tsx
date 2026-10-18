"use client"

import Link from "next/link"
import { Logo } from "@/components/shared/logo"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Facebook01Icon,
    InstagramIcon,
    TiktokIcon,
    WhatsappIcon,
    Youtube,
} from "@hugeicons/core-free-icons"
import { ScrollReveal } from "../components/home/scroll-reveal"

const socialLinks = [
    {
        label: "Facebook",
        href: "#",
        icon: Facebook01Icon,
    },
    { label: "Instagram", href: "#", icon: InstagramIcon },
    { label: "Tiktok", href: "#", icon: TiktokIcon },
    { label: "Whatsapp", href: "#", icon: WhatsappIcon },
    { label: "Youtube", href: "#", icon: Youtube },
]

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
                    <div className="space-y-2">
                        <div className="inline-flex flex-col lg:flex-row items-center gap-2 text-lg font-semibold tracking-tight">
                            <Logo scrolled />
                            <span>
                                The Earn Way Youth
                                Devlopment Resource
                            </span>
                        </div>

                        <p className="max-w-xs text-sm leading-5 text-muted-foreground">
                            Empowering communities through
                            accessible skills, training, and
                            opportunity.
                        </p>
                    </div>

                    <div className="flex items-center gap-1">
                        {socialLinks.map(
                            (
                                { label, href, icon: Icon },
                                index,
                            ) => (
                                <ScrollReveal
                                    key={label}
                                    delay={index * 100}
                                >
                                    <Link
                                        href={href}
                                        aria-label={label}
                                        className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                    >
                                        <HugeiconsIcon
                                            icon={Icon}
                                            size={20}
                                            className="size-5"
                                        />
                                    </Link>
                                </ScrollReveal>
                            ),
                        )}
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-5 text-xs text-muted-foreground sm:flex-row">
                    <p className="max-w-xs text-sm leading-5 text-muted-foreground">
                        Empowering communities through
                        accessible skills, training, and
                        opportunity.
                    </p>

                    <Link
                        href="https://the-eary-way-academy.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
                    >
                        Visit our legacy website →
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/privacy"
                            className="transition-colors hover:text-foreground"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="transition-colors hover:text-foreground"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
