import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/lib'
import { useSessionStore } from '@/entities/session'

export const OrganizationList = () => {
    const { organization } = useSessionStore()

    if (!organization) return null

    return (
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
    )
}
