import { jsPDF } from "jspdf"

export type StudentIdCardData = {
    student: {
        name: string
        idNumber: string
        email: string
        social: string
        phone: string
        imageUrl: string
        institutionName: string
    }
}

const loadImage = (
    src: string,
): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = () => resolve(image)
        image.onerror = () =>
            reject(
                new Error(`Failed to load image: ${src}`),
            )

        // Must be set before src for cross-origin images.
        image.crossOrigin = "anonymous"
        image.src = src
    })
}

const imageToDataURL = (
    image: HTMLImageElement,
    type = "image/png",
): string => {
    const canvas = document.createElement("canvas")
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    const context = canvas.getContext("2d")

    if (!context) {
        throw new Error("Could not create image canvas")
    }

    context.drawImage(image, 0, 0)

    return canvas.toDataURL(type)
}

const createCircularProfileImage = (
    image: HTMLImageElement,
    size = 500,
): string => {
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size

    const context = canvas.getContext("2d")

    if (!context) {
        throw new Error(
            "Could not create profile image canvas",
        )
    }

    // Crop the image to a square while preserving aspect ratio.
    const sourceSize = Math.min(
        image.naturalWidth,
        image.naturalHeight,
    )

    const sourceX = (image.naturalWidth - sourceSize) / 2
    const sourceY = (image.naturalHeight - sourceSize) / 2

    context.beginPath()
    context.arc(
        size / 2,
        size / 2,
        size / 2,
        0,
        Math.PI * 2,
    )
    context.clip()

    context.drawImage(
        image,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        size,
        size,
    )

    return canvas.toDataURL("image/png")
}

export const studentIdCardPDF = async (
    data: StudentIdCardData,
) => {
    // Match the proportions of your student ID template.
    const cardWidth = 85
    const cardHeight = 144.3

    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [cardWidth, cardHeight],
    })

    // 1. Load and draw the ID card template.
    const template = await loadImage("/student-id-card.png")

    doc.addImage(
        imageToDataURL(template),
        "PNG",
        0,
        0,
        cardWidth,
        cardHeight,
    )

    // 2. Load and draw the student's circular profile image.
    if (data.student.imageUrl) {
        const profileImage = await loadImage(
            data.student.imageUrl,
        )

        const circularImage =
            createCircularProfileImage(profileImage)

        // Coordinates are in millimeters.
        // Adjust slightly if your template changes.
        doc.addImage(circularImage, "PNG", 22.5, 14, 40, 40)
    }

    // 3. Set text styles.
    doc.setFont("helvetica", "bold")
    doc.setFontSize(10)
    doc.setTextColor(22, 39, 63)

    // 4. Write the student information.
    const fields = [
        {
            value: data.student.idNumber,
            y: 87,
        },
        {
            value: data.student.email,
            y: 94,
        },
        {
            value: data.student.social,
            y: 101,
        },
        {
            value: data.student.phone,
            y: 108,
        },
    ]

    const valueX = 31

    fields.forEach(({ value, y }) => {
        const text = value || "N/A"

        // Keep long emails and identifiers inside the card.
        const maxWidth = cardWidth - valueX - 6

        const lines = doc.splitTextToSize(text, maxWidth)

        doc.text(lines, valueX, y, {
            maxWidth,
        })
    })

    // Keep long emails and identifiers inside the card.
    const maxWidth = cardWidth - 6

    const lines = doc.splitTextToSize(
        data.student.institutionName,
        maxWidth,
    )

    doc.setFontSize(14)
    doc.text(lines, 6, 133, {
        maxWidth,
    })

    // 5. Save the PDF.
    const safeName =
        data.student.name
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .replace(/^_|_$/g, "") || "student"

    doc.save(`${safeName}_student_id_card.pdf`)
}
