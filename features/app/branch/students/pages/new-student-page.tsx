import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { getCourseInfo } from "../queries"
import { FullStudentForm } from "../components/new-student/full-student-form"

export async function NewStudentPage() {
    const courses = await getCourseInfo()
    return (
        <div>
            <Page>
                <PageHeader>
                    <PageTitle>Student Form</PageTitle>
                </PageHeader>
                <PageContent>
                    <FullStudentForm
                        courses={courses.map((v) => ({
                            label: v.name,
                            value: v.id,
                        }))}
                    />
                </PageContent>
            </Page>
        </div>
    )
}
