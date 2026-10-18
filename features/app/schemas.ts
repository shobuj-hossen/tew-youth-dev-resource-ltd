import z from "zod"

export const avatarObjSchema = z.object({
    originalFile: z.instanceof(File, {
        message: "Avatar is required",
    }),
    croppedFile: z.instanceof(File, {
        message: "Avatar is required",
    }),
    x: z.number(),
    y: z.number(),
    zoom: z.number(),
})

export type AvatarObjSchema = z.infer<
    typeof avatarObjSchema
>
export const avatarObjDefaults: AvatarObjSchema = {
    originalFile: null as unknown as File,
    croppedFile: null as unknown as File,
    x: 0,
    y: 0,
    zoom: 1,
}

export const uploadedFileSchema = z.object({
    secureUrl: z.url(),
    publicId: z.string(),
    resourceType: z.string(),
    format: z.string(),
})
