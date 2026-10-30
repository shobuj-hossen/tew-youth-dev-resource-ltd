"use client"

import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"

import {
    AlertCircle,
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    Download,
    FileCheck,
    GraduationCap,
    RefreshCw,
    Search,
    ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import { PublicStudentResult } from "../../schemas"
import {
    createMathCaptcha,
    getPublicStudentResult,
} from "../../captcha"
import { generateResultPDF } from "./pdf/generate-result-pdf"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"

export function ResultPortal() {
    const [rollNumber, setRollNumber] = useState("")
    const [registrationNumber, setRegistrationNumber] =
        useState("")

    const [captchaAnswer, setCaptchaAnswer] = useState("")
    const [captcha, setCaptcha] = useState<{
        question: string
        token: string
    } | null>(null)

    const [result, setResult] =
        useState<PublicStudentResult | null>(null)

    const [error, setError] = useState("")

    const captchaMutation = useMutation({
        mutationFn: createMathCaptcha,

        onSuccess: (response) => {
            if (response.success) {
                setCaptcha({
                    question: response.question,
                    token: response.token,
                })
            } else {
                setError(response.message)
            }
        },

        onError: () => {
            setError(
                "Unable to load CAPTCHA. Please try again.",
            )
        },
    })

    const resultMutation = useMutation({
        mutationFn: getPublicStudentResult,

        onSuccess: (response) => {
            if (response.success) {
                setResult(response.data)
                setError("")
            } else {
                setError(response.message)
                setCaptchaAnswer("")
                captchaMutation.mutate()
            }
        },

        onError: () => {
            setError(
                "Something went wrong. Please try again.",
            )
            captchaMutation.mutate()
        },
    })

    useEffect(() => {
        captchaMutation.mutate()
    }, [])

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault()

        setError("")

        if (
            !rollNumber.trim() ||
            !registrationNumber.trim()
        ) {
            setError(
                "Please enter your roll and registration number.",
            )
            return
        }

        if (!captcha || !captchaAnswer.trim()) {
            setError("Please complete the CAPTCHA.")
            return
        }

        resultMutation.mutate({
            rollNumber,
            registrationNumber,
            captchaAnswer,
            captchaToken: captcha.token,
        })
    }

    const resetPage = () => {
        setRollNumber("")
        setRegistrationNumber("")
        setCaptchaAnswer("")
        setResult(null)
        setError("")
        captchaMutation.mutate()
    }

    const isLoading =
        resultMutation.isPending ||
        captchaMutation.isPending

    const institutionName =
        process.env.NEXT_PUBLIC_COMPANY_NAME ||
        "Your Institution"

    const logo =
        process.env.NEXT_PUBLIC_COMPANY_LOGO || "/logo.png"

    return (
        <main className="min-h-screen bg-muted/30 px-4 py-16 sm:py-24">
            <div className="mx-auto w-full max-w-2xl">
                {/* Institution identity */}
                <div className="mb-8 text-center">
                    <div className="mb-4 flex justify-center">
                        <div className="flex size-16 items-center justify-center overflow-hidden rounded-2xl border bg-background shadow-sm">
                            <img
                                src={logo}
                                alt="Institution logo"
                                className="size-full object-contain p-2"
                            />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        {institutionName}
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Official Student Result Portal
                    </p>
                </div>

                <Card className="relative overflow-hidden rounded-2xl border shadow-sm">
                    {/* Top loading indicator */}
                    {isLoading && (
                        <div className="absolute inset-x-0 top-0 z-20 h-1 overflow-hidden bg-primary/10">
                            <div className="h-full w-1/3 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-primary" />
                        </div>
                    )}

                    {result ? (
                        <>
                            <CardHeader className="pb-5 text-center">
                                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-green-500/10 text-green-600">
                                    <CheckCircle2 className="size-6" />
                                </div>

                                <CardTitle className="text-xl">
                                    Result Found!
                                </CardTitle>

                                <CardDescription>
                                    Your academic result has
                                    been published.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-6">
                                {/* Result highlight */}
                                <div className="rounded-xl border bg-primary/5 p-5 text-center">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        Published Result
                                    </p>

                                    <p className="mt-2 text-3xl font-bold tracking-tight text-primary">
                                        {
                                            result
                                                .enrollment
                                                .result
                                        }
                                    </p>
                                </div>

                                {/* Student details */}
                                <div className="space-y-3">
                                    <h3 className="flex items-center gap-2 font-semibold">
                                        <GraduationCap className="size-4 text-primary" />
                                        Student Information
                                    </h3>

                                    <div className="grid grid-cols-1 gap-4 rounded-xl border p-4 sm:grid-cols-2">
                                        <Detail
                                            label="Student Name"
                                            value={
                                                result
                                                    .student
                                                    .name
                                            }
                                        />

                                        <Detail
                                            label="Father's Name"
                                            value={
                                                result
                                                    .student
                                                    .fatherName
                                            }
                                        />

                                        <Detail
                                            label="Mother's Name"
                                            value={
                                                result
                                                    .student
                                                    .motherName
                                            }
                                        />
                                    </div>
                                </div>

                                <Separator />

                                {/* Enrollment details */}
                                <div className="space-y-3">
                                    <h3 className="flex items-center gap-2 font-semibold">
                                        <BookOpen className="size-4 text-primary" />
                                        Enrollment
                                        Information
                                    </h3>

                                    <div className="grid grid-cols-2 gap-4 rounded-xl border p-4">
                                        <Detail
                                            label="Roll Number"
                                            value={
                                                result
                                                    .enrollment
                                                    .rollNumber
                                            }
                                        />

                                        <Detail
                                            label="Registration Number"
                                            value={
                                                result
                                                    .enrollment
                                                    .registrationNumber
                                            }
                                        />

                                        <Detail
                                            label="Serial Number"
                                            value={
                                                result
                                                    .enrollment
                                                    .serialNo
                                            }
                                        />

                                        <Detail
                                            label="Course Duration"
                                            value={
                                                result
                                                    .enrollment
                                                    .courseDuration
                                            }
                                        />

                                        <Detail
                                            label="Course Range"
                                            value={
                                                result
                                                    .enrollment
                                                    .courseRange
                                            }
                                        />

                                        <Detail
                                            label="Medium"
                                            value={
                                                result
                                                    .enrollment
                                                    .medium
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                                    <Button
                                        className="flex-1"
                                        onClick={() =>
                                            generateResultPDF(
                                                result,
                                            )
                                        }
                                    >
                                        <Download className="mr-2 size-4" />
                                        Download Result PDF
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        onClick={resetPage}
                                    >
                                        <RefreshCw className="mr-2 size-4" />
                                        Check Another Result
                                    </Button>
                                </div>
                            </CardContent>
                        </>
                    ) : (
                        <>
                            <CardHeader className="space-y-2">
                                <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <FileCheck className="size-5" />
                                </div>

                                <CardTitle className="text-xl">
                                    Check Your Result
                                </CardTitle>

                                <CardDescription>
                                    Enter your enrollment
                                    details below to
                                    retrieve your published
                                    academic result.
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <Field>
                                        <Label>
                                            Roll Number
                                        </Label>

                                        <Input
                                            placeholder="Enter your roll number"
                                            value={
                                                rollNumber
                                            }
                                            onChange={(e) =>
                                                setRollNumber(
                                                    e.target
                                                        .value,
                                                )
                                            }
                                            disabled={
                                                isLoading
                                            }
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <Label>
                                            Registration
                                            Number
                                        </Label>

                                        <Input
                                            placeholder="Enter your registration number"
                                            value={
                                                registrationNumber
                                            }
                                            onChange={(e) =>
                                                setRegistrationNumber(
                                                    e.target
                                                        .value,
                                                )
                                            }
                                            disabled={
                                                isLoading
                                            }
                                            required
                                        />
                                    </Field>

                                    <Separator />

                                    {/* CAPTCHA */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-semibold">
                                                Security
                                                Verification
                                            </label>

                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="ghost"
                                                disabled={
                                                    captchaMutation.isPending ||
                                                    resultMutation.isPending
                                                }
                                                onClick={() => {
                                                    setCaptchaAnswer(
                                                        "",
                                                    )
                                                    captchaMutation.mutate()
                                                }}
                                            >
                                                <RefreshCw className="mr-2 size-3.5" />
                                                Refresh
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
                                            <ShieldCheck className="size-5 shrink-0 text-primary" />

                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs text-muted-foreground">
                                                    Solve
                                                    this
                                                    simple
                                                    math
                                                    problem
                                                </p>

                                                <p className="text-lg font-bold tracking-widest">
                                                    {captcha?.question ??
                                                        "Loading..."}
                                                </p>
                                            </div>

                                            <Input
                                                className="w-24 text-center font-semibold"
                                                placeholder="Answer"
                                                inputMode="numeric"
                                                value={
                                                    captchaAnswer
                                                }
                                                onChange={(
                                                    e,
                                                ) =>
                                                    setCaptchaAnswer(
                                                        e.target.value
                                                            .replace(
                                                                /\D/g,
                                                                "",
                                                            )
                                                            .slice(
                                                                0,
                                                                3,
                                                            ),
                                                    )
                                                }
                                                disabled={
                                                    !captcha ||
                                                    isLoading
                                                }
                                            />
                                        </div>
                                    </div>

                                    {/* Error */}
                                    {error && (
                                        <div className="flex items-start gap-2 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                                            <AlertCircle className="mt-0.5 size-4 shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        className="h-11 w-full"
                                        disabled={
                                            isLoading ||
                                            !captcha
                                        }
                                    >
                                        <Search className="mr-2 size-4" />

                                        {resultMutation.isPending
                                            ? "Checking Result..."
                                            : "Check Result"}
                                    </Button>

                                    <p className="text-center text-xs text-muted-foreground">
                                        Your information is
                                        only used to
                                        retrieve your
                                        academic result.
                                    </p>
                                </form>
                            </CardContent>
                        </>
                    )}
                </Card>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                    © {new Date().getFullYear()}{" "}
                    {institutionName}. All rights reserved.
                </p>
            </div>

            <style jsx global>{`
                @keyframes loading {
                    0% {
                        transform: translateX(-120%);
                    }
                    100% {
                        transform: translateX(400%);
                    }
                }
            `}</style>
        </main>
    )
}

function Detail({
    label,
    value,
}: {
    label: string
    value: string
}) {
    return (
        <div className="min-w-0 space-y-1">
            <p className="text-xs text-muted-foreground">
                {label}
            </p>

            <p className="break-words text-sm font-semibold">
                {value || "-"}
            </p>
        </div>
    )
}
