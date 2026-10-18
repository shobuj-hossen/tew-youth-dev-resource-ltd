import { StudentDetailsPage } from "@/features/app/branch/students/pages/student-details-page"

export default async function page(
    props: PageProps<"/dashboard/unpaid-students/[id]/details">,
) {
    const id = (await props.params).id
    return (
        <StudentDetailsPage
            backTo="/dashboard/students"
            id={id}
        />
    )
}
