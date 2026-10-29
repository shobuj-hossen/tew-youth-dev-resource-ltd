type SMSConfig = {
    phoneNumber: string
    message: string
}

export function getSMSUrl({
    phoneNumber,
    message,
}: SMSConfig) {
    const params = new URLSearchParams({
        api_key: process.env.SMS_API_KEY!,
        senderid: process.env.SMS_SENDER_ID!,
        number: phoneNumber,
        message,
        type: "text",
    })

    return `${process.env.SMS_BASE_URL}?${params.toString()}`
}

export async function sendSMS(
    phoneNumber: string,
    message: string,
): Promise<boolean> {
    try {
        const res = await fetch(
            getSMSUrl({ phoneNumber, message }),
        )

        if (!res.ok) {
            throw new Error(
                `SMS provider HTTP ${res.status}`,
            )
        }

        const result = (await res.json()) as {
            response_code: number
        }

        return result.response_code === 202
    } catch {
        throw new Error("SMS sending failed")
    }
}
