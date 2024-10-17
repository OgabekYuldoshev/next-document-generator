import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { TRPCError } from "@trpc/server";
import { toast } from "sonner";

function queryHandler(error: any) {
	if (error instanceof TRPCError) {
		toast.error(`[${error.code}]: ${error.message}`);
	}
}

const queryCache = new QueryCache({
	onError: queryHandler,
});
const mutationCache = new MutationCache({
	onError: queryHandler,
});

export const queryClient = new QueryClient({
	queryCache,
	mutationCache,
});
