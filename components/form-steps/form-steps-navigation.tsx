"use client"

import { Button } from "@/components/ui/button"
import { useFormStepsStore } from "@/hooks/use-form-steps-store"
import { MoveLeft, MoveRight } from "lucide-react"
import { SubmitButton } from "../shared/submit-button"

export function FormStepsNavigation({
    formId,
    onSubmit,
    showSubmitButton,
    submitPending,
}: {
    formId: string
    showSubmitButton: boolean
    onSubmit: () => void
    submitPending: boolean
}) {
    const { currentStep, previousStep } =
        useFormStepsStore()

    const handleBack = () => {
        previousStep()
    }

    return (
        <div className="flex justify-center items-center gap-3">
            <Button
                variant="outline"
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
            >
                <MoveLeft /> Back
            </Button>
            {showSubmitButton ? (
                <SubmitButton
                    isPending={submitPending}
                    onClick={onSubmit}
                    variant="default"
                    type="submit"
                    form={formId}
                >
                    Submit Form
                </SubmitButton>
            ) : (
                <Button
                    variant="outline"
                    type="submit"
                    form={formId}
                >
                    Next <MoveRight />
                </Button>
            )}
        </div>
    )
}
