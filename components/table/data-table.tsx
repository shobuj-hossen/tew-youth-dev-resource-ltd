"use client"

import {
    useTable,
    type ColumnDef,
    type ColumnFiltersState,
    type ColumnVisibilityState,
    type RowData,
    type SortingState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import React from "react"
import { DataTableAdvancedFilter } from "./data-table-advanced-filter"
import {
    features,
    type DataTableFeatures,
} from "./data-table-features"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableSelectAction } from "./data-table-select-action"
import { DataTableViewOptions } from "./data-table-view-options"
interface DataTableProps<TData extends RowData> {
    columns: ColumnDef<DataTableFeatures, TData>[]
    data: TData[]
    searchBy?: "name" | "email" | "branchName"
    searchPlaceholder?: string
    BulkActionComponent?: React.ComponentType<{
        data: TData[]
    }>
    advancedFilteraccessorKeys?: string[]
}

export function DataTable<TData extends RowData>({
    columns,
    data,
    searchBy,
    searchPlaceholder,
    BulkActionComponent,
    advancedFilteraccessorKeys,
}: DataTableProps<TData>) {
    const [sorting, setSorting] =
        React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<ColumnVisibilityState>({})

    const [rowSelection, setRowSelection] = React.useState(
        {},
    )

    const table = useTable({
        features,
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,

        state: {
            sorting,
            columnFilters: columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between  gap-2 py-4">
                <Input
                    placeholder={
                        searchPlaceholder || "Search..."
                    }
                    value={
                        (table
                            .getColumn(searchBy || "")
                            ?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(searchBy || "")
                            ?.setFilterValue(
                                event.target.value,
                            )
                    }
                    className="max-w-sm"
                />
                {advancedFilteraccessorKeys && (
                    <DataTableAdvancedFilter
                        table={table}
                        advancedFilteraccessorKeys={
                            advancedFilteraccessorKeys
                        }
                    />
                )}
                <DataTableViewOptions table={table} />
            </div>
            <div className="overflow-hidden  border-y">
                <Table>
                    <TableHeader>
                        {table
                            .getHeaderGroups()
                            .map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                >
                                    {headerGroup.headers.map(
                                        (header) => {
                                            return (
                                                <TableHead
                                                    key={
                                                        header.id
                                                    }
                                                >
                                                    {header.isPlaceholder ? null : (
                                                        <table.FlexRender
                                                            header={
                                                                header
                                                            }
                                                        />
                                                    )}
                                                </TableHead>
                                            )
                                        },
                                    )}
                                </TableRow>
                            ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows
                            ?.length ? (
                            table
                                .getRowModel()
                                .rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() &&
                                            "selected"
                                        }
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell) => (
                                                <TableCell
                                                    key={
                                                        cell.id
                                                    }
                                                >
                                                    <table.FlexRender
                                                        cell={
                                                            cell
                                                        }
                                                    />
                                                </TableCell>
                                            ))}
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className=" py-4">
                <DataTablePagination table={table} />
            </div>
            <DataTableSelectAction
                table={table}
                BulkActionComponent={BulkActionComponent}
            />
        </div>
    )
}
