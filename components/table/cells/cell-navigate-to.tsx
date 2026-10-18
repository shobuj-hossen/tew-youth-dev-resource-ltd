import { Button } from "@/components/ui/button"
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import React from "react"

export function CellNavigateTo({ href }: { href: string }) {
    return (
        <Button
            nativeButton={false}
            render={<Link href={href} />}
            variant={"ghost"}
            size={"icon"}
        >
            <SquareArrowOutUpRight />
        </Button>
    )
}
