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

import { ApplictionActions } from "../components/application-actions"
import { ApplicationDetails } from "../components/application-details"
import { getBranchApplicationById } from "../queries"

export async function ApplicationDetailsPage({
    id,
}: {
    id: string
}) {
    const application = await getBranchApplicationById({
        id,
    })
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/branch-applications">
                    Application Details
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
                        <ApplicationDetails
                            application={application}
                        />
                    </TabsContent>
                    <TabsContent value="actions">
                        <ApplictionActions
                            application={application}
                        />
                    </TabsContent>
                </Tabs>
            </PageContent>
        </Page>
    )
}
