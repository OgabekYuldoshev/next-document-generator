import { router } from "@/lib/trpc-server";
import { documentRoute } from "./routes/document";

export const appRouter = router({
	document: documentRoute,
});

export type AppRouter = typeof appRouter;
