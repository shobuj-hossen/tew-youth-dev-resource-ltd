"use client"

import { SubmitButton } from "@/components/shared/submit-button"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field } from "@/components/ui/field"
import { useMutation } from "@tanstack/react-query"
import { Dispatch, SetStateAction } from "react"
import { deleteTask } from "../actions"
import { Task } from "../types"

export function DeleteTaskDialog({
    deleteDialogInfo,
    setDeleteDialogInfo,
}: {
    deleteDialogInfo: Task | null
    setDeleteDialogInfo: Dispatch<
        SetStateAction<Task | null>
    >
}) {
    const mutation = useMutation({
        mutationFn: deleteTask,
        onSettled: () => {
            setDeleteDialogInfo(null)
        },
    })

    return (
        <Dialog
            open={!!deleteDialogInfo}
            onOpenChange={(open) => {
                if (!open && !mutation.isPending) {
                    setDeleteDialogInfo(null)
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Are you absolutely sure?
                    </DialogTitle>

                    <DialogDescription>
                        This action cannot be undone. This
                        will permanently delete the task{" "}
                        <span className="font-semibold">
                            {`"${deleteDialogInfo?.title}"`}
                        </span>{" "}
                        from your records.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Field
                        className="justify-end"
                        orientation="horizontal"
                    >
                        <Button
                            onClick={() =>
                                setDeleteDialogInfo(null)
                            }
                            variant="ghost"
                            disabled={mutation.isPending}
                        >
                            Cancel
                        </Button>

                        <SubmitButton
                            disabled={mutation.isPending}
                            isPending={mutation.isPending}
                            onClick={() => {
                                if (deleteDialogInfo) {
                                    mutation.mutate({
                                        id: deleteDialogInfo.id,
                                    })
                                }
                            }}
                            variant="destructive"
                        >
                            Delete Forever
                        </SubmitButton>
                    </Field>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
