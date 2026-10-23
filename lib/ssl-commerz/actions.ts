import { sslConfig } from "./config"
import {
    SSLCreatePaymentInput,
    SSLCreateSessionResponse,
} from "./types"

export async function createSSLSession(
    input: SSLCreatePaymentInput,
): Promise<SSLCreateSessionResponse> {
    const body = new URLSearchParams()

    // Authentication
    body.append("store_id", sslConfig.storeId)
    body.append("store_passwd", sslConfig.storePassword)

    // Transaction Parameters
    body.append("total_amount", input.amount.toFixed(2))
    body.append("currency", "BDT")
    body.append("tran_id", input.orderId)

    // Redirect URLs (Cleaned up query parameters)
    body.append(
        "success_url",
        `${sslConfig.appUrl}/api/ssl/${input.type}/success`,
    )
    body.append(
        "fail_url",
        `${sslConfig.appUrl}/api/ssl/${input.type}/fail`,
    )
    body.append(
        "cancel_url",
        `${sslConfig.appUrl}/api/ssl/${input.type}/cancel`,
    )

    // Kept for testing local redirects; safe to leave as-is if IPN is skipped in sandbox
    body.append(
        "ipn_url",
        `${sslConfig.appUrl}/payment/ssl/ipn`,
    )

    // Product Information
    body.append("shipping_method", "NO")
    body.append("product_name", "Order")
    body.append("product_category", "General")
    body.append("product_profile", "general")

    // Customer Information (Added fallback for mandatory state)
    body.append("cus_name", input.customerName)
    body.append("cus_email", input.customerEmail)
    body.append("cus_add1", input.address || "N/A")
    body.append("cus_city", input.city)
    body.append("cus_state", input.city || "N/A") // Mandatory field
    body.append("cus_postcode", input.postcode)
    body.append("cus_country", "Bangladesh")
    body.append("cus_phone", input.customerPhone)

    // Shipping Information (Added fallback for mandatory state)
    body.append("ship_name", input.customerName)
    body.append("ship_add1", input.address || "N/A")
    body.append("ship_city", input.city)
    body.append("ship_state", input.city || "N/A") // Mandatory field
    body.append("ship_postcode", input.postcode)
    body.append("ship_country", "Bangladesh")

    const res = await fetch(
        `${sslConfig.baseUrl}/gwprocess/v4/api.php`,
        {
            method: "POST",
            body,
            cache: "no-store",
        },
    )

    const responseText = await res.text()

    console.log("[SSLCommerz initiation]", {
        httpStatus: res.status,
        responsePreview: responseText.slice(0, 1000),
    })

    if (!res.ok) {
        throw new Error(
            `SSLCommerz HTTP ${res.status}: ${responseText.slice(0, 500)}`,
        )
    }

    let data: SSLCreateSessionResponse

    try {
        data = JSON.parse(responseText)
    } catch {
        throw new Error(
            "SSLCommerz returned a non-JSON response.",
        )
    }

    return data
}
