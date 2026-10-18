import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { cacheTag } from "next/cache"

export const getCourses = withPermission(
    { course: ["view"] },
    async () => {
        "use cache"
        cacheTag("courses")

        return await db.query.courses.findMany({
            orderBy: (courses, { desc }) => [
                desc(courses.createdAt),
            ],
        })
    },
)

export const getCourseById = withPermission(
    { course: ["view"] },
    async (_, id: string) => {
        "use cache"
        cacheTag("courses", `course:${id}`)

        const res = await db.query.courses.findFirst({
            where: { id },
        })

        if (!res) {
            throw new NotFoundError()
        }

        return res
    },
)
