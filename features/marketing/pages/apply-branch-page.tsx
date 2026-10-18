"use client"
import { useState } from "react"
import { AddressDetailsForm } from "../components/apply-branch/address-details-form"
import { BranchDetailsForm } from "../components/apply-branch/branch-details-form"
import { OwnerInfoForm } from "../components/apply-branch/owner-info-form"

import { FormSteps } from "@/components/form-steps/form-steps"
import { FormStepsNavigation } from "@/components/form-steps/form-steps-navigation"
import { useFormStepsStore } from "@/hooks/use-form-steps-store"
import { FormStepsType } from "@/types/steps"
import { useMutation } from "@tanstack/react-query"
import { applyForBranch } from "../actions"
import { ApplicationFormPreview } from "../components/apply-branch/application-form-preview"
import { DocumentsForm } from "../components/apply-branch/documents-form"
import {
    branchApplicationDefaults,
    BranchApplicationSchemaType,
} from "../schemas"
const formSteps = [
    {
        id: "branch",
        title: "Branch",
        description: "Branch information",
        formId: "branch-details-form",
    },
    {
        id: "owner",
        title: "Owner",
        description: "Owner details",
        formId: "owner-info-form",
    },

    {
        id: "address",
        title: "Address",
        description: "Address of branch",
        formId: "address-details-form",
    },
    {
        id: "documents",
        title: "Docs",
        description: "Valid documents",
        formId: "branch-docs-form",
    },
    {
        id: "preview",
        title: "Preview",
        description: "Confirm details",
        formId: "branch-preview-form",
    },
] satisfies readonly FormStepsType[]

export function ApplyBranchPage() {
    const { currentStep, nextStep, setStep } =
        useFormStepsStore()

    const [applicationForm, setApplicationForm] =
        useState<BranchApplicationSchemaType>({
            ...branchApplicationDefaults,
        })

    const formId = formSteps[currentStep].formId

    const mutation = useMutation({
        mutationFn: applyForBranch,
        onSuccess: () => {
            setApplicationForm(branchApplicationDefaults)
            setStep(0)
        },
    })

    return (
        <div className="space-y-8  mt-6 pb-10">
            <div className="h-10 lg:h-20"></div>
            <div className="max-w-7xl m-auto">
                <FormSteps steps={formSteps} />
            </div>
            <div className="max-w-lg m-auto pt-6 px-4 lg:px-0">
                <div className="space-y-8">
                    {currentStep === 0 ? (
                        <BranchDetailsForm
                            existedValues={applicationForm}
                            formId={formId}
                            onSuccess={(v) => {
                                setApplicationForm(
                                    (existed) => ({
                                        ...existed,
                                        ...v,
                                    }),
                                )
                                nextStep()
                            }}
                        />
                    ) : currentStep === 1 ? (
                        <OwnerInfoForm
                            existedValues={applicationForm}
                            formId={formId}
                            onSuccess={(v) => {
                                setApplicationForm(
                                    (existed) => ({
                                        ...existed,
                                        ...v,
                                    }),
                                )
                                nextStep()
                            }}
                        />
                    ) : currentStep === 2 ? (
                        <AddressDetailsForm
                            existedValues={applicationForm}
                            formId={formId}
                            onSuccess={(v) => {
                                setApplicationForm(
                                    (existed) => ({
                                        ...existed,
                                        ...v,
                                    }),
                                )
                                nextStep()
                            }}
                        />
                    ) : currentStep === 3 ? (
                        <DocumentsForm
                            existedValues={applicationForm}
                            formId={formId}
                            onSuccess={(v) => {
                                setApplicationForm(
                                    (existed) => ({
                                        ...existed,
                                        ...v,
                                    }),
                                )
                                nextStep()
                            }}
                        />
                    ) : currentStep === 4 ? (
                        <ApplicationFormPreview
                            applicationForm={
                                applicationForm
                            }
                        />
                    ) : null}

                    <FormStepsNavigation
                        showSubmitButton={
                            currentStep + 1 ===
                            formSteps.length
                        }
                        onSubmit={() =>
                            mutation.mutate(applicationForm)
                        }
                        submitPending={mutation.isPending}
                        formId={formId}
                    />
                </div>
            </div>
        </div>
    )
}
