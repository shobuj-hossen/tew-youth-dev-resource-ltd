import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { DataTable } from "@/components/table/data-table"

import { applicationsColumns } from "../components/applications-columns"
import { getBranchApplications } from "../queries"

export async function ApplicationsPage() {
    const applications = await getBranchApplications()

    return (
        <Page>
            <PageHeader>
                <PageTitle>Applications</PageTitle>
            </PageHeader>
            <PageContent>
                <DataTable
                    searchBy="branchName"
                    columns={applicationsColumns}
                    data={applications}
                />
            </PageContent>
        </Page>
    )
}
