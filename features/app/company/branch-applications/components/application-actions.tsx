"use client"

import { BranchApplicationById } from "../types"
import { ApproveBranch } from "./approve-branch"

export function ApplictionActions({
    application,
}: {
    application: BranchApplicationById
}) {
    return (
        <div>
            <ApproveBranch {...application} />
        </div>
    )
}
