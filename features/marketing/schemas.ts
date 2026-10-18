import { z } from "zod"
import {
    avatarObjSchema,
    AvatarObjSchema,
} from "../app/schemas"
import { BLOOD_GROUPS, GENDER } from "./constants"

// ─────────────────────────────────────────────
// Part 1: Branch Details
// ─────────────────────────────────────────────

export const branchDetailsSchema = z.object({
    logo: avatarObjSchema,

    branchName: z
        .string()
        .min(3, "Branch name must be at least 3 characters")
        .max(
            100,
            "Branch name must not exceed 100 characters",
        ),

    mobile: z
        .string()
        .regex(
            /^(?:\+88|88)?01[3-9]\d{8}$/,
            "Enter a valid Bangladeshi mobile number",
        ),

    email: z.email("Enter a valid email address"),

    age: z
        .number("Branch age must be a number")
        .min(0, "Branch age cannot be negative")
        .max(100, "Branch age cannot exceed 100 years"),

    computerCount: z
        .number("Computer count must be a number")
        .int("Computer count must be a whole number")
        .min(1, "At least 1 computer is required"),
})

// ─────────────────────────────────────────────
// Part 2: Owner Information
// ─────────────────────────────────────────────

export const ownerInfoSchema = z.object({
    ownerName: z
        .string()
        .min(3, "Owner name must be at least 3 characters")
        .max(
            100,
            "Owner name must not exceed 100 characters",
        ),

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

    bloodGroup: z.enum(
        BLOOD_GROUPS,
        "Please select a valid blood group",
    ),

    nidNumber: z
        .string()
        .regex(
            /^(?:\d{10}|\d{13}|\d{17})$/,
            "NID number must contain 10, 13, or 17 digits",
        ),

    gender: z.enum(GENDER, "Please select a valid gender"),
})

// ─────────────────────────────────────────────
// Part 3: Address Details
// ─────────────────────────────────────────────

export const addressDetailsSchema = z.object({
    divisionId: z.string().min(1, "Division is required"),

    districtId: z.string().min(1, "District is required"),

    upazilaId: z.string().min(1, "Upazila is required"),

    area: z
        .string()
        .min(3, "Area must be at least 3 characters"),

    postalCode: z
        .string()
        .regex(
            /^\d{4}$/,
            "Postal code must be exactly 4 digits",
        ),
})

// ─────────────────────────────────────────────
// Part 4: Documents
// ─────────────────────────────────────────────

export const documentsSchema = z.object({
    electricityBill: z.instanceof(File, {
        error: "Electricity bill is required",
    }),

    nidDocument: z.instanceof(File, {
        error: "NID document is required",
    }),

    tradeLicense: z.instanceof(File, {
        error: "Trade license is required",
    }),
})

// ─────────────────────────────────────────────
// Complete Branch Application
// ─────────────────────────────────────────────

export const branchApplicationSchema = z.object({
    ...branchDetailsSchema.shape,
    ...ownerInfoSchema.shape,
    ...addressDetailsSchema.shape,
    ...documentsSchema.shape,
})

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type BranchDetailsSchemaType = z.infer<
    typeof branchDetailsSchema
>

export type OwnerInfoSchemaType = z.infer<
    typeof ownerInfoSchema
>

export type AddressDetailsSchemaType = z.infer<
    typeof addressDetailsSchema
>

export type DocumentsSchemaType = z.infer<
    typeof documentsSchema
>

export type BranchApplicationSchemaType = z.infer<
    typeof branchApplicationSchema
>

export const branchApplicationDefaults: BranchApplicationSchemaType =
    {
        // Branch Details
        logo: null as unknown as AvatarObjSchema,
        branchName: "",
        mobile: "",
        email: "",
        age: 0,
        computerCount: 1,

        // Owner Information
        ownerName: "",
        fatherName: "",
        motherName: "",
        bloodGroup: "A+",
        nidNumber: "",
        gender: "Male",

        // Address
        divisionId: "",
        districtId: "",
        upazilaId: "",
        area: "",
        postalCode: "",

        // Documents
        electricityBill: undefined as unknown as File,
        nidDocument: undefined as unknown as File,
        tradeLicense: undefined as unknown as File,
    }
