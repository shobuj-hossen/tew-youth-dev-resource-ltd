import { FormDefinition, FormField } from "@/types/form";
import { z } from "zod";

export function createFormSchema(definition: FormDefinition) {
    const shape = Object.fromEntries(
        definition.fields.map((field) => [
            field.name,
            createFieldSchema(field),
        ]),
    );

    return z.object(shape);
}

function createFieldSchema(field: FormField): z.ZodType {
    switch (field.type) {
        case "text":
        case "textarea":
            return createTextSchema(field);

        case "number":
            return createNumberSchema(field);

        case "select":
            return createSelectSchema(field);

        case "checkbox":
            return createCheckboxSchema(field);

        default:
            return assertNever(field);
    }
}

function createTextSchema(
    field: Extract<FormField, { type: "text" | "textarea" }>,
): z.ZodString | z.ZodOptional<z.ZodString> {
    const validation = field.validation;

    let schema = z.string();

    if (validation?.minLength !== undefined) {
        schema = schema.min(validation.minLength);
    }

    if (validation?.maxLength !== undefined) {
        schema = schema.max(validation.maxLength);
    }

    if (validation?.pattern) {
        schema = schema.regex(
            new RegExp(validation.pattern),
            "Invalid format",
        );
    }

    if (validation?.required) {
        return schema.min(1, "This field is required");
    }

    return schema.optional();
}

function createNumberSchema(
    field: Extract<FormField, { type: "number" }>,
): z.ZodNumber | z.ZodOptional<z.ZodNumber> {
    const validation = field.validation;

    let schema = z.number({
        message: "Must be a number",
    });

    if (validation?.min !== undefined) {
        schema = schema.min(validation.min);
    }

    if (validation?.max !== undefined) {
        schema = schema.max(validation.max);
    }

    if (validation?.required) {
        return schema;
    }

    return schema.optional();
}

function createSelectSchema(
    field: Extract<FormField, { type: "select" }>,
): z.ZodType {
    const validation = field.validation;

    if (field.options?.length) {
        const values = field.options.map((option) => option.value);

        // `z.enum` requires a non-empty tuple.
        const [first, ...rest] = values;

        const schema = z.enum([first, ...rest]);

        return validation?.required
            ? schema
            : schema.optional();
    }

    const schema = z.string();

    return validation?.required
        ? schema.min(1, "This field is required")
        : schema.optional();
}

function createCheckboxSchema(
    field: Extract<FormField, { type: "checkbox" }>,
): z.ZodBoolean | z.ZodDefault<z.ZodBoolean> {
    if (field.validation?.required) {
        return z.boolean().refine(
            (value) => value === true,
            "You must check this box",
        );
    }

    return z.boolean().default(false);
}

function assertNever(value: never): never {
    throw new Error(`Unsupported form field: ${JSON.stringify(value)}`);
}