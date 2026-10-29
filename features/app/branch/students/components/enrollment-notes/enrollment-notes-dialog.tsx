"use client"

import {
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"
import { MessageSquareText, Plus } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { getEnrollmentNotes } from "../../actions"
import { EnrollmentNotesList } from "./enrollment-note-lists"
import { EnrollmentNoteForm } from "./enrollment-notes-form"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"

type EnrollmentNotesDialogProps = {
    enrollmentId: string
    setEnrollmentId: (v: string) => void
}

export function EnrollmentNotesDialog({
    enrollmentId,

    setEnrollmentId,
}: EnrollmentNotesDialogProps) {
    const queryClient = getQueryClient()

    const queryKey = [
        "enrollment-notes",
        enrollmentId,
    ] as const

    const {
        data: notes = [],
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey,
        queryFn: () => getEnrollmentNotes({ enrollmentId }),
        enabled: !!enrollmentId && Boolean(enrollmentId),
    })

    async function refreshNotes() {
        await queryClient.invalidateQueries({
            queryKey,
        })
    }

    return (
        <Dialog
            open={!!enrollmentId}
            onOpenChange={(state) => {
                if (!state) {
                    setEnrollmentId("")
                }
            }}
        >
            <DialogContent className="flex max-h-[85dvh] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
                <DialogHeader className="border-b p-6">
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquareText className="size-5" />
                        Enrollment notes
                    </DialogTitle>
                    <DialogDescription>
                        Add notes and review the history for
                        this enrollment.
                    </DialogDescription>
                </DialogHeader>

                <Tabs
                    defaultValue="view"
                    className="flex min-h-0 flex-1 flex-col overflow-hidden"
                >
                    <div className="border-b px-6 py-3">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="view">
                                <MessageSquareText className="mr-2 size-4" />
                                View notes
                            </TabsTrigger>

                            <TabsTrigger value="add">
                                <Plus className="mr-2 size-4" />
                                Add note
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent
                        value="view"
                        className="mt-0 min-h-0 flex-1 overflow-y-auto p-6"
                    >
                        <EnrollmentNotesList
                            notes={notes}
                            isLoading={isLoading}
                            isError={isError}
                            onRefresh={refreshNotes}
                            onRetry={() => {
                                void refetch()
                            }}
                        />
                    </TabsContent>

                    <TabsContent
                        value="add"
                        className="mt-0 min-h-0 flex-1 overflow-y-auto p-6"
                    >
                        <EnrollmentNoteForm
                            enrollmentId={enrollmentId}
                            onCreated={refreshNotes}
                            onRefresh={refreshNotes}
                        />
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
