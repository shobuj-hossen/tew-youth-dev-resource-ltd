import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { DataTable } from "@/components/table/data-table"
import { enrollmentsColumns } from "../components/enrollments-columns"
import { getEnrollmentsBranchId } from "../queries"
import { SelectedEnrollmentsAction } from "../components/selected-enrollments-action"

export async function BranchEnrollmentsPage({
    id,
}: {
    id: string
}) {
    const enrollments = await getEnrollmentsBranchId({ id })
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/branches">
                    Enrollments ({enrollments.length})
                </PageTitle>
            </PageHeader>
            <PageContent>
                <DataTable
                    searchBy="name"
                    columns={enrollmentsColumns}
                    data={enrollments}
                    BulkActionComponent={
                        SelectedEnrollmentsAction
                    }
                    advancedFilteraccessorKeys={[
                        "course",
                        "courseDuration",
                        "courseRange",
                    ]}
                />
            </PageContent>
        </Page>
    )
}
