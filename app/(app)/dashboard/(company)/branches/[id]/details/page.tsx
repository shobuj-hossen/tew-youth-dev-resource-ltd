import { BranchDetailsPage } from "@/features/app/company/branches/pages/branch-details-page"

export default async function page(
    props: PageProps<"/dashboard/branches/[id]/details">,
) {
    const id = (await props.params).id
    return <BranchDetailsPage id={id} />
}
