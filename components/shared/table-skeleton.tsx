import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type TableSkeletonColumn =
    | {
          type: "checkbox"
          width?: string
      }
    | {
          type: "text"
          width?: string
      }
    | {
          type: "avatar"
          width?: string
      }
    | {
          type: "badge"
          width?: string
      }
    | {
          type: "actions"
          width?: string
      }

type TableSkeletonHeaderProps = {
    showSearch?: boolean
    showView?: boolean
    showAdd?: boolean
    searchWidth?: string
}

type TableSkeletonPaginationProps = {
    showPageSize?: boolean
    showPages?: boolean
    pageSizeWidth?: string
}

type TableSkeletonProps = {
    rows?: number
    columns: TableSkeletonColumn[]
    className?: string
    header?: TableSkeletonHeaderProps
    pagination?: TableSkeletonPaginationProps
    rowHeight?: "sm" | "md" | "lg"
}

const ROW_HEIGHT = {
    sm: "h-12",
    md: "h-[70px]",
    lg: "h-20",
}

export function TableSkeleton({
    rows = 5,
    columns,
    className,
    header,
    pagination,
    rowHeight = "md",
}: TableSkeletonProps) {
    return (
        <div className={cn("w-full", className)}>
            <TableSkeletonHeader {...header} />

            <TableSkeletonBody
                rows={rows}
                columns={columns}
                rowHeight={rowHeight}
            />

            <TableSkeletonPagination {...pagination} />
        </div>
    )
}

function SkeletonCell({
    column,
}: {
    column: TableSkeletonColumn
}) {
    if (column.type === "checkbox") {
        return (
            <Skeleton
                className={cn(
                    "size-5 rounded-md",
                    column.width,
                )}
            />
        )
    }

    if (column.type === "avatar") {
        return (
            <div className="flex items-center gap-3">
                <Skeleton className="size-10 shrink-0 rounded-full" />
                <Skeleton
                    className={cn(
                        "h-4",
                        column.width ?? "w-32",
                    )}
                />
            </div>
        )
    }

    if (column.type === "badge") {
        return (
            <Skeleton
                className={cn(
                    "h-6 rounded-full",
                    column.width ?? "w-16",
                )}
            />
        )
    }

    if (column.type === "actions") {
        return (
            <div className="flex justify-end">
                <Skeleton className="size-8 rounded-md" />
            </div>
        )
    }

    return (
        <Skeleton
            className={cn("h-4", column.width ?? "w-32")}
        />
    )
}

function TableSkeletonHeader({
    showSearch = true,
    showView = true,
    showAdd = true,
    searchWidth = "w-[480px]",
}: TableSkeletonHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4 pb-5">
            <div className="flex min-w-0 flex-1 items-center gap-3">
                {showSearch && (
                    <Skeleton
                        className={cn(
                            "h-11 max-w-full rounded-full",
                            searchWidth,
                        )}
                    />
                )}
            </div>

            <div className="flex shrink-0 items-center gap-3">
                {showView && (
                    <Skeleton className="h-10 w-24 rounded-full" />
                )}

                {showAdd && (
                    <Skeleton className="h-10 w-32 rounded-full" />
                )}
            </div>
        </div>
    )
}

function TableSkeletonPagination({
    showPageSize = true,
    showPages = true,
    pageSizeWidth = "w-20",
}: TableSkeletonPaginationProps) {
    return (
        <div className="flex items-center justify-end gap-8 pt-5">
            {showPageSize && (
                <div className="flex items-center gap-2">
                    <Skeleton
                        className={cn(
                            "h-10 rounded-full",
                            pageSizeWidth,
                        )}
                    />
                </div>
            )}

            {showPages && (
                <>
                    <Skeleton className="h-5 w-20" />

                    <div className="flex items-center gap-2">
                        <Skeleton className="size-10 rounded-full" />
                        <Skeleton className="size-10 rounded-full" />
                        <Skeleton className="size-10 rounded-full" />
                        <Skeleton className="size-10 rounded-full" />
                    </div>
                </>
            )}
        </div>
    )
}

function TableSkeletonBody({
    rows,
    columns,
    rowHeight,
}: {
    rows: number
    columns: TableSkeletonColumn[]
    rowHeight: "sm" | "md" | "lg"
}) {
    return (
        <div className="overflow-hidden">
            <div
                className={cn(
                    "grid items-center gap-6 border-y px-4",
                    ROW_HEIGHT[rowHeight],
                )}
                style={{
                    gridTemplateColumns: columns
                        .map((column) => {
                            if (column.width) {
                                return column.width
                            }

                            if (
                                column.type === "checkbox"
                            ) {
                                return "40px"
                            }

                            if (column.type === "avatar") {
                                return "1.5fr"
                            }

                            if (column.type === "actions") {
                                return "60px"
                            }

                            return "1fr"
                        })
                        .join(" "),
                }}
            >
                {columns.map((column, index) => (
                    <Skeleton
                        key={index}
                        className={cn(
                            "h-4",
                            column.type === "checkbox" &&
                                "size-5",
                            column.type === "avatar" &&
                                "h-4",
                            column.type === "actions" &&
                                "h-4",
                        )}
                    />
                ))}
            </div>

            {Array.from({ length: rows }).map(
                (_, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={cn(
                            "grid items-center gap-6 border-b px-4",
                            ROW_HEIGHT[rowHeight],
                        )}
                        style={{
                            gridTemplateColumns: columns
                                .map((column) => {
                                    if (column.width) {
                                        return column.width
                                    }

                                    if (
                                        column.type ===
                                        "checkbox"
                                    ) {
                                        return "40px"
                                    }

                                    if (
                                        column.type ===
                                        "avatar"
                                    ) {
                                        return "1.5fr"
                                    }

                                    if (
                                        column.type ===
                                        "actions"
                                    ) {
                                        return "60px"
                                    }

                                    return "1fr"
                                })
                                .join(" "),
                        }}
                    >
                        {columns.map(
                            (column, columnIndex) => (
                                <SkeletonCell
                                    key={columnIndex}
                                    column={column}
                                />
                            ),
                        )}
                    </div>
                ),
            )}
        </div>
    )
}
