import { DataTable } from "@/components/table/data-table"

import {
    Page,
    PageAction,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { unpaidStudentColumns } from "../components/unpaid-students/unpaid-student-columns"
import { getUnpaidStudents } from "../queries"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export async function UnpaidStudentsPage() {
    const res = await getUnpaidStudents()
    return (
        <Page>
            <PageHeader>
                <PageTitle>Unpaid Students</PageTitle>
                <PageAction>
                    <Button
                        nativeButton={false}
                        render={
                            <Link
                                href={
                                    "/dashboard/new-student"
                                }
                            />
                        }
                    >
                        <Plus /> New Student
                    </Button>
                </PageAction>
            </PageHeader>
            <DataTable
                columns={unpaidStudentColumns}
                data={res}
                searchBy="name"
                searchPlaceholder="Search by Name ..."
            />
        </Page>
    )
}
