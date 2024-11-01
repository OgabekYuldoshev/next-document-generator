'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from 'react'
import Content from "./content";
import Metadata from "./metadata";

export default function Page() {
    const [activeTab, setActiveTab] = useState<string>("content")

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full p-6 h-full">
            <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="meta">Metadata</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
                <Content />
            </TabsContent>
            <TabsContent value="meta">
                <Metadata />
            </TabsContent>
        </Tabs>
    )
}
