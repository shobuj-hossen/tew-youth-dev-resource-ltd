"use client"
import { FullUser } from "../types"
import { ChangeRole } from "./change-role"

export function ActionsTab({ data }: { data: FullUser }) {
    return (
        <div>
            <ChangeRole
                existedRole={data.role!}
                roles={data.roles}
                memberId={data.memberId}
            />
        </div>
    )
}
