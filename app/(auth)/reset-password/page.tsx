import ResetPasswordPage from "@/features/auth/pages/reset-password-page"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Reset Password",
}
export default function page() {
    return <ResetPasswordPage />
}
