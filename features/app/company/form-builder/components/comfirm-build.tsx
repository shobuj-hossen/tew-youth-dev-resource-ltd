import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { FormDefinition } from '@/types/form';
import { useTransition } from 'react';
import { buildForm } from '../server/action';

export function ConfirmBuild({ onCancel: reset, form }: { form: FormDefinition, onCancel: () => void, }) {
    const [isPending, startTranstion] = useTransition();
    function onComfirmBuild() {
        startTranstion(async () => {
            const res = await buildForm(form);
            toast.add({ title: res.message })
            reset()
        })

    }
    // form submission
    return (
        <div className='flex items-center justify-end gap-3'>
            <Button disabled={isPending} variant={"outline"} onClick={reset}>Cancel</Button>
            <Button onClick={onComfirmBuild}>Confirm Build</Button>
        </div>
    )
}
