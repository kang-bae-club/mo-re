import { Reservation } from '@/entities/reservation'
import { cn } from '@/shared/lib'

interface TimelineMeetingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    reservation: Reservation
}

export const TimelineMeetingCard = ({
    reservation,
    className,
    ...props
}: TimelineMeetingCardProps) => {
    return (
        <div
            className={cn(
                'rounded-lg p-2 text-xs border cursor-pointer transition-colors h-full flex flex-col',
                reservation.organizer.id === 'user1'
                    ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100',
                className,
            )}
            {...props}
        >
            <div className="font-semibold truncate">
                {reservation.title || '제목 없음'}
            </div>
            <div className="opacity-80 truncate">{reservation.organizer.name}</div>
        </div>
    )
}
