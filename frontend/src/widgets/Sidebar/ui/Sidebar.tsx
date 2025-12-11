
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib'
import { MemberProfile } from '@/entities/user'
import { APP_CONFIG, NAV_CONFIG, USER_MENU_CONFIG } from '@/shared/config'
import { useSessionStore } from '@/entities/session'

const Logo = () => {
    const { logo, name } = APP_CONFIG

    return (
        <div className="flex items-center gap-2">
            {logo.type === 'image' ? (
                <img
                    src={logo.src}
                    alt={logo.alt}
                    className={cn(
                        'h-10 w-10 object-contain',
                        logo.style?.width,
                        logo.style?.height,
                    )}
                />
            ) : (
                <div
                    className={cn(
                        'flex h-10 w-10 items-center justify-center',
                        'rounded-full font-bold',
                        logo.style.bg,
                        logo.style.text_color,
                    )}
                >
                    {logo.value}
                </div>
            )}
            <span className="text-2xl font-black text-brand-blue">{name}</span>
        </div>
    )
}

const NavGroup = ({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) => (
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

const NavItem = ({
    icon: Icon,
    children,
}: {
    icon: React.ElementType
    children: React.ReactNode
}) => (
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

export const Sidebar = () => {
    const { user, organization } = useSessionStore()

    if (!user || !organization) return null // Or loading skeleton

    return (
        <>
            <div className="flex items-center gap-2 p-6">
                <Logo />
            </div>

            <div
                className={cn(
                    'mx-4 mb-6 flex items-center justify-between',
                    'rounded-lg bg-[#e0f2fe] p-3 font-semibold text-gray-800',
                )}
            >
                <div className="flex items-center gap-2">
                    <img
                        src={organization.avatarUrl}
                        alt={organization.name}
                        className="h-8 w-8 rounded-full"
                    />
                    <span>{organization.name}</span>
                </div>
                <ChevronDown size={16} />
            </div>

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

            <div
                className={cn(
                    'mt-auto flex items-center justify-between',
                    'border-t border-gray-200 p-6',
                )}
            >
                <MemberProfile member={user} showDetails />
                <div className="flex gap-2">
                    {USER_MENU_CONFIG.items.map((item) => (
                        <item.icon
                            key={item.label}
                            size={20}
                            className={cn(
                                'cursor-pointer text-gray-500',
                                'hover:text-gray-700',
                            )}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

