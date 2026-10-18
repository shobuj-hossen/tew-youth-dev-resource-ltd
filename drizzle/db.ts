import "dotenv"
import { relations } from "./relations"

import { neon, Pool } from "@neondatabase/serverless"
import { drizzle as serverlessDrizzle } from "drizzle-orm/neon-serverless"
import { drizzle } from "drizzle-orm/neon-http"

//normal db

const sql = neon(process.env.DATABASE_URL!)
export const db = drizzle({ client: sql, relations })

//transaction db

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
})

export const txDB = serverlessDrizzle({
    client: pool,
    relations,
})
