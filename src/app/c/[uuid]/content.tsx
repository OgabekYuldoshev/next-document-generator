import CodeMirror from '@/components/code-mirror'
import { Form } from '@/components/ui/form'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useContentContext } from '@/providers/content-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const validationSchema = z.object({
    content: z.string().min(12)
})

type FormValue = z.infer<typeof validationSchema>
export default function Content() {
    const { item } = useContentContext()

    const form = useForm<FormValue>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            content: item.content
        }
    })

    function onSubmit(values: FormValue) {
        console.log("Value", values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1'>
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel minSize={50} className='flex overflow-y-auto'>
                        <CodeMirror name='content' />
                    </ResizablePanel>
                    <ResizableHandle withHandle className='mx-4' />
                    <ResizablePanel minSize={30} className='flex-1'>
                        <iframe srcDoc={form.watch("content")} title='content' className='bg-white rounded-lg w-full' />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </form>
        </Form>
    )
}
