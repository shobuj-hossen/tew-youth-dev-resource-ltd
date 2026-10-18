"use client"

import {
    type ReactTable,
    type RowData,
} from "@tanstack/react-table"
import { Check, Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { DataTableFeatures } from "./data-table-features"

type AdvancedFilterOption = {
    value: string
    label: string
    count: number
}

type AdvancedFilterGroup = {
    accessorKey: string
    label: string
    options: AdvancedFilterOption[]
}

function formatFilterLabel(value: string) {
    return value
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (character) =>
            character.toUpperCase(),
        )
}

export function DataTableAdvancedFilter<
    TData extends RowData,
>({
    table,
    advancedFilteraccessorKeys,
}: {
    table: ReactTable<DataTableFeatures, TData>
    advancedFilteraccessorKeys?: string[]
}) {
    if (!advancedFilteraccessorKeys?.length) {
        return null
    }

    const filterGroups: AdvancedFilterGroup[] =
        advancedFilteraccessorKeys
            .map((accessorKey) => {
                const column = table.getColumn(accessorKey)

                if (!column) {
                    return null
                }

                const options = Array.from(
                    column
                        .getFacetedUniqueValues()
                        .entries(),
                )
                    .map(([value, count]) => ({
                        value: String(value),
                        label: formatFilterLabel(
                            String(value),
                        ),
                        count,
                    }))
                    .sort((a, b) =>
                        a.label.localeCompare(b.label),
                    )

                return {
                    accessorKey,
                    label:
                        typeof column.columnDef.header ===
                        "string"
                            ? column.columnDef.header
                            : formatFilterLabel(
                                  accessorKey,
                              ),
                    options,
                }
            })
            .filter(
                (group): group is AdvancedFilterGroup =>
                    group !== null,
            )

    const activeFilters = filterGroups.filter(
        ({ accessorKey }) =>
            table
                .getColumn(accessorKey)
                ?.getFilterValue() !== undefined,
    )

    const clearFilters = () => {
        advancedFilteraccessorKeys.forEach(
            (accessorKey) => {
                table
                    .getColumn(accessorKey)
                    ?.setFilterValue(undefined)
            },
        )
    }

    return (
        <Sheet>
            <SheetTrigger
                render={
                    <Button
                        variant="outline"
                        className="ml-auto"
                    >
                        <Filter />
                        Filters
                        {activeFilters.length > 0 && (
                            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                                {activeFilters.length}
                            </span>
                        )}
                    </Button>
                }
            />

            <SheetContent className="flex w-full flex-col sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>
                        Advanced Filters
                    </SheetTitle>
                    <SheetDescription>
                        Refine the table results using the
                        available filter options.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4">
                    <div className="space-y-6">
                        {filterGroups.map(
                            ({
                                accessorKey,
                                label,
                                options,
                            }) => {
                                const column =
                                    table.getColumn(
                                        accessorKey,
                                    )

                                const currentValue =
                                    column?.getFilterValue()

                                const selectedValues =
                                    Array.isArray(
                                        currentValue,
                                    )
                                        ? currentValue.map(
                                              String,
                                          )
                                        : currentValue !==
                                            undefined
                                          ? [
                                                String(
                                                    currentValue,
                                                ),
                                            ]
                                          : []

                                return (
                                    <div
                                        key={accessorKey}
                                        className="space-y-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-sm font-medium">
                                                    {label}
                                                </h3>
                                                <p className="text-xs text-muted-foreground">
                                                    {
                                                        options.length
                                                    }{" "}
                                                    options
                                                </p>
                                            </div>

                                            {selectedValues.length >
                                                0 && (
                                                <button
                                                    type="button"
                                                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                                                    onClick={() =>
                                                        column?.setFilterValue(
                                                            undefined,
                                                        )
                                                    }
                                                >
                                                    Clear
                                                </button>
                                            )}
                                        </div>

                                        <div className="overflow-hidden rounded-lg border">
                                            {options.length ===
                                            0 ? (
                                                <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                                                    No
                                                    options
                                                    available
                                                </div>
                                            ) : (
                                                options.map(
                                                    ({
                                                        value,
                                                        label,
                                                        count,
                                                    }) => {
                                                        const isSelected =
                                                            selectedValues.includes(
                                                                value,
                                                            )

                                                        return (
                                                            <button
                                                                key={
                                                                    value
                                                                }
                                                                type="button"
                                                                onClick={() => {
                                                                    if (
                                                                        isSelected
                                                                    ) {
                                                                        column?.setFilterValue(
                                                                            undefined,
                                                                        )
                                                                    } else {
                                                                        column?.setFilterValue(
                                                                            value,
                                                                        )
                                                                    }
                                                                }}
                                                                className={cn(
                                                                    "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors",
                                                                    "hover:bg-muted/60",
                                                                    "focus-visible:bg-muted focus-visible:outline-none",
                                                                    isSelected &&
                                                                        "bg-muted",
                                                                )}
                                                            >
                                                                <span
                                                                    className={cn(
                                                                        "flex size-4 shrink-0 items-center justify-center rounded-sm border",
                                                                        isSelected &&
                                                                            "border-primary bg-primary text-primary-foreground",
                                                                    )}
                                                                >
                                                                    {isSelected && (
                                                                        <Check className="size-3" />
                                                                    )}
                                                                </span>

                                                                <span className="min-w-0 flex-1 truncate">
                                                                    {
                                                                        label
                                                                    }
                                                                </span>

                                                                <span className="text-xs tabular-nums text-muted-foreground">
                                                                    {
                                                                        count
                                                                    }
                                                                </span>
                                                            </button>
                                                        )
                                                    },
                                                )
                                            )}
                                        </div>
                                    </div>
                                )
                            },
                        )}
                    </div>
                </div>

                <Separator />

                <SheetFooter className="flex-row justify-between">
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        disabled={
                            activeFilters.length === 0
                        }
                    >
                        <X />
                        Clear all
                    </Button>

                    <SheetClose
                        render={
                            <Button>Apply filters</Button>
                        }
                    />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
