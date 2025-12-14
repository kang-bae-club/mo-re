import { useState } from 'react'
import { Reservation, MeetingDetailsModal } from '@/entities/reservation'
import { cn } from '@/shared/lib'

interface TimelineMeetingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    reservation: Reservation
    showAttendees?: boolean
}

export const TimelineMeetingCard = ({
    reservation,
    showAttendees = false,
    className,
    ...props
}: TimelineMeetingCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsModalOpen(true)
        props.onClick?.(e) // 추후 확장성을 위해서 onClick에 대한 prop을 열어둠
    }

    return (
        <>
            <div
                className={cn(
                    'rounded-lg p-2 text-xs border cursor-pointer transition-colors h-full flex flex-col',
                    reservation.organizer.id === 'user1'
                        ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100',
                    className,
                )}
                onClick={handleCardClick}
                {...props}
            >
                <div className="flex items-center justify-between">
                    <div className="font-semibold truncate flex-1 pr-2">
                        {reservation.title || '제목 없음'}
                    </div>
                    {showAttendees && (
                        <div className="flex -space-x-1.5 shrink-0">
                            {reservation.attendees.map((attendee) => (
                                <div
                                    key={attendee.id}
                                    className="w-5 h-5 rounded-full bg-gray-300 border border-white flex items-center justify-center
                                                 text-[8px] overflow-hidden bg-white"
                                    title={attendee.name}
                                >
                                    {attendee.avatarUrl ? (
                                        <img src={attendee.avatarUrl} alt={attendee.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-500 font-medium">{attendee.name[0]}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="opacity-80 truncate text-[10px] mt-0.5">
                    {reservation.organizer.name} / {reservation.organizer.department || '개발팀'}
                </div>
            </div>

            <MeetingDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                meeting={reservation}
            />
        </>
    )
}
