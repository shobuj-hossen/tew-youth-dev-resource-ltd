import { MarketingLayot } from "@/features/marketing/layout"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        template:
            "%s | The Earn Way Youth Development Resource",
        default: "Home",
    },
}
export default function layout(props: LayoutProps<"/">) {
    return <MarketingLayot {...props} />
}
