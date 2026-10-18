import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { getUserDetailsById } from "../queries"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ShowFullUser } from "../components/show-full-user"
import { ActionsTab } from "../components/actions-tab"
export async function UserDetailsPage({
    id,
}: {
    id: string
}) {
    const data = await getUserDetailsById({ memberId: id })

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/users">
                    User Details
                </PageTitle>
            </PageHeader>
            <PageContent className="max-w-lg m-auto">
                <Tabs defaultValue="details">
                    <TabsList>
                        <TabsTrigger value="details">
                            Details
                        </TabsTrigger>
                        <TabsTrigger value="actions">
                            Actions
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="details">
                        <ShowFullUser data={data} />
                    </TabsContent>
                    <TabsContent value="actions">
                        <ActionsTab data={data} />
                    </TabsContent>
                </Tabs>
            </PageContent>
        </Page>
    )
}
