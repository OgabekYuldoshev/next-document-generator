import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import { getBaseUrl } from "../lib/get-base-url";

import type { AppRouter } from "@/trpc/_app";

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/api/trpc`,
		}),
	],
});
