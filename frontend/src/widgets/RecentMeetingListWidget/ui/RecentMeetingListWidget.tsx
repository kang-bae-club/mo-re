import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { MeetingDetailsModal } from '@/entities/reservation'
import { Reservation } from '@/entities/reservation'
import { cn, formatRelativeTime } from '@/shared/lib'
import { useRecentMeetings } from '@/features/reservation'

/**
 * **RecentMeetingListWidget**
 *
 * 가장 최근에 잡힌 회의 일정들을 리스트(테이블) 형태로 제공하는 위젯입니다.
 * 회의 주최자, 시간, 안건 등의 핵심 정보를 요약해서 보여주며, 클릭 시 상세 모달을 띄우는 인터랙션을 제공합니다.
 *
 * **Role**:
 * - 최신 회의 내역 조회
 * - 회의 상세 정보 확인 (Modal)
 *
 * **Used By**:
 * - [HomePage](src/pages/home/ui/Page.tsx)
 *
 * @author kangminjun
 * @date 2026-01-08
 */
export const RecentMeetingListWidget = () => {
    const { meetings, isLoading } = useRecentMeetings()
    const [selectedMeeting, setSelectedMeeting] = useState<Reservation | null>(null)

    // TODO: 로딩 스패너로 통합
    if (isLoading) return <div>Loading...</div>

    return (
        <>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">최근 회의</h2>
            <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full border-collapse">
                    <thead>
                        <tr
                            className={cn(
                                'bg-gray-100 text-left text-sm',
                                'font-semibold text-gray-600',
                            )}
                        >
                            <th className="p-4">회의실</th>
                            <th className="p-4">주최자</th>
                            <th className="p-4">회의 종료</th>
                            <th className="p-4">기타</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {meetings.map((m, i) => (
                            <tr
                                key={m.id || i} // Use ID if available
                                onClick={() => setSelectedMeeting(m)}
                                className="text-sm hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <td className="p-4 font-medium">
                                    {m.roomName}
                                    <div className="text-xs font-normal text-gray-500 truncate max-w-[150px]">
                                        {m.agenda}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={m.organizer.avatarUrl}
                                            alt={m.organizer.name}
                                            className="h-6 w-6 rounded-full"
                                        />
                                        <span className="font-bold">
                                            {m.organizer.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {m.organizer.position}
                                        </span>
                                    </div>
                                </td>
                                <td className="p-4 font-bold">
                                    {formatRelativeTime(m.startTime)}
                                </td>
                                <td className="p-4 text-gray-400">•••</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center py-2">
                    <ChevronDown
                        size={20}
                        className="cursor-pointer text-gray-400"
                    />
                </div>
            </div>

            {selectedMeeting && (
                <MeetingDetailsModal
                    isOpen={!!selectedMeeting}
                    onClose={() => setSelectedMeeting(null)}
                    meeting={selectedMeeting}
                />
            )}
        </>
    )
}
