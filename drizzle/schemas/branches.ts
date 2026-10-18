import {
    boolean,
    index,
    integer,
    jsonb,
    pgEnum,
    snakeCase,
    text,
    varchar,
} from "drizzle-orm/pg-core"

import { createdAt, id, updatedAt } from "../helpers"
import { UploadedFileType } from "../types"

export const branchApplicationStatus = pgEnum(
    "branch_application_status",
    ["pending", "approved", "rejected"],
)

export const branchApplications = snakeCase.table(
    "branch_applications",
    {
        id,

        branchName: varchar({ length: 255 }).notNull(),

        divisionId: varchar({ length: 100 }).notNull(),
        districtId: varchar({ length: 100 }).notNull(),
        upazilaId: varchar({ length: 100 }).notNull(),

        area: text().notNull(),
        postalCode: varchar({ length: 20 }).notNull(),

        computerCount: integer().notNull(),

        description: text(),

        ownerName: varchar({ length: 255 }).notNull(),
        fatherName: varchar({ length: 255 }).notNull(),
        motherName: varchar({ length: 255 }).notNull(),

        nidNumber: varchar({ length: 50 }).notNull(),
        mobile: varchar({ length: 30 }).notNull(),
        email: varchar({ length: 255 }).notNull(),

        gender: varchar({ length: 30 }).notNull(),
        bloodGroup: varchar({ length: 10 }).notNull(),
        age: integer().notNull(),

        electricityBill: jsonb()
            .notNull()
            .$type<UploadedFileType>(),
        nidDocument: jsonb()
            .notNull()
            .$type<UploadedFileType>(),
        tradeLicense: jsonb()
            .notNull()
            .$type<UploadedFileType>(),
        logo: jsonb().$type<UploadedFileType>(),

        status: branchApplicationStatus()
            .default("pending")
            .notNull(),
        organizationId: text(),

        rejectionReason: text(),
        //payments
        oneTimePaymentAmount: integer()
            .notNull()
            .default(0),
        isOneTimePaid: boolean().default(false),
        paymentTransactionId: varchar(),
        createdAt,
        updatedAt,
    },

    (table) => [
        index("branch_applications_status_idx").on(
            table.status,
        ),

        index("branch_applications_nid_number_idx").on(
            table.nidNumber,
        ),

        index("branch_applications_mobile_idx").on(
            table.mobile,
        ),
    ],
)
