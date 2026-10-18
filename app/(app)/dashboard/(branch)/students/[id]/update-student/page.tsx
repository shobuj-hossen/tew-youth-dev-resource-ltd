import { UpdateStudentPage } from "@/features/app/branch/students/pages/update-student-page"

export default async function page(
    props: PageProps<"/dashboard/students/[id]/update-student">,
) {
    const id = (await props.params).id
    return (
        <UpdateStudentPage
            backTo="/dashboard/students"
            id={id}
        />
    )
}
