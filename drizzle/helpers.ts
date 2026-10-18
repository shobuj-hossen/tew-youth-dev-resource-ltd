import { timestamp, uuid } from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();
export const createdAt = timestamp().defaultNow().notNull();

export const updatedAt = timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull();