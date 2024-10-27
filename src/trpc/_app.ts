import { contentRoute } from "./routes/content";
import { router } from "./server";

export const appRouter = router({
	content: contentRoute,
});

export type AppRouter = typeof appRouter;
