import { DataTable } from "@/components/table/data-table"
import { getCourses } from "../queries"

import {
    Page,
    PageAction,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { coursesColumns } from "../components/courses-columns"
import { SelectedBulkAction } from "../components/selected-bulk-actions"

export async function CoursesPage() {
    const courses = await getCourses()
    return (
        <div>
            {" "}
            <Page>
                <PageHeader>
                    <PageTitle>Courses</PageTitle>

                    <PageAction>
                        <Button
                            nativeButton={false}
                            render={
                                <Link
                                    href={
                                        "/dashboard/courses/add"
                                    }
                                />
                            }
                        >
                            <Plus /> Add Course
                        </Button>
                    </PageAction>
                </PageHeader>
                <DataTable
                    BulkActionComponent={SelectedBulkAction}
                    columns={coursesColumns}
                    data={courses}
                    searchBy="name"
                    searchPlaceholder="Search by Name ..."
                />
            </Page>
        </div>
    )
}
