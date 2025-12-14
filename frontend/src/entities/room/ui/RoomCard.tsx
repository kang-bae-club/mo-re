import { useNavigate } from 'react-router-dom'
import { STATUS_UI_CONFIG } from '@/shared/config'
import { Room } from '@/entities/room'
import { cn } from '@/shared/lib'

interface RoomCardProps {
    room: Room
    onClick?: () => void
}

export const RoomCard = ({ room, onClick }: RoomCardProps) => {
    const navigate = useNavigate()
    const config = STATUS_UI_CONFIG[room.status]

    const handleClick = () => {
        if (onClick) {
            onClick()
        } else {
            navigate(`/room/${room.id}`)
        }
    }

    return (
        <div
            onClick={handleClick}
            className={cn(
                'relative flex cursor-pointer flex-col rounded-xl border-2', // increased border width for visibility
                'bg-white px-6 pb-6 pt-3 text-center transition-transform',
                'hover:-translate-y-0.5 hover:shadow-lg',
                config.border,
            )}
        >
            <div className="flex w-full justify-end">
                <div
                    className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-bold',
                        config.badge,
                    )}
                >
                    {config.label}
                </div>
            </div>


            <div className="font-bold text-xl mb-2 text-gray-800">
                {room.name}
            </div>
            <span className="text-sm text-gray-500 block">{room.location}</span>
            <div className="mt-1 px-4 text-xs text-gray-400 truncate">
                {room.features.map((f) => `#${f}`).join(' ')}
            </div>
        </div >
    )
}
