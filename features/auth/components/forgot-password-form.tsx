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
import { forgotPassword } from "../actions"
import {
    forgotPasswordSchema,
    ForgotPasswordSchemaType,
} from "../schemas"

export function ForgotPasswordForm() {
    const defaultValues: ForgotPasswordSchemaType = {
        email: "",
    }

    const forgotPasswordMutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            form.reset()
        },
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: forgotPasswordSchema,
        },
        onSubmit: async ({ value }) =>
            forgotPasswordMutation.mutate(value),
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                    Enter your email address and we'll send
                    you a password reset link.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id="forgot-password-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="email"
                            children={(field) => (
                                <field.TextField
                                    label="Email Address"
                                    placeholder="Enter your email address"
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
                            forgotPasswordMutation.isPending
                        }
                        form="forgot-password-form"
                    >
                        Send Reset Link
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
