"use client"

import {
    Download,
    FileText,
    MapPin,
    User,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link"
import { BranchApplicationById } from "../types"

export function ApplicationDetails({
    application,
}: {
    application: BranchApplicationById
}) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-start justify-between gap-4">
                    <div className="flex gap-4">
                        <Avatar className={"mt-1"}>
                            <AvatarImage
                                src={
                                    application.logo
                                        ?.secureUrl
                                }
                            />
                            <AvatarFallback>
                                CN
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>
                                {application.branchName}
                            </CardTitle>
                            <CardDescription>
                                Application ID:{" "}
                                {application.id}
                            </CardDescription>
                        </div>
                    </div>

                    <Badge
                        variant={
                            application.status ===
                            "approved"
                                ? "default"
                                : application.status ===
                                    "rejected"
                                  ? "destructive"
                                  : "secondary"
                        }
                    >
                        {application.status}
                    </Badge>
                </CardHeader>

                <CardContent className="grid gap-6 sm:grid-cols-2 ">
                    <Info
                        label="Email"
                        value={application.email}
                    />
                    <Info
                        label="Mobile"
                        value={application.mobile}
                    />
                    <Info
                        label="Computer Count"
                        value={application.computerCount}
                    />
                    <Info
                        label="Applied On"
                        value={application.createdAt.toLocaleDateString()}
                    />
                    <Info
                        label="Payment Amount"
                        value={
                            application.oneTimePaymentAmount
                        }
                    />
                    <Info
                        label="Is Paid"
                        value={
                            application.isOneTimePaid
                                ? "Paid"
                                : "Pending"
                        }
                    />
                </CardContent>
            </Card>

            <div className="grid gap-6 ">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin />
                            Branch Information
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-5 sm:grid-cols-2">
                        <Info
                            label="Branch Name"
                            value={application.branchName}
                        />
                        <Info
                            label="Division"
                            value={application.divisionId}
                        />
                        <Info
                            label="District"
                            value={application.districtId}
                        />
                        <Info
                            label="Upazila"
                            value={application.upazilaId}
                        />
                        <Info
                            label="Area"
                            value={application.area}
                        />
                        <Info
                            label="Postal Code"
                            value={application.postalCode}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User />
                            Owner Information
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-5 sm:grid-cols-2">
                        <Info
                            label="Name"
                            value={application.ownerName}
                        />
                        <Info
                            label="Father's Name"
                            value={application.fatherName}
                        />
                        <Info
                            label="Mother's Name"
                            value={application.motherName}
                        />
                        <Info
                            label="NID Number"
                            value={application.nidNumber}
                        />
                        <Info
                            label="Gender"
                            value={application.gender}
                        />
                        <Info
                            label="Blood Group"
                            value={application.bloodGroup}
                        />
                        <Info
                            label="Age"
                            value={application.age}
                        />
                        <Info
                            label="Mobile"
                            value={application.mobile}
                        />
                    </CardContent>
                </Card>
            </div>

            {application.description && (
                <Card>
                    <CardHeader>
                        <CardTitle>Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            {application.description}
                        </p>
                    </CardContent>
                </Card>
            )}

            <Documents application={application} />

            {application.status === "rejected" &&
                application.rejectionReason && (
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Rejection Reason
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>
                                {
                                    application.rejectionReason
                                }
                            </p>
                        </CardContent>
                    </Card>
                )}
        </div>
    )
}

function Info({
    label,
    value,
}: {
    label: string
    value: React.ReactNode
}) {
    return (
        <div>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
            <p className="font-medium">{value || "—"}</p>
        </div>
    )
}

function DocumentItem({
    label,
    file,
}: {
    label: string
    file: BranchApplicationById["nidDocument"]
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
                <FileText className="text-muted-foreground size-5" />
                <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-muted-foreground text-sm">
                        {file.format ?? "Uploaded document"}
                    </p>
                </div>
            </div>

            <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={
                    <Link
                        href={file.secureUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                    />
                }
            >
                <Download />
                Download
            </Button>
        </div>
    )
}

function Documents({
    application,
}: {
    application: BranchApplicationById
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                    Documents submitted with this
                    application.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                <DocumentItem
                    label="NID Document"
                    file={application.nidDocument}
                />
                <Separator />
                <DocumentItem
                    label="Trade License"
                    file={application.tradeLicense}
                />
                <Separator />
                <DocumentItem
                    label="Electricity Bill"
                    file={application.electricityBill}
                />
            </CardContent>
        </Card>
    )
}
