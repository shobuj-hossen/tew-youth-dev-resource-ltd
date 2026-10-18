import Image from "next/image"
import {
    ArrowUpRight,
    Building2,
    GraduationCap,
    Sparkles,
} from "lucide-react"
import aboutUs from "@/public/about-us.jpg"
import { ScrollReveal } from "./scroll-reveal"

export function AboutUs() {
    return (
        <section
            id="home-about-us"
            className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
        >
            <div className="relative overflow-hidden rounded-[2rem] border bg-muted/30">
                <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="relative min-h-90 overflow-hidden sm:min-h-110 lg:min-h-155">
                        <Image
                            src={aboutUs}
                            alt="Young people learning digital skills together"
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 55vw"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-background/70 via-transparent to-transparent" />

                        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                            <div className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md">
                                <Sparkles className="size-3.5" />
                                Building opportunities
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center bg-background p-7 sm:p-10 lg:p-14">
                        <div className="mx-auto max-w-xl">
                            <div className="mb-4 text-primary flex items-center justify-center gap-2 text-sm font-medium lg:justify-start">
                                <span className="h-px w-7 bg-primary" />
                                <span>About us</span>
                            </div>

                            <ScrollReveal>
                                <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-left lg:text-5xl lg:leading-[1.1]">
                                    Creating opportunities.
                                    <span className="text-muted-foreground">
                                        {" "}
                                        Empowering the next
                                        generation.
                                    </span>
                                </h2>
                            </ScrollReveal>

                            <ScrollReveal delay={100}>
                                <p className="mt-5 text-center text-sm leading-7 text-muted-foreground sm:text-base lg:text-left">
                                    We believe meaningful
                                    change begins when
                                    people have the
                                    opportunity to learn,
                                    build, and grow where
                                    they live. Our mission
                                    is to make practical
                                    education more
                                    accessible by empowering
                                    individuals to establish
                                    and operate authorized
                                    training branches in
                                    their communities.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={200}>
                                <p className="mt-4 text-center text-sm leading-7 text-muted-foreground sm:text-base lg:text-left">
                                    Through these branches,
                                    young people can gain
                                    practical computer and
                                    professional skills,
                                    opening doors to further
                                    education,
                                    entrepreneurship, and
                                    employment.
                                </p>
                            </ScrollReveal>
                            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <ScrollReveal>
                                    <div className="rounded-2xl border bg-card p-4">
                                        <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-muted text-primary">
                                            <Building2 className="size-4.5" />
                                        </div>

                                        <h3 className="font-semibold text-foreground">
                                            Grow with us
                                        </h3>

                                        <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                            Build a local
                                            training branch
                                            and bring
                                            structured
                                            learning
                                            opportunities to
                                            your community.
                                        </p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal delay={100}>
                                    <div className="rounded-2xl border bg-card p-4">
                                        <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-muted text-primary">
                                            <GraduationCap className="size-4.5" />
                                        </div>

                                        <h3 className="font-semibold text-foreground">
                                            Empower youth
                                        </h3>

                                        <p className="mt-1 text-sm leading-5 text-muted-foreground">
                                            Help young
                                            people develop
                                            practical skills
                                            they can use to
                                            shape their
                                            future.
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </div>

                            <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-foreground lg:justify-start">
                                <span>
                                    One branch can create
                                    many opportunities.
                                </span>
                                <ArrowUpRight className="size-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
