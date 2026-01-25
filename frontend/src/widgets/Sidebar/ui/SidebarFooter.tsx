import { cn } from '@/shared/lib'
import { USER_MENU_CONFIG } from '@/shared/config'
import { MemberProfile } from '@/entities/user'
import { useSessionStore } from '@/entities/session'

export const SidebarFooter = () => {
    const { user } = useSessionStore()

    if (!user) return null

    return (
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
    )
}
