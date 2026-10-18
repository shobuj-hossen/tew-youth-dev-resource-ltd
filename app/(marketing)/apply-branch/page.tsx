import { ApplyBranchPage } from "@/features/marketing/pages/apply-branch-page"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Apply For Branch",
}

export default function page() {
    return <ApplyBranchPage />
}
