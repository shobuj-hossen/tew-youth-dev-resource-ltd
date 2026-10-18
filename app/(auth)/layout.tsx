import { AuthLayout } from "@/features/auth/layout"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        template:
            "%s | The Earn Way Youth Development Resource",
        default: "Auth",
    },
}
export default function layout(props: LayoutProps<"/">) {
    return <AuthLayout {...props} />
}
