import { TableSkeleton } from "@/components/shared/table-skeleton"

export default function loading() {
    return (
        <TableSkeleton
            rows={6}

            columns={[
                { type: "checkbox" },
                { type: "avatar" },
                { type: "text", width: "200px" },

                { type: "text" },
                { type: "actions" },
            ]}
        />
    )
}
