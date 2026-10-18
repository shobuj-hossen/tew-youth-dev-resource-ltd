import "server-only"

import { sql } from "drizzle-orm"
import { db } from "@/drizzle/db"

export async function getNextEnrollmentNumbers() {
    const [roleRes, registrationRes, serialRes] =
        await Promise.all([
            db.execute(sql<string>`
            SELECT nextval(
                'enrollment_roll_number_seq'
            )::text AS value
        `),
            db.execute(
                sql<string>`
            SELECT nextval(
                'enrollment_registration_number_seq'
            )::text AS value
        `,
            ),
            db.execute(
                sql`
            SELECT nextval(
                'enrollment_serial_no_seq'
            )::text AS value
        `,
            ),
        ])

    return {
        rollNumber: roleRes.rows[0].value as string,
        registrationNumber: registrationRes.rows[0]
            .value as string,
        serialNo: serialRes.rows[0].value as string,
    }
}
