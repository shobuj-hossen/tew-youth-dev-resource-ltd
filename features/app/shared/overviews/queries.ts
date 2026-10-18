import { db } from "@/drizzle/db"
import {
    branchApplications,
    enrollments,
    members,
    students,
} from "@/drizzle/schema"
import { withPermission } from "@/lib/dal"
import { company_config } from "@/utils/config"
import {
    and,
    count,
    eq,
    inArray,
    isNotNull,
    sql,
} from "drizzle-orm"
import { cacheTag } from "next/cache"

export const getOverviews = withPermission(
    { overview: ["view"] },
    async ({ org }) => {
        "use cache"

        cacheTag(`overviews:${org.id}`)

        if (company_config.COMPANY_ORG_ID === org.id) {
            const [branches, users, enrollmentCount] =
                await Promise.all([
                    db
                        .select({
                            total: sql<number>`count(distinct ${branchApplications.organizationId})`,
                        })
                        .from(branchApplications)
                        .where(
                            and(
                                eq(
                                    branchApplications.status,
                                    "approved",
                                ),
                                isNotNull(
                                    branchApplications.organizationId,
                                ),
                            ),
                        ),

                    db
                        .select({
                            total: count(),
                        })
                        .from(members)
                        .where(
                            eq(
                                members.organizationId,
                                org.id,
                            ),
                        ),

                    db
                        .select({
                            total: count(),
                        })
                        .from(enrollments)
                        .innerJoin(
                            students,
                            eq(
                                enrollments.studentId,
                                students.id,
                            ),
                        )
                        .innerJoin(
                            branchApplications,
                            eq(
                                students.organizationId,
                                branchApplications.organizationId,
                            ),
                        )
                        .where(
                            eq(
                                branchApplications.status,
                                "approved",
                            ),
                        ),
                ])

            return {
                type: "company" as const,
                metrics: [
                    {
                        key: "branches",
                        label: "Total Branches",
                        value: Number(
                            branches[0]?.total ?? 0,
                        ),
                        description:
                            "Approved and registered branches",
                    },
                    {
                        key: "users",
                        label: "Total Users",
                        value: users[0]?.total ?? 0,
                        description:
                            "Members in the company workspace",
                    },
                    {
                        key: "enrollments",
                        label: "Total Enrollments",
                        value:
                            enrollmentCount[0]?.total ?? 0,
                        description:
                            "Enrollments across approved branches",
                    },
                ],
            }
        }

        const [studentCount, enrolledCount, unpaidCount] =
            await Promise.all([
                db
                    .select({
                        total: count(),
                    })
                    .from(students)
                    .where(
                        eq(students.organizationId, org.id),
                    ),

                db
                    .select({
                        total: sql<number>`count(distinct ${students.id})`,
                    })
                    .from(students)
                    .innerJoin(
                        enrollments,
                        eq(
                            enrollments.studentId,
                            students.id,
                        ),
                    )
                    .where(
                        and(
                            eq(
                                students.organizationId,
                                org.id,
                            ),
                            eq(
                                enrollments.status,
                                "active",
                            ),
                        ),
                    ),

                db
                    .select({
                        total: sql<number>`count(distinct ${students.id})`,
                    })
                    .from(students)
                    .innerJoin(
                        enrollments,
                        eq(
                            enrollments.studentId,
                            students.id,
                        ),
                    )
                    .where(
                        and(
                            eq(
                                students.organizationId,
                                org.id,
                            ),
                            inArray(
                                enrollments.paymentStatus,
                                ["pending", "cancelled"],
                            ),
                        ),
                    ),
            ])

        return {
            type: "branch" as const,
            metrics: [
                {
                    key: "students",
                    label: "Total Students",
                    value: studentCount[0]?.total ?? 0,
                    description:
                        "Students registered at this branch",
                },
                {
                    key: "enrolled",
                    label: "Enrolled Students",
                    value: Number(
                        enrolledCount[0]?.total ?? 0,
                    ),
                    description:
                        "Students with an active enrollment",
                },
                {
                    key: "unpaid",
                    label: "Unpaid Students",
                    value: Number(
                        unpaidCount[0]?.total ?? 0,
                    ),
                    description:
                        "Students with pending or cancelled payments",
                },
            ],
        }
    },
)
