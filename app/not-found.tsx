import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
    return (
        <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center">
            <div className="max-w-md space-y-6">
                <div className="flex justify-center">
                    <div className="rounded-full bg-muted p-4 text-muted-foreground animate-pulse">
                        <FileQuestion className="h-12 w-12" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-foreground">
                        Page Not Found
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base">
                        The page you are looking for doesn't
                        exist, has been removed, or has
                        changed address.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3">
                    <Button
                        nativeButton={false}
                        render={
                            <Link href="/">
                                Return Home
                            </Link>
                        }
                        variant="default"
                    ></Button>
                </div>
            </div>
        </div>
    )
}
