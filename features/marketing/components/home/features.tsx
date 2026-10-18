import {
    Award,
    ClipboardCheck,
    FileCheck2,
    GraduationCap,
} from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

const features = [
    {
        number: "01",
        icon: ClipboardCheck,
        title: "Examination",
        description:
            "Conduct structured examinations with a reliable process designed to evaluate learning and maintain academic standards.",
    },
    {
        number: "02",
        icon: Award,
        title: "Certificates",
        description:
            "Provide learners with professionally issued certificates that recognize their completed training and achievements.",
    },
    {
        number: "03",
        icon: FileCheck2,
        title: "Result Verification",
        description:
            "Verify certificates and results through a simple and trustworthy system that helps keep academic records transparent.",
    },
]

export function Features() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-2xl text-center">
                <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-foreground">
                    <span className="h-px w-7 bg-primary" />
                    <span className="text-primary">
                        What we provide
                    </span>
                    <span className="h-px w-7 bg-primary" />
                </div>

                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    A complete learning ecosystem
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                    From examination to certification, we
                    provide the infrastructure that helps
                    training branches deliver trusted
                    learning experiences.
                </p>
            </div>

            <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-3 lg:gap-5">
                {features.map((feature, index) => {
                    const Icon = feature.icon

                    return (
                        <ScrollReveal
                            delay={index * 100}
                            key={feature.number}
                        >
                            <article
                                className={[
                                    "group relative overflow-hidden rounded-3xl border bg-card p-6 transition-all duration-500",
                                    "hover:-translate-y-1 hover:shadow-xl",
                                    "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4",
                                    "duration-500 fill-mode-both",
                                    index === 0 &&
                                        "delay-0",
                                    index === 1 &&
                                        "delay-100",
                                    index === 2 &&
                                        "delay-200",
                                ]
                                    .filter(Boolean)
                                    .join(" ")}
                            >
                                <div className="absolute right-5 top-4 select-none text-6xl font-semibold tracking-tighter text-muted/60 transition-transform duration-500 group-hover:scale-110">
                                    {feature.number}
                                </div>

                                <div className="relative">
                                    <div className="flex size-12 text-primary items-center justify-center rounded-2xl border bg-muted transition-transform duration-500 group-hover:scale-105">
                                        <Icon className="size-5" />
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold tracking-tight">
                                            {feature.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                                            {
                                                feature.description
                                            }
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                        <span className="h-px w-8 bg-border transition-all duration-500 group-hover:w-12" />
                                        <span>
                                            Built for trust
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </ScrollReveal>
                    )
                })}
            </div>

            <div className="mx-auto mt-5 flex max-w-3xl items-center justify-center gap-2 rounded-2xl border bg-muted/40 px-5 py-4 text-center text-sm text-muted-foreground">
                <GraduationCap className="size-4 shrink-0 text-foreground" />
                <span>
                    Helping training branches deliver
                    structured, verifiable learning
                    outcomes.
                </span>
            </div>
        </section>
    )
}
