"use client"

import { useEffect } from "react"
import { Button } from "../ui/button"
import { AlertCircle } from "lucide-react"

export type FallbackErrorType = {
    error: Error & { digest?: string }
    retry: () => void
}

export function FallbackError({
    error,
    retry,
}: FallbackErrorType) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="p-6 flex items-center justify-center flex-col gap-4">
            <div className="flex items-center justify-center gap-2 text-destructive">
                <AlertCircle />
                <span>
                    {error.message ||
                        "Something went wrong"}
                </span>
            </div>
            <Button
                variant={"ghost"}
                onClick={() => retry()}
            >
                Try again
            </Button>
        </div>
    )
}
