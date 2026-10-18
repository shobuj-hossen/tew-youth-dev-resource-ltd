import { NextRequest, NextResponse } from "next/server"
import { seedStudents } from "./utils"

export async function GET(req: NextRequest) {
    await seedStudents({
        count: 5,
        imageUrl:
            "https://res.cloudinary.com/ddyrlplxn/image/upload/v1790418355/file_szbhjt.jpg",
        orgId: "xhHjYSVlMNpQstnxEW8tGnqYSKCmed16",
    })
    return NextResponse.json({ status: "success" })
}
