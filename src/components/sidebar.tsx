"use client";

import { FileText, Plus, Workflow } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'
import DocumentList from './document-list';
import { NewDocumentDialog } from './new-document-dialog'
import { Button, buttonVariants } from './ui/button'

const Sidebar = () => {
    const [isNewDocument, setNewDocument] = useState(false)
    return (
        <aside className='flex-shrink-0 w-full max-w-[280px] border-r py-6 flex flex-col fixed h-screen top-0 left-0 z-50'>
            <Link href="/" className='flex items-center flex-row px-4 mb-6'>
                <FileText className='mr-2' />
                <h5 className='font-bold leading-relaxed'>PDF Generator</h5>
            </Link>
            <div className='px-4'>
                <Button className='w-full' variant="secondary" onClick={() => setNewDocument(true)}>
                    <Plus size={18} />
                    Create new document
                </Button>
            </div>
            <div className='my-6 px-4 flex-1 overflow-auto'>
                <DocumentList />
            </div>
            <div className='px-4'>
                <Link href="/api/reference" target='blank' className={buttonVariants({ variant: 'outline', className: 'w-full' })}>
                    <Workflow />
                    Api reference
                </Link>
            </div>
            <NewDocumentDialog open={isNewDocument} onClose={() => setNewDocument(false)} />
        </aside>
    )
}

export default Sidebar