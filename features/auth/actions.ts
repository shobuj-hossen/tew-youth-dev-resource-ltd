"use server"

import { ValidationError } from "@/utils/error-constructor"
import { loginSchema, LoginSchemaType } from "./schemas"
import { auth } from "@/lib/auth"
import {
    forgotPasswordSchema,
    ForgotPasswordSchemaType,
} from "./schemas"
import {
    resetPasswordSchema,
    ResetPasswordSchemaType,
} from "./schemas"
import { headers } from "next/headers"
import { message } from "@/utils/message"

export async function login(value: LoginSchemaType) {
    const { success, data } = loginSchema.safeParse(value)
    if (!success) {
        throw new ValidationError()
    }

    await auth.api.signInEmail({
        body: data,
        headers: await headers(),
    })

    return message("Login Successfull")
}

export async function forgotPassword(
    value: ForgotPasswordSchemaType,
) {
    const { success, data } =
        forgotPasswordSchema.safeParse(value)

    if (!success) {
        throw new ValidationError()
    }

    const res = await auth.api.requestPasswordReset({
        body: {
            email: data.email,
            redirectTo: `${process.env.BETTER_AUTH_URL}/reset-password`,
        },
    })

    return message(res.message)
}

type ResetPasswordInput = ResetPasswordSchemaType & {
    token: string
}

export async function resetPassword(
    value: ResetPasswordInput,
) {
    const { success, data } =
        resetPasswordSchema.safeParse(value)

    if (!success) {
        throw new ValidationError()
    }

    if (!value.token) {
        throw new ValidationError()
    }

    await auth.api.resetPassword({
        body: {
            newPassword: data.newPassword,
            token: value.token,
        },
    })

    return message("Password has been reset")
}
