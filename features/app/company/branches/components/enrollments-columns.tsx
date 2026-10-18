"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { createSelectColumn } from "@/components/table/columns/create-select-column"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableFeatures } from "@/components/table/data-table-features"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { EnrollmentBranchById } from "../types"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    EnrollmentBranchById
>()

export const enrollmentsColumns = columnHelper.columns([
    createSelectColumn<EnrollmentBranchById>(),
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
    columnHelper.accessor("registrationNumber", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Registration No."
            />
        ),
    }),

    columnHelper.accessor("rollNumber", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Roll No."
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
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Duration"
            />
        ),
    }),
    columnHelper.accessor("courseRange", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Course Range"
            />
        ),
    }),
    columnHelper.accessor("result", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Result"
            />
        ),
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
                            : status === "pending"
                              ? "secondary"
                              : "destructive"
                    }
                >
                    {status}
                </Badge>
            )
        },
    }),
])
