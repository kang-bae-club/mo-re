import { cn } from '@/shared/lib'
import { NAV_CONFIG } from '@/shared/config'

import { SidebarNavGroupProps, SidebarNavItemProps } from '../model/types'

const NavGroup = ({ title, children }: SidebarNavGroupProps) => (
    <div className="mb-2">
        <div
            className={cn(
                'mb-1 bg-gray-200/50 px-6 py-2',
                'text-xs font-bold text-gray-400',
            )}
        >
            {title}
        </div>
        {children}
    </div>
)

const NavItem = ({ icon: Icon, children }: SidebarNavItemProps) => (
    <div
        className={cn(
            'flex cursor-pointer items-center gap-3 px-6 py-3',
            'font-semibold text-gray-700 transition-colors hover:bg-gray-200',
        )}
    >
        <Icon size={20} />
        {children}
    </div>
)

export const SidebarNavigation = () => {
    return (
        <div className="flex-1 overflow-y-auto">
            {NAV_CONFIG.map((group) => (
                <NavGroup key={group.title} title={group.title}>
                    {group.items.map((item) => (
                        <NavItem key={item.label} icon={item.icon}>
                            {item.label}
                        </NavItem>
                    ))}
                </NavGroup>
            ))}
        </div>
    )
}
