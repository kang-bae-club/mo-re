
import { useState } from 'react'
import { DashboardStats } from '@/shared/model'
import { RoomFilterType, ROOM_FILTER } from '@/entities/room'
import { RoomFilterModal } from '@/features/room-filter'
import { StatusCard } from '@/entities/room'

interface StatusSectionProps {
    stats: DashboardStats
}

export const StatusSection = ({ stats }: StatusSectionProps) => {
    const [selectedFilter, setSelectedFilter] = useState<RoomFilterType | null>(
        null,
    )

    return (
        <>
            <div className="mb-12 grid grid-cols-3 gap-6">
                <StatusCard
                    type={ROOM_FILTER.TOTAL}
                    value={stats.totalRooms}
                    onClick={() => setSelectedFilter(ROOM_FILTER.TOTAL)}
                />
                <StatusCard
                    type={ROOM_FILTER.AVAILABLE}
                    value={stats.availableRooms}
                    onClick={() => setSelectedFilter(ROOM_FILTER.AVAILABLE)}
                />
                <StatusCard
                    type={ROOM_FILTER.IN_USE}
                    value={stats.inUseRooms}
                    onClick={() => setSelectedFilter(ROOM_FILTER.IN_USE)}
                />
            </div>
            <RoomFilterModal
                isOpen={!!selectedFilter}
                onClose={() => setSelectedFilter(null)}
                filterType={selectedFilter}
            />
        </>
    )
}
