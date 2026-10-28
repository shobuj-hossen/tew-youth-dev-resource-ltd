"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMutation } from "@tanstack/react-query"
import {
    Download,
    Loader2,
    MoreHorizontal,
} from "lucide-react"
import { Student, UnpaidStudent } from "../../types"

import {
    getAdmissionFormByStudentIds,
    getRegistrationsEnrollmentIds,
    getStudentIdCardByIds,
} from "../../actions"
import { admissionFormPDF } from "../../pdf/admission-form-pdf"
import {
    StudentIdCardData,
    studentIdCardsPDF,
} from "../../pdf/student-id-card-pdf"
import { registrationCardPDF } from "../../pdf/registration-card-pdf"

export function SelectedPaidStudentsAction({
    data,
}: {
    data: Student[]
}) {
    const enrollmentIds = data.map((d) => d.id)
    const studentIds = data
        .map((d) => d.student?.id)
        .filter((s): s is string => Boolean(s))

    const admissionFormMutation = useMutation({
        mutationFn: async () => {
            if (enrollmentIds.length === 0) return
            const res = await getAdmissionFormByStudentIds({
                enrollmentIds,
            })
            await Promise.all(
                res.map(
                    (d) =>
                        d.student &&
                        d.course &&
                        admissionFormPDF({
                            student: {
                                ...d.student,
                                dateOfBirth:
                                    d.student.dateOfBirth.toDateString(),
                                email:
                                    d.student.email ?? "",
                            },
                            course: {
                                duration: d.courseDuration,
                                range: d.courseRange,
                                trade: d.course?.name ?? "",
                                medium: d.medium,
                            },
                            academic: {
                                board: d.student
                                    .qualifications[0]
                                    .institution,
                                passingYear:
                                    d.student.qualifications[0].passingYear.toString(),
                                roll: d.student
                                    .qualifications[0]
                                    .rollId,
                                result: d.student
                                    .qualifications[0]
                                    .result,
                            },
                        }),
                ),
            )
        },
    })

    const studentIdMutation = useMutation({
        mutationFn: async () => {
            if (studentIds.length === 0) return
            const students: StudentIdCardData[] = (
                await getStudentIdCardByIds({
                    studentIds,
                })
            ).map((d) => ({
                student: {
                    name: d.name,
                    email: d.email || "",
                    idNumber: d.id.slice(0, 10),
                    imageUrl: d.image.secureUrl,
                    phone: d.mobile,
                    social: "",
                    institutionName: d.institutionName,
                },
            }))
            await studentIdCardsPDF(students)
        },
    })
    const registrationMutation = useMutation({
        mutationFn: async () => {
            if (enrollmentIds.length === 0) return
            const res = await getRegistrationsEnrollmentIds(
                {
                    enrollmentIds,
                },
            )

            res.map((student) =>
                registrationCardPDF({
                    student: {
                        name: student.name,
                        fatherName: student.fatherName,
                        motherName: student.motherName,
                        gender: student.gender,
                        dateOfBirth:
                            student.dateOfBirth.toDateString(),
                        email: student.email ?? "",
                        imageUrl: student.image.secureUrl,
                    },
                    branch: {
                        name: student.branchName,
                    },
                    enrollment: {
                        rollNumber:
                            student.enrollment.rollNumber ??
                            "N/A",
                        registrationNumber:
                            student.enrollment
                                .registrationNumber ??
                            "N/A",
                        courseRange:
                            student.enrollment.courseRange,
                        admissionYear: student.createdAt
                            .getFullYear()
                            .toString(),
                        courseName:
                            student.enrollment.course
                                ?.name || "",
                    },
                }),
            )
        },
    })

    const isAnyPending =
        admissionFormMutation.isPending ||
        studentIdMutation.isPending ||
        registrationMutation.isPending

    return (
        <div className="flex items-center gap-2">
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                        >
                            <span className="sr-only">
                                Open menu
                            </span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    }
                ></DropdownMenuTrigger>
                <DropdownMenuContent
                    align="end"
                    side="right"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>
                            Export
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            closeOnClick={false}
                            disabled={isAnyPending}
                            onClick={() =>
                                admissionFormMutation.mutate()
                            }
                        >
                            {admissionFormMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            {admissionFormMutation.isPending
                                ? "Downloading..."
                                : "Admission Form"}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            closeOnClick={false}
                            disabled={isAnyPending}
                            onClick={() =>
                                studentIdMutation.mutate()
                            }
                        >
                            {studentIdMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            {studentIdMutation.isPending
                                ? "Downloading..."
                                : "Student Id"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            closeOnClick={false}
                            disabled={isAnyPending}
                            onClick={() =>
                                registrationMutation.mutate()
                            }
                        >
                            {registrationMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            {registrationMutation.isPending
                                ? "Downloading..."
                                : "Registration Card"}
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
