"use client";

import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/query-client";
import { trpc, trpcClient } from "@/lib/trpc-client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import NextAdapterApp from "next-query-params/app";
import { QueryParamProvider } from "use-query-params";

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<QueryParamProvider adapter={NextAdapterApp}>
			<trpc.Provider client={trpcClient} queryClient={queryClient}>
				<QueryClientProvider client={queryClient}>
					{children}
					<Toaster richColors />
				</QueryClientProvider>
			</trpc.Provider>
		</QueryParamProvider>
	);
};

export default Providers;
