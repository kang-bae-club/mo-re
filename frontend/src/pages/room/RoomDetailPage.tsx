import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { PageHeader } from '@/shared/ui'
import { useRoomStore } from '@/entities/room'
import { RoomInfoAccordion } from '@/entities/room/ui/RoomInfoAccordion'
import { RoomScheduleTimeline } from '@/features/schedule'

export const RoomDetailPage = () => {
    const { roomId } = useParams()
    const { selectedRoom, roomReservations, fetchRoom, isLoading, selectedDate } = useRoomStore()

    useEffect(() => {
        if (roomId) {
            fetchRoom(roomId)
        }
    }, [roomId, fetchRoom])

    // TODO: 이 부분은 추후에 `로딩 스피너` 이슈와 함께 통합하기
    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading...</div>
    }

    // TODO: 이 부분은 추후에 `공통 에러 페이지, 공통 에러 팝업` 이슈와 함께 통합하기
    if (!selectedRoom) {
        return <div className="p-8 text-center text-gray-500">회의실을 찾을 수 없습니다.</div>
    }

    const room = selectedRoom

    return (
        <div className="flex flex-col h-full bg-white">
            <PageHeader title={room.name} />

            <div className="flex-1 overflow-y-auto p-6 max-w-4xl mx-auto w-full">
                <RoomInfoAccordion room={room} />

                <div className="mb-6 bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-500 mb-1">날짜</span>
                            <div className="bg-gray-200 px-3 py-1.5 rounded text-sm text-gray-700 min-w-[120px] text-center">
                                2024-12-16
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-500 mb-1">시간</span>
                            <div className="bg-gray-200 px-3 py-1.5 rounded text-sm text-gray-700 min-w-[120px] text-center">
                                16:00 ~ 17:00
                            </div>
                        </div>
                    </div>
                    <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors">
                        예약 하기
                    </button>
                </div>

                <div className="border rounded-xl p-4 bg-white shadow-sm">
                    <div className="mb-4 flex items-center justify-between border-b pb-2">
                        <h2 className="font-semibold text-gray-800">예약 현황</h2>
                        <span className="text-sm font-medium text-gray-500">
                            {selectedDate ? format(selectedDate, 'yyyy.MM.dd') : ''}
                        </span>
                    </div>
                    <RoomScheduleTimeline
                        reservations={roomReservations}
                        showAttendees={true}
                    />
                </div>
            </div>
        </div>
    )
}
