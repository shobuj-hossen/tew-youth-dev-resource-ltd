import { AlertCircle, LoaderCircle } from "lucide-react"
import React from "react"

export function FallbackLoading() {
    return (
        <div className="p-6 flex items-center justify-center">
            <LoaderCircle className="animate-spin" />
        </div>
    )
}
