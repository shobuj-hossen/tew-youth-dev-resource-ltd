"use client"

import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { BookOpen, Calendar, Banknote } from "lucide-react"
import Image from "next/image"
import { Course } from "../types"

// Helper to format fee integers in Bangladeshi Taka (BDT / ৳)
function formatFee(amount: number | null): string {
    if (amount === null) return "N/A"

    // Formats using Bangladeshi locale and BDT currency (e.g., ৳ 50,000 or ৳ 1,00,000)
    return new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
    }).format(amount)
}

export function CourseDetails({
    course,
}: {
    course: Course
}) {
    const imageUrl = course.banner.secureUrl

    // Map the fee properties into an easily iteration-friendly structure
    const feeTiers = [
        { label: "3 Months", value: course.threeMonthsFee },
        { label: "6 Months", value: course.sixMonthsFee },
        { label: "1 Year", value: course.oneYearFee },
        { label: "2 Years", value: course.twoYearsFee },
        { label: "3 Years", value: course.threeYearsFee },
        { label: "4 Years", value: course.fourYearsFee },
    ]

    // Filter out tiers that have no fee assigned
    const availableFees = feeTiers.filter(
        (tier) => tier.value !== null,
    )

    return (
        <div className="mx-auto w-full max-w-2xl space-y-6">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">
                        Course
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">
                        {course.code}
                    </p>
                </div>

                <Badge
                    variant="secondary"
                    className="capitalize"
                >
                    {course.status.replace("-", " ")}
                </Badge>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={course.name}
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <BookOpen className="size-10 text-muted-foreground" />
                    </div>
                )}
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {course.name}
                    </h1>

                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="size-4" />
                        <span>
                            Created{" "}
                            {format(
                                new Date(course.createdAt),
                                "MMM d, yyyy",
                            )}
                        </span>
                    </div>
                </div>

                <div className="border-t pt-4">
                    <p className="text-sm leading-6 text-muted-foreground">
                        {course.description ||
                            "No description provided."}
                    </p>
                </div>

                {/* Fee Schedule Section */}
                <div className="border-t pt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <Banknote className="size-4 text-muted-foreground" />
                        <span>Fee Schedule</span>
                    </div>

                    {availableFees.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {availableFees.map((tier) => (
                                <div
                                    key={tier.label}
                                    className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm"
                                >
                                    <p className="text-xs text-muted-foreground font-medium">
                                        {tier.label}
                                    </p>
                                    <p className="text-lg font-semibold tracking-tight mt-1">
                                        {formatFee(
                                            tier.value,
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">
                            No fee information currently
                            available for this course.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
