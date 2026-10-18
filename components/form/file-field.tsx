"use client"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { cn } from "@/lib/utils"
import { FormField } from "@/types/form"
import { CheckCircle, Upload, X } from "lucide-react"
import { useState } from "react"
import {
    useDropzone,
    type Accept,
    type FileRejection,
} from "react-dropzone"
import { useFieldContext } from "./use-app-form"

type FileFieldProps = Pick<
    FormField,
    "label" | "description" | "placeholder"
> & {
    accept?: Accept
    maxSize?: number
    disabled?: boolean
    className?: string
}

export function FileField({
    label,
    description,
    placeholder = "Drop your file here or click to browse",
    accept,
    maxSize,
    disabled,
    className,
}: FileFieldProps) {
    const field = useFieldContext<File | null>()
    const [rejection, setRejection] = useState<
        string | null
    >(null)

    const isInvalid =
        field.state.meta.isTouched &&
        !field.state.meta.isValid

    const onDrop = (files: File[]) => {
        setRejection(null)
        field.handleChange(files[0] ?? null)
    }

    const onDropRejected = (
        rejections: FileRejection[],
    ) => {
        const error = rejections[0]?.errors[0]

        setRejection(error?.message ?? "Invalid file.")
        field.handleChange(null)
    }

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        open,
    } = useDropzone({
        onDrop,
        onDropRejected,
        accept,
        maxSize,
        multiple: false,
        disabled,
        noClick: true,
    })

    const file = field.state.value

    return (
        <Field
            data-invalid={isInvalid}
            className={cn(className)}
        >
            {label && (
                <FieldLabel htmlFor={field.name}>
                    {label}
                </FieldLabel>
            )}

            <div
                {...getRootProps()}
                className={cn(
                    "rounded-lg border border-dashed p-6 transition-colors",
                    "flex flex-col items-center justify-center gap-3",
                    "cursor-pointer bg-muted/30",
                    isDragActive &&
                        "border-primary bg-accent/50",
                    isInvalid && "border-destructive",
                    disabled &&
                        "cursor-not-allowed opacity-50",
                )}
            >
                <input
                    {...getInputProps({
                        id: field.name,
                        name: field.name,
                        onBlur: field.handleBlur,
                    })}
                />

                {file ? (
                    <div className="flex w-full items-start gap-3 rounded-md border bg-muted/40 p-3">
                        <CheckCircle className="size-4 opacity-90 shrink-0 mt-1" />

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                                {file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation()
                                field.handleChange(null)
                                setRejection(null)
                            }}
                        >
                            <X />
                            <span className="sr-only">
                                Remove file
                            </span>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                            <Upload className="size-5 text-muted-foreground" />
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-medium">
                                {isDragActive
                                    ? "Drop your file here"
                                    : placeholder}
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation()
                                open()
                            }}
                        >
                            Browse files
                        </Button>
                    </>
                )}
            </div>

            {description && !rejection && (
                <FieldDescription>
                    {description}
                </FieldDescription>
            )}

            {rejection && (
                <FieldError
                    errors={[{ message: rejection }]}
                />
            )}

            {isInvalid && !rejection && (
                <FieldError
                    errors={field.state.meta.errors}
                />
            )}
        </Field>
    )
}

function formatFileSize(bytes: number) {
    if (bytes === 0) return "0 Bytes"

    const units = ["Bytes", "KB", "MB", "GB"]
    const index = Math.floor(
        Math.log(bytes) / Math.log(1024),
    )

    return `${(bytes / Math.pow(1024, index)).toFixed(1)} ${units[index]}`
}
