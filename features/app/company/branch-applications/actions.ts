"use server"

import { db } from "@/drizzle/db"
import { branchApplications } from "@/drizzle/schema"
import { auth } from "@/lib/auth"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { generatePassword } from "@/utils/helpers"
import { message } from "@/utils/message"
import { eq } from "drizzle-orm"
import { updateTag } from "next/cache"
import { createUniqueOrgSlug } from "./utils"
import { sendEmailBranchApproved } from "@/lib/resend/emails"

export const approveApplication = withPermission(
    { branch_application: ["update"] },

    async (
        _,
        {
            applicationId,
            oneTimePaymentAmount,
        }: {
            applicationId: string
            oneTimePaymentAmount: number
        },
    ) => {
        const updatedRows = await db
            .update(branchApplications)
            .set({
                status: "approved",
                oneTimePaymentAmount,
            })
            .where(eq(branchApplications.id, applicationId))
            .returning({ id: branchApplications.id })

        if (updatedRows.length === 0) {
            throw new NotFoundError()
        }

        updateTag("branch-applications")

        return message("Status has changed to approved")
    },
)

export const rejectApplication = withPermission(
    { branch_application: ["update"] },
    async (
        _,
        { applicationId }: { applicationId: string },
    ) => {
        const updatedRows = await db
            .update(branchApplications)
            .set({ status: "rejected" })
            .where(eq(branchApplications.id, applicationId))
            .returning({ id: branchApplications.id })

        if (updatedRows.length === 0) {
            throw new NotFoundError()
        }

        updateTag("branch-applications")

        return message("Status has changed to rejected")
    },
)

export const createNewBranchWorkspace = withPermission(
    { branch_application: ["update"] },
    async (
        { headers },
        { applicationId }: { applicationId: string },
    ) => {
        // 1. Fetch application details from DB
        const branchApplication =
            await db.query.branchApplications.findFirst({
                where: { id: applicationId },
            })

        if (!branchApplication) {
            throw new NotFoundError()
        }

        const { ownerName, email, branchName, logo } =
            branchApplication
        const password = generatePassword()
        console.log("password", password)

        let newUserId = ""

        // 2. Create the Admin User
        try {
            const newUser = await auth.api.createUser({
                body: {
                    name: ownerName,
                    email,
                    password,
                    role: "admin",
                },
                headers,
            })
            newUserId = newUser.user.id
        } catch (error) {
            throw error
        }

        // 3. Generate Organization Slug & Create Organization
        const slug = await createUniqueOrgSlug(branchName)

        try {
            const newOrg =
                await auth.api.createOrganization({
                    body: {
                        name: branchName,
                        slug,
                        logo: logo?.secureUrl ?? null,
                        userId: newUserId,
                        keepCurrentActiveOrganization: true,
                    },
                })

            // 4. Update application status/relation in Database
            await db
                .update(branchApplications)
                .set({
                    organizationId: newOrg.id,
                    status: "approved",
                })
                .where(
                    eq(
                        branchApplications.id,
                        applicationId,
                    ),
                )

            //send email
            await sendEmailBranchApproved({
                branchName: branchName,
                email,
                firstName: ownerName,
                loginUrl: `${process.env.BETTER_AUTH_URL}/login`,
                password,
            })
        } catch (error) {
            // Rollback user creation if organization setup or DB update fails
            if (newUserId) {
                await auth.api
                    .removeUser({
                        body: { userId: newUserId },
                        headers,
                    })
                    .catch(() =>
                        console.log(
                            "User deletion error during rollback",
                        ),
                    )
            }

            throw error
        }

        // 5. Invalidate cache tags
        updateTag("branch-applications")

        return message(
            "Workspace has been set up successfully",
        )
    },
)
