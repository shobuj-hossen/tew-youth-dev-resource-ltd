import { FormDefinition } from "@/types/form";

export function createDefaultValues(definition: FormDefinition) {
    const values: Record<string, unknown> = {};

    for (const field of definition.fields) {
        if (field.defaultValue !== undefined) {
            values[field.name] = field.defaultValue;
            continue;
        }

        switch (field.type) {
            case "number":
                values[field.name] = 0;
                break;
            case "checkbox":
                values[field.name] = false;
                break;
            case "select":
            case "text":
            case "textarea":
            default:
                values[field.name] = "";
                break;
        }
    }

    return values;
}
