import { snakeCase, varchar } from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../helpers"

export const roles = snakeCase.table("roles", {
    id,
    role: varchar({ length: 255 }).notNull(),

    createdAt,
    updatedAt,
})
