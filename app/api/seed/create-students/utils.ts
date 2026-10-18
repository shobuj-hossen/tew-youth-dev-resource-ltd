import { faker } from "@faker-js/faker"

import {
    ACADEMIC_LEVEL_OPTIONS,
    BLOOD_GROUPS,
    GENDER,
    INSTITUTION_OPTIONS,
} from "@/features/app/branch/students/constants"

function createBangladeshiMobile() {
    const prefix = faker.helpers.arrayElement([
        "013",
        "014",
        "015",
        "016",
        "017",
        "018",
        "019",
    ])

    return `${prefix}${faker.string.numeric(8)}`
}
import { UploadedFileType } from "@/drizzle/types"
import { txDB } from "@/drizzle/db"
import {
    enrollments,
    studentAcademicQualifications,
    students,
} from "@/drizzle/schema"
import { getNextEnrollmentNumbers } from "@/features/app/branch/students/utils"

function createAcademicInformation() {
    return {
        level: faker.helpers.arrayElement(
            ACADEMIC_LEVEL_OPTIONS,
        ).value,
        institution: faker.helpers.arrayElement(
            INSTITUTION_OPTIONS,
        ).value,
        passingYear: faker.number.int({
            min: 2012,
            max: new Date().getFullYear(),
        }),
        rollId: faker.string.numeric(8),
        result: "",
    }
}

function createDateOfBirth() {
    return faker.date.birthdate({
        min: 16,
        max: 35,
        mode: "age",
    })
}

function createStudentData(image: UploadedFileType) {
    const gender = faker.helpers.arrayElement(GENDER)

    const firstName = faker.person.firstName(
        gender === "Male" ? "male" : "female",
    )

    const lastName = faker.person.lastName()

    return {
        image,
        name: `${firstName} ${lastName}`,
        fatherName: `Md. ${faker.person.firstName("male")} ${faker.person.lastName()}`,
        motherName: `Mst. ${faker.person.firstName("female")} ${faker.person.lastName()}`,
        mobile: createBangladeshiMobile(),
        religion: faker.helpers.arrayElement([
            "Islam",
            "Hinduism",
            "Christianity",
            "Buddhism",
        ]),
        bloodGroup:
            faker.helpers.arrayElement(BLOOD_GROUPS),
        nationality: "Bangladeshi",
        gender,
        dateOfBirth: createDateOfBirth(),
        email: faker.internet
            .email({
                firstName,
                lastName,
            })
            .toLowerCase(),
        academicInformation: [createAcademicInformation()],
    }
}

export async function seedStudents({
    orgId,
    count,
    imageUrl,
}: {
    orgId: string
    count: number
    imageUrl: string
}) {
    if (count <= 0) {
        throw new Error("Count must be greater than 0")
    }

    const availableCourses =
        await txDB.query.courses.findMany({
            where: {
                status: "active",
            },
            columns: {
                id: true,
                name: true,
            },
        })

    if (!availableCourses.length) {
        throw new Error(
            "No active courses found. Create at least one active course before seeding students.",
        )
    }

    const image = {
        secureUrl: imageUrl,
        publicId: "seed-student-image",
        format: "",
        resourceType: "",
    } satisfies UploadedFileType

    for (let index = 0; index < count; index++) {
        const student = createStudentData(image)

        const course = faker.helpers.arrayElement(
            availableCourses,
        )

        await txDB.transaction(async (tx) => {
            const [newStudent] = await tx
                .insert(students)
                .values({
                    image: student.image,
                    name: student.name,
                    fatherName: student.fatherName,
                    motherName: student.motherName,
                    mobile: student.mobile,
                    email: student.email,
                    religion: student.religion,
                    bloodGroup: student.bloodGroup,
                    nationality: student.nationality,
                    gender: student.gender,
                    dateOfBirth: student.dateOfBirth,
                    organizationId: orgId,
                })
                .returning({
                    id: students.id,
                })

            await tx
                .insert(studentAcademicQualifications)
                .values(
                    student.academicInformation.map(
                        (academic) => ({
                            ...academic,
                            studentId: newStudent.id,
                        }),
                    ),
                )

            const numbers = await getNextEnrollmentNumbers()

            await tx.insert(enrollments).values({
                studentId: newStudent.id,
                courseId: course.id,

                courseDuration: "6_months",
                courseRange: "2027-07_2027-12",
                medium: "bangla",

                status: "active",
                paidAmount: 300,
                paymentStatus: "paid",

                ...numbers,
            })
        })
    }
}
