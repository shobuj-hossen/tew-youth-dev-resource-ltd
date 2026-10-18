import { JoinAnotherCoursePage } from "@/features/app/branch/students/pages/join-another-course-page"

export default async function page(
    props: PageProps<"/dashboard/unpaid-students/[id]/join-another-course">,
) {
    const id = (await props.params).id
    return (
        <JoinAnotherCoursePage
            backTo="/dashboard/unpaid-students"
            id={id}
        />
    )
}
