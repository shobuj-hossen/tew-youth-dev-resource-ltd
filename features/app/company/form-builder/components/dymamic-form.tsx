"use client"

import { useAppForm } from "@/components/form/use-app-form"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FormDefinition } from "@/types/form"
import { createDefaultValues } from "../helpers/create-default-values"
import { createFormSchema } from "../helpers/create-form-schema"
import { toast } from "@/components/ui/toast"

export function DynamicForm({
    definations,
    onSubmit,
    showSubmittedValue = false,
    isPending = false,
}: {
    definations: FormDefinition
    onSubmit?: (v: Record<string, any>) => void
    showSubmittedValue?: boolean
    isPending?: boolean
}) {
    const schema = createFormSchema(definations)
    const defaultValues = createDefaultValues(definations)

    const form = useAppForm({
        defaultValues,
        validators: {
            onSubmit: schema,
        },

        onSubmit: async ({ value }) => {
            onSubmit?.(value)
            form.reset()
            // toast
            showSubmittedValue &&
                toast.add({
                    title: "Entered Values",
                    description: (
                        <span className="text-xs font-mono">
                            {JSON.stringify(value, null, 2)}
                        </span>
                    ),
                })
        },
    })

    return (
        <div className="space-y-5">
            <Card className=" shadow-none ring-0 p-1 rounded-none">
                <CardHeader className="px-0">
                    <CardTitle>
                        {definations.name}
                    </CardTitle>
                    <CardDescription>
                        {definations.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                    <form
                        id="dynamic-form"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                        className="space-y-5"
                    >
                        {definations.fields.map(
                            (def_field) => {
                                switch (def_field.type) {
                                    case "text":
                                        return (
                                            <form.AppField
                                                key={
                                                    def_field.id
                                                }
                                                name={
                                                    def_field.name
                                                }
                                            >
                                                {(
                                                    field,
                                                ) => (
                                                    <field.TextField
                                                        label={
                                                            def_field.name
                                                        }
                                                        placeholder={
                                                            def_field.placeholder
                                                        }
                                                        description={
                                                            def_field.description
                                                        }
                                                    />
                                                )}
                                            </form.AppField>
                                        )
                                    case "textarea":
                                        return (
                                            <form.AppField
                                                key={
                                                    def_field.id
                                                }
                                                name={
                                                    def_field.name
                                                }
                                            >
                                                {(
                                                    field,
                                                ) => (
                                                    <field.TextareaField
                                                        label={
                                                            def_field.name
                                                        }
                                                        placeholder={
                                                            def_field.placeholder
                                                        }
                                                        description={
                                                            def_field.description
                                                        }
                                                    />
                                                )}
                                            </form.AppField>
                                        )

                                    case "number":
                                        return (
                                            <form.AppField
                                                key={
                                                    def_field.id
                                                }
                                                name={
                                                    def_field.name
                                                }
                                            >
                                                {(
                                                    field,
                                                ) => (
                                                    <field.NumberField
                                                        label={
                                                            def_field.name
                                                        }
                                                        placeholder={
                                                            def_field.placeholder
                                                        }
                                                        description={
                                                            def_field.description
                                                        }
                                                    />
                                                )}
                                            </form.AppField>
                                        )
                                    case "checkbox":
                                        return (
                                            <form.AppField
                                                key={
                                                    def_field.id
                                                }
                                                name={
                                                    def_field.name
                                                }
                                            >
                                                {(
                                                    field,
                                                ) => (
                                                    <field.CheckboxField
                                                        label={
                                                            def_field.name
                                                        }
                                                        description={
                                                            def_field.description
                                                        }
                                                    />
                                                )}
                                            </form.AppField>
                                        )
                                    case "select":
                                        return (
                                            <form.AppField
                                                key={
                                                    def_field.id
                                                }
                                                name={
                                                    def_field.name
                                                }
                                            >
                                                {(
                                                    field,
                                                ) => (
                                                    <field.SelectField
                                                        label={
                                                            def_field.name
                                                        }
                                                        placeholder={
                                                            def_field.placeholder
                                                        }
                                                        description={
                                                            def_field.description
                                                        }
                                                        options={
                                                            def_field.options
                                                        }
                                                    />
                                                )}
                                            </form.AppField>
                                        )

                                    default:
                                        return null
                                }
                            },
                        )}
                    </form>
                </CardContent>
                <CardFooter className="px-0 flex items-center justify-end">
                    <Button
                        disabled={isPending}
                        variant={"secondary"}
                        type="submit"
                        form="dynamic-form"
                    >
                        {definations.settings.submitLabel}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
