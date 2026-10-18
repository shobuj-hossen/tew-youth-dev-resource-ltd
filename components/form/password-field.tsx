import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormField } from "@/types/form"
import { useFieldContext } from "./use-app-form"
import { Button } from "../ui/button"
import Link from "next/link"

type PasswordFieldProps = Pick<
    FormField,
    "label" | "description" | "placeholder"
> & { forgotPasswordHref?: string }

export function PasswordField({
    label,
    description,
    placeholder,
    forgotPasswordHref,
}: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)
    const field = useFieldContext<string>()
    const isInvalid =
        field.state.meta.isTouched &&
        !field.state.meta.isValid

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev)
    }

    return (
        <Field data-invalid={isInvalid}>
            {label && (
                <div className="flex items-center">
                    <FieldLabel htmlFor="password">
                        Password
                    </FieldLabel>
                    {forgotPasswordHref && (
                        <Link
                            href={forgotPasswordHref}

                            className="ml-auto inline-block text-accent-foreground text-xs underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>
            )}
            <div className="relative">
                <Input
                    id={field.name}
                    name={field.name}
                    type={
                        showPassword ? "text" : "password"
                    }
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                        field.handleChange(e.target.value)
                    }
                    aria-invalid={isInvalid}
                    placeholder={placeholder}
                    autoComplete="current-password"
                    className="pr-10"
                />
                <Button
                    type="button"
                    variant={"ghost"}
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-0"
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </Button>
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
