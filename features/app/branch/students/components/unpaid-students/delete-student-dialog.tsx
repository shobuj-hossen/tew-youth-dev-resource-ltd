"use client"

import { useMutation } from "@tanstack/react-query"
import { Trash2 } from "lucide-react"
import { Dispatch, SetStateAction } from "react"

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
import { deleteStudent } from "../../actions"
import { UnpaidStudent } from "../../types"

export function DeleteStudentDialog({
    deleteDialogInfo,
    setDeleteDialogInfo,
}: {
    deleteDialogInfo: UnpaidStudent | null
    setDeleteDialogInfo: Dispatch<
        SetStateAction<UnpaidStudent | null>
    >
}) {
    const mutation = useMutation({
        mutationFn: deleteStudent,
        onSuccess: () => {
            setDeleteDialogInfo(null)
        },
    })

    const open = !!deleteDialogInfo

    function handleDelete() {
        if (
            !deleteDialogInfo?.id ||
            !deleteDialogInfo.student
        )
            return

        mutation.mutate({
            enrollmentId: deleteDialogInfo.id,
            studentId: deleteDialogInfo.student?.id,
        })
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={(open) => {
                if (!open && !mutation.isPending) {
                    setDeleteDialogInfo(null)
                }
            }}
        >
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                        <Trash2 className="size-5" />
                    </div>

                    <AlertDialogTitle>
                        Remove enrollment?
                    </AlertDialogTitle>

                    <AlertDialogDescription
                        render={
                            <div className="space-y-3">
                                <p>
                                    Are you sure you want to
                                    remove the enrollment
                                    for{" "}
                                    <span className="font-medium text-foreground">
                                        {
                                            deleteDialogInfo
                                                ?.student
                                                ?.name
                                        }
                                    </span>
                                    ?
                                </p>

                                <div className="rounded-lg border bg-muted/50 p-3 text-sm">
                                    <p className="font-medium text-foreground">
                                        What happens next?
                                    </p>
                                    <p className="text-muted-foreground mt-1">
                                        This enrollment and
                                        its associated
                                        information will be
                                        permanently removed.
                                        If this is the
                                        student&apos;s only
                                        enrollment, the
                                        student record may
                                        also be removed.
                                    </p>
                                </div>

                                <p className="text-muted-foreground text-xs">
                                    This action cannot be
                                    undone.
                                </p>
                            </div>
                        }
                    ></AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={mutation.isPending}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        render={
                            <SubmitButton
                                variant="destructive"
                                isPending={
                                    mutation.isPending
                                }
                                onClick={() => {
                                    handleDelete()
                                }}
                            >
                                Remove enrollment
                            </SubmitButton>
                        }
                    />
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
