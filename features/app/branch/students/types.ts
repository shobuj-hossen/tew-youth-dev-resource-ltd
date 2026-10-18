import {
    getCourseInfo,
    getEnrollmentById,
    getStudentByEnrolledId,
    getStudentDetailsByEnrollmentId,
    getStudents,
    getUnpaidStudents,
} from "./queries"

export type Student = Awaited<
    ReturnType<typeof getStudents>
>[number]

export type UnpaidStudent = Awaited<
    ReturnType<typeof getUnpaidStudents>
>[number]

export type StudentByEnrolledId = Awaited<
    ReturnType<typeof getStudentByEnrolledId>
>
export type EnrollmentById = Awaited<
    ReturnType<typeof getEnrollmentById>
>
export type StudentDetailsByEnrollmentId = Awaited<
    ReturnType<typeof getStudentDetailsByEnrollmentId>
>
export type Course = Awaited<
    ReturnType<typeof getCourseInfo>
>[number]
