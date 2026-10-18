import * as React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SubmitButtonProps = React.ComponentProps<
    typeof Button
> & { isPending?: boolean }

export function SubmitButton({
    isPending = false,

    disabled,
    children,
    className,
    ...props
}: SubmitButtonProps) {
    return (
        <Button
            {...props}
            type="submit"

            disabled={disabled || isPending}
            className={cn("relative", className)}
        >
            <span
                className={cn(
                    "inline-flex items-center gap-2",
                    isPending && "invisible",
                )}
            >
                {children}
            </span>

            {isPending && (
                <span className="absolute inset-0 grid place-items-center">
                    <Loader2 className="size-4 animate-spin" />
                </span>
            )}
        </Button>
    )
}
