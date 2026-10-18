import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { AddCourseForm } from "../components/add-course-form"

export function AddCoursePage() {
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/courses">
                    Add Course
                </PageTitle>
            </PageHeader>
            <div className="max-w-lg m-auto">
                <AddCourseForm />
            </div>
        </Page>
    )
}
