"use client"
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
import { deleteCourse } from "../actions"
import { Course } from "../types"
import { SubmitButton } from "@/components/shared/submit-button"
export default function DeleteCourseDialog({
    deleteDialogInfo,
    setDeleteDialogInfo,
}: {
    deleteDialogInfo: Course | null
    setDeleteDialogInfo: Dispatch<
        SetStateAction<Course | null>
    >
}) {
    const mutation = useMutation({
        mutationFn: deleteCourse,
        onSettled: () => {
            setDeleteDialogInfo(null)
        },
    })
    return (
        <Dialog
            open={!!deleteDialogInfo}
            onOpenChange={(v) => {
                if (!v) {
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
                        will permanently delete your course{" "}
                        <span className="font-semibold">{`"${deleteDialogInfo?.name}" `}</span>
                        and remove your data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Field
                        className="justify-end"
                        orientation={"horizontal"}
                    >
                        <Button
                            onClick={() =>
                                setDeleteDialogInfo(null)
                            }
                            variant={"ghost"}
                        >
                            Cancel
                        </Button>
                        <SubmitButton
                            disabled={mutation.isPending}
                            onClick={() =>
                                deleteDialogInfo &&
                                mutation.mutate({
                                    id: deleteDialogInfo.id,
                                    bannerPublicId:
                                        deleteDialogInfo
                                            .banner
                                            .publicId,
                                })
                            }
                            variant={"destructive"}
                        >
                            Delete Forever
                        </SubmitButton>
                    </Field>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
