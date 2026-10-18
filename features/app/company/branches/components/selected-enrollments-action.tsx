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

import { EnrollmentBranchById } from "../types"
import { certificatePDF } from "../pdf/certificate-pdf"
import { getCertificatesByIds } from "../actions"
import { ProvideResultDialog } from "./provide-result-dialog"

export function SelectedEnrollmentsAction({
    data,
}: {
    data: EnrollmentBranchById[]
}) {
    const certificateMutation = useMutation({
        mutationFn: async () => {
            const res = await getCertificatesByIds({
                enrollmentIds: data.map((d) => d.id),
            })

            await Promise.all(
                res.map((d) =>
                    certificatePDF({
                        SLNo: d.serialNo,
                        roll: d.rollNumber,
                        reg: d.registrationNumber,
                        fullName: d.student?.name || "NA",
                        fathersName:
                            d.student?.fatherName || "NA",
                        mothersName:
                            d.student?.motherName || "NA",
                        courseName: d.course?.name || "NA",
                        branchName: d.branchName,
                        branchCode: "",
                        held: d.courseRange,
                        grade: "A+",
                    }),
                ),
            )
        },
    })

    const downloadCSV = () => {
        const headers = [
            "Serial No",
            "Roll Number",
            "Registration Number",
            "Student Name",
            "Father's Name",
            "Mother's Name",
            "Course",
            "Branch",
            "Course Range",
        ]

        const escapeCSV = (value: unknown) =>
            `"${String(value ?? "").replaceAll('"', '""')}"`

        const rows = data.map((d) => [
            d.serialNo,
            d.rollNumber,
            d.registrationNumber,
            d.student?.name || "NA",
            d.student?.fatherName || "NA",
            d.student?.motherName || "NA",
            d.course?.name || "NA",
            d.courseRange,
        ])

        const csv = [
            headers.map(escapeCSV).join(","),
            ...rows.map((row) =>
                row.map(escapeCSV).join(","),
            ),
        ].join("\r\n")

        const blob = new Blob([csv], {
            type: "text/csv;charset=utf-8;",
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")

        link.href = url
        link.download = `enrollments-${new Date()
            .toISOString()
            .slice(0, 10)}.csv`

        document.body.appendChild(link)
        link.click()
        link.remove()

        URL.revokeObjectURL(url)
    }

    return (
        <div className="flex items-center gap-2">
            <ProvideResultDialog data={data} />

            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <Button
                            variant="ghost"
                            className="h-8 w-8 p-0"
                        />
                    }
                >
                    <span className="sr-only">
                        Open menu
                    </span>

                    <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>

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
                            disabled={
                                certificateMutation.isPending
                            }
                            onClick={() =>
                                certificateMutation.mutate()
                            }
                            closeOnClick={false}
                        >
                            {certificateMutation.isPending ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <Download />
                            )}

                            {certificateMutation.isPending
                                ? "Downloading..."
                                : "Download Certificate"}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={downloadCSV}
                            disabled={
                                certificateMutation.isPending
                            }
                        >
                            <Download />
                            Export as CSV
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
