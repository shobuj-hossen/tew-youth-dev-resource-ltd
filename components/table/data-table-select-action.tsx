"use client"

import type { ReactTable, RowData } from "@tanstack/react-table"
import { Trash2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DataTableFeatures } from "./data-table-features"



export function DataTableSelectAction<TData extends RowData>({
    table,
    BulkActionComponent
}: {
    table: ReactTable<DataTableFeatures, TData>
    BulkActionComponent?: React.ComponentType<{ data: TData[] }>
}) {
    const selectedRows = table.getSelectedRowModel().rows

    if (selectedRows.length === 0 || BulkActionComponent === undefined) {
        return null
    }

    const selectedData = selectedRows.map((row) => row.original)

    return (
        <div
            className={cn(
                "flex items-center gap-2 fixed left-1/2 bottom-2 -translate-x-1/2 z-20 bg-accent border rounded-full p-2",

            )}
        >
            <span className="text-sm text-muted-foreground">
                {selectedRows.length} selected
            </span>

            <Button
                variant="outline"
                size="sm"
                onClick={() => table.resetRowSelection()}
            >
                <X />
                Clear
            </Button>
            <BulkActionComponent data={selectedData} />

        </div>
    )
}