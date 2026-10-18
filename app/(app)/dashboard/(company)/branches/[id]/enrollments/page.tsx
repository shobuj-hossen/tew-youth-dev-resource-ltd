import { BranchEnrollmentsPage } from "@/features/app/company/branches/pages/branch-enrollments"

export default async function page(
    props: PageProps<"/dashboard/branches/[id]/details">,
) {
    const id = (await props.params).id
    return <BranchEnrollmentsPage id={id} />
}
