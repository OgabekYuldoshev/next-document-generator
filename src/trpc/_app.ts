import { publicProcedure, router } from "@/lib/trpc-server";

export const appRouter = router({
	greeting: publicProcedure.query((ctx) => {
		return "Hello";
	}),
});

export type AppRouter = typeof appRouter;
