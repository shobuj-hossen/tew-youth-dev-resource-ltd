"use client"

import { useRouter } from "next/navigation"
import { createColumnHelper } from "@tanstack/react-table"
import {
    Check,
    Eye,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"

import { createSelectColumn } from "@/components/table/columns/create-select-column"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableFeatures } from "@/components/table/data-table-features"
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

import { changeTaskStatus } from "../actions"
import { Task } from "../types"
import { DeleteTaskDialog } from "./delete-task-dialog"
import TaskDetailDialog from "./task-details"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    Task
>()

function TaskActions({ task }: { task: Task }) {
    const router = useRouter()

    const [deleteDialogInfo, setDeleteDialogInfo] =
        useState<Task | null>(null)

    const [taskDetail, setTaskDetail] =
        useState<Task | null>(null)

    const mutation = useMutation({
        mutationFn: changeTaskStatus,
    })

    const isCompleted = Boolean(task.isCompleted)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
                            aria-label={`Actions for ${task.title}`}
                        />
                    }
                >
                    <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-52"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
                            Task actions
                        </DropdownMenuLabel>

                        <DropdownMenuItem
                            onClick={() =>
                                setTaskDetail(task)
                            }
                        >
                            <Eye className="mr-2 size-4 text-muted-foreground" />
                            View details
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            closeOnClick={false}
                            disabled={mutation.isPending}
                            onClick={() =>
                                mutation.mutate({
                                    id: task.id,
                                    isCompleted:
                                        !isCompleted,
                                })
                            }
                        >
                            <Check className="mr-2 size-4 text-muted-foreground" />
                            {isCompleted
                                ? "Mark as pending"
                                : "Mark as completed"}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            variant="destructive"
                            onClick={() =>
                                setDeleteDialogInfo(task)
                            }
                        >
                            <Trash2 className="mr-2 size-4" />
                            Delete task
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteTaskDialog
                deleteDialogInfo={deleteDialogInfo}
                setDeleteDialogInfo={setDeleteDialogInfo}
            />

            <TaskDetailDialog
                task={taskDetail}
                setTask={setTaskDetail}
            />
        </>
    )
}

export const tasksColumns = columnHelper.columns([
    createSelectColumn<Task>(),

    columnHelper.accessor("title", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Title"
            />
        ),
        cell: ({ row }) => (
            <span className="font-medium">
                {row.original.title}
            </span>
        ),
    }),

    columnHelper.accessor("category", {
        header: "Category",
        cell: ({ row }) => (
            <Badge variant="secondary">
                {row.original.category}
            </Badge>
        ),
    }),

    columnHelper.accessor("dueDate", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Due Date"
            />
        ),
        cell: ({ row }) =>
            new Date(
                row.original.dueDate,
            ).toLocaleDateString(),
    }),

    columnHelper.accessor("isCompleted", {
        header: "Status",
        cell: ({ row }) => (
            <Badge
                variant={
                    row.original.isCompleted
                        ? "default"
                        : "secondary"
                }
                className="gap-1"
            >
                {row.original.isCompleted && (
                    <Check className="size-3" />
                )}
                {row.original.isCompleted
                    ? "Completed"
                    : "Pending"}
            </Badge>
        ),
    }),

    columnHelper.display({
        id: "actions",
        header: () => (
            <div className="text-right">Actions</div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-end">
                <TaskActions task={row.original} />
            </div>
        ),
    }),
])
