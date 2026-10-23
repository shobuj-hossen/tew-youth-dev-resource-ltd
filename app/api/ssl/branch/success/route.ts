import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

// export async function GET(req: NextRequest) {
//     console.log(
//         "[SSLCommerz success GET]",
//         Object.fromEntries(
//             req.nextUrl.searchParams.entries(),
//         ),
//     )

//     const contentType =
//         req.headers.get("content-type") ?? ""

//     let payload: Record<string, unknown> = {}

//     if (
//         contentType.includes(
//             "application/x-www-form-urlencoded",
//         ) ||
//         contentType.includes("multipart/form-data")
//     ) {
//         const formData = await req.formData()
//         payload = Object.fromEntries(formData.entries())
//     } else if (contentType.includes("application/json")) {
//         payload = await req.json()
//     }

//     console.log("payload=>", payload)
//     return NextResponse.json({ received: true })
// }

export async function POST(req: NextRequest) {
    const contentType =
        req.headers.get("content-type") ?? ""

    let payload: Record<string, unknown> = {}

    if (
        contentType.includes(
            "application/x-www-form-urlencoded",
        ) ||
        contentType.includes("multipart/form-data")
    ) {
        const formData = await req.formData()
        payload = Object.fromEntries(formData.entries())
    } else if (contentType.includes("application/json")) {
        payload = await req.json()
    }

    // // Diagnostic only: do not mark the order as paid here.
    // console.log("[SSLCommerz success POST]", {
    //     contentType,
    //     fields: Object.keys(payload),
    //     status: payload.status,
    //     tran_id: payload.tran_id,
    // })

    console.log("payload=>", payload)

    redirect("/")
}
