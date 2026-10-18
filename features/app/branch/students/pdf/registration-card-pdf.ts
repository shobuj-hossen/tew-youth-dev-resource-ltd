import { jsPDF } from "jspdf"

export type RegistrationCardData = {
    student: {
        name: string
        fatherName: string
        motherName: string
        gender: string
        dateOfBirth: string
        email: string
        imageUrl: string
    }
    branch: {
        name: string
    }
    enrollment: {
        rollNumber: string
        registrationNumber: string
        courseRange: string
        admissionYear: string
    }
}

export const registrationCardPDF = (
    data: RegistrationCardData,
) => {
    const doc = new jsPDF("p", "mm", "a4")

    const templateImage = new Image()
    templateImage.src = "/registration.jpeg"

    doc.addImage(templateImage, "JPEG", 10, 10, 190, 277)

    const profileImage = new Image()
    profileImage.src = data.student.imageUrl

    doc.addImage(profileImage, "JPEG", 150, 135, 30, 30)

    const overlayImage = new Image()
    overlayImage.src = "/white.png"

    doc.addImage(overlayImage, "PNG", 51, 212, 5, 5)

    doc.setFont("helvetica", "normal")
    doc.setTextColor(0, 0, 0)

    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text(
        data.student.email || "Course Name",
        105,
        120,
        {
            align: "center",
        },
    )

    const startY = 142

    doc.setFontSize(13)
    doc.setFont("helvetica", "normal")

    const labels = [
        {
            y_axis: 0,
            value: data.student.name,
        },
        {
            y_axis: 9,
            value: data.student.fatherName,
        },
        {
            y_axis: 18,
            value: data.student.motherName,
        },
        {
            y_axis: 28,
            value: data.student.gender,
        },
        {
            y_axis: 39,
            value: data.student.dateOfBirth,
        },
        {
            y_axis: 47,
            value: data.branch.name,
        },
        {
            y_axis: 57,
            value: data.enrollment.rollNumber,
        },
        {
            y_axis: 74,
            value: data.enrollment.registrationNumber,
        },
    ]

    labels.forEach((item) => {
        const y = startY + item.y_axis

        doc.text(item.value || "N/A", 88, y)
    })

    doc.setFontSize(10)

    doc.text(data.enrollment.courseRange || "N/A", 136, 217)

    doc.text(
        data.enrollment.admissionYear || "N/A",
        142,
        224,
    )

    doc.save(
        `${data.student.name.toLocaleLowerCase()}_registration_card.pdf`,
    )
}
