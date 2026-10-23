"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Loader2, GitBranch, Building2 } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { BranchById } from "../types"
import { updateCompanyBranch } from "../actions"

export function BranchActions({
    branch,
}: {
    branch: BranchById
}) {
    const [isCompanyBranch, setIsCompanyBranch] = useState(
        Boolean(branch.isCompanyBranch),
    )

    const mutation = useMutation({
        mutationFn: updateCompanyBranch,
    })

    return (
        <Card className="w-full max-w-lg overflow-hidden rounded-2xl border shadow-sm">
            <CardHeader className="space-y-3 pb-5">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Building2 className="size-5" />
                </div>

                <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold tracking-tight">
                        Branch Settings
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                        Manage your branch configuration and
                        company affiliation.
                    </CardDescription>
                </div>
            </CardHeader>

            <Separator />

            <CardContent className="space-y-6 pt-6">
                <div className="flex items-center justify-between gap-4 rounded-xl border bg-muted/30 p-4">
                    <div className="flex min-w-0 items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                            <GitBranch className="size-4 text-muted-foreground" />
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium">
                                Company&apos;s Branch
                            </p>
                            <p className="text-xs leading-relaxed text-muted-foreground">
                                Mark this branch as part of
                                your company&apos;s
                                branches.
                            </p>
                            <p className="pt-1 text-xs font-medium text-muted-foreground">
                                Status:{" "}
                                <span
                                    className={
                                        isCompanyBranch
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : ""
                                    }
                                >
                                    {isCompanyBranch
                                        ? "Enabled"
                                        : "Disabled"}
                                </span>
                            </p>
                        </div>
                    </div>

                    <Switch
                        checked={isCompanyBranch}
                        onCheckedChange={setIsCompanyBranch}
                        disabled={mutation.isPending}
                        aria-label="Company's Branch"
                    />
                </div>

                <div className="flex items-center justify-between gap-3">
                    <p className="text-xs text-muted-foreground">
                        {mutation.isPending
                            ? "Saving your changes..."
                            : "Changes take effect after updating."}
                    </p>

                    <Button
                        onClick={() =>
                            mutation.mutate({
                                isCompanyBranch,
                                branchId: branch.id,
                            })
                        }
                        disabled={
                            mutation.isPending ||
                            isCompanyBranch ===
                                Boolean(
                                    branch.isCompanyBranch,
                                )
                        }
                        className="min-w-28 gap-2"
                    >
                        {mutation.isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                Updating
                            </>
                        ) : (
                            "Update"
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
