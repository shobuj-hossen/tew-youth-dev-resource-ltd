"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { CheckCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

import { provideResults } from "../actions"
import { EnrollmentBranchById } from "../types"

const RESULTS = [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "C",
    "D",
    "F",
] as const

type Result = (typeof RESULTS)[number]

export function ProvideResultDialog({
    data,
}: {
    data: EnrollmentBranchById[]
}) {
    const [open, setOpen] = useState(false)

    const [results, setResults] = useState<
        Record<string, Result>
    >(() =>
        Object.fromEntries(
            data.map((student) => [student.id, "A+"]),
        ),
    )

    const mutation = useMutation({
        mutationFn: provideResults,
        onSuccess: () => {
            setOpen(false)
        },
    })

    const handleOpenChange = (value: boolean) => {
        if (mutation.isPending) {
            return
        }

        setOpen(value)

        if (value) {
            setResults(
                Object.fromEntries(
                    data.map((student) => [
                        student.id,
                        "A+",
                    ]),
                ),
            )
        }
    }

    const handleResultChange = (
        enrollmentId: string,
        result: Result,
    ) => {
        setResults((current) => ({
            ...current,
            [enrollmentId]: result,
        }))
    }

    const handlePublish = () => {
        mutation.mutate({
            results: data.map((student) => ({
                enrollmentId: student.id,
                result: results[student.id] ?? "A+",
            })),
        })
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger
                render={
                    <Button variant="outline">
                        <CheckCircle2 />
                        Provide Result
                    </Button>
                }
            />

            <DialogContent className="max-h-[85vh] sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Provide Results
                    </DialogTitle>
                    <DialogDescription>
                        Select the result for each enrolled
                        student before publishing.
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[50vh] overflow-y-auto">
                    <div className="rounded-lg border">
                        <div className="grid grid-cols-[1fr_120px] items-center gap-4 bg-muted/40 px-4 py-3 text-xs font-medium text-muted-foreground">
                            <span>Student</span>
                            <span>Result</span>
                        </div>

                        <div className="divide-y">
                            {data.map((student) => (
                                <div
                                    key={student.id}
                                    className="grid grid-cols-[1fr_120px] items-center gap-4 px-4 py-3"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium">
                                            {student.student
                                                ?.name ||
                                                "Unknown Student"}
                                        </p>

                                        <p className="text-xs text-muted-foreground">
                                            Roll:{" "}
                                            {
                                                student.rollNumber
                                            }
                                        </p>
                                    </div>

                                    <Select
                                        value={
                                            results[
                                                student.id
                                            ] ?? "A+"
                                        }
                                        onValueChange={(
                                            value,
                                        ) =>
                                            handleResultChange(
                                                student.id,
                                                value as Result,
                                            )
                                        }
                                        disabled={
                                            mutation.isPending
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {RESULTS.map(
                                                (
                                                    result,
                                                ) => (
                                                    <SelectItem
                                                        key={
                                                            result
                                                        }
                                                        value={
                                                            result
                                                        }
                                                    >
                                                        {
                                                            result
                                                        }
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator />

                <DialogFooter>
                    <DialogClose
                        render={
                            <Button
                                variant="outline"
                                disabled={
                                    mutation.isPending
                                }
                            >
                                Cancel
                            </Button>
                        }
                    />

                    <Button
                        onClick={handlePublish}
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <CheckCircle2 />
                        )}

                        {mutation.isPending
                            ? "Publishing..."
                            : `Publish ${data.length} Results`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
