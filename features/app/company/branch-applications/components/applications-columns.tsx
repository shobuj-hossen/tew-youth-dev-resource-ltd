"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableFeatures } from "@/components/table/data-table-features"
import { CellNavigateTo } from "@/components/table/cells/cell-navigate-to"
import { createSelectColumn } from "@/components/table/columns/create-select-column"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BranchApplication } from "../types"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    BranchApplication
>()

export const applicationsColumns = columnHelper.columns([
    createSelectColumn<BranchApplication>(),

    columnHelper.accessor("logo", {
        header: "Logo",
        cell: ({ row }) => {
            return (
                <Avatar>
                    <AvatarImage
                        src={row.original.logo?.secureUrl}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )
        },
    }),

    columnHelper.accessor("branchName", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Branch Name"
            />
        ),
    }),

    columnHelper.accessor("ownerName", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Owner Name"
            />
        ),
    }),

    columnHelper.accessor("mobile", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Mobile Number"
            />
        ),
    }),

    columnHelper.accessor("status", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Status"
            />
        ),
        cell: ({ row }) => {
            const status = row.original.status
            return (
                <Badge
                    variant={
                        status === "pending"
                            ? "default"
                            : status === "approved"
                              ? "secondary"
                              : "destructive"
                    }
                >
                    {status}
                </Badge>
            )
        },
    }),

    columnHelper.accessor("createdAt", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Created At"
            />
        ),
        cell: ({ row }) => {
            return (
                <span>
                    {new Date(
                        row.original.createdAt,
                    ).toLocaleDateString()}
                </span>
            )
        },
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
            <CellNavigateTo
                href={`/dashboard/branch-applications/${row.original.id}/details`}
            />
        ),
    }),
])
