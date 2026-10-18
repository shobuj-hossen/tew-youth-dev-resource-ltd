import { FieldType } from "@/constants/form";
import { BaseField, FormField } from "@/types/form";

const FIELD_CONFIGS: Record<FieldType, Partial<FormField>> = {
    text: {
        type: "text",
        defaultValue: "",
        validation: { minLength: 1, maxLength: 100, required: true },
    },
    textarea: {
        type: "textarea",
        defaultValue: "",
        validation: { minLength: 1, maxLength: 100, required: true },
    },
    number: {
        type: "number",
        defaultValue: 0,
        validation: { min: 1, max: 10000, required: true },
    },
    select: {
        type: "select",
        options: [
            { label: "Option 1", value: "option-1" },
            { label: "Option 2", value: "option-2" },
        ],
    },
    checkbox: {
        type: "checkbox",
        validation: { required: true },
    },
};

export function createField(type: FieldType): FormField {
    const id = crypto.randomUUID();


    const baseData: BaseField = {
        id,
        label: type,
        name: `${type}_${id.slice(0, 6)}`,
        width: "full",
        description: "",
        placeholder: ""
    };

    const typeSpecificConfig = FIELD_CONFIGS[type];

    return {
        ...baseData,
        ...typeSpecificConfig,
    } as FormField;
}
