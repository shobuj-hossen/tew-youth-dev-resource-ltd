"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"

import { createSelectColumn } from "@/components/table/columns/create-select-column"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableFeatures } from "@/components/table/data-table-features"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"

import { SubmitButton } from "@/components/shared/submit-button"
import { useMutation } from "@tanstack/react-query"
import { acceptPayment } from "../../actions"
import { UnpaidStudent } from "../../types"
import { DeleteStudentDialog } from "./delete-student-dialog"
import {
    CourseDuration,
    getCourseRangeLabel,
    getDuration,
} from "../../constants"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    UnpaidStudent
>()

export const unpaidStudentColumns = columnHelper.columns([
    createSelectColumn<UnpaidStudent>(),
    columnHelper.accessor("student.image", {
        header: "Image",
        cell: ({ row }) => {
            return (
                <Avatar>
                    <AvatarImage
                        src={
                            row.original.student?.image
                                .secureUrl || ""
                        }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )
        },
    }),

    columnHelper.accessor("student.name", {
        id: "name",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Name"
            />
        ),
    }),

    columnHelper.accessor("course.name", {
        id: "course",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Course"
            />
        ),
    }),
    columnHelper.accessor("courseDuration", {
        header: "Duration",
        cell: ({ row }) => {
            return (
                <Badge variant={"outline"}>
                    {row.original.courseDuration}
                </Badge>
            )
        },
    }),
    columnHelper.accessor("courseRange", {
        header: "Course Range",
        cell: ({ row }) => {
            return (
                <Badge variant={"ghost"}>
                    {row.original.courseRange}
                </Badge>
            )
        },
    }),

    columnHelper.accessor("paymentStatus", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Payment Status"
            />
        ),
        cell: ({ row }) => {
            const status = row.original.paymentStatus

            return (
                <Badge
                    variant={
                        status === "paid"
                            ? "default"
                            : status === "unpaid"
                              ? "secondary"
                              : "ghost"
                    }
                >
                    {status}
                </Badge>
            )
        },
    }),
    columnHelper.display({
        id: "pay",
        cell: ({ row }) => {
            const { isPending, mutate } = useMutation({
                mutationFn: acceptPayment,
            })
            const exampt = row.original.isCompanyBranch

            return (
                <SubmitButton
                    variant={"default"}
                    isPending={isPending}
                    onClick={() =>
                        mutate({
                            enrollmentId: row.original.id,
                            paidAmount: row.original.price,
                        })
                    }
                >
                    {exampt
                        ? "Exampt"
                        : `Pay ${row.original.price} BDT`}
                </SubmitButton>
            )
        },
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter()
            const [deleteDialogInfo, setDeleteDialogInfo] =
                useState<UnpaidStudent | null>(null)

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                />
                            }
                        >
                            <span className="sr-only">
                                Open menu
                            </span>
                            <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>
                                    Actions
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>

                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/unpaid-students/${row.original.id}/details`,
                                        )
                                    }
                                >
                                    Student Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/unpaid-students/${row.original.id}/update-student`,
                                        )
                                    }
                                >
                                    Update Student
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/unpaid-students/${row.original.id}/update-enrollment`,
                                        )
                                    }
                                >
                                    Update enrollment
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/unpaid-students/${row.original.id}/join-another-course`,
                                        )
                                    }
                                >
                                    Join Another Course
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuGroup>
                                <Fragment>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() =>
                                            setDeleteDialogInfo(
                                                row.original,
                                            )
                                        }
                                        variant="destructive"
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </Fragment>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteStudentDialog
                        deleteDialogInfo={deleteDialogInfo}
                        setDeleteDialogInfo={
                            setDeleteDialogInfo
                        }
                    />
                </div>
            )
        },
    }),
])
