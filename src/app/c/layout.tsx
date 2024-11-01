'use client';

import { ContentProvider } from "@/providers/content-provider";
import { useParams } from "next/navigation";
import React, { type PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
    const { uuid } = useParams<{ uuid: string }>()

    return (
        <ContentProvider uuid={uuid}>
            <div className="w-full h-screen overflow-hidden flex flex-col">
                <div className="h-16 border-b flex-shrink-0">
                    <div className="w-full h-full px-6 flex items-center justify-between">
                        <h2 className="font-bold">LOGO</h2>
                    </div>
                </div>
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </ContentProvider>
    );
}
