"use client"

import { useAppForm } from "@/components/form/use-app-form"
import { SubmitButton } from "@/components/shared/submit-button"
import { Field, FieldGroup } from "@/components/ui/field"
import {
    QueryClient,
    useMutation,
} from "@tanstack/react-query"
import {
    createEnrollmentNoteFormSchema,
    EnrollmentNoteFormValues,
} from "../../schemas"
import { addEnrollmentNote } from "../../actions"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"

type EnrollmentNoteFormProps = {
    enrollmentId: string
    onCreated: () => Promise<void>
    onRefresh: () => Promise<void>
}

export function EnrollmentNoteForm({
    enrollmentId,
    onCreated,
    onRefresh,
}: EnrollmentNoteFormProps) {
    const defaultValues: EnrollmentNoteFormValues = {
        enrollmentId,
        note: "",
        timeStamp: new Date(),
    }
    const qc = getQueryClient()
    const addMutation = useMutation({
        mutationFn: addEnrollmentNote,
        onSuccess: async () => {
            onRefresh()
            form.reset()
            await onCreated()
        },
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: createEnrollmentNoteFormSchema,
        },
        onSubmit: async ({ value }) => {
            addMutation.mutate({
                enrollmentId: value.enrollmentId,
                note: value.note,
                timeStamp: new Date(value.timeStamp),
            })
        },
    })

    return (
        <form
            id="enrollment-note-form"
            onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                form.handleSubmit()
            }}
        >
            <FieldGroup>
                <form.AppField
                    name="note"
                    children={(field) => (
                        <field.TextareaField
                            label="Note"
                            placeholder="Write your note here..."
                        />
                    )}
                />

                <Field>
                    <form.AppField
                        name="timeStamp"
                        children={(field) => (
                            <field.DatePickerField label="Note date and time" />
                        )}
                    />
                    <p className="text-sm text-muted-foreground">
                        Choose when this note should be
                        recorded.
                    </p>
                </Field>
            </FieldGroup>

            <div className="mt-5 flex justify-end">
                <SubmitButton
                    form="enrollment-note-form"
                    type="submit"
                    isPending={addMutation.isPending}
                >
                    Add note
                </SubmitButton>
            </div>
        </form>
    )
}
