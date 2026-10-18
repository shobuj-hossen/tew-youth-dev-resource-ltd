"use client"

import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { FormFieldSelection } from '../components/form-field-selection'
import { RenderSelectedFields } from '../components/render-selected-fileds'
import { RenderPreview } from '../components/render-preview'
import { FormDefinition, FormField } from '@/types/form'
import { FieldType } from '@/constants/form'
import { createField } from '../helpers/form-mutations'
import { EmptyFormBuilder } from '../components/empty-form-builder'
import { FormIdentificationDialog } from '../components/form-identification-dialog'
import { Button } from '@/components/ui/button'
import { Edit2 } from 'lucide-react'
import { ConfirmBuild } from '../components/comfirm-build'

const defaultFormStates: FormDefinition = {
    name: "Dummy Form",
    description: "Dummy form description is added (change as you like)",
    version: 1,

    fields: [],

    settings: {
        submitLabel: "Submit",
        successMessage: "Thanks for submitting!",
    },
};
export function FormBuilder() {

    const [form, setForm] = useState<FormDefinition>(defaultFormStates);

    function addField(type: FieldType) {
        setForm((current) => ({
            ...current,

            fields: [
                ...current.fields,
                createField(type),
            ],
        }));
    }

    function removeField(fieldId: string) {
        setForm((current) => ({
            ...current,

            fields: current.fields.filter(
                (field) => field.id !== fieldId
            ),
        }));
    }

    function updateField(
        fieldId: string,
        updates: Partial<FormField>
    ) {
        setForm((current) => ({
            ...current,
            fields: current.fields.map((field) => {
                if (field.id !== fieldId) return field;

                const updatedValidation = updates.validation && 'validation' in field
                    ? { ...field.validation, ...updates.validation }
                    : updates.validation ?? ('validation' in field ? field.validation : undefined);

                return {
                    ...field,
                    ...updates,
                    ...(updatedValidation ? { validation: updatedValidation } : {}),
                } as FormField;
            }),
        }));
    }


    function updateForm(
        versionId: number,
        updates: Partial<FormField>
    ) {
        setForm((current) => current.version === versionId ? { ...current, ...updates } : current);
    }
    return (
        <div className='space-y-5'>

            <FormFieldSelection setField={(type) => addField(type)} />

            <div>
                {form.fields.length === 0 ? <EmptyFormBuilder setField={(type) => addField(type)} />
                    : <div className='space-y-5'>
                        <div className='grid gap-5 lg:grid-cols-2 '>
                            <div className='flex gap-5 flex-col'>
                                <FormIdentificationDialog defaultValues={form} updateForm={updateForm}>
                                    <Button variant={"secondary"}>Change Form Defaults <Edit2 /></Button>
                                </FormIdentificationDialog>
                                <RenderSelectedFields updateField={updateField} removeField={(fieldId) => removeField(fieldId)} fields={form.fields} />
                            </div>
                            <Separator className={"lg:hidden"} />
                            <RenderPreview key={JSON.stringify(form.fields)} definations={form} />
                        </div>
                        <Separator />
                        <ConfirmBuild form={form} onCancel={() => setForm(defaultFormStates)} />
                    </div>}
            </div>
        </div>
    )
}
