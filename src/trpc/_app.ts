import { documentRoute } from "./routes/document";
import { router } from "./server";

export const appRouter = router({
	document: documentRoute,
});

export type AppRouter = typeof appRouter;
