import { PAYMENT_STATUS } from "@/features/app/branch/students/constants"
import {
    pgEnum,
    timestamp,
    uuid,
} from "drizzle-orm/pg-core"

export const id = uuid().primaryKey().defaultRandom()
export const createdAt = timestamp().defaultNow().notNull()

export const updatedAt = timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull()

export const paymentStatusEnum = pgEnum(
    "payment_status_enum",
    PAYMENT_STATUS,
)
