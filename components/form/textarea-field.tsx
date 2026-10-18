import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "../ui/textarea"
import { useFieldContext } from "./use-app-form"
import { FormField } from "@/types/form"

type TextareaFieldProps = Pick<
    FormField,
    "label" | "description" | "placeholder"
>

export function TextareaField({
    label,
    description,
    placeholder,
}: TextareaFieldProps) {
    const field = useFieldContext<string>()
    const isInvalid =
        field.state.meta.isTouched &&
        !field.state.meta.isValid
    return (
        <Field data-invalid={isInvalid}>
            {label && (
                <FieldLabel htmlFor={field.name}>
                    {label}
                </FieldLabel>
            )}
            <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) =>
                    field.handleChange(e.target.value)
                }
                aria-invalid={isInvalid}
                placeholder={placeholder}
                autoComplete="off"
            />
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
