"use client"

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
import { courseStatuses } from "@/constants/course"
import { useMutation } from "@tanstack/react-query"
import { MoreHorizontal } from "lucide-react"
import { changeCourseStatusInBulk } from "../actions"
import { Course } from "../types"

export function SelectedBulkAction({
    data,
}: {
    data: Course[]
}) {
    const mutation = useMutation({
        mutationFn: changeCourseStatusInBulk,
    })
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                    />
                }
            >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        Change All To
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {courseStatuses.map((status) => (
                        <DropdownMenuItem
                            onClick={() =>
                                mutation.mutate({
                                    ids: data.map(
                                        (d) => d.id,
                                    ),
                                    status,
                                })
                            }
                            className={
                                "flex items-center justify-between"
                            }
                            key={status}
                        >
                            {" "}
                            {status}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
