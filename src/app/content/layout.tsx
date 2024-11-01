"use client";

import { ContentProvider } from "@/providers/content-provider";
import { X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    const { uuid } = useParams<{ uuid: string }>();

    return (
        <ContentProvider uuid={uuid}>
            {(content) => (
                <main className="w-full max-w-screen-lg mx-auto px-2.5">
                    <div className="mt-6 flex justify-between gap-2">
                        <div className="w-full">
                            <h1 className="text-xl font-bold">{content.title}</h1>
                            <code className="text-muted-foreground text-xs">
                                {content.key}
                            </code>
                        </div>
                        <Link href="/" className="flex-shrink-0">
                            <X />
                        </Link>
                    </div>
                    <section>{children}</section>
                </main>
            )}
        </ContentProvider>
    );
}
