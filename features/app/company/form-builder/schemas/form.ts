import { fieldTypes } from "@/constants/form"; // Assumed to be ["text", "textarea", "number", "select", "checkbox"] as const
import { z } from "zod";

// --- 1. Base Shared Fields ---
const baseFieldSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Name is required"),
    label: z.string().min(1, "Label is required"),
    description: z.string().optional(),
    placeholder: z.string().optional(),
});

const textFieldSchema = baseFieldSchema.extend({
    type: z.literal("text"),
    defaultValue: z.string().optional(),
    validation: z.object({
        required: z.boolean().optional(),
        minLength: z.number().int().positive().optional(),
        maxLength: z.number().int().positive().optional(),
        pattern: z.string().optional(),
    }).optional(),
});

const textareaFieldSchema = baseFieldSchema.extend({
    type: z.literal("textarea"),
    defaultValue: z.string().optional(),
    validation: z.object({
        required: z.boolean().optional(),
        minLength: z.number().int().positive().optional(),
        maxLength: z.number().int().positive().optional(),
        pattern: z.string().optional(),
    }).optional(),
});

const numberFieldSchema = baseFieldSchema.extend({
    type: z.literal("number"),
    defaultValue: z.number().optional(),
    validation: z.object({
        required: z.boolean().optional(),
        min: z.number().optional(),
        max: z.number().optional(),
    }).optional(),
});

const selectFieldSchema = baseFieldSchema.extend({
    type: z.literal("select"),
    defaultValue: z.string().optional(),
    options: z.array(
        z.object({
            label: z.string().min(1),
            value: z.string().min(1),
        })
    ).min(1, "Select fields require at least one choice option"),
    validation: z.object({
        required: z.boolean().optional(),
    }).optional(),
});

const checkboxFieldSchema = baseFieldSchema.extend({
    type: z.literal("checkbox"),
    defaultValue: z.boolean().optional(),
    validation: z.object({
        required: z.boolean().optional(),
    }).optional(),
});

// --- 3. Discriminated Union Wrapper ---
export const formFieldSchema = z.discriminatedUnion("type", [
    textFieldSchema,
    textareaFieldSchema,
    numberFieldSchema,
    selectFieldSchema,
    checkboxFieldSchema,
]);

export type FormFieldSchemaType = z.infer<typeof formFieldSchema>;

// --- 4. Core Definition Builder ---
export const formDefinitionSchema = z.object({
    version: z.number().int().positive(),
    name: z.string().min(1, "Form name is required"),
    description: z.string().optional(),

    // Fixed: Missing property re-added
    fields: z.array(formFieldSchema),

    settings: z.object({
        submitLabel: z.string().min(1),
        successMessage: z.string().min(1),
        redirectUrl: z.string().optional().or(z.literal("")), // Allows empty string fallback fields
    }),
});

export type FormDefinitionSchemaType = z.infer<typeof formDefinitionSchema>;
