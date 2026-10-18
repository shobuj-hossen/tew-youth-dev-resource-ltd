import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import {
    getEnrollmentById,
    getCourseInfo,
} from "../queries"
import { UpdateEnrollmentForm } from "../components/update-enrollment/update-enrollment-form"

export async function UpdateEnrollmentPage({
    id,
}: {
    id: string
}) {
    const existedValues = await getEnrollmentById({
        id,
    })
    const courses = await getCourseInfo()
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/unpaid-students">
                    Update Student
                </PageTitle>
            </PageHeader>
            <PageContent className="max-w-lg mx-auto">
                <UpdateEnrollmentForm
                    enrollmentId={id}
                    courses={courses.map((v) => ({
                        label: v.name,
                        value: v.id,
                    }))}
                    formId="update-course-form"
                    existedValues={existedValues}
                />
            </PageContent>
        </Page>
    )
}
