import { LoginPage } from "@/features/auth/pages/login-page"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login",
}
export default function page() {
    return <LoginPage />
}
