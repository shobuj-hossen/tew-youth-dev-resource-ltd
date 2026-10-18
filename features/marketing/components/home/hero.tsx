import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <section
            id="#home"
            className="relative isolate flex h-dvh min-h-150 items-center justify-center overflow-hidden border-b"
        >
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -left-24 top-16 size-64 rounded-full bg-primary/15 blur-3xl animate-[float_9s_ease-in-out_infinite]" />
                <div className="absolute -right-20 top-1/3 size-80 rounded-full bg-primary/10 blur-3xl animate-[float_12s_ease-in-out_infinite_reverse]" />
                <div className="absolute -bottom-30 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl animate-[float_10s_ease-in-out_infinite_2s]" />
            </div>

            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-[18%] top-[22%] size-3 rounded-full bg-primary/40 animate-[float_7s_ease-in-out_infinite]" />
                <div className="absolute right-[20%] top-[28%] size-5 rounded-full bg-primary/30 animate-[float_8s_ease-in-out_infinite_reverse]" />
                <div className="absolute bottom-[20%] left-[28%] size-4 rounded-full bg-primary/30 animate-[float_11s_ease-in-out_infinite_1s]" />
            </div>

            <div className="flex max-w-4xl flex-col items-center px-6 text-center">
                <span className="mb-5 animate-in fade-in slide-in-from-bottom-4 duration-700 text-sm font-medium tracking-[0.25em] text-primary uppercase">
                    Youth Development Resource
                </span>

                <h1 className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000 text-5xl leading-[1.05] font-black tracking-tight sm:text-6xl md:text-7xl">
                    The Earn Way Youth Development Resource
                </h1>

                <p className="mt-7 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 text-base leading-7 text-muted-foreground sm:text-lg">
                    We grant licenses and permission to open
                    branches of our computer training
                    center. Apply now and become a branch
                    entrepreneur.
                </p>

                <div className="mt-9 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                    <Button
                        nativeButton={false}
                        render={
                            <Link href={"/apply-branch"} />
                        }
                        size="lg"
                        className="px-8 shadow-lg shadow-primary/20"
                    >
                        Apply for Branch <ChevronRight />
                    </Button>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% {
                        transform: translate3d(0, 0, 0) scale(1);
                    }
                    25% {
                        transform: translate3d(18px, -24px, 0) scale(1.04);
                    }
                    50% {
                        transform: translate3d(-12px, -42px, 0) scale(0.96);
                    }
                    75% {
                        transform: translate3d(-24px, -18px, 0) scale(1.02);
                    }
                }
            `}</style>
        </section>
    )
}
