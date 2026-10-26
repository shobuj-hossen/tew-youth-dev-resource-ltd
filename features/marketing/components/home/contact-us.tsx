import Image from "next/image"
import Link from "next/link"
import {
    ArrowUpRight,
    Mail,
    MapPin,
    Phone,
    type LucideIcon,
} from "lucide-react"
import contactUs from "@/public/contact-us.jpg"
import { ScrollReveal } from "./scroll-reveal"
import { company_client_config } from "@/utils/client-config"

interface ContactMethod {
    label: string
    value: string
    href: string
    icon: LucideIcon
}

const contactMethods: ContactMethod[] = [
    {
        label: "Call us (offline or whatsapp)",
        value: company_client_config.COMPANY_PHONE_NUMBER,
        href: `tel:${company_client_config.COMPANY_PHONE_NUMBER}`,
        icon: Phone,
    },
    {
        label: "Email us",
        value: "theadydin.online@example.com",
        href: "mailto:theadydin.online@example.com",
        icon: Mail,
    },
    {
        label: "Visit us",
        value: company_client_config.COMPANY_ADDRESS,
        href: "https://maps.app.goo.gl/CgA3Vj6qFQ8NEZ6F7",
        icon: MapPin,
    },
]

export function ContactUs() {
    return (
        <section
            id="home-contact-us"
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
        >
            <div className="relative min-h-140 overflow-hidden rounded-[2rem] border">
                <Image
                    src={contactUs}
                    alt="Students learning together"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                />

                <div className="absolute inset-0 bg-background/75 backdrop-blur-[2px]" />

                <div className="relative flex min-h-140 items-center justify-center px-6 py-16 sm:px-10 lg:px-16">
                    <div className="w-full max-w-4xl text-center">
                        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-primary">
                            <span className="h-px w-7 bg-primary" />
                            <span>Contact Us</span>
                            <span className="h-px w-7 bg-primary" />
                        </div>

                        <h2 className="mx-auto mt-2 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                            Let's build opportunities
                            together.
                        </h2>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                            Whether you are interested in
                            opening a branch, learning about
                            our courses, or simply want to
                            know more about what we do, our
                            team is ready to hear from you.
                        </p>

                        <ScrollReveal>
                            <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
                                {contactMethods.map(
                                    (
                                        {
                                            label,
                                            value,
                                            href,
                                            icon: Icon,
                                        },
                                        index,
                                    ) => (
                                        <Link
                                            key={index}
                                            href={href}
                                            target={
                                                href.startsWith(
                                                    "http",
                                                )
                                                    ? "_blank"
                                                    : undefined
                                            }
                                            rel={
                                                href.startsWith(
                                                    "http",
                                                )
                                                    ? "noopener noreferrer"
                                                    : undefined
                                            }
                                            className="group rounded-2xl border bg-background/90 p-5 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex size-9 items-center justify-center rounded-xl border bg-muted">
                                                    <Icon className="size-4" />
                                                </div>

                                                <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                            </div>

                                            <p className="mt-5 text-xs font-medium text-muted-foreground">
                                                {label}
                                            </p>

                                            <p className="mt-1 text-sm font-medium">
                                                {value}
                                            </p>
                                        </Link>
                                    ),
                                )}
                            </div>
                        </ScrollReveal>
                        <p className="mt-10 text-xs text-muted-foreground">
                            We look forward to connecting
                            with you.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
