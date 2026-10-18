import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField } from "@/types/form"
import { useFieldContext } from "./use-app-form"

type CheckboxFieldProps = Pick<
    FormField,
    "label" | "description"
>

export function CheckboxField({
    label,
    description,
}: CheckboxFieldProps) {
    const field = useFieldContext<boolean>()

    const isInvalid =
        field.state.meta.isTouched &&
        !field.state.meta.isValid

    return (
        <Field data-invalid={isInvalid}>
            <div className="flex items-center gap-2">
                <Checkbox
                    id={field.name}
                    name={field.name}
                    checked={field.state.value}
                    onCheckedChange={(checked) =>
                        field.handleChange(checked === true)
                    }
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                />

                {label && (
                    <FieldLabel htmlFor={field.name}>
                        {label}
                    </FieldLabel>
                )}
            </div>

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
