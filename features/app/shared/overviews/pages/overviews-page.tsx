import { OverviewCards } from "../components/overviews-cards"

export function OverviewsPage() {
    return (
        <main className="space-y-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Dashboard Overview
                </h1>
                <p className="text-sm text-muted-foreground">
                    A summary of your organization at a
                    glance.
                </p>
            </div>

            <OverviewCards />
        </main>
    )
}
