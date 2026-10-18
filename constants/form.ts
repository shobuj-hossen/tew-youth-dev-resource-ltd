export const fieldTypes = [
    "text",
    "textarea",
    "number",
    "select",
    "checkbox",
] as const;

export type FieldType = typeof fieldTypes[number];


