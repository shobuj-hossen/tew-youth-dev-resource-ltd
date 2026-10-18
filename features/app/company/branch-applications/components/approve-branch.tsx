"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import {
    CheckCircle2,
    CircleAlert,
    Plus,
    XCircle,
} from "lucide-react"

import { SubmitButton } from "@/components/shared/submit-button"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
    approveApplication,
    createNewBranchWorkspace,
    rejectApplication,
} from "../actions"
import { BranchApplication } from "../types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/toast"

type BranchStatus = "pending" | "approved" | "rejected"
type Action = "approve" | "reject"

const STATUS_CONFIG = {
    pending: {
        title: "Review application",
        description:
            "Review the branch application and confirm whether it should be approved or rejected.",
        label: "Pending review",
        icon: CircleAlert,
        className:
            "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400",
    },
    approved: {
        title: "Application approved",
        description:
            "This application has been approved. You can create the branch workspace if one has not been created yet.",
        label: "Approved",
        icon: CheckCircle2,
        className:
            "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400",
    },
    rejected: {
        title: "Application rejected",
        description:
            "This application has been rejected and can no longer be approved from this page.",
        label: "Rejected",
        icon: XCircle,
        className:
            "border-destructive/20 bg-destructive/5 text-destructive",
    },
} satisfies Record<
    BranchStatus,
    {
        title: string
        description: string
        label: string
        icon: typeof CircleAlert
        className: string
    }
>

export function ApproveBranch({
    status,
    id: applicationId,
    organizationId,
}: Pick<
    BranchApplication,
    "status" | "id" | "organizationId"
>) {
    const [action, setAction] = useState<Action | null>(
        null,
    )
    const [oneTimePaymentAmount, setOneTimePaymentAmount] =
        useState<string>("")
    const [paymentRequired, setPaymentRequired] =
        useState<boolean>(true)
    const [error, setError] = useState<string>("")

    const approveMutation = useMutation({
        mutationFn: approveApplication,
        onSuccess: () => {
            setAction(null)
        },
    })

    const rejectMutation = useMutation({
        mutationFn: rejectApplication,
        onSuccess: () => {
            setAction(null)
        },
    })

    const workspaceMutation = useMutation({
        mutationFn: createNewBranchWorkspace,
    })

    const config = STATUS_CONFIG[status]
    const StatusIcon = config.icon

    const actionButtonDisabled =
        status === "approved" || status === "rejected"

    const isActionPending =
        approveMutation.isPending ||
        rejectMutation.isPending

    return (
        <>
            <Card className="overflow-hidden">
                <CardHeader className="border-b">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <CardTitle className="text-base">
                                {config.title}
                            </CardTitle>
                            <CardDescription className="max-w-2xl">
                                {config.description}
                            </CardDescription>
                        </div>

                        <div
                            className={cn(
                                "flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium",
                                config.className,
                            )}
                        >
                            <StatusIcon className="size-3.5" />
                            {config.label}
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    {status === "pending" ? (
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <Button
                                disabled={
                                    actionButtonDisabled
                                }
                                onClick={() =>
                                    setAction("approve")
                                }
                                className="sm:min-w-36"
                            >
                                <CheckCircle2 />
                                Approve application
                            </Button>

                            <Button
                                disabled={
                                    actionButtonDisabled
                                }
                                variant="outline"
                                onClick={() =>
                                    setAction("reject")
                                }
                                className="sm:min-w-28"
                            >
                                <XCircle />
                                Reject
                            </Button>
                        </div>
                    ) : (
                        <div className="text-sm text-muted-foreground">
                            No further approval action is
                            available.
                        </div>
                    )}

                    {status === "approved" &&
                        !organizationId && (
                            <SubmitButton
                                isPending={
                                    workspaceMutation.isPending
                                }
                                onClick={() =>
                                    workspaceMutation.mutate(
                                        {
                                            applicationId,
                                        },
                                    )
                                }
                                variant="outline"
                                className="sm:min-w-40"
                            >
                                <Plus />
                                Create workspace
                            </SubmitButton>
                        )}
                </CardContent>
            </Card>

            <Dialog
                open={action !== null}
                onOpenChange={(open) => {
                    if (!open) {
                        setAction(null)
                    }
                }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div
                            className={cn(
                                "mb-2 flex size-10 items-center justify-center rounded-lg",
                                action === "approve"
                                    ? "bg-emerald-500/10 text-emerald-600"
                                    : "bg-destructive/10 text-destructive",
                            )}
                        >
                            {action === "approve" ? (
                                <CheckCircle2 className="size-5" />
                            ) : (
                                <XCircle className="size-5" />
                            )}
                        </div>

                        <DialogTitle>
                            {action === "approve"
                                ? "Approve this application?"
                                : "Reject this application?"}
                        </DialogTitle>

                        <DialogDescription className="leading-6">
                            {action === "approve"
                                ? "Approving this application will allow the branch to proceed with dashboard access."
                                : "Rejecting this application will remove it from the pending review state."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
                        {action === "approve"
                            ? "Make sure the branch information and submitted documents have been reviewed before continuing."
                            : "This action changes the application status. Review the submitted information before continuing."}
                    </div>

                    {action === "approve" && (
                        <div>
                            <div className="flex items-center justify-start flex-row gap-3">
                                <Checkbox
                                    checked={
                                        paymentRequired
                                    }
                                    onCheckedChange={(
                                        v,
                                    ) => {
                                        setError("")
                                        setPaymentRequired(
                                            v,
                                        )
                                    }}
                                />
                                <Label>
                                    Payment Required
                                </Label>
                            </div>
                            {paymentRequired && (
                                <Field>
                                    <Label>
                                        One Time Payable
                                        Amount
                                    </Label>
                                    <Input
                                        value={
                                            oneTimePaymentAmount
                                        }
                                        onChange={(e) => {
                                            setError("")
                                            setOneTimePaymentAmount(
                                                e.target
                                                    .value,
                                            )
                                        }}
                                        type="number"
                                    />
                                </Field>
                            )}
                            {error && (
                                <span className="text-destructive">
                                    You must provide at
                                    least 100 tk payable
                                    amount
                                </span>
                            )}
                        </div>
                    )}
                    <DialogFooter className="gap-2 sm:gap-2">
                        <DialogClose
                            render={
                                <Button
                                    variant="outline"
                                    disabled={
                                        isActionPending
                                    }
                                >
                                    Cancel
                                </Button>
                            }
                        />

                        <SubmitButton
                            isPending={isActionPending}
                            onClick={() => {
                                if (action === "approve") {
                                    const amount = Number(
                                        oneTimePaymentAmount,
                                    )
                                    if (
                                        paymentRequired &&
                                        amount < 100
                                    ) {
                                        setError(
                                            "You must provide at least 100 tk payable amount",
                                        )
                                        return
                                    }
                                    approveMutation.mutate({
                                        applicationId,
                                        oneTimePaymentAmount:
                                            amount,
                                    })
                                } else {
                                    rejectMutation.mutate({
                                        applicationId,
                                    })
                                }
                            }}
                            type="button"
                            variant={
                                action === "approve"
                                    ? "default"
                                    : "destructive"
                            }
                        >
                            {action === "approve"
                                ? "Approve application"
                                : "Reject application"}
                        </SubmitButton>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
