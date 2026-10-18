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
import { authClient } from "@/lib/auth-client"
import { useMutation } from "@tanstack/react-query"
import { Building2 } from "lucide-react"
import { useState } from "react"

export function ContinueWorkspaceDialog({
    orgId,
}: {
    orgId: string
}) {
    const [open, setOpen] = useState(true)

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            const { error } =
                await authClient.organization.setActive({
                    organizationId: orgId,
                })

            if (error) {
                throw new Error(
                    error.message ||
                        "Failed to switch workspace",
                )
            }
        },
        onSuccess: () => {
            setOpen(false)
            window.location.reload()
        },
    })

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <div className="mb-2 flex size-11 items-center justify-center rounded-lg border bg-muted/50">
                        <Building2 className="size-5 text-muted-foreground" />
                    </div>

                    <AlertDialogTitle className="text-lg">
                        Continue to this workspace?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="leading-relaxed">
                        Youre about to continue to this
                        workspace. Your permissions,
                        navigation, and workspace data will
                        be based on this organization.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-2">
                    <AlertDialogCancel disabled={isPending}>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isPending}
                        onClick={(event) => {
                            event.preventDefault()
                            mutate()
                        }}
                        render={
                            <SubmitButton
                                isPending={isPending}
                            >
                                Continue to workspace
                            </SubmitButton>
                        }
                    ></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
