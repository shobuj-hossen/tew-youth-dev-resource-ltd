"use client"

import { useState } from "react"

import { FormSteps } from "@/components/form-steps/form-steps"
import { FormStepsNavigation } from "@/components/form-steps/form-steps-navigation"
import { useFormStepsStore } from "@/hooks/use-form-steps-store"
import { FormStepsType } from "@/types/steps"

import { AcademicInformationForm } from "./academic-info-form"
import { CourseInformationForm } from "./course-info-form"
import { PersonalInformationForm } from "./personal-info-form"
import { StudentFormPreview } from "./student-form-preview"

import { useMutation } from "@tanstack/react-query"
import {
    studentDefaults,
    StudentSchemaType,
} from "../../schemas"
import { createStudent } from "../../actions"

const formSteps = [
    {
        id: "personal",
        title: "Personal",
        description: "Personal information",
        formId: "student-personal-information-form",
    },

    {
        id: "academic",
        title: "Academic",
        description: "Academic information",
        formId: "student-academic-information-form",
    },
    {
        id: "course",
        title: "Course",
        description: "Course information",
        formId: "student-course-information-form",
    },
    {
        id: "preview",
        title: "Preview",
        description: "Confirm details",
        formId: "student-preview-form",
    },
] satisfies readonly FormStepsType[]

export function FullStudentForm({
    courses,
}: {
    courses: { label: string; value: string }[]
}) {
    const { currentStep, nextStep, setStep } =
        useFormStepsStore()

    const [studentForm, setStudentForm] =
        useState<StudentSchemaType>({
            ...studentDefaults,
            academicInformation:
                studentDefaults.academicInformation.map(
                    (academic) => ({
                        ...academic,
                    }),
                ),
        })

    const formId = formSteps[currentStep].formId

    const mutation = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            setStudentForm({
                ...studentDefaults,
                academicInformation:
                    studentDefaults.academicInformation.map(
                        (academic) => ({
                            ...academic,
                        }),
                    ),
            })

            setStep(0)
        },
    })

    const updateStudentForm = <
        T extends Partial<StudentSchemaType>,
    >(
        values: T,
    ) => {
        setStudentForm((existing) => ({
            ...existing,
            ...values,
        }))
    }

    return (
        <div className="mt-6 space-y-8 pb-10">
            <div className="m-auto max-w-7xl">
                <FormSteps steps={formSteps} />
            </div>

            <div className="m-auto max-w-xl px-4 pt-6 lg:px-0">
                <div className="space-y-8">
                    {currentStep === 0 ? (
                        <PersonalInformationForm
                            existedValues={studentForm}
                            formId={formId}
                            onSuccess={(values) => {
                                updateStudentForm(values)

                                nextStep()
                            }}
                        />
                    ) : currentStep === 1 ? (
                        <AcademicInformationForm
                            existedValues={studentForm}
                            formId={formId}
                            onSuccess={(values) => {
                                updateStudentForm(values)

                                nextStep()
                            }}
                        />
                    ) : currentStep === 2 ? (
                        <CourseInformationForm
                            courses={courses}
                            existedValues={studentForm}
                            formId={formId}
                            onSuccess={(values) => {
                                updateStudentForm(values)

                                nextStep()
                            }}
                        />
                    ) : currentStep === 3 ? (
                        <StudentFormPreview
                            courses={courses}
                            studentForm={studentForm}
                        />
                    ) : null}

                    <FormStepsNavigation
                        showSubmitButton={
                            currentStep + 1 ===
                            formSteps.length
                        }
                        onSubmit={() =>
                            mutation.mutate(studentForm)
                        }
                        submitPending={mutation.isPending}
                        formId={formId}
                    />
                </div>
            </div>
        </div>
    )
}
