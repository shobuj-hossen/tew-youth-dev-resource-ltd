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

export interface SSLValidationResponse {
    status: string

    tran_id: string

    val_id: string

    amount: string

    currency: string

    bank_tran_id: string

    card_type: string

    store_amount: string

    verify_sign: string

    verify_key: string

    risk_level: string
}
