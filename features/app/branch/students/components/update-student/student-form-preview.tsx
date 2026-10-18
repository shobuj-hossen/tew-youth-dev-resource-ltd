"use client"

import {
    BookOpen,
    Calendar,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    User,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { UpdateStudentSchemaType } from "../../schemas"
import {
    ACADEMIC_LEVEL_OPTIONS,
    INSTITUTION_OPTIONS,
} from "../../constants"

export function StudentFormPreview({
    studentForm,
}: {
    studentForm: UpdateStudentSchemaType
}) {
    const {
        image,
        name,
        fatherName,
        motherName,
        mobile,
        religion,
        bloodGroup,
        nationality,
        gender,
        dateOfBirth,
        email,
        academicInformation,
        existingImage,
    } = studentForm

    const imageUrl = image
        ? URL.createObjectURL(image.croppedFile)
        : existingImage.secureUrl

    return (
        <div className="mx-auto w-full max-w-4xl">
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-4">
                            <Avatar className="size-16 shrink-0">
                                <AvatarImage
                                    src={imageUrl}
                                    alt={name}
                                />
                                <AvatarFallback>
                                    <User />
                                </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0">
                                <CardTitle className="truncate text-xl">
                                    {name || "Student Name"}
                                </CardTitle>
                            </div>
                        </div>

                        <Badge
                            variant="secondary"
                            className="shrink-0"
                        >
                            Preview
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    <Separator />

                    <section className="space-y-3">
                        <SectionHeader
                            icon={<User />}
                            title="Personal Information"
                        />

                        <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 ">
                            <Info
                                label="Full Name"
                                value={name}
                            />

                            <Info
                                label="Father's Name"
                                value={fatherName}
                            />

                            <Info
                                label="Mother's Name"
                                value={motherName}
                            />

                            <Info
                                label="Mobile"
                                value={mobile}
                                icon={<Phone />}
                            />

                            <Info
                                label="Email"
                                value={email}
                                fallback="Not provided"
                                icon={<Mail />}
                            />

                            {dateOfBirth && (
                                <Info
                                    label="Date of Birth"
                                    value={formatDate(
                                        dateOfBirth,
                                    )}
                                    icon={<Calendar />}
                                />
                            )}

                            <Info
                                label="Gender"
                                value={gender}
                            />

                            <Info
                                label="Blood Group"
                                value={bloodGroup}
                            />

                            <Info
                                label="Religion"
                                value={religion}
                            />

                            <Info
                                label="Nationality"
                                value={nationality}
                            />
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-3">
                        <SectionHeader
                            icon={<BookOpen />}
                            title="Course Information"
                        />
                    </section>

                    <Separator />

                    <section className="space-y-3">
                        <div className="flex items-center justify-between gap-3">
                            <SectionHeader
                                icon={<GraduationCap />}
                                title="Academic Information"
                            />

                            <Badge variant="outline">
                                {academicInformation.length}{" "}
                                {academicInformation.length ===
                                1
                                    ? "Qualification"
                                    : "Qualifications"}
                            </Badge>
                        </div>

                        <div className="space-y-3">
                            {academicInformation.map(
                                (academic, index) => (
                                    <div
                                        key={`${academic.level}-${index}`}
                                        className="rounded-lg border bg-muted/30 p-4"
                                    >
                                        <div className="mb-3 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-2">
                                                <Badge>
                                                    {ACADEMIC_LEVEL_OPTIONS.find(
                                                        (
                                                            a,
                                                        ) =>
                                                            a.value ===
                                                            academic.level,
                                                    )
                                                        ?.label ||
                                                        "Qualification"}
                                                </Badge>

                                                <span className="text-sm font-medium">
                                                    {INSTITUTION_OPTIONS.find(
                                                        (
                                                            i,
                                                        ) =>
                                                            i.value ===
                                                            academic.institution,
                                                    )
                                                        ?.label ||
                                                        "Institution not selected"}
                                                </span>
                                            </div>

                                            <span className="text-sm text-muted-foreground">
                                                {academic.passingYear ||
                                                    "—"}
                                            </span>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <Info
                                                label="Roll / ID"
                                                value={
                                                    academic.rollId
                                                }
                                            />

                                            <Info
                                                label="Result / GPA"
                                                value={
                                                    academic.result
                                                }
                                            />
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </section>
                </CardContent>
            </Card>
        </div>
    )
}

function SectionHeader({
    icon,
    title,
}: {
    icon: React.ReactNode
    title: string
}) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                {icon}
            </div>

            <h3 className="text-sm font-semibold">
                {title}
            </h3>
        </div>
    )
}

function Info({
    label,
    value,
    fallback = "—",
    icon,
}: {
    label: string
    value?: string | number
    fallback?: string
    icon?: React.ReactNode
}) {
    const displayValue =
        value === undefined ||
        value === null ||
        value === ""
            ? fallback
            : String(value)

    return (
        <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {icon}
                <span>{label}</span>
            </div>

            <p className="truncate text-sm font-medium">
                {displayValue}
            </p>
        </div>
    )
}

function formatDate(value: Date) {
    if (!(value instanceof Date)) {
        return "—"
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(value)
}
