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
    BranchApplicationSchemaType,
    documentsSchema,
    DocumentsSchemaType,
} from "../../schemas"

export function DocumentsForm({
    onSuccess,
    formId,
    existedValues,
}: {
    onSuccess: (v: DocumentsSchemaType) => void
    formId: string
    existedValues: BranchApplicationSchemaType
}) {
    const defaultValues: DocumentsSchemaType = {
        ...existedValues,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: documentsSchema,
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                    Upload the required documents in PDF
                    format. Each file must not exceed 5MB.
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
                            name="electricityBill"
                            children={(field) => (
                                <field.FileField
                                    label="Electricity Bill"
                                    accept={{
                                        "application/pdf": [
                                            ".pdf",
                                        ],
                                        "image/jpeg": [
                                            ".jpeg",
                                            ".jpg",
                                        ],
                                    }}
                                    description="Upload a recent electricity bill"
                                    maxSize={
                                        1 * 1024 * 1024
                                    }
                                />
                            )}
                        />

                        <form.AppField
                            name="nidDocument"
                            children={(field) => (
                                <field.FileField
                                    label="National ID Document"
                                    accept={{
                                        "application/pdf": [
                                            ".pdf",
                                        ],
                                        "image/jpeg": [
                                            ".jpeg",
                                            ".jpg",
                                        ],
                                    }}
                                    description="Upload the owner's NID document"

                                    maxSize={
                                        1 * 1024 * 1024
                                    }
                                />
                            )}
                        />

                        <form.AppField
                            name="tradeLicense"
                            children={(field) => (
                                <field.FileField
                                    label="Trade License"
                                    accept={{
                                        "application/pdf": [
                                            ".pdf",
                                        ],
                                        "image/jpeg": [
                                            ".jpeg",
                                            ".jpg",
                                        ],
                                    }}
                                    description="Upload a valid trade license"
                                    maxSize={
                                        1 * 1024 * 1024
                                    }
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
