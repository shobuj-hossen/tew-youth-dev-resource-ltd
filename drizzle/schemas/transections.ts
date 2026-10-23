import {
    numeric,
    snakeCase,
    text,
    uuid,
    varchar,
} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../helpers"
import { enrollments } from "./students"
import { branchApplications } from "./branches"

export const transactions = snakeCase.table(
    "transactions",
    {
        id,

        enrollmentId: uuid().references(
            () => enrollments.id,
        ),
        branchApplicationId: uuid().references(
            () => branchApplications.id,
        ),

        // Payment gateway
        gateway: varchar({ length: 50 })
            .notNull()
            .default("sslcommerz"),
        tranId: varchar({ length: 100 }).notNull().unique(),
        bankTranId: varchar({ length: 150 }),

        // Amounts and currency
        amount: numeric({
            precision: 12,
            scale: 2,
        }).notNull(),
        currency: varchar({ length: 10 })
            .notNull()
            .default("BDT"),

        // Payment status and method
        status: varchar({ length: 30 })
            .notNull()
            .default("pending"),
        cardType: varchar({ length: 100 }),
        cardBrand: varchar({ length: 50 }),

        // Gateway verification and response details
        tranDate: varchar({ length: 30 }),
        error: text(),

        createdAt,
        updatedAt,
    },
)
