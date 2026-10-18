import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { CourseDetails } from "../components/course-details"
import { getCourseById } from "../queries"

export async function CourseDetailsPage({
    id,
}: {
    id: string
}) {
    const course = await getCourseById(id)

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/courses">
                    Course Details
                </PageTitle>
            </PageHeader>
            <PageContent>
                <CourseDetails course={course} />
            </PageContent>
        </Page>
    )
}
