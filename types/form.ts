export type FieldWidth = "full" | "half"

export type FieldValidation = {
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
    pattern?: string
}

export type BaseField = {
    id: string
    name: string
    label: string

    description?: string
    placeholder?: string

    width?: FieldWidth
}

export type TextField = BaseField & {
    type: "text"
    defaultValue?: string

    validation?: Pick<
        FieldValidation,
        "required" | "minLength" | "maxLength" | "pattern"
    >
}

export type TextareaField = BaseField & {
    type: "textarea"
    defaultValue?: string

    validation?: Pick<
        FieldValidation,
        "required" | "minLength" | "maxLength" | "pattern"
    >
}

export type NumberField = BaseField & {
    type: "number"

    defaultValue?: number

    validation?: Pick<
        FieldValidation,
        "required" | "min" | "max"
    >
}

export type SelectField = BaseField & {
    type: "select"

    defaultValue?: string

    options: {
        label: string
        value: string
    }[]

    validation?: Pick<FieldValidation, "required">
}

export type CheckboxField = BaseField & {
    type: "checkbox"

    defaultValue?: boolean

    validation?: Pick<FieldValidation, "required">
}

export type FormField =
    | TextField
    | TextareaField
    | NumberField
    | SelectField
    | CheckboxField

export type FormSettings = {
    submitLabel: string
    successMessage: string
    redirectUrl?: string
}

export type FormDefinition = {
    version: number

    name: string
    description?: string

    fields: FormField[]

    settings: FormSettings
}
