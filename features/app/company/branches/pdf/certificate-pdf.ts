import { format } from "date-fns"
import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

type CertificatePDFInfo = {
    SLNo: string
    roll: string
    reg: string
    fullName: string
    fathersName: string
    mothersName: string
    courseName: string
    branchName: string
    branchCode: string
    held: string
    grade: string
}

export async function certificatePDF(
    info: CertificatePDFInfo,
) {
    const response = await fetch("/pdf/certificate.pdf")

    if (!response.ok) {
        throw new Error(
            "Failed to load certificate template",
        )
    }

    const pdfBytes = await response.arrayBuffer()
    const pdfDoc = await PDFDocument.load(pdfBytes)

    const font = await pdfDoc.embedFont(
        StandardFonts.TimesRomanBold,
    )
    const page = pdfDoc.getPages()[0]

    const text = {
        size: 14,
        font,
        color: rgb(0, 0, 0),
    }

    const branchCode =
        Number(info.branchCode) < 10
            ? `0${info.branchCode}`
            : info.branchCode

    page.drawText(info.SLNo, {
        ...text,
        x: 260,
        y: 512,
    })

    page.drawText(info.roll, {
        ...text,
        x: 635,
        y: 355,
    })

    page.drawText(info.reg, {
        ...text,
        x: 635,
        y: 335,
    })

    page.drawText(format(new Date(), "P"), {
        ...text,
        x: 645,
        y: 311,
    })

    page.drawText(info.fullName, {
        ...text,
        x: 350,
        y: 290,
    })

    page.drawText(info.fathersName, {
        ...text,
        x: 330,
        y: 262,
    })

    page.drawText(info.mothersName, {
        ...text,
        x: 600,
        y: 262,
    })

    page.drawText(info.courseName, {
        ...text,
        x: 455,
        y: 238,
    })

    page.drawText(info.branchName, {
        ...text,
        x: 345,
        y: 210,
    })

    page.drawText(branchCode, {
        ...text,
        size: 13,
        x: 680,
        y: 209,
    })

    page.drawText(info.held, {
        ...text,
        x: 310,
        y: 186,
    })

    page.drawText(info.grade, {
        ...text,
        x: 665,
        y: 186,
    })

    const finalPdfBytes = (await pdfDoc.save()) as BlobPart
    const blob = new Blob([finalPdfBytes], {
        type: "application/pdf",
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    link.href = url
    link.download = `certificate-of-${info.fullName}.pdf`
    link.click()

    URL.revokeObjectURL(url)
}
