import { ApplicationDetailsPage } from "@/features/app/company/branch-applications/pages/application-details-page"

export default async function page(
    props: PageProps<"/dashboard/branch-applications/[id]/details">,
) {
    const id = (await props.params).id
    return <ApplicationDetailsPage id={id} />
}
