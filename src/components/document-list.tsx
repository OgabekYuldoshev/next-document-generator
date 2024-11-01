'use client'

import { Skeleton } from "@/components/ui/skeleton"
import { trpc } from '@/lib/trpc'
import { FileText } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import React, { useCallback, useState } from 'react'
import sift from 'sift'
import { buttonVariants } from "./ui/button"
import { Input } from './ui/input'
import { ScrollArea } from "./ui/scroll-area"

const DocumentList = () => {
    const params = useParams()
    const [search, setSearch] = useState("")

    const { data, isFetched } = trpc.content.all.useQuery(undefined, {
        initialData: [],
        retry: false,
        refetchOnWindowFocus: false,
    })

    console.log(params)

    const makeFilter = useCallback((input: string) => {
        return data.filter(sift({
            '$or': [
                {
                    title: {
                        $regex: input,
                        $options: 'i'
                    }
                },
                {
                    key: {
                        $regex: input,
                        $options: 'i'
                    }
                }
            ]
        }))
    }, [data])

    const items = makeFilter(search)

    return (
        <ScrollArea className="h-full flex flex-col ">
            <h5 className='text-sm font-bold mb-2'>Documents</h5>
            <div className="sticky top-0 bg-background pb-2">
                <Input
                    placeholder='Search...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="mt-2">
                {
                    !isFetched && <Loading />
                }
                {
                    items.length ? (
                        <ul className="flex flex-col gap-1">
                            {
                                items.map((item) => {
                                    const active = params?.uuid === item.uuid
                                    return (
                                        <li key={item.uuid} title={item.title} className="">
                                            <Link href={`/content/${item.uuid}`} className={buttonVariants({ size: "lg", variant: active ? "secondary" : 'ghost', className: "w-full !justify-start !px-3 line-clamp-1 !whitespace-normal" })}>
                                                <FileText />
                                                <p className="line-clamp-1">{item.title}</p>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    ) : isFetched ? <Empty /> : null
                }
            </div>
        </ScrollArea >
    )

    function Empty() {
        return (
            <div className='text-center py-8'>
                <h3 className='font-bold'>No documents found.</h3>
            </div>
        )
    }

    function Loading() {
        return (
            <div className="flex flex-col gap-1">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
        )
    }
}

export default DocumentList