import { UploadResult } from "@/lib/cloudinary/upload"

import { deleteFromCloudinary } from "@/lib/cloudinary/delete"

export async function cleanupUploads(
    uploads: Array<UploadResult | undefined | null>,
) {
    const publicIds = uploads
        .filter((upload): upload is UploadResult =>
            Boolean(upload?.publicId),
        )
        .map((upload) => upload.publicId)

    if (!publicIds.length) return

    const results = await Promise.allSettled(
        publicIds.map((publicId) =>
            deleteFromCloudinary(publicId),
        ),
    )

    const failed = results.filter(
        (result) => result.status === "rejected",
    )

    if (failed.length > 0) {
        console.error(
            "Failed to cleanup Cloudinary uploads",
            failed,
        )
    }
}
