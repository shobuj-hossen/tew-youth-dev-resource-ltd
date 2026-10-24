"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import {
    Loader2,
    GitBranch,
    Building2,
    Wallet,
} from "lucide-react"

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
import {
    updateCompanyBranch,
    updateBranchOneTimePayment,
} from "../actions"
import { Label } from "@/components/ui/label"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type PaymentStatus = "unpaid" | "paid" | "exempt"

export function BranchActions({
    branch,
}: {
    branch: BranchById
}) {
    // Company branch settings
    const [isCompanyBranch, setIsCompanyBranch] = useState(
        Boolean(branch.isCompanyBranch),
    )
    const [savedCompanyBranch, setSavedCompanyBranch] =
        useState(Boolean(branch.isCompanyBranch))

    // One-time payment settings
    const initialStatus: PaymentStatus =
        branch.oneTimePaymentStatus ?? "unpaid"

    const initialAmount = String(
        branch.oneTimePaymentAmount ?? 0,
    )

    const [paymentStatus] =
        useState<PaymentStatus>(initialStatus)

    const [paymentAmount, setPaymentAmount] =
        useState(initialAmount)

    const [savedPaymentStatus] =
        useState<PaymentStatus>(initialStatus)

    const [savedPaymentAmount, setSavedPaymentAmount] =
        useState(initialAmount)

    const companyMutation = useMutation({
        mutationFn: updateCompanyBranch,
        onSuccess: () => {
            setSavedCompanyBranch(isCompanyBranch)
        },
    })

    const paymentMutation = useMutation({
        mutationFn: updateBranchOneTimePayment,
        onSuccess: (_data, variables) => {
            setSavedPaymentAmount(
                String(variables.oneTimePaymentAmount),
            )
        },
    })

    const amount = Number(paymentAmount)

    const isValidAmount =
        paymentAmount.trim() !== "" &&
        Number.isSafeInteger(amount) &&
        amount >= 0

    const paymentChanged =
        paymentStatus !== savedPaymentStatus ||
        paymentAmount !== savedPaymentAmount

    const amountDisabled = paymentStatus !== "unpaid"

    return (
        <div className="grid w-full gap-6">
            {/* Company branch settings */}
            <Card className="w-full overflow-hidden rounded-2xl border shadow-sm">
                <CardHeader className="space-y-3 pb-5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Building2 className="size-5" />
                    </div>

                    <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold tracking-tight">
                            Branch Settings
                        </CardTitle>
                        <CardDescription>
                            Manage your branch configuration
                            and company affiliation.
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
                                    Mark this branch as part
                                    of your company&apos;s
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
                            onCheckedChange={
                                setIsCompanyBranch
                            }
                            disabled={
                                companyMutation.isPending
                            }
                            aria-label="Company's Branch"
                        />
                    </div>

                    {companyMutation.isError && (
                        <p
                            role="alert"
                            className="text-sm text-destructive"
                        >
                            {companyMutation.error
                                .message ||
                                "Failed to update branch settings."}
                        </p>
                    )}

                    {companyMutation.isSuccess && (
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">
                            Branch settings updated
                            successfully.
                        </p>
                    )}

                    <div className="flex items-center justify-between gap-3">
                        <p className="text-xs text-muted-foreground">
                            {companyMutation.isPending
                                ? "Saving changes..."
                                : "Save your changes when ready."}
                        </p>

                        <Button
                            onClick={() =>
                                companyMutation.mutate({
                                    isCompanyBranch,
                                    branchId: branch.id,
                                })
                            }
                            disabled={
                                companyMutation.isPending ||
                                isCompanyBranch ===
                                    savedCompanyBranch
                            }
                            className="min-w-28 gap-2"
                        >
                            {companyMutation.isPending ? (
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

            {/* One-time payment settings */}
            <Card className="w-full overflow-hidden rounded-2xl border shadow-sm">
                <CardHeader className="space-y-3 pb-5">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Wallet className="size-5" />
                    </div>

                    <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold tracking-tight">
                            One-Time Payment
                        </CardTitle>
                        <CardDescription>
                            Configure the branch&apos;s
                            one-time payment amount and
                            payment status.
                        </CardDescription>
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className="space-y-5 pt-6">
                    <Field className="space-y-2">
                        <Label
                            htmlFor="payment-amount"
                            className="text-sm font-medium"
                        >
                            One-Time Payment Amount
                        </Label>

                        <Input
                            id="payment-amount"
                            type="number"
                            min={0}
                            step={1}
                            inputMode="numeric"
                            value={paymentAmount}
                            onChange={(event) =>
                                setPaymentAmount(
                                    event.target.value,
                                )
                            }
                            disabled={
                                amountDisabled ||
                                paymentMutation.isPending
                            }
                            placeholder="Enter amount"
                        />

                        {amountDisabled ? (
                            <p className="text-xs text-muted-foreground">
                                The amount is locked while
                                the payment is{" "}
                                {paymentStatus}.
                            </p>
                        ) : (
                            <p className="text-xs text-muted-foreground">
                                Enter a non-negative
                                whole-number amount.
                            </p>
                        )}
                    </Field>

                    {paymentMutation.isError && (
                        <p
                            role="alert"
                            className="text-sm text-destructive"
                        >
                            {paymentMutation.error
                                .message ||
                                "Failed to update payment settings."}
                        </p>
                    )}

                    {paymentMutation.isSuccess && (
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">
                            One-time payment updated
                            successfully.
                        </p>
                    )}

                    <Separator />

                    <div className="flex items-center justify-between gap-3">
                        <p className="text-xs text-muted-foreground">
                            {paymentMutation.isPending
                                ? "Saving payment settings..."
                                : paymentChanged
                                  ? "You have unsaved changes."
                                  : "Payment settings are up to date."}
                        </p>

                        <Button
                            onClick={() =>
                                paymentMutation.mutate({
                                    branchId: branch.id,
                                    oneTimePaymentAmount:
                                        amount,
                                })
                            }
                            disabled={
                                paymentMutation.isPending ||
                                !paymentChanged ||
                                !isValidAmount
                            }
                            className="min-w-28 gap-2"
                        >
                            {paymentMutation.isPending ? (
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
        </div>
    )
}
