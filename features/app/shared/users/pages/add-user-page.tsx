"use client"
import { useState } from "react"

import { FormSteps } from "@/components/form-steps/form-steps"
import { FormStepsNavigation } from "@/components/form-steps/form-steps-navigation"
import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { useFormStepsStore } from "@/hooks/use-form-steps-store"
import { FormStepsType } from "@/types/steps"
import { useMutation } from "@tanstack/react-query"
import { addOrgUser } from "../actions"
import { AdditionalInfoForm } from "../components/additional-info-form"
import { UserFormPreview } from "../components/user-form-preview"
import { UserInfoForm } from "../components/user-info-form"
import {
    orgUserFullDefaults,
    OrgUserFullSchemaType,
} from "../schemas"
const formSteps = [
    {
        id: "user-info",
        title: "User Info",
        description: "Personal details and address",
        formId: "user-info-form",
    },
    {
        id: "documents",
        title: "Additional Info",
        description: "Upload valid documents",
        formId: "user-docs-form",
    },
    {
        id: "preview",
        title: "Preview",
        description: "Review & confirm your details",
        formId: "user-preview-form",
    },
] satisfies readonly FormStepsType[]

export function AddUserPage() {
    const { currentStep, nextStep, setStep } =
        useFormStepsStore()

    const [orgUserForm, setOrgUserForm] =
        useState<OrgUserFullSchemaType>({
            ...orgUserFullDefaults,
        })

    const formId = formSteps[currentStep].formId

    const mutation = useMutation({
        mutationFn: addOrgUser,
        onSuccess: () => {
            setOrgUserForm(orgUserFullDefaults)
            setStep(0)
        },
    })

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/users">
                    Add New User
                </PageTitle>
            </PageHeader>
            <PageContent>
                <div className="space-y-8  mt-6 pb-10">
                    <div className="max-w-7xl m-auto">
                        <FormSteps steps={formSteps} />
                    </div>
                    <div className="max-w-lg m-auto pt-10 px-4 lg:px-0">
                        <div className="space-y-8">
                            {currentStep === 0 ? (
                                <UserInfoForm
                                    existedValues={
                                        orgUserForm
                                    }
                                    formId={formId}
                                    onSuccess={(v) => {
                                        setOrgUserForm(
                                            (existed) => ({
                                                ...existed,
                                                ...v,
                                            }),
                                        )
                                        nextStep()
                                    }}
                                />
                            ) : currentStep === 1 ? (
                                <AdditionalInfoForm
                                    existedValues={
                                        orgUserForm
                                    }
                                    formId={formId}
                                    onSuccess={(v) => {
                                        setOrgUserForm(
                                            (existed) => ({
                                                ...existed,
                                                ...v,
                                            }),
                                        )
                                        nextStep()
                                    }}
                                />
                            ) : currentStep === 2 ? (
                                <UserFormPreview
                                    orgUser={orgUserForm}
                                />
                            ) : null}

                            <FormStepsNavigation
                                showSubmitButton={
                                    currentStep + 1 ===
                                    formSteps.length
                                }
                                onSubmit={() =>
                                    mutation.mutate(
                                        orgUserForm,
                                    )
                                }
                                submitPending={
                                    mutation.isPending
                                }
                                formId={formId}
                            />
                        </div>
                    </div>
                </div>
            </PageContent>
        </Page>
    )
}
