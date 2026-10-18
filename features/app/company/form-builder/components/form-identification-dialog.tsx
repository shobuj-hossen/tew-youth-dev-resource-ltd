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
import { FormDefinition } from "@/types/form"
import React, { useState } from "react"
import {
    formDefinitionSchema,
    FormDefinitionSchemaType,
} from "../schemas/form"

export function FormIdentificationDialog({
    children,
    defaultValues,
    updateForm,
}: {
    children: React.ReactNode
    defaultValues: FormDefinition
    updateForm: (
        versionId: number,
        updates: Partial<FormDefinition>,
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
                <FormIdentificationForm
                    onClose={() => setOpen(false)}
                    updateForm={updateForm}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    )
}

function FormIdentificationForm({
    defaultValues: dv,
    updateForm,
    onClose,
}: {
    defaultValues: FormDefinitionSchemaType
    updateForm: (
        versionId: number,
        updates: Partial<FormDefinition>,
    ) => void
    onClose: () => void
}) {
    const defaultValues: FormDefinitionSchemaType = dv
    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: formDefinitionSchema,
        },
        onSubmit: async ({ value }) => {
            updateForm(value.version, value)

            onClose()
        },
    })

    return (
        <div className="space-y-6">
            <form
                id="form-form"
                onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit()
                }}
                className="max-h-[70vh] overflow-y-auto p-1"
            >
                <FieldGroup>
                    <form.AppField
                        name="name"
                        children={(field) => (
                            <field.TextField
                                label="Form Name"
                                placeholder="eg. Apply Student/Apply Branch"
                            />
                        )}
                    />
                    <form.AppField
                        name="description"
                        children={(field) => (
                            <field.TextField
                                label="Form Description"
                                placeholder="eg. This form is designed to collect student info"
                            />
                        )}
                    />
                    <form.AppField
                        name="settings.submitLabel"
                        children={(field) => (
                            <field.TextField
                                label="Submit Button Label"
                                placeholder="eg. Submit/Confirm "
                            />
                        )}
                    />{" "}
                    <form.AppField
                        name="settings.successMessage"
                        children={(field) => (
                            <field.TextareaField
                                label="Submit Button Message"
                                placeholder="eg. Form has submitted successfully "
                            />
                        )}
                    />
                    <form.AppField
                        name="settings.redirectUrl"
                        children={(field) => (
                            <field.TextareaField
                                label="Redirect To (optional)"
                                placeholder="eg. https://www.domain.com/success "
                            />
                        )}
                    />
                </FieldGroup>
            </form>
            <form.Subscribe
                selector={(state) => state.isSubmitting}
                children={(isSubmitting) => (
                    <Button
                        type="submit"
                        form={"form-form"}
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>
                )}
            />
        </div>
    )
}
