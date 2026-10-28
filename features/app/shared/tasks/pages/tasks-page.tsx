import { DataTable } from "@/components/table/data-table"
import { getTasks } from "../queries"

import {
    Page,
    PageAction,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { tasksColumns } from "../components/task-columns"

export async function TasksPage() {
    const tasks = await getTasks()

    return (
        <Page>
            <PageHeader>
                <PageTitle>Tasks</PageTitle>

                <PageAction>
                    <Button
                        nativeButton={false}
                        render={
                            <Link href="/dashboard/tasks/add" />
                        }
                    >
                        <Plus /> Add Task
                    </Button>
                </PageAction>
            </PageHeader>

            <DataTable
                columns={tasksColumns}
                data={tasks}
                searchBy="title"
                searchPlaceholder="Search by Title ..."
            />
        </Page>
    )
}
