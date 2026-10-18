import {
    getBranchApplicationById,
    getBranchApplications,
} from "./queries"

export type BranchApplication = Awaited<
    ReturnType<typeof getBranchApplications>
>[number]
export type BranchApplicationById = Awaited<
    ReturnType<typeof getBranchApplicationById>
>
