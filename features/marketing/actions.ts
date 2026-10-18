"use server"

import { db } from "@/drizzle/db"
import {
    branchApplicationSchema,
    BranchApplicationSchemaType,
} from "./schemas"
import { branchApplications } from "@/drizzle/schema"
import {
    UploadResult,
    uploadToCloudinary,
} from "@/lib/cloudinary/upload"
import { ValidationError } from "@/utils/error-constructor"
import { cleanupUploads } from "@/lib/cloudinary/cleanup-uploads"
import { updateTag } from "next/cache"

export async function applyForBranch(
    inputs: BranchApplicationSchemaType,
) {
    const { data, success } =
        branchApplicationSchema.safeParse(inputs)

    if (!success) {
        throw new ValidationError()
    }

    const emailExist = await db.query.users.findFirst({
        where: { email: inputs.email },
    })
    if (emailExist) {
        throw new Error("Email Already Exists")
    }

    let uploads: Array<UploadResult | undefined> = []
    try {
        const results = await Promise.allSettled([
            uploadToCloudinary(data.electricityBill, {
                folder: "branch_asserts",
            }),
            uploadToCloudinary(data.nidDocument, {
                folder: "branch_asserts",
            }),
            uploadToCloudinary(data.tradeLicense, {
                folder: "branch_asserts",
            }),
            data.logo
                ? uploadToCloudinary(
                      data.logo.croppedFile,
                      { folder: "branch_asserts" },
                  )
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

        const [
            electricityBill,
            nidDocument,
            tradeLicense,
            logo,
        ] = uploads

        await db.insert(branchApplications).values({
            ...data,
            electricityBill: electricityBill!,
            nidDocument: nidDocument!,
            tradeLicense: tradeLicense!,
            logo,
        })

        updateTag("branch-applications")
        return {
            message:
                "Your form has been submitted successfully.",
        }
    } catch (error) {
        await cleanupUploads(uploads)
        throw error
    }
}
