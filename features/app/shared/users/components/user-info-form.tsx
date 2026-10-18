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

import { capitalize } from "@/utils/helpers"
import {
    OrgUserFullSchemaType,
    orgUserSchema,
    OrgUserSchemaType,
} from "../schemas"
import { GENDER } from "@/features/marketing/constants"

export function UserInfoForm({
    onSuccess,
    formId,
    existedValues,
}: {
    onSuccess: (v: OrgUserSchemaType) => void
    formId: string
    existedValues: OrgUserFullSchemaType
}) {
    const defaultValues: OrgUserSchemaType = {
        ...existedValues,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: orgUserSchema,
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Info</CardTitle>
                <CardDescription>
                    Provide the personal and identification
                    details of the user.
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
                            name="profileFile"
                            children={(field) => (
                                <field.AvatarField label="Profile Picture" />
                            )}
                        />

                        <form.AppField
                            name="name"
                            children={(field) => (
                                <field.TextField
                                    label="Full Name"
                                    placeholder="Enter full name"
                                />
                            )}
                        />

                        <form.AppField
                            name="email"
                            children={(field) => (
                                <field.TextField
                                    label="Email Address"
                                    placeholder="Enter email address"
                                />
                            )}
                        />

                        <form.AppField
                            name="password"
                            children={(field) => (
                                <field.TextField
                                    label="Password"
                                    placeholder="Create a secure password"
                                />
                            )}
                        />
                        <form.AppField
                            name="phoneNumber"
                            children={(field) => (
                                <field.TextField
                                    label="Phone Number"
                                    placeholder="Enter Bangladeshi phone number"
                                />
                            )}
                        />

                        <form.AppField
                            name="gender"
                            children={(field) => (
                                <field.SelectField
                                    label="Gender"
                                    placeholder="Select gender"
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
