import {
    NotFoundError,
    UnauthorizedError,
} from "@/utils/error-constructor"
import { Organization } from "better-auth/plugins"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import "server-only"
import { auth } from "./auth"

type Session = NonNullable<
    Awaited<ReturnType<typeof auth.api.getSession>>
> & {
    headers: HeadersInit
    orgMemberRole: string
    org: Organization
}

export type Permissions = NonNullable<
    Parameters<typeof auth.api.hasPermission>[0]
>["body"]["permissions"]

export async function requireAuth() {
    let parasedHeaders = await headers()
    const session = await auth.api.getSession({
        headers: parasedHeaders,
    })

    if (!session) {
        redirect("/login")
    }

    return { session, headers: parasedHeaders }
}

async function getOrgAndMember({
    headers,
}: {
    headers: HeadersInit
}) {
    let org = await auth.api.getOrganization({
        headers,
    })

    if (!org) {
        throw new NotFoundError("Org not found")
    }

    const member = await auth.api.getActiveMemberRole({
        headers,
    })

    if (!member) {
        throw new Error(
            "Authenticated user is not a member of the organization.",
        )
    }

    return { org, member }
}

export function withPermission<
    Targs extends unknown[],
    TResult,
>(
    permissions: Permissions,
    action: (
        session: Session,
        ...args: Targs
    ) => Promise<TResult>,
) {
    return async (...args: Targs): Promise<TResult> => {
        const { headers, session } = await requireAuth()

        const { org, member } = await getOrgAndMember({
            headers,
        })
        const result = await auth.api.hasPermission({
            body: {
                permissions,
            },
            headers,
        })

        if (!result.success) {
            throw new UnauthorizedError()
        }

        return action(
            {
                headers,
                ...session,
                orgMemberRole: member.role,
                org,
            },
            ...args,
        )
    }
}
