import { z } from "zod"

// 1. Define the validation schema
export const loginSchema = z.object({
    email: z.email().trim().toLowerCase(),

    password: z
        .string()
        .min(8, "Minimum 8 characters required")
        .max(100, "Maximum 100 characters allowed"),
})

// 2. Infer the TypeScript type from the schema
export type LoginSchemaType = z.infer<typeof loginSchema>

export const forgotPasswordSchema = z.object({
    email: z.email().trim().toLowerCase(),
})

export type ForgotPasswordSchemaType = z.infer<
    typeof forgotPasswordSchema
>

export const resetPasswordSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, "Minimum 8 characters required")
            .max(100, "Maximum 100 characters allowed"),
        confirmPassword: z
            .string()
            .min(8, "Minimum 8 characters required")
            .max(100, "Maximum 100 characters allowed"),
    })
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        },
    )

export type ResetPasswordSchemaType = z.infer<
    typeof resetPasswordSchema
>
