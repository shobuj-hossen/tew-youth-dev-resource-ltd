"use server"

import { auth } from "@/lib/auth"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { updateTag } from "next/cache"

export const createRole = withPermission(
    { roles_permissions: ["create"] },
    async ({ headers }, { role }: { role: string }) => {
        if (role === "owner" || role === "default_user") {
            throw new Error("You cannot create this role")
        }
        const org = await auth.api.getOrganization({
            headers,
        })

        if (!org) {
            throw new NotFoundError()
        }

        await auth.api.createOrgRole({
            body: {
                role,
                permission: {},
                organizationId: org.id,
            },
            headers,
        })

        updateTag("roles-permissions")
        updateTag(`roles-permissions:${org.id}`)

        return {
            message: "New role is created",
            role,
        }
    },
)

export const updateRolePermission = withPermission(
    { roles_permissions: ["update"] },
    async (
        { headers },
        {
            roleName,
            permission,
        }: {
            roleName: string
            permission: Record<string, string[]>
        },
    ) => {
        const org = await auth.api.getOrganization({
            headers,
        })

        if (!org) {
            throw new NotFoundError()
        }

        await auth.api.updateOrgRole({
            body: {
                roleName,
                organizationId: org.id,
                data: {
                    permission,
                },
            },
            headers,
        })

        updateTag("roles-permissions")
        updateTag(`roles-permissions:${org.id}`)
        updateTag(`role:${org.id}:${roleName}`)

        return {
            message: "Permissions Updated",
        }
    },
)

export const updateRole = withPermission(
    { roles_permissions: ["update"] },
    async (
        { headers },
        {
            roleName,
            newRoleName,
            permission,
        }: {
            roleName: string
            newRoleName?: string
            permission?: Record<string, string[]>
        },
    ) => {
        const org = await auth.api.getOrganization({
            headers,
        })

        if (!org) {
            throw new NotFoundError()
        }

        await auth.api.updateOrgRole({
            body: {
                roleName,
                organizationId: org.id,
                data: {
                    ...(newRoleName && {
                        roleName: newRoleName,
                    }),
                    ...(permission && {
                        permission,
                    }),
                },
            },
            headers,
        })

        updateTag("roles-permissions")
        updateTag(`roles-permissions:${org.id}`)
        updateTag(`role:${org.id}:${roleName}`)

        if (newRoleName) {
            updateTag(`role:${org.id}:${newRoleName}`)
        }

        return {
            message: "Role updated",
        }
    },
)

export const deleteRole = withPermission(
    { roles_permissions: ["delete"] },
    async (
        { headers },
        { roleName }: { roleName: string },
    ) => {
        const org = await auth.api.getOrganization({
            headers,
        })

        if (!org) {
            throw new NotFoundError()
        }

        await auth.api.deleteOrgRole({
            body: {
                roleName,
                organizationId: org.id,
            },
            headers,
        })

        updateTag("roles-permissions")
        updateTag(`roles-permissions:${org.id}`)
        updateTag(`role:${org.id}:${roleName}`)

        return {
            message: "Role deleted",
        }
    },
)
