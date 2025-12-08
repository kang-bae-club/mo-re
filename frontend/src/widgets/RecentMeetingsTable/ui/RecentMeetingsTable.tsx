import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { MeetingDetailsModal } from '@/entities/reservation'
import { Reservation } from '@/entities/reservation'
import { cn, formatRelativeTime } from '@/shared/lib'

interface RecentMeetingsTableProps {
    meetings: Reservation[]
}

export const RecentMeetingsTable = ({ meetings }: RecentMeetingsTableProps) => {
    const [selectedMeeting, setSelectedMeeting] = useState<Reservation | null>(null)

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
                                            {m.organizer.role}
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
