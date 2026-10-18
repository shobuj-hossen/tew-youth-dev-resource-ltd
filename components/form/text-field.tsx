import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormField } from "@/types/form"
import { useFieldContext } from "./use-app-form"

type TextFieldProps = Pick<
    FormField,
    "label" | "description" | "placeholder"
>

export function TextField({
    label,
    description,
    placeholder,
}: TextFieldProps) {
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
            <Input
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
