export interface SSLCreatePaymentInput {
    orderId: string
    amount: number

    customerName: string
    customerEmail: string
    customerPhone: string

    address: string
    city: string
    postcode: string
    type: "branch" | "student"
}

export interface SSLCreateSessionResponse {
    status: string

    failedreason?: string

    GatewayPageURL: string

    sessionkey: string

    storeBanner?: string

    redirectGatewayURL?: string

    directPaymentURLBank?: string

    directPaymentURLCard?: string

    directPaymentURL?: string
}

export interface SSLCommerzPaymentPayload {
    tran_id: string
    val_id: string
    amount: string // Decimal string (e.g., '2500.00')
    card_type: string
    store_amount: string // Decimal string
    card_no: string
    bank_tran_id: string
    status: "VALID" | "FAILED" | "CANCELLED" | "UNATTEMPTED" // Strongly typed status
    tran_date: string // YYYY-MM-DD HH:mm:ss
    error: string
    currency: "BDT" | string
    card_issuer: string
    card_brand: string
    card_sub_brand: string
    card_issuer_country: string
    card_issuer_country_code: string
    store_id: string
    verify_sign: string
    verify_key: string
    verify_sign_sha2: string
    currency_type: string
    currency_amount: string
    currency_rate: string
    base_fair: string
    value_a: string // Custom parameters
    value_b: string
    value_c: string
    value_d: string
    subscription_id: string
    risk_level: string // '0' for safe
    risk_title: string
}
