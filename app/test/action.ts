"use server"

import { createSSLSession } from "@/lib/ssl-commerz/actions"
import { SSLCreatePaymentInput } from "@/lib/ssl-commerz/types"

export interface ActionResponse {
    success: boolean
    url?: string
    error?: string
}

export async function handlePaymentInitiation(
    input: SSLCreatePaymentInput,
): Promise<ActionResponse> {
    try {
        // Trigger your existing SSLCommerz logic securely on the server
        const sessionData = await createSSLSession(input)

        if (
            sessionData.status === "SUCCESS" &&
            sessionData.GatewayPageURL
        ) {
            return {
                success: true,
                url: sessionData.GatewayPageURL,
            }
        }

        return {
            success: false,
            error:
                sessionData.failedreason ||
                "Invalid gateway configurations.",
        }
    } catch (error: any) {
        return {
            success: false,
            error:
                error.message ||
                "An error occurred while generating payment session.",
        }
    }
}
