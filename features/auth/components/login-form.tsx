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
import { useRouter } from "next/navigation"
import { login } from "../actions"
import { loginSchema, LoginSchemaType } from "../schemas"

export function LoginForm() {
    const router = useRouter()
    const defaultValues: LoginSchemaType = {
        email: "",
        password: "",
    }

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: () => {
            router.push("/dashboard/overviews")
        },
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: loginSchema,
        },
        onSubmit: async ({ value }) =>
            loginMutation.mutate(value),
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Enter your credentials to login in
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="login-form"
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
                        <form.AppField
                            name="password"
                            children={(field) => (
                                <field.PasswordField
                                    label="Password"
                                    placeholder="Enter your password"
                                    forgotPasswordHref="/forgot-password"
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field>
                    <SubmitButton
                        isPending={loginMutation.isPending}
                        form="login-form"
                    >
                        Submit
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
