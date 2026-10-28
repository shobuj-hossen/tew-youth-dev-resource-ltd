"use server"

import { db } from "@/drizzle/db"
import { tasks } from "@/drizzle/schema"
import { withPermission } from "@/lib/dal"
import { ValidationError } from "@/utils/error-constructor"
import { and, eq } from "drizzle-orm"
import { updateTag } from "next/cache"
import {
    taskSchema,
    updateTaskSchema,
    type TaskSchemaType,
    type UpdateTaskSchemaType,
} from "./schemas"

export const addTask = withPermission(
    { tasks: ["create"] },
    async ({ org }, inputs: TaskSchemaType) => {
        const { success, data } =
            taskSchema.safeParse(inputs)

        if (!success) {
            throw new ValidationError()
        }

        await db.insert(tasks).values({
            ...data,
            organizationId: org.id,
        })

        updateTag("tasks")

        return {
            message: "New task added successfully",
        }
    },
)

export const updateTask = withPermission(
    { tasks: ["update"] },
    async (
        { org },
        inputs: UpdateTaskSchemaType & {
            id: string
        },
    ) => {
        const { id, ...fields } = inputs

        const { success, data } =
            updateTaskSchema.safeParse(fields)

        if (!success) {
            throw new ValidationError()
        }

        if (Object.keys(data).length === 0) {
            throw new Error(
                "At least one field must be updated",
            )
        }

        const updatedRows = await db
            .update(tasks)
            .set(data)
            .where(
                and(
                    eq(tasks.id, id),
                    eq(tasks.organizationId, org.id),
                ),
            )
            .returning({ id: tasks.id })

        if (updatedRows.length === 0) {
            throw new Error("Task not found")
        }

        updateTag("tasks")

        return {
            message: "Task updated successfully",
        }
    },
)

export const deleteTask = withPermission(
    { tasks: ["delete"] },
    async ({ org }, { id }: { id: string }) => {
        const deletedRows = await db
            .delete(tasks)
            .where(
                and(
                    eq(tasks.id, id),
                    eq(tasks.organizationId, org.id),
                ),
            )
            .returning({ id: tasks.id })

        if (deletedRows.length === 0) {
            throw new Error("Task not found")
        }

        updateTag("tasks")

        return {
            message: "Task deleted successfully",
        }
    },
)

export const changeTaskStatus = withPermission(
    { tasks: ["update"] },
    async (
        { org, user },
        {
            id,
            isCompleted,
        }: {
            id: string
            isCompleted: boolean
        },
    ) => {
        const updatedRows = await db
            .update(tasks)
            .set({
                isCompleted,
                completedById: isCompleted ? user.id : null,
            })
            .where(
                and(
                    eq(tasks.id, id),
                    eq(tasks.organizationId, org.id),
                ),
            )
            .returning({ id: tasks.id })

        if (updatedRows.length === 0) {
            throw new Error("Task not found")
        }

        updateTag("tasks")

        return {
            message: isCompleted
                ? "Task marked as completed"
                : "Task marked as incomplete",
        }
    },
)
