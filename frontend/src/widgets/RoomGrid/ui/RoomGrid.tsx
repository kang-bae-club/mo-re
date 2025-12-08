import { ChevronDown } from 'lucide-react'
import { Room, RoomCard } from '@/entities/room'
import { cn } from '@/shared/lib'

interface RoomGridProps {
    rooms: Room[]
}

export const RoomGrid = ({ rooms }: RoomGridProps) => {
    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    회의실 예약
                </h2>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
            <div className="mb-12 flex justify-center">
                <button
                    className={cn(
                        'rounded-full border border-gray-300 p-1',
                        'hover:bg-gray-100',
                    )}
                >
                    <ChevronDown size={24} className="text-gray-500" />
                </button>
            </div>
        </>
    )
}
