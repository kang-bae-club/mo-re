import { useSessionStore } from '@/entities/session'
import { SidebarHeader } from './SidebarHeader'
import { OrganizationList } from '@/features/organization'
import { SidebarNavigation } from './SidebarNavigation'
import { SidebarFooter } from './SidebarFooter'

export const SidebarLayout = () => {
    const { user, organization } = useSessionStore()

    if (!user || !organization) return null // Or loading skeleton

    return (
        <div className="flex h-full flex-col">
            <SidebarHeader />
            <OrganizationList />
            <SidebarNavigation />
            <SidebarFooter />
        </div>
    )
}
