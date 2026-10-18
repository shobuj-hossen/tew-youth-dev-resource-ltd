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
import { toast } from "@/components/ui/toast"
import { courseStatuses } from "@/constants/course"
import { capitalize } from "@/utils/helpers"
import { useMutation } from "@tanstack/react-query"
import { updateCourse } from "../actions"
import {
    updateCourseSchema,
    UpdateCourseSchemaType,
} from "../schemas"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { SubmitButton } from "@/components/shared/submit-button"

export function UpdateCourseForm({
    existedValue,
}: {
    existedValue: UpdateCourseSchemaType & { id: string }
}) {
    const defaultValues: UpdateCourseSchemaType =
        existedValue
    const router = useRouter()
    const updateMutation = useMutation({
        mutationFn: updateCourse,
        onSuccess: () => {
            router.push("/dashboard/courses")
        },
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: updateCourseSchema,
        },
        onSubmit: async ({ value }) => {
            updateMutation.mutate({
                ...value,
                id: existedValue.id,
            })
        },
    })

    const [changeBanner, setChangeBanner] = useState(false)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Update Course</CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    id="update-course-form"
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        {changeBanner ? (
                            <form.AppField
                                name="banner"
                                children={(field) => (
                                    <field.FileField label="Banner" />
                                )}
                            />
                        ) : (
                            <div className="space-y-1.5">
                                <Image
                                    className="w-full rounded-sm aspect-video object-cover"
                                    src={
                                        existedValue
                                            .existingBanner
                                            .secureUrl
                                    }
                                    height={100}
                                    width={200}
                                    alt="banner-img"
                                />
                                <Button
                                    onClick={() =>
                                        setChangeBanner(
                                            true,
                                        )
                                    }
                                    variant={"ghost"}
                                    className={
                                        "text-destructive"
                                    }
                                >
                                    Change
                                </Button>
                            </div>
                        )}
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
                            setChangeBanner(false)
                            router.push(
                                "/dashboard/courses",
                            )
                        }}
                        variant={"ghost"}
                    >
                        Cancel
                    </Button>
                    <SubmitButton
                        isPending={updateMutation.isPending}
                        form={"update-course-form"}
                        type="submit"
                    >
                        Update
                    </SubmitButton>
                </Field>
            </CardFooter>
        </Card>
    )
}
