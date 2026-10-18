"use client"

import { useAppForm } from "@/components/form/use-app-form"
import { SubmitButton } from "@/components/shared/submit-button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"
import { useSelector } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { updateEnrollment } from "../../actions"
import {
    COURSE_DURATION_OPTIONS,
    CourseDuration,
    MEDIUM_OPTIONS,
    getCourseRangeOptions,
} from "../../constants"
import {
    EnrollmentInformationSchemaType,
    enrollmentInformationSchema,
} from "../../schemas"
import { EnrollmentById } from "../../types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function UpdateEnrollmentForm({
    formId,
    existedValues,
    courses,
    enrollmentId,
}: {
    formId: string
    existedValues: EnrollmentById
    enrollmentId: string
    courses: { label: string; value: string }[]
}) {
    const defaultValues: EnrollmentInformationSchemaType = {
        ...existedValues,
    }
    const router = useRouter()

    const { isPending, mutate } = useMutation({
        mutationFn: updateEnrollment,
        onSuccess: () => {
            router.push("/dashboard/unpaid-students")
        },
    })
    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: enrollmentInformationSchema,
        },
        onSubmit: async ({ value }) => {
            mutate({ ...value, enrollmentId })
        },
    })

    const courseDuration = useSelector(
        form.store,
        (field) => field.values.courseDuration,
    ) as CourseDuration

    useEffect(() => {
        if (
            courseDuration === existedValues.courseDuration
        ) {
            return
        }
        form.setFieldValue("courseRange", "")
    }, [courseDuration])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>
                    Select the course and provide the course
                    enrollment details.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form
                    id={formId}
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="courseId"
                            children={(field) => (
                                <field.SelectField
                                    label="Course"
                                    placeholder="Select the course"
                                    options={courses}
                                />
                            )}
                        />

                        <form.AppField
                            name="courseDuration"
                            children={(field) => (
                                <field.SelectField
                                    label="Course Duration"
                                    placeholder="Select the course duration"
                                    options={[
                                        ...COURSE_DURATION_OPTIONS,
                                    ]}
                                />
                            )}
                        />
                        <form.AppField
                            name="courseRange"
                            children={(field) => (
                                <field.SelectField
                                    disabled={
                                        !courseDuration
                                    }
                                    label="Course Range"
                                    placeholder="Select the course range"
                                    options={getCourseRangeOptions(
                                        courseDuration,
                                    )}
                                />
                            )}
                        />

                        <form.AppField
                            name="medium"
                            children={(field) => (
                                <field.SelectField
                                    label="Medium"
                                    placeholder="Select the course medium"
                                    options={[
                                        ...MEDIUM_OPTIONS,
                                    ]}
                                />
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <SubmitButton
                    form={formId}
                    isPending={isPending}
                >
                    Update
                </SubmitButton>
            </CardFooter>
        </Card>
    )
}
