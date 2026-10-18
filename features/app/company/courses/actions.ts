"use server"

import { CourseStatus } from "@/constants/course"
import { db } from "@/drizzle/db"
import { courses } from "@/drizzle/schema"
import { deleteFromCloudinary } from "@/lib/cloudinary/delete"
import { uploadToCloudinary } from "@/lib/cloudinary/upload"
import { withPermission } from "@/lib/dal"
import { ValidationError } from "@/utils/error-constructor"
import { eq, inArray } from "drizzle-orm"
import { updateTag } from "next/cache"
import {
    CourseSchemaType,
    UpdateCourseSchemaType,
    courseSchema,
    updateCourseSchema,
} from "./schemas"

export const addCourse = withPermission(
    { course: ["create"] },
    async (_, inputs: CourseSchemaType) => {
        const { success, data } =
            courseSchema.safeParse(inputs)

        if (!success) {
            throw new ValidationError()
        }

        const existCode = await db.query.courses.findFirst({
            where: { code: data.code },
        })

        if (existCode) {
            throw new Error("Code already exists")
        }

        const banner = await uploadToCloudinary(
            data.banner,
            { folder: "course_banner" },
        )

        try {
            await db.insert(courses).values({
                ...data,
                banner,
            })
        } catch (error) {
            if (banner?.publicId) {
                await deleteFromCloudinary(
                    banner.publicId,
                ).catch(() => {
                    console.log("Image deletion error")
                })
            }

            throw error
        }

        updateTag("courses")
        updateTag("course-info")

        return {
            message: "New Course Added",
        }
    },
)

export const updateCourse = withPermission(
    { course: ["update"] },
    async (
        _,
        inputs: UpdateCourseSchemaType & { id: string },
    ) => {
        const { success, data } =
            updateCourseSchema.safeParse(inputs)

        if (!success) {
            throw new ValidationError()
        }

        const existCode = await db.query.courses.findFirst({
            where: {
                AND: [
                    {
                        code: {
                            eq: data.code,
                        },
                    },
                    {
                        id: {
                            ne: inputs.id,
                        },
                    },
                ],
            },
        })

        if (existCode) {
            throw new Error("Code already exists")
        }

        let banner = data.existingBanner
        let newBannerPublicId: string | undefined

        if (data.banner) {
            const uploadedBanner = await uploadToCloudinary(
                data.banner,
                { folder: "course_banner" },
            )

            banner = uploadedBanner
            newBannerPublicId = uploadedBanner?.publicId
        }

        try {
            const updatedRows = await db
                .update(courses)
                .set({
                    ...data,
                    banner,
                })
                .where(eq(courses.id, inputs.id))
                .returning({ id: courses.id })

            if (updatedRows.length === 0) {
                throw new Error("Course not found")
            }
        } catch (error) {
            if (newBannerPublicId) {
                await deleteFromCloudinary(
                    newBannerPublicId,
                ).catch(() => {
                    console.log("Image deletion error")
                })
            }

            throw error
        }

        if (data.banner && data.existingBanner.publicId) {
            await deleteFromCloudinary(
                data.existingBanner.publicId,
            )
        }

        updateTag("courses")
        updateTag("course-info")

        return {
            message: "Course updated successfully",
        }
    },
)

export const deleteCourse = withPermission(
    { course: ["delete"] },
    async (
        _,
        {
            id,
            bannerPublicId,
        }: {
            id: string
            bannerPublicId: string
        },
    ) => {
        const deletedRows = await db
            .delete(courses)
            .where(eq(courses.id, id))
            .returning({ id: courses.id })

        if (deletedRows.length === 0) {
            throw new Error("Course not found")
        }

        try {
            await deleteFromCloudinary(bannerPublicId)
        } catch (error) {
            console.log("Image deletion error", error)
        }

        updateTag("courses")
        updateTag("course-info")

        return {
            message: "Course deleted successfully",
        }
    },
)

export const changeCourseStatus = withPermission(
    { course: ["update"] },
    async (
        _,
        {
            id,
            status,
        }: {
            id: string
            status: CourseStatus
        },
    ) => {
        const updatedRows = await db
            .update(courses)
            .set({ status })
            .where(eq(courses.id, id))
            .returning({ id: courses.id })

        if (updatedRows.length === 0) {
            throw new Error("Course not found")
        }

        updateTag("courses")
        updateTag("course-info")

        return {
            message: "Course status updated",
        }
    },
)

export const changeCourseStatusInBulk = withPermission(
    { course: ["update"] },
    async (
        _,
        {
            ids,
            status,
        }: {
            ids: string[]
            status: CourseStatus
        },
    ) => {
        if (ids.length === 0) {
            throw new Error("No courses selected")
        }

        await db
            .update(courses)
            .set({ status })
            .where(inArray(courses.id, ids))

        updateTag("courses")
        updateTag("course-info")

        return {
            message: "Course status updated",
        }
    },
)
