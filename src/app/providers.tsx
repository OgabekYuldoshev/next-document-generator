"use client";

import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/query-client";
import { trpc, trpcClient } from "@/lib/trpc-client";
import { QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{children}
				<Toaster richColors />
			</QueryClientProvider>
		</trpc.Provider>
	);
};

export default Providers;
