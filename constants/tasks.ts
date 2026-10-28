export const taskCategories = [
    "Academics",
    "Administration",
    "Campus",
    "Facilities",
    "Finance",
    "Operations",
    "Research",
    "Students",
    "General",
] as const

export type TaskCategorie = (typeof taskCategories)[number]
