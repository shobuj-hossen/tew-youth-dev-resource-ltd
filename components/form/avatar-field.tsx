"use client"

import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

import { FormField } from "@/types/form"
import { ImagePlus } from "lucide-react"
import { useEffect, useState } from "react"
import Cropper, { type Area } from "react-easy-crop"
import { Button } from "../ui/button"
import { useFieldContext } from "./use-app-form"
import {
    avatarObjDefaults,
    AvatarObjSchema,
} from "@/features/app/schemas"

type AvatarFieldProps = Pick<
    FormField,
    "label" | "description"
> & {
    maxSize?: number
}

export function AvatarField({
    label,
    description,
    maxSize = 5 * 1024 * 1024,
}: AvatarFieldProps) {
    const field = useFieldContext<AvatarObjSchema | null>()

    const [image, setImage] = useState<string>()
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [error, setError] = useState<string>()
    const [cropArea, setCropArea] = useState<Area>()

    const isInvalid =
        (field.state.meta.isTouched ||
            field.form.state.submissionAttempts > 0) &&
        !field.state.meta.isValid

    console.log("error", field.state.meta.errors)

    const handleChange = (file?: File) => {
        if (!file) return

        if (!file.type.startsWith("image/")) {
            setError("Please select an image.")
            return
        }

        if (file.size > maxSize) {
            setError(
                `Image must be smaller than ${formatSize(maxSize)}.`,
            )
            return
        }

        setError(undefined)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
        setCropArea(undefined)

        field.handleChange({
            ...avatarObjDefaults,
            originalFile: file,
        })
    }

    // for setting initial image preview
    useEffect(() => {
        const file = field.state.value?.originalFile

        if (!file) {
            setImage(undefined)

            return
        }

        const url = URL.createObjectURL(file)
        setImage(url)

        return () => URL.revokeObjectURL(url)
    }, [field.state.value?.originalFile])

    // for setting initial image preview
    useEffect(() => {
        const x = field.state.value?.x || 0
        const y = field.state.value?.y || 0
        const zoom = field.state.value?.zoom
        if (x || y) {
            setCrop({ x, y })
        }
        if (zoom) {
            setZoom(zoom)
        }
    }, [
        field.state.value?.x,
        field.state.value?.y,
        field.state.value?.zoom,
    ])

    // for cropping the image file
    useEffect(() => {
        const value = field.state.value

        if (!value || !cropArea) return

        let cancelled = false

        getCroppedFile(value.originalFile, cropArea).then(
            (croppedFile) => {
                if (cancelled) return

                field.setValue({
                    originalFile: value.originalFile,
                    croppedFile,
                    x: crop.x,
                    y: crop.y,
                    zoom,
                })
            },
        )

        return () => {
            cancelled = true
        }
    }, [cropArea])

    return (
        <Field data-invalid={isInvalid}>
            {label && (
                <FieldLabel htmlFor={field.name}>
                    {label}
                </FieldLabel>
            )}

            {image ? (
                <div className="space-y-4">
                    <div className="flex items-end gap-2 justify-start">
                        <div className="relative aspect-square w-40! overflow-hidden border rounded-sm border-background shadow-lg ring-1 ring-border">
                            <Cropper
                                image={image}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={(
                                    _,
                                    croppedAreaPixels,
                                ) => {
                                    setCropArea(
                                        croppedAreaPixels,
                                    )
                                }}
                            />
                        </div>
                        <Button
                            onClick={() => {
                                field.setValue(null)
                                setImage("")
                            }}
                            className={"text-destructive"}
                            variant={"ghost"}
                        >
                            Remove
                        </Button>
                    </div>

                    <div className="mx-auto w-full space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Zoom</span>
                            <span>{zoom.toFixed(1)}x</span>
                        </div>

                        <Slider
                            value={[zoom]}
                            min={1}
                            max={3}
                            step={0.1}
                            onValueChange={(value) =>
                                setZoom(value as number)
                            }
                        />
                    </div>
                </div>
            ) : (
                <label
                    htmlFor={field.name}
                    className="group flex aspect-square w-40! cursor-pointer flex-col items-center justify-center border rounded-sm border-dashed bg-muted/30 transition hover:border-primary hover:bg-muted/50 "
                >
                    <div className="flex size-12 items-center justify-center rounded-full bg-background shadow-sm transition group-hover:scale-105">
                        <ImagePlus className="size-5 text-muted-foreground group-hover:text-primary" />
                    </div>

                    <span className="mt-3 text-sm font-medium">
                        Upload avatar
                    </span>

                    <span className="mt-1 text-xs text-muted-foreground">
                        JPG, PNG or WebP
                    </span>

                    <Input
                        id={field.name}
                        name={field.name}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) =>
                            handleChange(
                                e.target.files?.[0],
                            )
                        }
                        onBlur={field.handleBlur}
                    />
                </label>
            )}

            {description && !error && (
                <FieldDescription>
                    {description}
                </FieldDescription>
            )}

            {error && (
                <FieldError errors={[{ message: error }]} />
            )}

            {isInvalid && !error && (
                <FieldError
                    errors={field.state.meta.errors}
                />
            )}
        </Field>
    )
}

async function getCroppedFile(
    file: File,
    crop: Area,
): Promise<File> {
    const imageUrl = URL.createObjectURL(file)

    try {
        const image = await loadImage(imageUrl)

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
            throw new Error(
                "Could not create canvas context.",
            )
        }

        canvas.width = crop.width
        canvas.height = crop.height

        ctx.drawImage(
            image,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            0,
            0,
            crop.width,
            crop.height,
        )

        const blob = await new Promise<Blob | null>(
            (resolve) =>
                canvas.toBlob(resolve, file.type, 0.9),
        )

        if (!blob) {
            throw new Error(
                "Could not create cropped image.",
            )
        }

        return new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
        })
    } finally {
        URL.revokeObjectURL(imageUrl)
    }
}
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = () => resolve(image)
        image.onerror = reject
        image.src = src
    })
}

function formatSize(bytes: number) {
    return `${(bytes / 1024 / 1024).toFixed(0)} MB`
}
