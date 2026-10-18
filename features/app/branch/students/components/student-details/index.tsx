"use client"
import { Download, Pencil } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import Link from "next/link"
import {
    CourseDuration,
    getCourseRangeLabel,
    getDuration,
} from "../../constants"
import { admissionFormPDF } from "../../pdf/admission-form-pdf"
import {
    Course,
    StudentDetailsByEnrollmentId,
} from "../../types"
import { registrationCardPDF } from "../../pdf/registration-card-pdf"
import DownloadButtons from "./download-buttons"

export function StudentDetails({
    student,
    enrollmentId,
    backTo,
}: {
    student: StudentDetailsByEnrollmentId
    enrollmentId: string
    backTo: string
}) {
    return (
        <Card>
            <CardHeader className="pb-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-14 border">
                            <AvatarImage
                                src={
                                    student.image?.secureUrl
                                }
                                alt={student.name}
                            />
                            <AvatarFallback className="text-base">
                                {getInitials(student.name)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <h2 className="truncate text-base font-semibold">
                                {student.name}
                            </h2>

                            <p className="truncate text-sm text-muted-foreground">
                                {student.email ??
                                    student.mobile}
                            </p>
                        </div>
                    </div>

                    <Button
                        nativeButton={false}
                        render={
                            <Link
                                href={`${backTo}/${enrollmentId}/update-student`}
                            />
                        }
                        variant="outline"
                        size="sm"
                    >
                        <Pencil />
                        Edit Student Data
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <section className="space-y-4">
                    <SectionHeader title="Personal Information" />

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
                        <Info
                            label="Name"
                            value={student.name}
                        />
                        <Info
                            label="Email"
                            value={student.email}
                        />
                        <Info
                            label="Mobile"
                            value={student.mobile}
                        />
                        <Info
                            label="Gender"
                            value={student.gender}
                        />
                        <Info
                            label="Blood Group"
                            value={student.bloodGroup}
                        />
                        <Info
                            label="Date of Birth"
                            value={formatDate(
                                student.dateOfBirth,
                            )}
                        />
                        <Info
                            label="Father's Name"
                            value={student.fatherName}
                        />
                        <Info
                            label="Mother's Name"
                            value={student.motherName}
                        />
                        <Info
                            label="Religion"
                            value={student.religion}
                        />
                        <Info
                            label="Nationality"
                            value={student.nationality}
                        />
                    </div>
                </section>

                <Separator />

                <section className="space-y-4">
                    <SectionHeader title="Enrollment Information" />

                    <div className="space-y-3">
                        {student.enrollments.map(
                            (enrollment) => {
                                const courseRange =
                                    getCourseRangeLabel(
                                        enrollment.courseRange,
                                        enrollment.courseDuration as CourseDuration,
                                    )

                                return (
                                    <div
                                        key={enrollment.id}
                                        className="rounded-lg border bg-muted/20 p-4 space-y-4"
                                    >
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                            <div>
                                                <p className="font-medium">
                                                    Course
                                                    Enrollment
                                                </p>

                                                <p className="mt-1 text-sm text-muted-foreground">
                                                    {
                                                        courseRange
                                                    }{" "}
                                                    ·{" "}
                                                    {getDuration(
                                                        enrollment.courseDuration as CourseDuration,
                                                    )}{" "}
                                                    ·{" "}
                                                    {
                                                        enrollment.medium
                                                    }
                                                </p>
                                            </div>

                                            <Badge
                                                variant={
                                                    enrollment.status ===
                                                    "active"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                            >
                                                {
                                                    enrollment.status
                                                }
                                            </Badge>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
                                            <Info
                                                label="Registration"
                                                value={
                                                    enrollment.registrationNumber
                                                }
                                            />
                                            <Info
                                                label="Roll Number"
                                                value={
                                                    enrollment.rollNumber
                                                }
                                            />
                                            <Info
                                                label="Serial No."
                                                value={
                                                    enrollment.serialNo
                                                }
                                            />
                                            <Info
                                                label="Payment"
                                                value={
                                                    enrollment.paymentStatus
                                                }
                                            />
                                        </div>

                                        <DownloadButtons
                                            student={
                                                student
                                            }
                                            enrollment={
                                                enrollment
                                            }
                                        />
                                    </div>
                                )
                            },
                        )}
                    </div>
                </section>

                <Separator />

                <section className="space-y-4">
                    <SectionHeader title="Academic Qualifications" />

                    <div className="divide-y rounded-lg border">
                        {student.qualifications.map(
                            (qualification) => (
                                <div
                                    key={qualification.id}
                                    className="grid gap-3 p-4 sm:grid-cols-[1fr_1.5fr_100px_1fr]"
                                >
                                    <Info
                                        label="Level"
                                        value={
                                            qualification.level
                                        }
                                    />
                                    <Info
                                        label="Institution"
                                        value={
                                            qualification.institution
                                        }
                                    />
                                    <Info
                                        label="Year"
                                        value={
                                            qualification.passingYear
                                        }
                                    />
                                    <Info
                                        label="Result"
                                        value={
                                            qualification.result
                                        }
                                    />
                                </div>
                            ),
                        )}
                    </div>
                </section>
            </CardContent>
        </Card>
    )
}

function SectionHeader({ title }: { title: string }) {
    return (
        <div>
            <h3 className="text-sm font-semibold">
                {title}
            </h3>
            <div className="mt-1 h-px bg-border" />
        </div>
    )
}

function Info({
    label,
    value,
}: {
    label: string
    value: string | number | null
}) {
    return (
        <div className="min-w-0 space-y-1">
            <p className="text-xs text-muted-foreground">
                {label}
            </p>
            <p className="truncate text-sm font-medium">
                {value ?? "—"}
            </p>
        </div>
    )
}

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase()
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date)
}
