import { sslConfig } from "./config"
import {
    SSLCreatePaymentInput,
    SSLCreateSessionResponse,
} from "./types"

export async function createSSLSession(
    input: SSLCreatePaymentInput,
): Promise<SSLCreateSessionResponse> {
    const body = new URLSearchParams()

    body.append("store_id", sslConfig.storeId)
    body.append("store_passwd", sslConfig.storePassword)

    body.append("total_amount", input.amount.toFixed(2))
    body.append("currency", "BDT")

    body.append("tran_id", input.orderId)

    body.append(
        "success_url",
        `${sslConfig.appUrl}/api/ssl/${input.type}/success?status=success&paymentID=${input.orderId}`,
    )

    body.append(
        "fail_url",
        `${sslConfig.appUrl}/api/ssl/${input.type}/fail`,
    )

    body.append(
        "cancel_url",
        `${sslConfig.appUrl}/api/ssl/${input.type}/cancel`,
    )

    body.append(
        "ipn_url",
        `${sslConfig.appUrl}/payment/ssl/ipn`,
    )

    body.append("shipping_method", "NO")

    body.append("product_name", "Order")

    body.append("product_category", "General")

    body.append("product_profile", "general")

    body.append("cus_name", input.customerName)

    body.append("cus_email", input.customerEmail)

    body.append("cus_add1", input.address)

    body.append("cus_city", input.city)

    body.append("cus_postcode", input.postcode)

    body.append("cus_country", "Bangladesh")

    body.append("cus_phone", input.customerPhone)

    body.append("ship_name", input.customerName)

    body.append("ship_add1", input.address)

    body.append("ship_city", input.city)

    body.append("ship_postcode", input.postcode)

    body.append("ship_country", "Bangladesh")

    const res = await fetch(
        `${sslConfig.baseUrl}/gwprocess/v4/api.php`,
        {
            method: "POST",
            body,
        },
    )

    if (!res.ok) {
        throw new Error(
            "Failed to create SSLCommerz session.",
        )
    }

    return res.json()
}
