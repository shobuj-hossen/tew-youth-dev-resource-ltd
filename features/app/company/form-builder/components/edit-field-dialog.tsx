"use client"
import { useAppForm } from "@/components/form/use-app-form"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"
import { FormField } from "@/types/form"
import React, { useState } from "react"
import {
    formFieldSchema,
    FormFieldSchemaType,
} from "../schemas/form"

export function EditFieldDialog({
    children,
    defaultValues,
    updateField,
}: {
    children: React.ReactNode
    defaultValues: FormField
    updateField: (
        fieldId: string,
        updates: Partial<FormField>,
    ) => void
}) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                nativeButton={false}
                render={<span>{children}</span>}
            />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Field Form</DialogTitle>
                    <DialogDescription>
                        Edit this field as you like.
                    </DialogDescription>
                </DialogHeader>
                <EditFieldForm
                    onClose={() => setOpen(false)}
                    updateField={updateField}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    )
}

function EditFieldForm({
    defaultValues: dv,
    updateField,
    onClose,
}: {
    defaultValues: FormField
    updateField: (
        fieldId: string,
        updates: Partial<FormField>,
    ) => void
    onClose: () => void
}) {
    const defaultValues: FormFieldSchemaType = dv
    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: formFieldSchema,
        },
        onSubmit: async ({ value }) => {
            updateField(value.id, value)

            onClose()
        },
    })

    return (
        <div className="space-y-6">
            <form
                id="field-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit()
                }}
            >
                <FieldGroup>
                    <form.AppField
                        name="name"
                        children={(field) => (
                            <field.TextField
                                label="Name"
                                placeholder="Enter your field name"
                            />
                        )}
                    />
                    <form.AppField
                        name="placeholder"
                        children={(field) => (
                            <field.TextField
                                label="Placeholder"
                                placeholder="Enter your placeholder "
                            />
                        )}
                    />
                    <form.AppField
                        name="description"
                        children={(field) => (
                            <field.TextareaField
                                label="Description"
                                placeholder="Enter the field's description "
                            />
                        )}
                    />
                </FieldGroup>
            </form>
            <form.Subscribe
                selector={(state) => state.isSubmitting}
                children={(isSubmitting) => (
                    <Button
                        variant={"secondary"}
                        type="submit"
                        form={"field-form"}
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>
                )}
            />
        </div>
    )
}
