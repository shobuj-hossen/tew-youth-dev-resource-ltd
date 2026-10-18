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

import { BLOOD_GROUPS, GENDER } from "../../constants"
import {
    BranchApplicationSchemaType,
    ownerInfoSchema,
    OwnerInfoSchemaType,
} from "../../schemas"
import { capitalize } from "@/utils/helpers"

export function OwnerInfoForm({
    onSuccess,
    formId,
    existedValues,
}: {
    onSuccess: (v: OwnerInfoSchemaType) => void
    formId: string
    existedValues: BranchApplicationSchemaType
}) {
    const defaultValues: OwnerInfoSchemaType = {
        ...existedValues,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: ownerInfoSchema,
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Owner Information</CardTitle>
                <CardDescription>
                    Provide the personal and identification
                    details of the branch owner.
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
                            name="ownerName"
                            children={(field) => (
                                <field.TextField
                                    label="Full Name"
                                    placeholder="Enter the owner's full name"
                                />
                            )}
                        />

                        <form.AppField
                            name="fatherName"
                            children={(field) => (
                                <field.TextField
                                    label="Father's Name"
                                    placeholder="Enter the owner's father's full name"
                                />
                            )}
                        />

                        <form.AppField
                            name="motherName"
                            children={(field) => (
                                <field.TextField
                                    label="Mother's Name"
                                    placeholder="Enter the owner's mother's full name"
                                />
                            )}
                        />

                        <form.AppField
                            name="nidNumber"
                            children={(field) => (
                                <field.TextField
                                    label="National ID Number"
                                    placeholder="Enter the 10, 13, or 17-digit NID number"
                                />
                            )}
                        />

                        <form.AppField
                            name="bloodGroup"
                            children={(field) => (
                                <field.SelectField
                                    label="Blood Group"
                                    placeholder="Select the blood group"
                                    options={BLOOD_GROUPS.map(
                                        (b) => ({
                                            label: capitalize(
                                                b,
                                            ),
                                            value: b,
                                        }),
                                    )}
                                />
                            )}
                        />

                        <form.AppField
                            name="gender"
                            children={(field) => (
                                <field.SelectField
                                    label="Gender"
                                    placeholder="Select the owner's gender"
                                    options={GENDER.map(
                                        (g) => ({
                                            label: capitalize(
                                                g,
                                            ),
                                            value: g,
                                        }),
                                    )}
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
