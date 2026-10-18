import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { BranchActions } from "../components/branch-actions"
import { BranchDetails } from "../components/branch-details"
import { getBranchById } from "../queries"

export async function BranchDetailsPage({
    id,
}: {
    id: string
}) {
    const branch = await getBranchById({
        id,
    })
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/branches">
                    Branch Details
                </PageTitle>
            </PageHeader>
            <PageContent className="max-w-xl mx-auto">
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
                        <BranchDetails branch={branch} />
                    </TabsContent>
                    <TabsContent value="actions">
                        <BranchActions branch={branch} />
                    </TabsContent>
                </Tabs>
            </PageContent>
        </Page>
    )
}
