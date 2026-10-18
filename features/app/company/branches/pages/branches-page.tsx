import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { DataTable } from "@/components/table/data-table"

import { branchColumns } from "../components/branches-columns"
import { getBranches } from "../queries"

export async function BranchesPage() {
    const branches = await getBranches()

    return (
        <Page>
            <PageHeader>
                <PageTitle>Branches</PageTitle>
            </PageHeader>
            <PageContent>
                <DataTable
                    searchBy="name"
                    columns={branchColumns}
                    data={branches}
                />
            </PageContent>
        </Page>
    )
}
