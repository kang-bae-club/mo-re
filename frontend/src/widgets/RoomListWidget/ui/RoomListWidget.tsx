import { ChevronDown } from 'lucide-react'
import { RoomCard } from '@/entities/room'
import { cn } from '@/shared/lib'
import { useRoomData } from '@/features/room'

/**
 * **RoomListWidget**
 *
 * 전체 회의실 목록을 그리드 형태로 표시하여 시각적으로 제공하는 위젯입니다.
 * 각 회의실의 상태(사용 중, 예약 가능 등)를 카드 형태로 보여주며, 상세 정보 확인을 위한 진입점 역할을 합니다.
 *
 * **Role**:
 * - 회의실 목록 표시
 * - 회의실 상태 시각화
 *
 * **Used By**:
 * - [HomePage](src/pages/home/ui/Page.tsx)
 *
 * @author kangminjun
 * @date 2026-01-08
 */
export const RoomListWidget = () => {
    const { rooms, isLoading } = useRoomData()

    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">
                    회의실 예약
                </h2>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-6">
                {rooms.map((room) => (
                    <RoomCard
                        key={room.id}
                        room={room}
                    />
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
