"use client"

import {
    Building2,
    FileText,
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
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { BranchApplicationSchemaType } from "../../schemas"
import {
    getDistrictById,
    getDivisionById,
    getUpazilaById,
} from "../../helpers"

export function ApplicationFormPreview({
    applicationForm,
}: {
    applicationForm: BranchApplicationSchemaType
}) {
    const {
        branchName,
        ownerName,
        fatherName,
        motherName,
        bloodGroup,
        nidNumber,
        gender,
        logo,
        mobile,
        email,
        age,
        computerCount,
        divisionId,
        districtId,
        upazilaId,
        area,
        postalCode,
        electricityBill,
        nidDocument,
        tradeLicense,
    } = applicationForm

    return (
        <div className="mx-auto max-w-4xl">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="size-14 ">
                                <AvatarImage
                                    src={
                                        logo
                                            ? URL.createObjectURL(
                                                  logo.croppedFile,
                                              )
                                            : undefined
                                    }
                                    alt={branchName}
                                />
                                <AvatarFallback>
                                    <Building2 />
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <CardTitle>
                                    {branchName}
                                </CardTitle>
                                <CardDescription>
                                    Branch application
                                    preview
                                </CardDescription>
                            </div>
                        </div>

                        <Badge variant="secondary">
                            Form Data
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-8">
                    <Separator />

                    <section className="space-y-4">
                        <SectionHeader
                            icon={<User />}
                            title="Owner Information"
                        />

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Info
                                label="Full Name"
                                value={ownerName}
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
                                label="Gender"
                                value={gender}
                            />
                            <Info
                                label="Blood Group"
                                value={bloodGroup}
                            />
                            <Info
                                label="NID Number"
                                value={nidNumber}
                            />
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-4">
                        <SectionHeader
                            icon={<Phone />}
                            title="Contact Information"
                        />

                        <div className="grid gap-6">
                            <Info
                                label="Mobile Number"
                                value={mobile}
                            />
                            <Info
                                label="Email Address"
                                value={email}
                            />
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-4">
                        <SectionHeader
                            icon={<MapPin />}
                            title="Branch Location"
                        />

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <Info
                                label="Division"
                                value={getDivisionById(
                                    divisionId,
                                )}
                            />
                            <Info
                                label="District"
                                value={getDistrictById(
                                    districtId,
                                )}
                            />
                            <Info
                                label="Upazila"
                                value={getUpazilaById(
                                    upazilaId,
                                )}
                            />
                            <Info
                                label="Area / Address"
                                value={area}
                            />
                            <Info
                                label="Postal Code"
                                value={postalCode}
                            />
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-4">
                        <SectionHeader
                            icon={<Building2 />}
                            title="Branch Details"
                        />

                        <div className="grid gap-6 sm:grid-cols-2">
                            <Info
                                label="Branch Name"
                                value={branchName}
                            />
                            <Info
                                label="Computer Capacity"
                                value={`${computerCount} computers`}
                            />
                            <Info
                                label="Age"
                                value={`${age} years`}
                            />
                        </div>
                    </section>

                    <Separator />

                    <section className="space-y-4">
                        <SectionHeader
                            icon={<FileText />}
                            title="Documents"
                        />

                        <div className="grid gap-3 sm:grid-cols-2">
                            <Document
                                label="NID Document"
                                file={nidDocument}
                            />
                            <Document
                                label="Trade License"
                                file={tradeLicense}
                            />
                            <Document
                                label="Electricity Bill"
                                file={electricityBill}
                            />
                            <Document
                                label="Branch Logo"
                                file={logo.croppedFile}
                            />
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
            <span className="text-muted-foreground">
                {icon}
            </span>
            <h3 className="font-semibold">{title}</h3>
        </div>
    )
}

function Info({
    label,
    value,
}: {
    label: string
    value?: string | number | null
}) {
    return (
        <div>
            <p className="text-sm text-muted-foreground">
                {label}
            </p>
            <p className="mt-1 font-medium">
                {value || "—"}
            </p>
        </div>
    )
}

function Document({
    label,
    file,
}: {
    label: string
    file: File | null
}) {
    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-4">
                <div className="rounded-md border p-2">
                    <FileText className="size-4 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-medium">
                        {label}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                        {file?.name || "Not provided"}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
