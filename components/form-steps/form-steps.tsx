// components/onboarding-steps.tsx

"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

import { useFormStepsStore } from "@/hooks/use-form-steps-store"
import { FormStepsType } from "@/types/steps"

type FormStepsProps = {
    steps: readonly FormStepsType[]
    className?: string
}

export function FormSteps({
    steps,
    className,
}: FormStepsProps) {
    const currentStep = useFormStepsStore(
        (state) => state.currentStep,
    )

    return (
        <nav
            aria-label="Onboarding progress"
            className={cn("w-full", className)}
        >
            <ol className="flex items-start px-8 pb-6  lg:pb-10">
                {steps.map((step, index) => {
                    const isCompleted = index < currentStep
                    const isCurrent = index === currentStep

                    return (
                        <li
                            key={step.id}
                            id={step.id}
                            className="flex flex-1 pt-3 items-start last:flex-none"
                        >
                            <div className="flex flex-col items-center ">
                                <div
                                    className={cn(
                                        "flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium transition-colors relative",
                                        isCompleted &&
                                            "border-primary bg-primary text-primary-foreground",
                                        isCurrent &&
                                            "border-primary bg-background text-primary ring ring-primary",
                                        !isCompleted &&
                                            !isCurrent &&
                                            "border-muted-foreground/30 bg-background text-muted-foreground",
                                    )}
                                    aria-current={
                                        isCurrent
                                            ? "step"
                                            : undefined
                                    }
                                >
                                    {isCompleted ? (
                                        <Check
                                            className="size-4"
                                            strokeWidth={
                                                2.5
                                            }
                                        />
                                    ) : (
                                        index + 1
                                    )}
                                    {/* text  */}
                                    <div className="mt-2 text-center absolute top-8">
                                        <p
                                            className={cn(
                                                "text-xs md:text-sm font-medium",
                                                isCurrent ||
                                                    isCompleted
                                                    ? "text-foreground"
                                                    : "text-muted-foreground",
                                            )}
                                        >
                                            {step.title}
                                        </p>

                                        {step.description && (
                                            <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block sm:w-30">
                                                {
                                                    step.description
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={cn(
                                        "mx-3 mt-4 h-1 flex-1 transition-colors rounded-full",
                                        index < currentStep
                                            ? "bg-primary"
                                            : "bg-border",
                                    )}
                                />
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
