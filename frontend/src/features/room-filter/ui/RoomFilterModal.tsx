import { X } from 'lucide-react'
import { RoomCard } from '@/entities/room'
import { Room, RoomFilterType } from '@/entities/room'
import { FILTER_CONFIG } from '@/shared/config'
import { cn } from '@/shared/lib'
import { MOCK_DASHBOARD_DATA } from '@/shared'

interface RoomFilterModalProps {
    isOpen: boolean
    onClose: () => void
    filterType: RoomFilterType | null
}

export const RoomFilterModal = ({
    isOpen,
    onClose,
    filterType,
}: RoomFilterModalProps) => {
    if (!isOpen || !filterType) return null

    const config = FILTER_CONFIG[filterType]
    const filteredRooms = MOCK_DASHBOARD_DATA.rooms.filter(config.filter)

    return (
        <div
            className={cn(
                'fixed inset-0 z-50 flex items-center justify-center',
                'bg-black/50 p-4 backdrop-blur-sm',
            )}
        >
            <div
                className={cn(
                    'relative max-h-[80vh] w-full max-w-3xl overflow-hidden',
                    'rounded-2xl bg-white shadow-2xl',
                )}
            >
                {/* Header */}
                <div
                    className={cn(
                        'flex items-center justify-between',
                        'bg-[#3E83A8] p-6 text-white',
                    )}
                >
                    <h2
                        className={cn(
                            'flex items-center',
                            'text-2xl font-bold',
                        )}
                    >
                        {config.modalTitle}
                        <span
                            className={cn(
                                'ml-2 text-lg font-normal',
                                'text-blue-100',
                            )}
                        >
                            ({filteredRooms.length})
                        </span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 hover:bg-white/20"
                    >
                        <X size={24} className="text-white" />
                    </button>
                </div>

                {/* Content */}
                <div
                    className={cn(
                        'grid grid-cols-2 gap-4',
                        'overflow-y-auto p-6 md:grid-cols-3',
                    )}
                >
                    {/* Explicitly typing 'room' for clarity, though it should be inferred if filteredRooms is typed correctly */}
                    {filteredRooms.map((room: Room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
                    {filteredRooms.length === 0 && (
                        <div
                            className={cn(
                                'col-span-full py-12',
                                'text-center text-gray-500',
                            )}
                        >
                            해당하는 회의실이 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
