"use client"

import { useAppForm } from "@/components/form/use-app-form"
import { SubmitButton } from "@/components/shared/submit-button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup } from "@/components/ui/field"
import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { resetPassword } from "../actions"
import {
    resetPasswordSchema,
    ResetPasswordSchemaType,
} from "../schemas"

export function ResetPasswordForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const defaultValues: ResetPasswordSchemaType = {
        newPassword: "",
        confirmPassword: "",
    }

    const resetPasswordMutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            router.push("/login")
        },
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: resetPasswordSchema,
        },
        onSubmit: async ({ value }) => {
            if (!token) {
                return
            }

            resetPasswordMutation.mutate({
                ...value,
                token,
            })
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                    Enter your new password below.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="reset-password-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="newPassword"
                            children={(field) => (
                                <field.PasswordField
                                    label="New Password"
                                    placeholder="Enter your new password"
                                />
                            )}
                        />

                        <form.AppField
                            name="confirmPassword"
                            children={(field) => (
                                <field.PasswordField
                                    label="Confirm Password"
                                    placeholder="Confirm your new password"
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Field>
                    <SubmitButton
                        isPending={
                            resetPasswordMutation.isPending
                        }
                        form="reset-password-form"
                        disabled={!token}
                    >
                        Reset Password
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
