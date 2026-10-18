import { company_client_config } from "@/utils/client-config"
import { jsPDF } from "jspdf"

export type AdmissionFormData = {
    student: {
        name: string
        fatherName: string
        motherName: string
        mobile: string
        gender: string
        dateOfBirth: string
        nationality: string
        religion: string
        bloodGroup: string
        email: string
    }
    course: {
        duration: string
        range: string
        trade: string
        medium: string
    }
    academic: {
        board: string
        passingYear: string
        roll: string
        result: string
    }
}

export const admissionFormPDF = (
    data: AdmissionFormData,
) => {
    const doc = new jsPDF("p", "mm", "a4")

    const logo = new Image()
    logo.src = "/logo.png"

    const signature = new Image()
    signature.src = "/signature.png"

    doc.addImage(logo, "PNG", 85, 10, 40, 40)
    doc.addImage(signature, "PNG", 132, 253, 38, 17)

    doc.setGState(doc.GState({ opacity: 0.2 }))
    doc.addImage(logo, "PNG", 30, 80, 140, 140)
    doc.setGState(doc.GState({ opacity: 1 }))

    doc.setFontSize(16)
    doc.setTextColor(0, 0, 0)
    doc.setFont("helvetica", "bold")
    doc.text("Admission Confirmation Form", 105, 55, {
        align: "center",
    })

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(company_client_config.COMPANY_NAME, 105, 62, {
        align: "center",
    })
    doc.text(
        company_client_config.COMPANY_ADDRESS,
        105,
        68,
        {
            align: "center",
        },
    )

    doc.line(15, 75, 195, 75)

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Personal Details", 15, 85)
    doc.setLineWidth(0.5)
    doc.line(15, 87, 47, 87)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(`Name: ${data.student.name}`, 15, 95)
    doc.text(
        `Father's Name: ${data.student.fatherName}`,
        105,
        95,
    )

    doc.text(
        `Mother's Name: ${data.student.motherName}`,
        15,
        105,
    )
    doc.text(`Mobile: ${data.student.mobile}`, 105, 105)

    doc.text(`Gender: ${data.student.gender}`, 15, 115)
    doc.text(
        `Date of Birth: ${data.student.dateOfBirth}`,
        105,
        115,
    )

    doc.text(
        `Nationality: ${data.student.nationality}`,
        15,
        125,
    )
    doc.text(`Religion: ${data.student.religion}`, 105, 125)

    doc.text(
        `Blood Group: ${data.student.bloodGroup}`,
        15,
        135,
    )
    doc.text(
        `Email: ${data.student.email || "N/A"}`,
        105,
        135,
    )

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Course Details", 15, 145)
    doc.line(15, 147, 46, 147)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(
        `Course Duration: ${data.course.duration}`,
        15,
        155,
    )
    doc.text(`Course Range: ${data.course.range}`, 105, 155)

    doc.text(`Course Trade: ${data.course.trade}`, 15, 165)
    doc.text(`Medium: ${data.course.medium}`, 105, 165)

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Academic Details", 15, 175)
    doc.line(15, 177, 49, 177)

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text(
        `Passed Board: ${data.academic.board}`,
        15,
        185,
    )
    doc.text(
        `Passed Year: ${data.academic.passingYear}`,
        105,
        185,
    )

    doc.text(`Passed Roll: ${data.academic.roll}`, 15, 195)
    doc.text(
        `Passed Result: ${data.academic.result}`,
        105,
        195,
    )

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")
    doc.text("Student's Signature", 15, 275)
    doc.text("Authority's Signature", 135, 275)

    doc.line(15, 271, 48, 271)
    doc.line(135, 271, 168, 271)

    doc.setFontSize(11)
    doc.text(
        "NB: Please note that all payments made upon admission are non-refundable.",
        15,
        289,
    )

    doc.save(
        `${data.student.name.toLocaleLowerCase()}-admission-form.pdf`,
    )
}

// admissionFormPDF({
//     student: {
//         name: "John Doe",
//         fatherName: "John's Father",
//         motherName: "John's Mother",
//         mobile: "01700000000",
//         gender: "Male",
//         dateOfBirth: "01 January 2000",
//         nationality: "Bangladeshi",
//         religion: "Islam",
//         bloodGroup: "O+",
//         email: "john@example.com",
//     },
//     course: {
//         duration: "6 Months",
//         range: "January 2026 – June 2026",
//         trade: "Computer Office Application",
//         medium: "Bangla & English",
//     },
//     academic: {
//         board: "Dhaka",
//         passingYear: "2024",
//         roll: "123456",
//         result: "4.50",
//     },
// })
