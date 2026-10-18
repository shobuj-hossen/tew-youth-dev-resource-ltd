import { Logo } from "@/components/shared/logo"
import { Skeleton } from "@/components/ui/skeleton"

export function NavbarSkeleton() {
    return (
        <div className="h-24 border-b">
            <div className="flex h-full items-center justify-between px-4 max-w-7xl xl:px-0 m-auto">
                <Logo />

                <div className="hidden">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-36 rounded-md" />
                    <Skeleton className="h-10 w-20 rounded-md" />
                </div>
            </div>
        </div>
    )
}
