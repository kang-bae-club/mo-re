import { useState } from 'react'
import { RoomFilterType, ROOM_FILTER } from '@/entities/room'
import { RoomFilterModal } from '@/features/room-filter'
import { StatusCard } from '@/entities/room'
import { useRoomData } from '@/features/room'

/**
 * **DashboardStatusWidget**
 *
 * 메인 대시보드 상단에 배치되어 객실 예약 현황(전체, 사용 가능, 사용 중)을 요약 표시하는 위젯입니다.
 * 사용자의 액션에 따라 현황별 상세 필터링 기능을 제공(Modal)하며, 실시간 통계 데이터를 시각화합니다.
 *
 * **Role**:
 * - 객실 상태 요약
 * - 필터 모달 제어
 *
 * **Used By**:
 * - [HomePage](src/pages/home/ui/Page.tsx)
 *
 * @author kangminjun
 * @date 2026-01-08
 */
export const DashboardStatusWidget = () => {
    const { stats } = useRoomData()
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
