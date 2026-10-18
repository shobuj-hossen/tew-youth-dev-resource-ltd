"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { Check, MoreHorizontal } from "lucide-react"

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
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { courseStatuses } from "@/constants/course"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"
import { changeCourseStatus } from "../actions"
import { Course } from "../types"
import DeleteCourseDialog from "./delete-course-dialog"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<
    DataTableFeatures,
    Course
>()

export const coursesColumns = columnHelper.columns([
    createSelectColumn<Course>(),
    columnHelper.accessor("banner", {
        header: "Banner",
        cell: ({ row }) => {
            return (
                <Avatar>
                    <AvatarImage
                        src={row.original.banner.secureUrl}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )
        },
    }),
    columnHelper.accessor("name", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Name"
            />
        ),
    }),

    columnHelper.accessor("code", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Code"
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
        cell: ({ row }) => (
            <Badge variant={"secondary"}>
                {row.original.status}
            </Badge>
        ),
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter()
            const [deleteDialogInfo, setDeleteDialogInfo] =
                useState<Course | null>(null)
            const mutation = useMutation({
                mutationFn: changeCourseStatus,
            })

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
                                            `/dashboard/courses/${row.original.id}/update`,
                                        )
                                    }
                                >
                                    Edit Course
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    Status
                                </DropdownMenuSubTrigger>
                                <DropdownMenuSubContent>
                                    <DropdownMenuGroup>
                                        {courseStatuses.map(
                                            (status) => (
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        mutation.mutate(
                                                            {
                                                                id: row
                                                                    .original
                                                                    .id,
                                                                status,
                                                            },
                                                        )
                                                    }
                                                    className={
                                                        "flex items-center justify-between"
                                                    }
                                                    key={
                                                        status
                                                    }
                                                >
                                                    {" "}
                                                    <span>
                                                        {
                                                            status
                                                        }
                                                    </span>{" "}
                                                    {row
                                                        .original
                                                        .status ===
                                                        status && (
                                                        <Check />
                                                    )}
                                                </DropdownMenuItem>
                                            ),
                                        )}
                                    </DropdownMenuGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuSub>

                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/courses/${row.original.id}/details`,
                                        )
                                    }
                                >
                                    View In Detail
                                </DropdownMenuItem>

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
                    <DeleteCourseDialog
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
