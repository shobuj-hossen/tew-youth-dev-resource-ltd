import Image from "next/image"
import { BookOpen, Clock3 } from "lucide-react"

import { getCourses } from "../../queries"
import { ScrollReveal } from "./scroll-reveal"

const statusStyles = {
    active: "bg-emerald-500/10 text-emerald-600",
    "in-active": "bg-muted text-muted-foreground",
    "up-coming": "bg-amber-500/10 text-amber-600",
} as const

export async function Courses() {
    const courses = await getCourses()

    return (
        <section
            id="home-courses"
            className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
            <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12 lg:mb-14">
                <div className="mb-4 text-primary flex items-center justify-center gap-2 text-sm font-medium">
                    <span className="h-px w-7  bg-primary" />
                    <span>Our Courses</span>
                    <span className="h-px w-7  bg-primary" />
                </div>

                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                    Teach skills that move them forward.
                </h1>

                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                    Explore our professional courses and
                    find the right path to build your skills
                    and advance your career.
                </p>
            </div>

            {courses.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {courses.map((course, index) => (
                        <ScrollReveal
                            key={course.id}
                            delay={Math.min(
                                index * 75,
                                300,
                            )}
                        >
                            <article className="group overflow-hidden rounded-2xl border bg-card">
                                <div className="relative aspect-video overflow-hidden bg-muted">
                                    <Image
                                        src={
                                            course.banner
                                                .secureUrl
                                        }
                                        alt={course.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                                    <div className="absolute left-3 top-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-md ${statusStyles[course.status]}`}
                                        >
                                            {course.status ===
                                            "up-coming"
                                                ? "Upcoming"
                                                : course.status ===
                                                    "in-active"
                                                  ? "Inactive"
                                                  : "Active"}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-3 left-3">
                                        <span className="rounded-md bg-black/50 px-2 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-sm">
                                            {course.code}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 sm:p-5">
                                    <h2 className="line-clamp-2 text-base font-semibold leading-6 tracking-tight sm:text-lg">
                                        {course.name}
                                    </h2>

                                    {course.description && (
                                        <p className="mt-2 line-clamp-2 text-sm leading-5 text-muted-foreground">
                                            {
                                                course.description
                                            }
                                        </p>
                                    )}

                                    <div className="mt-4 flex items-center gap-2 border-t pt-3 text-xs text-muted-foreground">
                                        <Clock3 className="size-3.5" />
                                        <span>
                                            Professional
                                            course
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </ScrollReveal>
                    ))}
                </div>
            ) : (
                <div className="flex min-h-64 items-center justify-center rounded-2xl border border-dashed">
                    <div className="text-center">
                        <BookOpen className="mx-auto size-8 text-muted-foreground" />

                        <h2 className="mt-3 font-medium">
                            No courses available
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Please check back later for
                            available courses.
                        </p>
                    </div>
                </div>
            )}
        </section>
    )
}
