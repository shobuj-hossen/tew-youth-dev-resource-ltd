import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { UpdateStudentForm } from "../components/update-student/update-student-form"
import { getStudentByEnrolledId } from "../queries"

export async function UpdateStudentPage({
    id,
    backTo,
}: {
    id: string
    backTo: string
}) {
    const student = await getStudentByEnrolledId({ id })
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo={backTo}>
                    Update Student
                </PageTitle>
            </PageHeader>
            <PageContent>
                <UpdateStudentForm
                    backTo={backTo}
                    enrollmentId={id}
                    student={student}
                />
            </PageContent>
        </Page>
    )
}
