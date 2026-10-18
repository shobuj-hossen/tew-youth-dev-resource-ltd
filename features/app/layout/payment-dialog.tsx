"use client"

import { SubmitButton } from "@/components/shared/submit-button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useMutation } from "@tanstack/react-query"
import { Building2, CreditCard } from "lucide-react"
import { useState } from "react"
import { oneTimePayment } from "../actions"

export function PaymentDialog({
    orgId,
    payableAmount,
}: {
    orgId: string
    payableAmount: number
}) {
    const [open, setOpen] = useState(true)

    const { mutate, isPending } = useMutation({
        mutationFn: oneTimePayment,
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <div className="mb-2 flex size-11 items-center justify-center rounded-lg border bg-muted/50">
                        <CreditCard className="size-5 text-muted-foreground" />
                    </div>

                    <AlertDialogTitle className="text-lg">
                        Complete your payment
                    </AlertDialogTitle>

                    <AlertDialogDescription className="leading-relaxed">
                        A payment is required to activate
                        and continue using this branch
                        workspace.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="rounded-lg border bg-muted/30 p-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex size-9 items-center justify-center rounded-md border bg-background">
                                <Building2 className="size-4 text-muted-foreground" />
                            </div>

                            <div>
                                <p className="text-sm font-medium">
                                    Branch workspace
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Registration payment
                                </p>
                            </div>
                        </div>

                        <p className="text-lg font-semibold">
                            ৳
                            {payableAmount.toLocaleString(
                                "en-BD",
                            )}
                        </p>
                    </div>
                </div>

                <AlertDialogFooter className="mt-2">
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isPending}
                        onClick={(event) => {
                            event.preventDefault()
                            mutate({ orgId })
                        }}
                        render={
                            <SubmitButton
                                isPending={isPending}
                            >
                                Proceed to payment
                            </SubmitButton>
                        }
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
