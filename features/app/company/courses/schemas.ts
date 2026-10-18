import { courseStatuses } from "@/constants/course"
import { z } from "zod"
import { uploadedFileSchema } from "../../schemas"

// Helper for validating numeric fee strings (e.g., "100", "250.50")
const feeSchema = z
    .number()
    .int("Fee must be a whole number (e.g., in cents)")
    .nonnegative("Fee cannot be negative")
    .min(50, "Amout must 50 or greater")
    .nullable()

export const courseSchema = z.object({
    banner: z.instanceof(File, {
        message: "Banner is required",
    }),
    name: z
        .string()
        .min(1, "Name is required")
        .max(255, "Name must be 255 characters or less"),
    code: z
        .string()
        .min(1, "Code is required")
        .max(100, "Code must be 100 characters or less"),
    status: z.enum(courseStatuses),
    description: z.string().nullable().optional(),

    // Fee fields matching Drizzle's numeric types
    threeMonthsFee: feeSchema,
    sixMonthsFee: feeSchema,
    oneYearFee: feeSchema,
    twoYearsFee: feeSchema,
    threeYearsFee: feeSchema,
    fourYearsFee: feeSchema,
})

export const updateCourseSchema = courseSchema
    .omit({ banner: true })
    .extend({
        banner: z.instanceof(File).nullable().optional(),
        existingBanner: uploadedFileSchema,
    })

export type CourseSchemaType = z.infer<typeof courseSchema>
export type UpdateCourseSchemaType = z.infer<
    typeof updateCourseSchema
>
