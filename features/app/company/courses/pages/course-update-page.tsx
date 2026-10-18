import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { UpdateCourseForm } from "../components/update-course-form"
import { getCourseById } from "../queries"

export async function CourseUpdatePage({
    id,
}: {
    id: string
}) {
    const course = await getCourseById(id)
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/courses">
                    Update Course
                </PageTitle>
            </PageHeader>
            <PageContent>
                <div className="max-w-lg m-auto">
                    <UpdateCourseForm
                        existedValue={{
                            ...course,
                            existingBanner: course.banner,
                            banner: null,
                        }}
                    />
                </div>
            </PageContent>
        </Page>
    )
}
