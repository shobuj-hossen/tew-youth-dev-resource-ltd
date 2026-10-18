import { Button } from '@/components/ui/button'
import { FieldType, fieldTypes } from '@/constants/form'

export function FormFieldSelection({ setField }: { setField: (type: FieldType) => void }) {
    return (
        <div className='flex flex-wrap gap-3 border-b pb-3'>
            {fieldTypes.map((field) => <Button onClick={() => setField(field)} key={field} variant={"outline"} className={"capitalize"}>{field}</Button>)}
        </div>
    )
}
