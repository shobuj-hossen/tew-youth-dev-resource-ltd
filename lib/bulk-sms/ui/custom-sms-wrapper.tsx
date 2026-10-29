"use client"

import { ReactNode, useMemo, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import {
    AlertCircle,
    CheckCircle2,
    Loader2,
    MessageSquareText,
    Send,
    Users,
} from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

import { sendCustomSMS } from "../send-custom-sms"

export type SMSRecipient = {
    id: string
    name: string | undefined
    phoneNumber: string | undefined
}

type CustomSMSWrapperProps = {
    recipients: SMSRecipient[]

    open: boolean
    setOpen: (v: boolean) => void
}

type CustomSMSComposerProps = {
    recipients: SMSRecipient[]
    onSuccess?: () => void
}

export function CustomSMSDialog({
    recipients,
    open = false,
    setOpen,
}: CustomSMSWrapperProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-h-[90dvh] overflow-y-auto p-0 sm:max-w-2xl">
                <DialogHeader className="border-b px-6 py-5 pr-12">
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquareText className="size-5 text-primary" />
                        Send custom SMS
                    </DialogTitle>

                    <DialogDescription>
                        Compose and send a message to one or
                        multiple students.
                    </DialogDescription>
                </DialogHeader>

                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <CustomSMSComposer
                        recipients={recipients}
                        onSuccess={() => setOpen(false)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

function CustomSMSComposer({
    recipients,
    onSuccess,
}: CustomSMSComposerProps) {
    const [message, setMessage] = useState("")

    const phoneNumbers = useMemo(
        () => [
            ...new Set(
                recipients
                    .map((recipient) =>
                        recipient.phoneNumber?.trim(),
                    )
                    .filter((phone): phone is string =>
                        Boolean(phone),
                    ),
            ),
        ],
        [recipients],
    )

    const mutation = useMutation({
        mutationFn: () =>
            sendCustomSMS({
                phoneNumbers,
                message: message.trim(),
            }),

        onSuccess: () => {
            onSuccess?.()
        },
    })

    const characterCount = message.length
    const isUnicode = /[^\x00-\x7F]/.test(message)

    // Approximate segment count.
    const segmentLimit = isUnicode ? 70 : 160
    const estimatedSegments = message
        ? Math.ceil(characterCount / segmentLimit)
        : 0

    const canSend =
        phoneNumbers.length > 0 &&
        message.trim().length > 0 &&
        message.length <= 1000 &&
        !mutation.isPending

    return (
        <div className="space-y-5 pt-5">
            {/* Recipients */}
            <div className="rounded-xl border bg-muted/30 p-4">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-background">
                        <Users className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">
                            Message recipients
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {phoneNumbers.length} unique
                            phone number
                            {phoneNumbers.length !== 1
                                ? "s"
                                : ""}
                        </p>
                    </div>

                    <Badge variant="secondary">
                        {recipients.length} student
                        {recipients.length !== 1 ? "s" : ""}
                    </Badge>
                </div>

                {recipients.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {recipients
                            .slice(0, 4)
                            .map((recipient) => (
                                <Badge
                                    key={recipient.id}
                                    variant="outline"
                                    className="max-w-full truncate bg-background font-normal"
                                >
                                    {recipient.name ||
                                        "Unnamed student"}
                                </Badge>
                            ))}

                        {recipients.length > 4 && (
                            <Badge variant="outline">
                                +{recipients.length - 4}{" "}
                                more
                            </Badge>
                        )}
                    </div>
                )}

                {phoneNumbers.length <
                    recipients.length && (
                    <p className="mt-3 text-xs text-amber-600">
                        {recipients.length -
                            phoneNumbers.length}{" "}
                        student
                        {recipients.length -
                            phoneNumbers.length !==
                        1
                            ? "s have"
                            : " has"}{" "}
                        no phone number.
                    </p>
                )}
            </div>

            {/* Controlled message editor */}
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                    <label
                        htmlFor="custom-sms-message"
                        className="text-sm font-medium"
                    >
                        Your message
                    </label>

                    <span
                        className={`text-xs ${
                            characterCount >= 1000
                                ? "text-destructive"
                                : "text-muted-foreground"
                        }`}
                    >
                        {characterCount}/1000
                    </span>
                </div>

                <Textarea
                    id="custom-sms-message"
                    name="message"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value)

                        if (
                            mutation.isError ||
                            mutation.data
                        ) {
                            mutation.reset()
                        }
                    }}
                    maxLength={1000}
                    rows={6}
                    autoFocus={false}
                    className="min-h-36 resize-y rounded-xl leading-6"
                />

                <div className="flex flex-wrap justify-between gap-2 text-xs text-muted-foreground">
                    <span>
                        {isUnicode ? "Unicode" : "Standard"}{" "}
                        SMS
                    </span>

                    <span>
                        Approx. {estimatedSegments} segment
                        {estimatedSegments !== 1
                            ? "s"
                            : ""}{" "}
                        per recipient
                    </span>
                </div>
            </div>

            {/* Success state */}
            {mutation.isSuccess && (
                <div className="flex items-start gap-3 rounded-xl border p-4">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" />

                    <div>
                        <p className="text-sm font-medium">
                            SMS request completed
                        </p>

                        <p className="text-sm text-muted-foreground">
                            The SMS action completed
                            successfully. Check your
                            provider's response for delivery
                            confirmation.
                        </p>
                    </div>
                </div>
            )}

            {/* Error state */}
            {mutation.isError && (
                <div className="flex items-start gap-3 rounded-xl border border-destructive/30 p-4">
                    <AlertCircle className="mt-0.5 size-5 shrink-0 text-destructive" />

                    <p className="text-sm text-destructive">
                        {mutation.error instanceof Error
                            ? mutation.error.message
                            : "Unable to send SMS. Please try again."}
                    </p>
                </div>
            )}

            <Separator />

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                    {phoneNumbers.length === 0
                        ? "No recipients with phone numbers."
                        : `Sending to ${phoneNumbers.length} unique recipient${
                              phoneNumbers.length !== 1
                                  ? "s"
                                  : ""
                          }.`}
                </p>

                <Button
                    type="button"
                    className="gap-2"
                    disabled={!canSend}
                    onClick={() => mutation.mutate()}
                >
                    {mutation.isPending ? (
                        <>
                            <Loader2 className="size-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send className="size-4" />
                            Send SMS
                        </>
                    )}
                </Button>
            </div>
        </div>
    )
}
