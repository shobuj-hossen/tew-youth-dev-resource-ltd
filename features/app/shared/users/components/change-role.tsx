"use client"

import { useState } from "react"
import {
    Check,
    Loader2,
    Plus,
    ShieldCheck,
} from "lucide-react"
import { useMutation } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { capitalize } from "@/utils/helpers"
import { changeMemberRole } from "../actions"

type ChangeRoleProps = {
    roles: string[]
    existedRole: string
    memberId: string
}

export function ChangeRole({
    roles,
    existedRole,
    memberId,
}: ChangeRoleProps) {
    const [selectedRole, setSelectedRole] =
        useState(existedRole)

    const mutation = useMutation({
        mutationFn: (role: string) =>
            changeMemberRole({
                memberId,
                role,
            }),
        onSuccess: (_, role) => {
            setSelectedRole(role)
        },
    })

    const handleRoleChange = (role: string) => {
        if (role === selectedRole || mutation.isPending) {
            return
        }

        mutation.mutate(role)
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                    <CardTitle className="text-base">
                        Member Role
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                        Select a role to change this
                        member's access.
                    </p>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid gap-2 sm:grid-cols-2">
                    {roles.map((role) => {
                        const isSelected =
                            selectedRole === role
                        const isUpdating =
                            mutation.isPending &&
                            mutation.variables === role

                        return (
                            <button
                                key={role}
                                type="button"
                                disabled={
                                    mutation.isPending
                                }
                                onClick={() =>
                                    handleRoleChange(role)
                                }
                                className={cn(
                                    "group flex items-center justify-between gap-3 rounded-lg border p-3 text-left transition-colors",
                                    "hover:bg-muted/50",
                                    isSelected &&
                                        "border-primary bg-primary/5",
                                    mutation.isPending &&
                                        "cursor-not-allowed opacity-70",
                                )}
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <div
                                        className={cn(
                                            "flex size-9 shrink-0 items-center justify-center rounded-md bg-muted",
                                            isSelected &&
                                                "bg-primary/10 text-primary",
                                        )}
                                    >
                                        <ShieldCheck className="size-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {capitalize(
                                                role,
                                            )}
                                        </p>

                                        {isSelected && (
                                            <p className="text-xs text-muted-foreground">
                                                Current role
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="shrink-0">
                                    {isUpdating ? (
                                        <Loader2 className="size-4 animate-spin" />
                                    ) : isSelected ? (
                                        <Check className="size-4 text-primary" />
                                    ) : null}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
