"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { DataTableFeatures } from "@/components/table/data-table-features"

import { CellNavigateTo } from "@/components/table/cells/cell-navigate-to"
import { createSelectColumn } from "@/components/table/columns/create-select-column"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { OrgUser } from "../types"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<
    DataTableFeatures,
    OrgUser
>()

export const columns = columnHelper.columns([
    createSelectColumn<OrgUser>(),
    columnHelper.accessor("user.name", {
        id: "name",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Name"
            />
        ),
    }),
    columnHelper.accessor("user.email", {
        id: "email",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Email"
            />
        ),
    }),

    columnHelper.accessor("role", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Role"
            />
        ),

        cell: ({ row }) => (
            <Badge variant={"secondary"}>
                {row.original.role}
            </Badge>
        ),
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            return (
                <CellNavigateTo
                    href={`/dashboard/users/${row.original.id}/details`}
                />
            )
        },
    }),
])
