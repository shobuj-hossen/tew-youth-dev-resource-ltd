import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { admissionFormPDF } from "../../pdf/admission-form-pdf"
import { registrationCardPDF } from "../../pdf/registration-card-pdf"
import { StudentDetailsByEnrollmentId } from "../../types"

export default function DownloadButtons({
    student,
    enrollment,
}: {
    student: StudentDetailsByEnrollmentId
    enrollment: StudentDetailsByEnrollmentId["enrollments"][number]
}) {
    return (
        <div className="divide-y rounded-lg  flex gap-4">
            <Button
                onClick={() => {
                    admissionFormPDF({
                        student: {
                            ...student,
                            dateOfBirth:
                                student.dateOfBirth.toDateString(),
                            email: student.email ?? "",
                        },
                        course: {
                            duration:
                                enrollment.courseDuration,
                            range: enrollment.courseRange,
                            trade:
                                enrollment.course?.name ??
                                "",
                            medium: enrollment.medium,
                        },
                        academic: {
                            board: student.qualifications[0]
                                .institution,
                            passingYear:
                                student.qualifications[0].passingYear.toString(),
                            roll: student.qualifications[0]
                                .rollId,
                            result: student
                                .qualifications[0].result,
                        },
                    })
                }}
            >
                <Download /> Admission Form
            </Button>
            {enrollment.paymentStatus === "paid" && (
                <Button
                    onClick={() => {
                        registrationCardPDF({
                            student: {
                                name: student.name,
                                fatherName:
                                    student.fatherName,
                                motherName:
                                    student.motherName,
                                gender: student.gender,
                                dateOfBirth:
                                    student.dateOfBirth.toDateString(),
                                email: student.email ?? "",
                                imageUrl:
                                    student.image.secureUrl,
                            },
                            branch: {
                                name: student.branchName,
                            },
                            enrollment: {
                                rollNumber:
                                    enrollment.rollNumber ??
                                    "N/A",
                                registrationNumber:
                                    enrollment.registrationNumber ??
                                    "N/A",
                                courseRange:
                                    enrollment.courseRange,
                                admissionYear:
                                    student.createdAt
                                        .getFullYear()
                                        .toString(),
                            },
                        })
                    }}
                >
                    <Download />
                    Registration
                </Button>
            )}
        </div>
    )
}
