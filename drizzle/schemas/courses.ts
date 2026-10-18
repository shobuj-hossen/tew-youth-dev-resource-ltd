import {
    integer,
    jsonb,
    numeric,
    pgEnum,
    snakeCase,
    text,
    varchar,
} from "drizzle-orm/pg-core"
import { courseStatuses } from "../../constants/course"
import { createdAt, id, updatedAt } from "../helpers"
import { UploadedFileType } from "../types"

export const statusEnum = pgEnum("status", courseStatuses)

export const courses = snakeCase.table("courses", {
    id,

    banner: jsonb().notNull().$type<UploadedFileType>(),
    name: varchar({ length: 255 }).notNull().unique(),
    code: varchar({ length: 100 }).notNull().unique(),
    status: statusEnum().notNull().default("active"),
    description: text(),

    threeMonthsFee: integer(),
    sixMonthsFee: integer(),
    oneYearFee: integer(),
    twoYearsFee: integer(),
    threeYearsFee: integer(),
    fourYearsFee: integer(),

    createdAt,
    updatedAt,
})
