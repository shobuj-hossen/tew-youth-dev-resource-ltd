import { getTasks, getTaskById } from "./queries"

export type Task = Awaited<
    ReturnType<typeof getTasks>
>[number]

export type TaskById = Awaited<
    ReturnType<typeof getTaskById>
>
