import { db } from "@/drizzle/db"
import { auth } from "@/lib/auth"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { UserWithRole } from "better-auth/plugins/admin"
import { cacheTag } from "next/cache"
import { AdditionalDataType } from "./types"

export const getMembers = withPermission(
    { users: ["view"] },
    async ({ headers }) => {
        "use cache"
        cacheTag("members")

        return await auth.api.listMembers({
            query: {},
            headers,
        })
    },
)

type UserWithAdditionalFields = UserWithRole & {
    data: AdditionalDataType | null
    orgRole: string
    memberId: string
    organizationId: string
    roles: string[]
}

export const getUserDetailsById = withPermission(
    { users: ["view"] },
    async (
        { headers },
        { memberId }: { memberId: string },
    ) => {
        const member = await db.query.members.findFirst({
            where: { id: memberId },
        })

        if (!member) {
            throw new NotFoundError()
        }

        const res = await auth.api.getUser({
            query: { id: member.userId },
            headers,
        })
        const roles = (
            await auth.api.listOrgRoles({ headers })
        ).map((r) => r.role)

        return {
            ...res,
            orgRole: member.role,
            memberId: member.id,
            organizationId: member.organizationId,
            roles,
        } as UserWithAdditionalFields
    },
)
