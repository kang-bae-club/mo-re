import { NavLink } from 'react-router-dom'
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

const NavItem = ({ icon: Icon, children, path }: SidebarNavItemProps) => (
    // 마우스 hover 시에 어떤 메뉴에 대해서 클릭을 할 지 피드백을 주기 위함
    <NavLink
        to={path}
        className={({ isActive }) =>
            cn(
                'flex cursor-pointer items-center gap-3 px-6 py-3',
                'font-semibold text-gray-700 transition-colors hover:bg-gray-200',
                isActive && 'bg-gray-200 text-gray-900', // Active state style
            )
        }
    >
        <Icon size={20} />
        {children}
    </NavLink>
)

export const SidebarNavigation = () => {
    return (
        <div className="flex-1 overflow-y-auto">
            {/* TODO: 추후 메뉴그룹, 메뉴아이템에 대한 권한 체크 로직 추가 */}
            {NAV_CONFIG.map((group) => (
                <NavGroup key={group.title} title={group.title}>
                    {group.items.map((item) => (
                        <NavItem key={item.label} icon={item.icon} path={item.path}>
                            {item.label}
                        </NavItem>
                    ))}
                </NavGroup>
            ))}
        </div>
    )
}
