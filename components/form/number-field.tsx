import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useFieldContext } from "./use-app-form"
import { FormField } from "@/types/form"

type NumberFieldProps = Pick<
    FormField,
    "label" | "description" | "placeholder"
>

export function NumberField({
    label,
    placeholder,
    description,
}: NumberFieldProps) {
    const field = useFieldContext<number | null>()
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
                type="number"
                id={field.name}
                name={field.name}
                value={field.state.value || ""}
                onBlur={field.handleBlur}
                onChange={(e) => {
                    if (e.target.value === "") {
                        field.handleChange(0)
                    } else {
                        field.handleChange(
                            e.target.valueAsNumber || 0,
                        )
                    }
                }}
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
