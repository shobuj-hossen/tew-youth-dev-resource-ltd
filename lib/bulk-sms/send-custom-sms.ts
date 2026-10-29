"use server"
import z from "zod"
import { withPermission } from "../dal"
import { sendCustomSMSSchema } from "./schema"
import { sendSMS } from "./config"

export const sendCustomSMS = withPermission(
    { students: ["update"] },
    async (
        _context,
        input: z.infer<typeof sendCustomSMSSchema>,
    ) => {
        const parsed = sendCustomSMSSchema.safeParse(input)

        if (!parsed.success) {
            throw new Error(
                parsed.error.issues[0]?.message ??
                    "Invalid SMS input",
            )
        }

        const { message, phoneNumbers } = parsed.data
        const uniqueNumbers = [
            ...new Set(phoneNumbers),
        ].join(",")

        await sendSMS(uniqueNumbers, message)
        return { message: "SMS has sent." }
    },
)
