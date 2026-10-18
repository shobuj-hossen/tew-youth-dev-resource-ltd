import { CourseUpdatePage } from "@/features/app/company/courses/pages/course-update-page"

export default async function page(
    props: PageProps<"/dashboard/courses/[id]/details">,
) {
    const id = (await props.params).id
    return <CourseUpdatePage id={id} />
}
