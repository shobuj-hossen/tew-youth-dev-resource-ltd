import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { JoinAnotherCourseForm } from "../components/join-another-course/join-another-course-form"
import {
    getCourseInfo,
    getStudentByEnrolledId,
} from "../queries"

export async function JoinAnotherCoursePage({
    backTo,
    id,
}: {
    id: string
    backTo: string
}) {
    const student = await getStudentByEnrolledId({ id })
    const courses = await getCourseInfo()
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo={backTo}>
                    Join New Course
                </PageTitle>
            </PageHeader>
            <PageContent className="max-w-lg mx-auto">
                <JoinAnotherCourseForm
                    backTo={backTo}
                    formId="join-new-course"
                    student={student}
                    courses={courses.map((v) => ({
                        label: v.name,
                        value: v.id,
                    }))}
                />
            </PageContent>
        </Page>
    )
}
