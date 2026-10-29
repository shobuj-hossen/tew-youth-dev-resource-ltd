"use client"

import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import {
    Loader2,
    MessageSquareText,
    Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteEnrollmentNote } from "../../actions"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"

export type EnrollmentNoteItem = {
    id: string
    enrollmentId: string
    note: string
    timeStamp: Date | string
}

type EnrollmentNotesListProps = {
    notes: EnrollmentNoteItem[]
    isLoading: boolean
    isError: boolean
    onRefresh: () => Promise<void>
    onRetry: () => void
}

export function EnrollmentNotesList({
    notes,
    isLoading,
    isError,
    onRefresh,
    onRetry,
}: EnrollmentNotesListProps) {
    const qc = getQueryClient()
    const deleteMutation = useMutation({
        mutationFn: deleteEnrollmentNote,
        onSuccess: async () => {
            onRefresh()
        },
    })

    if (isLoading) {
        return (
            <div className="flex min-h-40 items-center justify-center gap-2">
                <Loader2 className="size-5 animate-spin" />
                <span className="text-sm text-muted-foreground">
                    Loading notes...
                </span>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="py-10 text-center">
                <p className="text-sm text-destructive">
                    Failed to load notes.
                </p>
                <div onClick={onRetry}>Try again</div>
            </div>
        )
    }

    if (notes.length === 0) {
        return (
            <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center">
                <MessageSquareText className="mb-3 size-8 text-muted-foreground" />
                <p className="font-medium">No notes yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    Add a note to keep track of important
                    information.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {notes.map((item) => {
                const date = new Date(item.timeStamp)

                return (
                    <article
                        key={item.id}
                        className="rounded-xl border bg-card p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-xs font-medium text-muted-foreground">
                                    {format(
                                        date,
                                        "MMM d, yyyy · h:mm a",
                                    )}
                                </p>
                            </div>

                            <AlertDialog>
                                <AlertDialogTrigger
                                    nativeButton={true}
                                    render={
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="size-8 shrink-0 text-destructive hover:text-destructive"
                                            disabled={
                                                deleteMutation.isPending
                                            }
                                            aria-label="Delete note"
                                        >
                                            {deleteMutation.isPending &&
                                            deleteMutation
                                                .variables
                                                ?.noteId ===
                                                item.id ? (
                                                <Loader2 className="size-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="size-4" />
                                            )}
                                        </Button>
                                    }
                                ></AlertDialogTrigger>

                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Delete this
                                            note?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This note will
                                            be permanently
                                            deleted. This
                                            action cannot be
                                            undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>

                                        <AlertDialogAction
                                            onClick={() =>
                                                deleteMutation.mutate(
                                                    {
                                                        noteId: item.id,
                                                    },
                                                )
                                            }
                                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            Delete note
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>

                        <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-6">
                            {item.note}
                        </p>
                    </article>
                )
            })}
        </div>
    )
}
