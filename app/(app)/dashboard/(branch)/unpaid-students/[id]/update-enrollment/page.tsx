import { UpdateEnrollmentPage } from "@/features/app/branch/students/pages/update-enrollment-page"

export default async function page(
    props: PageProps<"/dashboard/unpaid-students/[id]/update-enrollment">,
) {
    const id = (await props.params).id
    return <UpdateEnrollmentPage id={id} />
}
