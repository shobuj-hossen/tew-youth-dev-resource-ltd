import { NextRequest, NextResponse } from "next/server"
import { seedStudents } from "./utils"
// import { seedStudents } from "./utils"

export async function GET(req: NextRequest) {
    await seedStudents({
        count: 20,
        imageUrl:
            "https://res.cloudinary.com/hqgeidbk/image/upload/v1792817558/tewydr/shobuj-academy/students/ftg89smmcg11uwswoxjg.jpg",
        orgId: "V6IvcsemA6F772oOL6c6LKk3mYsd5tXL",
    })

    return NextResponse.json({
        status: "success",
    })
}
