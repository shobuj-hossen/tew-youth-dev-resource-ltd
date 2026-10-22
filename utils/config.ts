import "server-only"
export const company_config = {
    COMPANY_ADMIN_EMAIL: process.env.COMPANY_ADMIN_EMAIL!,
    COMPANY_ORG_SLUG: process.env.COMPANY_ORG_SLUG!,
    COMPANY_NAME: process.env.COMPANY_NAME!,
    COMPANY_ADDRESS: process.env.COMPANY_ADDRESS!,
    COMPANY_PHONE_NUMBER: process.env.COMPANY_PHONE_NUMBER!,
}
