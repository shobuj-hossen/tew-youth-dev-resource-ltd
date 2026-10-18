import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FormField } from "@/types/form"
import { useFieldContext } from "./use-app-form"

type SelectFieldProps = Pick<
    FormField,
    "label" | "description" | "placeholder"
> & {
    options: {
        label: string
        value: string
    }[]
    disabled?: boolean
}

export function SelectField({
    label,
    description,
    placeholder,
    options,
    disabled,
}: SelectFieldProps) {
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

            <Select
                value={
                    options.find(
                        (v) =>
                            v.value === field.state.value,
                    )?.label || ""
                }
                onValueChange={(v) =>
                    field.handleChange(v as string)
                }
            >
                <SelectTrigger
                    disabled={disabled}
                    id={field.name}
                    aria-invalid={isInvalid}
                >
                    <SelectValue
                        placeholder={
                            placeholder || "Select One"
                        }
                    />
                </SelectTrigger>

                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

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
