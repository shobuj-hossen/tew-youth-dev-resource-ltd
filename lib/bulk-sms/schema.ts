import { z } from "zod"

export const sendCustomSMSSchema = z.object({
    phoneNumbers: z
        .array(z.string().trim().min(1))
        .min(1, "Select at least one recipient")
        .max(
            100,
            "You can send to at most 100 recipients at once",
        ),
    message: z
        .string()
        .trim()
        .min(10, "Message must be at least 10 char")
        .max(1000, "Message cannot exceed 1000 characters"),
})
