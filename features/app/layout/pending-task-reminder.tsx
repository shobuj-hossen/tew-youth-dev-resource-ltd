"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import {
    BellRing,
    CalendarDays,
    CheckCheck,
    ListTodo,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { getPendingTaskReminders } from "../actions"

export function TaskReminder() {
    const router = useRouter()
    const [dismissed, setDismissed] = useState(false)

    const { data: tasks = [], isError } = useQuery({
        queryKey: ["task-reminders"],
        queryFn: () => getPendingTaskReminders(),
        staleTime: 60_000,
        refetchOnWindowFocus: true,
    })

    const open = !dismissed && tasks.length > 0 && !isError

    function handleCheckNow() {
        setDismissed(true)
        router.push("/dashboard/tasks")
    }

    return (
        <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen) setDismissed(true)
            }}
        >
            <DialogContent className="overflow-hidden p-0 sm:max-w-md">
                <div className="bg-muted/40 px-6 pb-5 pt-6">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <BellRing className="size-6" />
                    </div>

                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl">
                            Pending tasks need your
                            attention
                        </DialogTitle>

                        <DialogDescription className="mt-2">
                            You have {tasks.length}{" "}
                            incomplete{" "}
                            {tasks.length === 1
                                ? "task"
                                : "tasks"}
                            . Review them whenever you're
                            ready.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="space-y-3 px-6 py-5">
                    {tasks.slice(0, 3).map((task) => (
                        <div
                            key={task.id}
                            className="flex items-start gap-3 rounded-xl border p-3"
                        >
                            <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <ListTodo className="size-4 text-muted-foreground" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="break-words text-sm font-medium">
                                    {task.title}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <CalendarDays className="size-3.5" />
                                    <span>
                                        Due{" "}
                                        {new Date(
                                            task.dueDate,
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {tasks.length > 3 && (
                        <p className="text-center text-xs text-muted-foreground">
                            And {tasks.length - 3} more{" "}
                            {tasks.length - 3 === 1
                                ? "task"
                                : "tasks"}
                        </p>
                    )}
                </div>

                <DialogFooter className="flex-row justify-end border-t px-6 py-4">
                    <Button
                        variant="outline"
                        onClick={() => setDismissed(true)}
                    >
                        Not now
                    </Button>

                    <Button onClick={handleCheckNow}>
                        <CheckCheck className="mr-2 size-4" />
                        Check now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
