import { useMemo } from 'react'
import { Reservation } from '@/entities/reservation'
import { TimelineMeetingCard } from '@/entities/reservation'



// Helper to convert time "HH:mm" to minutes from start of day
const timeToMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
}

interface RoomScheduleTimelineProps {
    reservations: Reservation[]
    startTime?: string
    endTime?: string
    onMeetingClick?: (reservation: Reservation) => void
}

export const RoomScheduleTimeline = ({
    reservations,
    startTime = '07:00',
    endTime = '23:00',
    onMeetingClick,
}: RoomScheduleTimelineProps) => {
    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)

    // Helper to parse ISO or HH:mm to minutes
    const getMinutes = (timeStr: string) => {
        if (timeStr.includes('T')) {
            const date = new Date(timeStr)
            return date.getHours() * 60 + date.getMinutes()
        }
        return timeToMinutes(timeStr)
    }

    // Generate 30-min slots for grid background
    const timeSlots = useMemo(() => {
        const slots = []
        let current = startMinutes
        while (current <= endMinutes) {
            const h = Math.floor(current / 60)
            const m = current % 60
            const timeString = `${h.toString().padStart(2, '0')}:${m
                .toString()
                .padStart(2, '0')}`
            slots.push(timeString)
            current += 30
        }
        return slots
    }, [startMinutes, endMinutes])

    const currentTime = new Date()
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    const isCurrentTimeVisible = currentMinutes >= startMinutes && currentMinutes <= endMinutes

    return (
        <div className="relative flex flex-col w-full h-[600px] overflow-y-auto pr-2 pt-4">
            {/* Time Slots Grid */}
            <div className="relative flex-1">
                {timeSlots.map((time) => (
                    <div
                        key={time}
                        className="flex items-start h-[60px] relative" // 30 mins = 60px
                        style={{ height: '60px' }}
                    >
                        <div className="w-[50px] text-xs text-gray-400 -mt-2 text-right pr-3">
                            {time}
                        </div>
                        <div className="flex-1 border-t border-gray-100 h-full w-full relative">
                        </div>
                    </div>
                ))}

                {/* Events Overlay */}
                <div className="absolute top-0 left-[50px] right-0 bottom-0 pointer-events-none overflow-hidden">
                    {reservations.map((res) => {
                        const eventStart = getMinutes(res.startTime)
                        const eventEnd = getMinutes(res.endTime)

                        // Skip if outside view range
                        if (eventEnd <= startMinutes || eventStart >= endMinutes) return null

                        const offsetMinutes = eventStart - startMinutes
                        const durationMinutes = eventEnd - eventStart

                        const topPx = offsetMinutes * 2 // 1 min = 2px
                        const heightPx = durationMinutes * 2

                        return (
                            <div
                                key={res.id}
                                className="absolute left-0 right-2 z-10 group pointer-events-auto"
                                style={{
                                    top: `${topPx}px`,
                                    height: `${heightPx}px`,
                                }}
                            >
                                <TimelineMeetingCard
                                    reservation={res}
                                    className="w-full h-full"
                                    onClick={() => onMeetingClick?.(res)}
                                />
                            </div>
                        )
                    })}

                    {/* Current Time Indicator */}
                    {isCurrentTimeVisible && (
                        <div
                            className="absolute left-0 right-0 border-t-2 border-red-400 z-20"
                            style={{ top: `${(currentMinutes - startMinutes) * 2}px` }}
                        >
                            <div className="absolute -left-1 -top-1.5 h-3 w-3 rounded-full bg-red-400" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
