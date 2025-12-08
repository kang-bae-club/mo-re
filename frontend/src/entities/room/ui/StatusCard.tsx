import { cn } from '@/shared/lib'
import { FILTER_CONFIG } from '@/shared/config'
import { RoomFilterType } from '@/entities/room'

interface StatusCardProps {
    type: RoomFilterType
    value: number
    onClick?: () => void
}

export const StatusCard = ({ type, value, onClick }: StatusCardProps) => {
    const config = FILTER_CONFIG[type]

    return (
        <button
            onClick={onClick}
            className={cn(
                'flex flex-col items-center justify-center rounded-2xl p-6',
                'transition-all hover:scale-105 hover:shadow-md',
                config.color,
            )}
        >
            <span className="mb-2 text-sm font-medium opacity-80">
                {config.label}
            </span>
            <span className="text-4xl font-bold">{value}</span>
        </button>
    )
}
