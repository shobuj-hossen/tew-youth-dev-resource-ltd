"use client"

import { Plus } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"

import { useAppForm } from "@/components/form/use-app-form"
import { SubmitButton } from "@/components/shared/submit-button"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { capitalize } from "@/utils/helpers"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { createRole } from "../actions"

const roleSchema = z.object({
    roleName: z
        .string()
        .trim()
        .min(1, "Role name is required")
        .max(
            100,
            "Role name must be 100 characters or less",
        ),
})

export function RoleSelect({
    roles,
    selectRole,
    setSelectRole,
}: {
    roles: string[]
    selectRole: string
    setSelectRole: Dispatch<SetStateAction<string>>
}) {
    const [createOpen, setCreateOpen] = useState(false)

    return (
        <>
            <Select
                value={capitalize(selectRole)}
                onValueChange={(v) =>
                    setSelectRole(v as string)
                }
            >
                <SelectTrigger className="md:max-w-60">
                    <SelectValue placeholder="Select a role" />
                </SelectTrigger>

                <SelectContent>
                    {roles
                        .map((r) => ({
                            label: capitalize(r),
                            value: r,
                        }))
                        .map((role) => (
                            <SelectItem
                                key={role.value}
                                value={role.value}
                            >
                                {role.label}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>
            <Button
                className={" max-w-40"}
                variant={"ghost"}
                onClick={() => setCreateOpen(true)}
            >
                <Plus /> Create new role
            </Button>

            <CreateRole
                open={createOpen}
                onOpenChange={setCreateOpen}
            />
        </>
    )
}

type CreateRoleProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

function CreateRole({
    open,
    onOpenChange,
}: CreateRoleProps) {
    const createRoleMutation = useMutation({
        mutationFn: createRole,
        onSuccess: () => {
            onOpenChange(false)
        },
    })

    const form = useAppForm({
        defaultValues: {
            roleName: "",
        },
        validators: {
            onSubmit: roleSchema,
        },
        onSubmit: async ({ value }) => {
            createRoleMutation.mutate({
                role: value.roleName,
            })
        },
    })

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                onOpenChange(v)
                if (v === false) {
                    form.reset()
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create a new role
                    </DialogTitle>
                    <DialogDescription>
                        Create a role to define a set of
                        permissions for employees in your
                        organization.
                    </DialogDescription>
                </DialogHeader>

                <FieldGroup>
                    <form
                        id="role-form"
                        onSubmit={(event) => {
                            event.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        <form.AppField name="roleName">
                            {(field) => (
                                <field.TextField
                                    label="Role name"
                                    placeholder="e.g. Manager"
                                    description="Choose a clear name that describes the responsibilities of this role."
                                />
                            )}
                        </form.AppField>
                    </form>
                </FieldGroup>
                <DialogFooter>
                    <SubmitButton
                        isPending={
                            createRoleMutation.isPending
                        }
                        form="role-form"
                        type="submit"
                    >
                        Submit{" "}
                    </SubmitButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
