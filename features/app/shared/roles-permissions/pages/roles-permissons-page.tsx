import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { ShowRolesPermissions } from "../components/show-roles-permissions"
import { getRolesAndPermissions } from "../queries"

export async function RolesPermissionsPage() {
    const res = await getRolesAndPermissions()

    return (
        <Page>
            <PageHeader>
                <PageTitle>Roles & Permissions</PageTitle>
            </PageHeader>
            <PageContent className="max-w-2xl mx-auto md:bg-card rounded-2xl md:border md:p-6">
                <ShowRolesPermissions {...res} />
            </PageContent>
        </Page>
    )
}
