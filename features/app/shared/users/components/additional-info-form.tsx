"use client"

import { useAppForm } from "@/components/form/use-app-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"

import {
    orgUserAdditionalSchema,
    OrgUserAdditionalSchemaType,
    OrgUserFullSchemaType,
} from "../schemas"

export function AdditionalInfoForm({
    onSuccess,
    formId,
    existedValues,
}: {
    onSuccess: (v: OrgUserAdditionalSchemaType) => void
    formId: string
    existedValues: OrgUserFullSchemaType
}) {
    const defaultValues: OrgUserAdditionalSchemaType = {
        ...existedValues,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: orgUserAdditionalSchema,
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Additional Info</CardTitle>
                <CardDescription>
                    Provide additional details.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id={formId}
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="fatherName"
                            children={(field) => (
                                <field.TextField
                                    label="Father Name"
                                    placeholder="Enter father name"
                                />
                            )}
                        />
                        <form.AppField
                            name="motherName"
                            children={(field) => (
                                <field.TextField
                                    label="Mother Name"
                                    placeholder="Enter mother name"
                                />
                            )}
                        />
                        <form.AppField
                            name="address"
                            children={(field) => (
                                <field.TextareaField
                                    label="Address (optional)"
                                    placeholder="Enter address"
                                />
                            )}
                        />
                        <form.AppField
                            name="qualification"
                            children={(field) => (
                                <field.TextareaField
                                    label="Qualification (optional)"
                                    placeholder="Enter Qualification"
                                />
                            )}
                        />
                        <form.AppField
                            name="cvFile"
                            children={(field) => (
                                <field.FileField label="CV (optional)" />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
