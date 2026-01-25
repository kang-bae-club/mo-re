import { ElementType, ReactNode } from 'react'

export interface SidebarNavGroupProps {
    title: string
    children: ReactNode
}

export interface SidebarNavItemProps {
    icon: ElementType
    path: string
    children: ReactNode
}
