"use client";

import { Toaster } from "@/components/ui/sonner";
import { getBaseUrl } from "@/lib/get-base-url";
import { queryClient } from "@/lib/query-client";
import { trpc } from "@/lib/trpc";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Loader2 } from "lucide-react";
import NextAdapterApp from "next-query-params/app";
import { type PropsWithChildren, Suspense } from "react";
import { QueryParamProvider } from "use-query-params";

export const trpcClient = trpc.createClient({
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
        }),
    ],
});

const RootProvider = ({ children }: PropsWithChildren) => {
    return (
        <Suspense
            fallback={
                <main className="w-full h-screen flex items-center justify-center">
                    <Loader2 className="animate-spin" />
                </main>
            }
        >
            <QueryParamProvider adapter={NextAdapterApp}>
                <trpc.Provider client={trpcClient} queryClient={queryClient}>
                    <QueryClientProvider client={queryClient}>
                        {children}
                        <Toaster richColors />
                    </QueryClientProvider>
                </trpc.Provider>
            </QueryParamProvider>
        </Suspense>
    );
};

export default RootProvider;
