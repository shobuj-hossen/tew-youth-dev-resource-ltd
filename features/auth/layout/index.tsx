import { MoveLeft } from "lucide-react"
import Link from "next/link"

export function AuthLayout(props: LayoutProps<"/">) {
    return (
        <div className="max-w-7xl m-auto">
            <h1 className="h-16 flex items-center justify-start px-4 lg:px-8">
                <Link href={"/"}>
                    <MoveLeft />
                </Link>
            </h1>

            <div className="max-w-sm m-auto pt-5 px-4">
                {props.children}
            </div>
        </div>
    )
}
