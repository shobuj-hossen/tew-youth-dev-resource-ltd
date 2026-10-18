import { Button } from '@/components/ui/button'
import { FormField } from '@/types/form'
import { GripHorizontal, Pen, Plus, Trash } from 'lucide-react'
import { EditFieldDialog } from './edit-field-dialog'

export function RenderSelectedFields({ fields, removeField, updateField }: {
    fields: FormField[],
    removeField: (fieldId: string) => void,
    updateField: (fieldId: string, updates: Partial<FormField>) => void
}) {
    return (
        <div className='space-y-5'>
            {fields.map((field, i) => (
                <div key={i} className='flex items-center gap-1'>
                    <div className='flex gap-1 grow p-1 rounded-full pl-4 ring-1 bg-accent items-center justify-start'>
                        <h1 className='grow capitalize '>{field.type}</h1>
                        <EditFieldDialog updateField={updateField} defaultValues={field}><Button size={"icon"} variant={"ghost"}><Pen /></Button></EditFieldDialog>
                        <Button onClick={() => removeField(field.id)} size={"icon"} variant={"ghost"}><Trash /></Button>
                    </div>
                    <Button size={"icon"} variant={"secondary"}><Plus /></Button>
                    <Button size={"icon"} variant={"secondary"}><GripHorizontal /></Button>
                </div>
            ))}

        </div>


    )
}
