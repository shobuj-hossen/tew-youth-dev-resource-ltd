"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { FieldType, fieldTypes } from "@/constants/form";
import { Inbox } from "lucide-react";

export function EmptyFormBuilder({ setField }: { setField: (type: FieldType) => void }) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Inbox />
                </EmptyMedia>
                <EmptyTitle>No data found</EmptyTitle>
                <EmptyDescription>
                    There is no data to display right now. Get started by creating a new entry.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <div className='flex flex-wrap gap-3'>
                    {fieldTypes.slice(0, 4).map((field) => <Button onClick={() => setField(field)} key={field} variant={"outline"} className={"capitalize"}>{field}</Button>)}
                </div>
            </EmptyContent>
        </Empty>
    );
}
