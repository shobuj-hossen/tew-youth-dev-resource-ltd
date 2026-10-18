"use client"

import { useAppForm } from "@/components/form/use-app-form"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { courseStatuses } from "@/constants/course"

import { SubmitButton } from "@/components/shared/submit-button"
import { capitalize } from "@/utils/helpers"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { addCourse } from "../actions"
import { courseSchema, CourseSchemaType } from "../schemas"

export function AddCourseForm() {
    const router = useRouter()
    const defaultValues: CourseSchemaType = {
        name: "",
        code: "",
        description: "",
        status: "active",
        banner: null as unknown as File,
        threeMonthsFee: null,
        sixMonthsFee: null,
        oneYearFee: null,
        twoYearsFee: null,
        threeYearsFee: null,
        fourYearsFee: null,
    }

    const addMutation = useMutation({
        mutationFn: addCourse,
        onSuccess: () => {
            router.push("/dashboard/courses")
            form.reset()
        },
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: courseSchema,
        },
        onSubmit: async ({ value }) => {
            addMutation.mutate(value)
        },
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Course</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    id="course-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.AppField
                            name="banner"
                            children={(field) => (
                                <field.FileField
                                    accept={{
                                        "image/jpeg": [
                                            ".jpeg",
                                            ".jpg",
                                        ],
                                        "image/png": [
                                            ".png",
                                        ],
                                    }}
                                    label="Banner"
                                />
                            )}
                        />
                        <form.AppField
                            name="name"
                            children={(field) => (
                                <field.TextField label="Course Name" />
                            )}
                        />
                        <form.AppField
                            name="code"
                            children={(field) => (
                                <field.TextField label="Course Code" />
                            )}
                        />
                        <form.AppField
                            name="status"
                            children={(field) => (
                                <field.SelectField
                                    options={courseStatuses.map(
                                        (v) => ({
                                            label: capitalize(
                                                v,
                                            ),
                                            value: v,
                                        }),
                                    )}
                                    label="Course Code"
                                />
                            )}
                        />
                        <form.AppField
                            name="description"
                            children={(field) => (
                                <field.TextareaField label="Course Description (optional)" />
                            )}
                        />
                        <Field>
                            <FieldLabel>
                                {
                                    "Define your course fees (optional), if not provided, the enrollment will be automatic. But you change update it later"
                                }
                            </FieldLabel>
                            <div className="grid grid-cols-2 gap-5">
                                <form.AppField
                                    name="threeMonthsFee"
                                    children={(field) => (
                                        <field.NumberField label="3 Months Fee" />
                                    )}
                                />
                                <form.AppField
                                    name="sixMonthsFee"
                                    children={(field) => (
                                        <field.NumberField label="6 Months Fee" />
                                    )}
                                />
                                <form.AppField
                                    name="oneYearFee"
                                    children={(field) => (
                                        <field.NumberField label="1 Year Fee" />
                                    )}
                                />
                                <form.AppField
                                    name="twoYearsFee"
                                    children={(field) => (
                                        <field.NumberField label="2 Years Fee" />
                                    )}
                                />
                                <form.AppField
                                    name="threeYearsFee"
                                    children={(field) => (
                                        <field.NumberField label="3 Years Fee" />
                                    )}
                                />
                                <form.AppField
                                    name="fourYearsFee"
                                    children={(field) => (
                                        <field.NumberField label="4 Years Fee" />
                                    )}
                                />
                            </div>
                        </Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field
                    className="justify-end"
                    orientation={"horizontal"}
                >
                    <Button
                        onClick={() => {
                            form.reset()
                        }}
                        variant={"ghost"}
                    >
                        Cancel
                    </Button>
                    <SubmitButton
                        isPending={addMutation.isPending}
                        form={"course-form"}
                        type="submit"
                    >
                        Submit
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
