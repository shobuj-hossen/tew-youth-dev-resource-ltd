"use client"

import { Card, CardHeader } from "@/components/ui/card"
import { BranchById } from "../types"

export function BranchActions({
    branch,
}: {
    branch: BranchById
}) {
    return (
        <Card className="max-w-lg">
            <CardHeader>
                {
                    "This is an upcoming feature: stay tuned :>"
                }
            </CardHeader>
        </Card>
    )
}
