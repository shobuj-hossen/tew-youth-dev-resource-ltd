import z from "zod"
import {
    AvatarObjSchema,
    avatarObjSchema,
    uploadedFileSchema,
} from "../../schemas"

import { BLOOD_GROUPS, GENDER } from "../students/constants"

export const personalInformationSchema = z.object({
    image: avatarObjSchema,

    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(100, "Name must not exceed 100 characters"),

    fatherName: z
        .string()
        .min(
            3,
            "Father's name must be at least 3 characters",
        )
        .max(
            100,
            "Father's name must not exceed 100 characters",
        ),

    motherName: z
        .string()
        .min(
            3,
            "Mother's name must be at least 3 characters",
        )
        .max(
            100,
            "Mother's name must not exceed 100 characters",
        ),

    mobile: z
        .string()
        .regex(
            /^(?:\+88|88)?01[3-9]\d{8}$/,
            "Enter a valid Bangladeshi mobile number",
        ),

    religion: z.string().min(1, "Religion is required"),

    bloodGroup: z.enum(
        BLOOD_GROUPS,
        "Please select a valid blood group",
    ),

    nationality: z
        .string()
        .min(2, "Nationality is required")
        .max(
            50,
            "Nationality must not exceed 50 characters",
        ),

    gender: z.enum(GENDER, "Please select a valid gender"),

    dateOfBirth: z.date("Date of birth is required"),
    email: z
        .email("Enter a valid email address")
        .optional()
        .or(z.literal("")),
})

export const enrollmentInformationSchema = z.object({
    courseId: z.string().min(1, "Course is required"),

    courseRange: z
        .string()
        .min(1, "Course range is required"),

    courseDuration: z
        .string()
        .min(1, "Course duration is required"),

    medium: z.string().min(1, "Medium is required"),
})

export const academicInformationSchema = z.object({
    level: z
        .string()
        .min(1, "Academic level is required")
        .max(
            50,
            "Academic level must not exceed 50 characters",
        ),

    institution: z
        .string()
        .min(1, "Institution is required")
        .max(
            150,
            "Institution must not exceed 150 characters",
        ),

    passingYear: z
        .number("Passing year must be a number")
        .int("Passing year must be a whole number")
        .min(1900, "Enter a valid passing year")
        .max(
            new Date().getFullYear(),
            "Passing year cannot be in the future",
        ),

    rollId: z
        .string()
        .min(1, "Roll/ID is required")
        .max(50, "Roll/ID must not exceed 50 characters"),

    result: z
        .string()
        .min(1, "Result/GPA is required")
        .max(
            30,
            "Result/GPA must not exceed 30 characters",
        ),
})

// ─────────────────────────────────────────────
// Complete Student Schema
// ─────────────────────────────────────────────

export const studentSchema = z.object({
    ...personalInformationSchema.shape,
    ...enrollmentInformationSchema.shape,

    academicInformation: z
        .array(academicInformationSchema)
        .min(
            1,
            "At least one academic qualification is required",
        ),
})

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type PersonalInformationSchemaType = z.infer<
    typeof personalInformationSchema
>

export type EnrollmentInformationSchemaType = z.infer<
    typeof enrollmentInformationSchema
>

export type AcademicInformationSchemaType = z.infer<
    typeof academicInformationSchema
>

export type StudentSchemaType = z.infer<
    typeof studentSchema
>

// ─────────────────────────────────────────────
// Defaults
// ─────────────────────────────────────────────

export const academicInformationDefaults: AcademicInformationSchemaType =
    {
        level: "",
        institution: "",
        passingYear: new Date().getFullYear(),
        rollId: "",
        result: "",
    }

export const studentDefaults: StudentSchemaType = {
    // Personal Information
    image: null as unknown as AvatarObjSchema,
    name: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    religion: "Islam",
    bloodGroup: "A+",
    nationality: "Bangladeshi",
    gender: "Male",
    dateOfBirth: null as unknown as Date,
    email: "",

    // Course Information
    courseId: "",
    courseRange: "",
    courseDuration: "",
    medium: "",

    // Academic Information
    academicInformation: [academicInformationDefaults],
}

//for update student schema .

export const updatedPersonalInformationSchema =
    personalInformationSchema.omit({ image: true }).extend({
        image: avatarObjSchema.nullable(),
        existingImage: uploadedFileSchema,
    })
export type UpdatedPersonalInformationSchemaType = z.infer<
    typeof updatedPersonalInformationSchema
>

export const updateStudentSchema = z.object({
    ...updatedPersonalInformationSchema.shape,

    academicInformation: z
        .array(academicInformationSchema)
        .min(
            1,
            "At least one academic qualification is required",
        ),
})

export type UpdateStudentSchemaType = z.infer<
    typeof updateStudentSchema
>
