export const courseStatuses = [
    "active",
    "in-active",
    "up-coming",
] as const

export type CourseStatus = (typeof courseStatuses)[number]
