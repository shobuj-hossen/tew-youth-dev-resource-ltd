import { CourseDetailsPage } from "@/features/app/company/courses/pages/course-details-page"

export default async function page(
    props: PageProps<"/dashboard/courses/[id]/details">,
) {
    const id = (await props.params).id
    return <CourseDetailsPage id={id} />
}
