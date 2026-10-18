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
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FieldGroup } from "@/components/ui/field"
import { students } from "@/drizzle/schema"
import { useSelector } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { BookOpen, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import { joinAnotherCourse } from "../../actions"
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
import { StudentByEnrolledId } from "../../types"

export function JoinAnotherCourseForm({
    formId,
    courses,
    backTo,
    student,
}: {
    formId: string
    courses: { label: string; value: string }[]
    backTo: string
    student: StudentByEnrolledId
}) {
    const defaultValues: EnrollmentInformationSchemaType = {
        medium: "",
        courseDuration: "",
        courseId: "",
        courseRange: "",
    }

    const router = useRouter()

    const { isPending, mutate } = useMutation({
        mutationFn: joinAnotherCourse,
        onSuccess: () => {
            router.push(backTo)
        },
    })

    const form = useAppForm({
        defaultValues,
        validators: {
            onChange: enrollmentInformationSchema,
        },
        onSubmit: async ({ value }) => {
            mutate({ ...value, studentId: student.id })
        },
    })

    const courseDuration = useSelector(
        form.store,
        (field) => field.values.courseDuration,
    ) as CourseDuration

    const studentInitials = student.name
        .split(" ")
        .map((name) => name.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase()

    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-5">
                <div className="bg-muted/50 flex items-center justify-between gap-4 rounded-xl border p-4">
                    <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="size-12 shrink-0">
                            <AvatarImage
                                src={
                                    student.image
                                        .secureUrl ??
                                    undefined
                                }
                                alt={student.name}
                            />
                            <AvatarFallback className="text-sm font-medium">
                                {studentInitials}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <p className="truncate font-semibold">
                                    {student.name}
                                </p>
                                <Badge
                                    variant="secondary"
                                    className="gap-1"
                                >
                                    <BookOpen className="size-3" />
                                    Student
                                </Badge>
                            </div>

                            <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
                                <Phone className="size-3.5" />
                                <span>
                                    {student.mobile}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <CardTitle className="text-lg">
                        Join Another Course
                    </CardTitle>
                    <CardDescription className="mt-1">
                        Select a new course and provide the
                        enrollment details for this student.
                    </CardDescription>
                </div>
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
                    Confirm
                </SubmitButton>
            </CardFooter>
        </Card>
    )
}
