import React from 'react'
import { cn } from '@/shared/lib'

interface MainLayoutProps {
    sidebar: React.ReactNode
    content: React.ReactNode
    rightPanel: React.ReactNode
}

export const MainLayout = ({ sidebar, content, rightPanel }: MainLayoutProps) => {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-white">
            <aside
                className={cn(
                    'flex w-[250px] shrink-0 flex-col',
                    'border-r border-gray-200 bg-[#f0f4f8]',
                )}
            >
                {sidebar}
            </aside>
            <main className="flex-1 overflow-y-auto bg-white p-8">
                {content}
            </main>
            <aside
                className={cn(
                    'flex w-[320px] shrink-0 flex-col',
                    'border-l border-gray-200 bg-white p-6',
                )}
            >
                {rightPanel}
            </aside>
        </div>
    )
}
