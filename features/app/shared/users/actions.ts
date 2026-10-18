"use server"

import { db } from "@/drizzle/db"
import { auth } from "@/lib/auth"
import { cleanupUploads } from "@/lib/cloudinary/cleanup-uploads"
import {
    UploadResult,
    uploadToCloudinary,
} from "@/lib/cloudinary/upload"
import { withPermission } from "@/lib/dal"
import {
    NotFoundError,
    ValidationError,
} from "@/utils/error-constructor"
import { updateTag } from "next/cache"
import {
    orgUserFullSchema,
    OrgUserFullSchemaType,
} from "./schemas"

export const addOrgUser = withPermission(
    { users: ["create"] },
    async ({ headers }, inputs: OrgUserFullSchemaType) => {
        const { success, data } =
            orgUserFullSchema.safeParse(inputs)

        if (!success) {
            throw new ValidationError()
        }

        const {
            name,
            email,
            password,
            profileFile,
            cvFile,
            ...rest
        } = data

        const existUser = await db.query.users.findFirst({
            where: { email },
            columns: { id: true },
        })

        if (existUser) {
            throw new Error("User already exist")
        }

        let uploads: Array<UploadResult | undefined> = []

        try {
            const results = await Promise.allSettled([
                uploadToCloudinary(profileFile.croppedFile),
                cvFile
                    ? uploadToCloudinary(cvFile)
                    : Promise.resolve(undefined),
            ])

            uploads = results
                .filter(
                    (
                        result,
                    ): result is PromiseFulfilledResult<
                        UploadResult | undefined
                    > => result.status === "fulfilled",
                )
                .map((result) => result.value)

            const failed = results.find(
                (result) => result.status === "rejected",
            )

            if (failed) {
                throw failed.reason
            }

            const [profilePicture, cv] = uploads

            const newUser = await auth.api.createUser({
                body: {
                    name,
                    email,
                    password,
                    data: {
                        data: {
                            profilePicture,
                            cv,
                            ...rest,
                        },
                    },
                },
                headers,
            })

            await auth.api.addMember({
                body: {
                    userId: newUser.user.id,
                    role: "default_user" as unknown as "owner",
                },
                headers,
            })

            updateTag("members")

            return {
                message: "New user is created",
            }
        } catch (error) {
            await cleanupUploads(uploads)
            throw error
        }
    },
)

export const changeMemberRole = withPermission(
    { member: ["update"] },
    async (
        { headers },
        {
            memberId,
            role,
        }: {
            memberId: string
            role: string
        },
    ) => {
        const org = await auth.api.getOrganization({
            headers,
        })

        if (!org) {
            throw new NotFoundError()
        }

        await auth.api.updateMemberRole({
            body: {
                memberId,
                role,
                organizationId: org.id,
            },
            headers,
        })

        updateTag("members")
        updateTag(`member:${memberId}`)

        return {
            message: "Member role updated",
            role,
        }
    },
)
