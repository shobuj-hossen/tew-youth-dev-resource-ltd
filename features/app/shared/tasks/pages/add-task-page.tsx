import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { AddTaskForm } from "../components/add-task-form"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function AddTaskPage() {
    const roles = (
        await auth.api.listOrgRoles({
            headers: await headers(),
        })
    ).map((r) => r.role)
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/tasks">
                    Add Task
                </PageTitle>
            </PageHeader>
            <div className="max-w-lg m-auto">
                <AddTaskForm roles={roles} />
            </div>
        </Page>
    )
}
