import {
    BookOpenCheck,
    Building2,
    GraduationCap,
    Users,
    WalletCards,
    UserRoundCheck,
} from "lucide-react"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getOverviews } from "../queries"

const metricIcons = {
    branches: Building2,
    users: Users,
    enrollments: BookOpenCheck,
    students: GraduationCap,
    enrolled: UserRoundCheck,
    unpaid: WalletCards,
} as const

const numberFormatter = new Intl.NumberFormat("en-BD")

export async function OverviewCards() {
    const overview = await getOverviews()

    return (
        <section
            aria-label="Dashboard overview"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
            {overview.metrics.map((metric) => {
                const Icon =
                    metricIcons[
                        metric.key as keyof typeof metricIcons
                    ]
                return (
                    <Card
                        key={metric.key}
                        className="group gap-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                            <div className="space-y-1.5">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {metric.label}
                                </CardTitle>

                                <p className="text-3xl font-semibold tracking-tight tabular-nums">
                                    {numberFormatter.format(
                                        metric.value,
                                    )}
                                </p>
                            </div>

                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-muted transition-colors duration-200 group-hover:bg-accent">
                                <Icon className="size-5 text-foreground" />
                            </div>
                        </CardHeader>

                        <CardContent>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {metric.description}
                            </p>
                        </CardContent>
                    </Card>
                )
            })}
        </section>
    )
}
