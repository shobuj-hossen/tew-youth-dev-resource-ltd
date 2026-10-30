import { PublicStudentResult } from "@/features/marketing/schemas"
import { jsPDF } from "jspdf"

const institutionName =
    process.env.NEXT_PUBLIC_COMPANY_NAME ||
    "Educational Institution"

const logoPath =
    process.env.NEXT_PUBLIC_COMPANY_LOGO || "/logo.png"

async function getImageData(url: string) {
    try {
        const response = await fetch(url)

        if (!response.ok) return null

        const blob = await response.blob()

        return await new Promise<string | null>(
            (resolve) => {
                const reader = new FileReader()

                reader.onload = () =>
                    resolve(reader.result as string)

                reader.onerror = () => resolve(null)

                reader.readAsDataURL(blob)
            },
        )
    } catch {
        return null
    }
}

export async function generateResultPDF(
    data: PublicStudentResult,
) {
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    })

    const pageWidth = 210
    const margin = 18

    const navy = [24, 43, 73] as const
    const muted = [105, 115, 130] as const

    const logo = await getImageData(logoPath)

    // Institution header
    if (logo) {
        pdf.addImage(logo, "PNG", margin, 14, 19, 19)
    }

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(17)
    pdf.setTextColor(...navy)

    pdf.text(institutionName, logo ? 43 : margin, 22, {
        maxWidth: logo ? 145 : 174,
    })

    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(9)
    pdf.setTextColor(...muted)

    pdf.text(
        "OFFICIAL ACADEMIC RESULT STATEMENT",
        logo ? 43 : margin,
        29,
    )

    pdf.setDrawColor(...navy)
    pdf.setLineWidth(0.7)

    pdf.line(margin, 39, pageWidth - margin, 39)

    // Document heading
    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(14)
    pdf.setTextColor(...navy)

    pdf.text("STUDENT RESULT", pageWidth / 2, 50, {
        align: "center",
    })

    // Section heading helper
    const section = (heading: string, y: number) => {
        pdf.setFillColor(240, 243, 248)
        pdf.roundedRect(
            margin,
            y,
            pageWidth - margin * 2,
            9,
            1.5,
            1.5,
            "F",
        )

        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(10)
        pdf.setTextColor(...navy)

        pdf.text(heading, margin + 4, y + 6)
    }

    const field = (
        label: string,
        value: string,
        x: number,
        y: number,
    ) => {
        pdf.setFont("helvetica", "normal")
        pdf.setFontSize(9)
        pdf.setTextColor(...muted)

        pdf.text(label, x, y)

        pdf.setFont("helvetica", "bold")
        pdf.setFontSize(10)
        pdf.setTextColor(35, 43, 55)

        pdf.text(value || "-", x, y + 6)
    }

    const student = data.student
    const enrollment = data.enrollment

    section("STUDENT INFORMATION", 60)

    field("Student Name", student.name, margin + 2, 78)
    field("Father's Name", student.fatherName, 110, 78)

    field(
        "Mother's Name",
        student.motherName,
        margin + 2,
        98,
    )

    section("ENROLLMENT INFORMATION", 115)

    field(
        "Roll Number",
        enrollment.rollNumber,
        margin + 2,
        133,
    )
    field(
        "Registration Number",
        enrollment.registrationNumber,
        110,
        133,
    )

    field(
        "Serial Number",
        enrollment.serialNo,
        margin + 2,
        153,
    )
    field(
        "Course Duration",
        enrollment.courseDuration,
        110,
        153,
    )

    field(
        "Course Range",
        enrollment.courseRange,
        margin + 2,
        173,
    )
    field("Medium", enrollment.medium, 110, 173)

    // Result highlight
    section("PUBLISHED RESULT", 190)

    pdf.setDrawColor(215, 222, 232)
    pdf.setFillColor(248, 250, 253)

    pdf.roundedRect(
        margin,
        204,
        pageWidth - margin * 2,
        28,
        2,
        2,
        "FD",
    )

    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(10)
    pdf.setTextColor(...muted)

    pdf.text("FINAL RESULT", pageWidth / 2, 213, {
        align: "center",
    })

    pdf.setFont("helvetica", "bold")
    pdf.setFontSize(19)
    pdf.setTextColor(...navy)

    pdf.text(enrollment.result, pageWidth / 2, 225, {
        align: "center",
    })

    // Footer
    pdf.setDrawColor(215, 222, 232)

    pdf.line(margin, 265, pageWidth - margin, 265)

    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(8)
    pdf.setTextColor(...muted)

    pdf.text(
        `Generated on ${new Date().toLocaleDateString("en-GB")}`,
        margin,
        273,
    )

    pdf.text(
        "Official Student Result Statement",
        pageWidth - margin,
        273,
        { align: "right" },
    )

    pdf.save(`Result-${enrollment.rollNumber}.pdf`)
}
