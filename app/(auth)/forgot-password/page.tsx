import ForgotPasswordPage from "@/features/auth/pages/forgot-password-page"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Forgot Password",
}
export default function page() {
    return <ForgotPasswordPage />
}
