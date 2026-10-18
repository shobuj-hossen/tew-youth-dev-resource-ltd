"use client"

import {
    FallbackError,
    FallbackErrorType,
} from "@/components/shared/fallback-error"

export default function error(error: FallbackErrorType) {
    return <FallbackError {...error} />
}
