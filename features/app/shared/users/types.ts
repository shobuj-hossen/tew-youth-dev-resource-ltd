import { UploadResult } from "@/lib/cloudinary/upload"
import { getMembers, getUserDetailsById } from "./queries"

export type OrgUser = Awaited<
    ReturnType<typeof getMembers>
>["members"][number]

export type FullUser = Awaited<
    ReturnType<typeof getUserDetailsById>
>

export type AdditionalDataType = {
    fatherName: string
    motherName: string
    phoneNumber: string
    gender: string
    address?: string | undefined
    qualification?: string | undefined
    profilePicture: UploadResult
    cv: UploadResult | null
}
