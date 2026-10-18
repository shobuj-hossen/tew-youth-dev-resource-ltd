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
    branchDetailsSchema,
    BranchDetailsSchemaType,
} from "../../schemas"

export function BranchDetailsForm({
    onSuccess,
    formId,
    existedValues,
}: {
    onSuccess: (v: BranchDetailsSchemaType) => void
    formId: string
    existedValues: BranchApplicationSchemaType
}) {
    const defaultValues: BranchDetailsSchemaType = {
        ...existedValues,
    }
    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: branchDetailsSchema,
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Branch Information</CardTitle>
                <CardDescription>
                    Enter the basic information and
                    facilities of your branch.
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
                            name="logo"
                            children={(field) => (
                                <field.AvatarField
                                    maxSize={1024 * 1024}
                                    label="Branch Logo"
                                />
                            )}
                        />

                        <form.AppField
                            name="branchName"
                            children={(field) => (
                                <field.TextField
                                    label="Branch Name"
                                    placeholder="Enter the official branch name"
                                />
                            )}
                        />

                        <form.AppField
                            name="mobile"
                            children={(field) => (
                                <field.TextField
                                    label="Contact Number"
                                    placeholder="Enter branch contact number"
                                />
                            )}
                        />

                        <form.AppField
                            name="email"
                            children={(field) => (
                                <field.TextField
                                    label="Email Address"
                                    placeholder="Enter branch email address"
                                />
                            )}
                        />

                        <form.AppField
                            name="age"
                            children={(field) => (
                                <field.NumberField
                                    label="Branch Age"
                                    placeholder="Enter how many years the branch has operated"
                                />
                            )}
                        />

                        <form.AppField
                            name="computerCount"
                            children={(field) => (
                                <field.NumberField
                                    label="Number of Computers"
                                    placeholder="Enter the number of available computers"
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
