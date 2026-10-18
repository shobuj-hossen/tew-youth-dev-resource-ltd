import "server-only"
import { cloudinary } from "./config"

type DeleteOptions = {
    resourceType?: "image" | "video" | "raw"
}

export async function deleteFromCloudinary(
    publicId: string,
    options: DeleteOptions = {},
) {
    return cloudinary.uploader.destroy(publicId, {
        resource_type: options.resourceType ?? "image",
    })
}
