import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Info } from 'lucide-react'
import { PageHeader } from '@/shared/ui'
import { useRoomStore } from '@/entities/room'
import { RoomInfoAccordion } from '@/entities/room'
import { RoomScheduleTimeline } from '@/features/schedule'

export const RoomDetailPage = () => {
    const { roomId } = useParams()
    const { selectedRoom, roomReservations, fetchRoom, isLoading, selectedDate } = useRoomStore()
    const [selectedTimeRange, setSelectedTimeRange] = useState<{ start: string; end: string } | null>(null)

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

                        {/* TODO: 향후 "예약하기" 까지의 영역은 input 공통 영역으로 치환합니다. */}
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-500 mb-1">날짜</span>
                            <div className="bg-gray-200 px-3 py-1.5 rounded text-sm text-gray-700 min-w-[120px] text-center">
                                {/* TODO:아래 부분은 Date Picker 공통 컴포넌트로 치환합니다. */}
                                <input
                                    type="date"
                                    value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}
                                    onChange={(e) => {
                                        if (roomId && e.target.value) {
                                            setSelectedTimeRange(null)
                                            fetchRoom(roomId, new Date(e.target.value))
                                        }
                                    }}
                                    className="bg-transparent border-none outline-none w-full text-center cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-500 mb-1">시간</span>
                            <div className="bg-gray-200 px-3 py-1.5 rounded text-sm text-gray-700 min-w-[120px] text-center">
                                {selectedTimeRange
                                    ? `${selectedTimeRange.start} ~ ${selectedTimeRange.end}`
                                    : '시간 선택'
                                }
                            </div>
                        </div>
                    </div>
                    <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors">
                        예약 하기
                    </button>
                </div>

                <div className="flex items-center gap-1.5 mb-2 px-1 text-red-500 justify-end">
                    <Info className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">30분 단위의 예약만 가능합니다</span>
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
                        writable={true}
                        onTimeSelect={(start, end) => {
                            if (start && end)
                                setSelectedTimeRange({ start, end })
                            else
                                setSelectedTimeRange(null)
                        }}
                        selectedRange={selectedTimeRange}
                    />
                </div>
            </div>
        </div>
    )
}
