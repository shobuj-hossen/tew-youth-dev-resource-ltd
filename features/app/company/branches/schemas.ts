import z from "zod"

export const resultSchema = z.enum([
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "C",
    "D",
    "F",
])

export const provideResultsSchema = z.object({
    results: z
        .array(
            z.object({
                enrollmentId: z.string().min(1),
                result: resultSchema,
            }),
        )
        .min(1),
})
