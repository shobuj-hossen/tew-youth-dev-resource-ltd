import "server-only"
import { cloudinary } from "./config"

export type UploadResult = {
    publicId: string
    secureUrl: string
    resourceType: string
    format: string
}

export type UploadOptions = {
    folder?: string
    publicId?: string
    resourceType?: "image" | "video" | "raw" | "auto"
    tags?: string[]
}

export async function uploadToCloudinary(
    file: File,
    options: UploadOptions = {},
): Promise<UploadResult> {
    const buffer = Buffer.from(await file.arrayBuffer())

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type:
                    options.resourceType ?? "auto",
                folder: options.folder,
                public_id: options.publicId,
                tags: options.tags,
            },
            (error, result) => {
                if (error) {
                    reject(error)
                    return
                }

                if (!result) {
                    reject(
                        new Error(
                            "Cloudinary upload failed",
                        ),
                    )
                    return
                }

                resolve({
                    publicId: result.public_id,
                    secureUrl: result.secure_url,
                    resourceType: result.resource_type,
                    format: result.format,
                })
            },
        )

        stream.end(buffer)
    })
}
