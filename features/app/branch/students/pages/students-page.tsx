import { DataTable } from "@/components/table/data-table"

import {
    Page,
    PageAction,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { getStudents } from "../queries"
import { studentColumns } from "../components/students/student-columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export async function StudentsPage() {
    const students = await getStudents()
    console.log("sss-===>", students)
    return (
        <Page>
            <PageHeader>
                <PageTitle>Students</PageTitle>
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
                columns={studentColumns}
                data={students}
                searchBy="name"
                searchPlaceholder="Search by Name ..."
            />
        </Page>
    )
}
