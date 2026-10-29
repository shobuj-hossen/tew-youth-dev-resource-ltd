import { sendSMS } from "./config"

export async function sendCourseEnrollmentSMS({
    phoneNumber,
    courseName,
}: {
    phoneNumber: string
    courseName: string
}) {
    const message =
        `The Earn Way Youth Development Resource: ` +
        `You have successfully signed up for the course "${courseName}". ` +
        `Thank you for choosing us.`

    return sendSMS(phoneNumber, message)
}
