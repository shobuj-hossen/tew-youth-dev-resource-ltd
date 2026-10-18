"use client"

import { useAppForm } from "@/components/form/use-app-form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FieldGroup } from "@/components/ui/field"

import {
    COURSE_DURATION_OPTIONS,
    MEDIUM_OPTIONS,
} from "../../constants"
import { useSelector } from "@tanstack/react-form"
import {
    CourseDuration,
    getCourseRangeOptions,
} from "../../constants"
import {
    enrollmentInformationSchema,
    EnrollmentInformationSchemaType,
} from "../../schemas"

export function CourseInformationForm({
    onSuccess,
    formId,
    existedValues,
    courses,
}: {
    onSuccess: (v: EnrollmentInformationSchemaType) => void
    formId: string
    existedValues: EnrollmentInformationSchemaType
    courses: { label: string; value: string }[]
}) {
    const defaultValues: EnrollmentInformationSchemaType = {
        ...existedValues,
    }

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: enrollmentInformationSchema,
        },
        onSubmit: async ({ value }) => {
            onSuccess(value)
        },
    })

    const courseDuration = useSelector(
        form.store,
        (field) => field.values.courseDuration,
    ) as CourseDuration

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
        </Card>
    )
}
