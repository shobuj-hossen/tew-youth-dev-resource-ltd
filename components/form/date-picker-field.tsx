"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FormField } from "@/types/form"
import { useFieldContext } from "./use-app-form"

type DatePickerFieldProps = Pick<
    FormField,
    "label" | "description" | "placeholder"
>

export function DatePickerField({
    label,
    description,
    placeholder = "Select date",
}: DatePickerFieldProps) {
    const [open, setOpen] = React.useState(false)
    const field = useFieldContext<Date | undefined>()

    const isInvalid =
        field.state.meta.isTouched &&
        !field.state.meta.isValid

    const selectedDate = field.state.value
        ? new Date(field.state.value)
        : undefined

    return (
        <Field data-invalid={isInvalid}>
            {label && (
                <FieldLabel htmlFor={field.name}>
                    {label}
                </FieldLabel>
            )}

            <Popover
                open={open}
                onOpenChange={(nextOpen) => {
                    setOpen(nextOpen)
                    if (!nextOpen) {
                        field.handleBlur()
                    }
                }}
            >
                <PopoverTrigger
                    render={
                        <Button
                            id={field.name}
                            variant="outline"
                            className="w-full justify-start font-normal"
                            aria-invalid={isInvalid}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? (
                                selectedDate.toLocaleDateString()
                            ) : (
                                <span className="text-muted-foreground">
                                    {placeholder}
                                </span>
                            )}
                        </Button>
                    }
                />
                <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        defaultMonth={selectedDate}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            field.handleChange(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>

            {description && (
                <FieldDescription>
                    {description}
                </FieldDescription>
            )}

            {isInvalid && (
                <FieldError
                    errors={field.state.meta.errors}
                />
            )}
        </Field>
    )
}
