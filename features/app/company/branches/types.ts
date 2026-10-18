import {
    getBranchById,
    getBranches,
    getEnrollmentsBranchId,
} from "./queries"

export type Branch = Awaited<
    ReturnType<typeof getBranches>
>[number]
export type BranchById = Awaited<
    ReturnType<typeof getBranchById>
>
export type EnrollmentBranchById = Awaited<
    ReturnType<typeof getEnrollmentsBranchId>
>[number]
