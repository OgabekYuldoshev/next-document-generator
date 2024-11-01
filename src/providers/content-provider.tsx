import { trpc } from "@/lib/trpc";
import type { AppRouter } from "@/trpc/_app";
import type { inferRouterOutputs } from "@trpc/server";
import constate from "constate";
import { Loader2 } from "lucide-react";
import React, { type PropsWithChildren } from "react";

type Content = inferRouterOutputs<AppRouter>['content']['single']

interface State {
    item: Content
}

const SingleContext = React.createContext<State>({
    item: {} as Content,
});

function useContentContext() {
    const ctx = React.useContext(SingleContext);

    if (!ctx) throw new Error("ContentContext");

    return ctx;
}
function ContentProvider({
    uuid,
    children,
}: PropsWithChildren<{ uuid: string }>) {
    const { data, isFetched, isError, error } = trpc.content.single.useQuery({ uuid });

    if (!isFetched) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                {error.message}
            </div>
        )
    }

    if (!data) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                Content is not found!
            </div>
        )
    }

    return (
        <SingleContext.Provider
            value={{ item: data }}
        >
            {children}
        </SingleContext.Provider>
    );
}

export { ContentProvider, useContentContext };
