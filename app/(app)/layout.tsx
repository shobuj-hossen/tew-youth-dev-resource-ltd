import { AppLayout } from "@/features/app/layout"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        template: "%s | Acme",
        default: "Dashboard",
    },
}
export default function layout(props: LayoutProps<"/">) {
    return <AppLayout {...props} />
}
