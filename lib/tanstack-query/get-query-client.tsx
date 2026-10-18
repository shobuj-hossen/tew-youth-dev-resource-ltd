// app/get-query-client.ts
import { toast } from "@/components/ui/toast"
import {
    environmentManager,
    QueryClient,
    defaultShouldDehydrateQuery,
    MutationCache,
} from "@tanstack/react-query"

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
            dehydrate: {
                shouldDehydrateQuery: (query) =>
                    defaultShouldDehydrateQuery(query) ||
                    query.state.status === "pending",
                shouldRedactErrors: (error) => {
                    return false
                },
            },
            hydrate: {},
        },
        mutationCache: new MutationCache({
            onSuccess: (data: any) => {
                if (data?.message) {
                    toast.add({
                        title: data.message,
                        type: "success",
                    })
                }
            },
            onError: (error) => {
                toast.add({
                    title:
                        error instanceof Error
                            ? error.message
                            : "Something went wrong.",
                    type: "error",
                })
            },
        }),
    })
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
    if (environmentManager.isServer()) {
        return makeQueryClient()
    } else {
        if (!browserQueryClient)
            browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}
