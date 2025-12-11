import { useMemo, useState, useEffect } from 'react'
import { Reservation } from '@/entities/reservation'
import { TimelineMeetingCard } from '@/entities/reservation'
import { cn } from '@/shared/lib'


const timeToMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
}

interface RoomScheduleTimelineProps {
    reservations: Reservation[]
    startTime?: string
    endTime?: string
    onMeetingClick?: (reservation: Reservation) => void
    showAttendees?: boolean
    writable?: boolean
    onTimeSelect?: (startTime: string | null, endTime: string | null) => void
    selectedRange?: { start: string; end: string } | null
}

// TODO: useDragSelection 커스텀 훅으로 추출
export const RoomScheduleTimeline = ({
    reservations,
    startTime = '07:00',
    endTime = '23:00',
    onMeetingClick,
    showAttendees = false,
    writable = false,
    onTimeSelect,
    selectedRange,
}: RoomScheduleTimelineProps) => {
    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)

    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState<number | null>(null)
    const [dragEnd, setDragEnd] = useState<number | null>(null)

    const getMinutes = (timeStr: string) => {
        if (timeStr.includes('T')) {
            const date = new Date(timeStr)
            return date.getHours() * 60 + date.getMinutes()
        }
        return timeToMinutes(timeStr)
    }

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

    const handleMouseDown = (e: React.MouseEvent, minutes: number) => {
        if (!writable) return
        e.preventDefault() // 네이티브 MouseDown 이벤트 차단
        setIsDragging(true)
        setDragStart(minutes)
        setDragEnd(minutes + 30) // 기본 1개의 슬롯: 30분
    }

    const handleMouseEnter = (minutes: number) => {
        if (!isDragging || !writable || dragStart === null) return
        setDragEnd(minutes + 30)
    }

    const handleMouseUp = (e?: MouseEvent) => {
        if (!isDragging || !writable || dragStart === null || dragEnd === null) return
        setIsDragging(false)

        const start = Math.min(dragStart, dragEnd - 30)
        const end = Math.max(dragStart + 30, dragEnd)

        // 동일한 회의실에 대해서 예약 시간이 겹치는지 확인
        const hasOverlap = reservations.some((res) => {
            const resStart = getMinutes(res.startTime)
            const resEnd = getMinutes(res.endTime)
            // 임의의 reservation의 구간이 selection 구간에 포함되어있는 경우
            return start < resEnd && end > resStart
        })

        if (hasOverlap) {
            onTimeSelect?.(null, null)
            setDragStart(null)
            setDragEnd(null)
            return
        }

        const formatTime = (totalMinutes: number) => {
            const h = Math.floor(totalMinutes / 60)
            const m = totalMinutes % 60
            return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
        }

        onTimeSelect?.(formatTime(start), formatTime(end))
        setDragStart(null)
        setDragEnd(null)
    }

    useEffect(() => {
        const handleGlobalMouseUp = (e: MouseEvent) => {
            if (isDragging) {
                handleMouseUp(e)
            }
        }
        window.addEventListener('mouseup', handleGlobalMouseUp)
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
    }, [isDragging, dragStart, dragEnd])

    const selectionStyle = useMemo(() => {
        let start = 0
        let end = 0

        if (dragStart !== null && dragEnd !== null) {
            start = Math.min(dragStart, dragEnd - 30)
            end = Math.max(dragStart + 30, dragEnd)
        } else if (selectedRange) {
            const rangeStart = timeToMinutes(selectedRange.start)
            const rangeEnd = timeToMinutes(selectedRange.end)
            if (isNaN(rangeStart) || isNaN(rangeEnd)) return null
            start = rangeStart
            end = rangeEnd
        } else {
            return null
        }

        const isOverlapping = reservations.some((res) => {
            const resStart = getMinutes(res.startTime)
            const resEnd = getMinutes(res.endTime)
            return start < resEnd && end > resStart
        })

        const top = (start - startMinutes) * 2
        const height = (end - start) * 2
        return { top, height, isOverlapping }
    }, [dragStart, dragEnd, startMinutes, selectedRange, reservations])

    return (
        <div className="relative flex flex-col w-full h-[600px] overflow-y-auto pr-2 pt-4">

            <div className="relative flex-1">
                {timeSlots.map((time) => {
                    const minutes = timeToMinutes(time)
                    return (
                        <div
                            key={time}
                            className="flex items-start h-[60px] relative group select-none"
                            style={{ height: '60px' }}
                        >
                            <div className="w-[50px] text-xs text-gray-400 -mt-2 text-right pr-3 select-none">
                                {time}
                            </div>
                            <div
                                className={cn(
                                    "flex-1 border-t border-gray-100 h-full w-full relative",
                                    writable && "cursor-pointer hover:bg-gray-50 transition-colors"
                                )}
                                onMouseDown={(e) => handleMouseDown(e, minutes)}
                                onMouseEnter={() => handleMouseEnter(minutes)}
                            >
                            </div>
                        </div>
                    )
                })}


                <div className="absolute top-0 left-[50px] right-0 bottom-0 pointer-events-none overflow-hidden">
                    {/* Selection Overlay */}
                    {selectionStyle && (
                        <div
                            className={cn(
                                "absolute left-0 right-2 z-0 border-2 border-dashed rounded-lg pointer-events-none animate-pulse transition-all duration-300 ease-in-out",
                                selectionStyle.isOverlapping
                                    ? "bg-red-500/20 border-red-500" // 충돌시
                                    : "bg-indigo-500/20 border-indigo-500" // 예약 가능한 상태
                            )}
                            style={{
                                top: `${selectionStyle.top}px`,
                                height: `${selectionStyle.height}px`,
                            }}
                        />
                    )}

                    {reservations.map((res) => {
                        const eventStart = getMinutes(res.startTime)
                        const eventEnd = getMinutes(res.endTime)

                        if (eventEnd <= startMinutes || eventStart >= endMinutes) return null

                        const offsetMinutes = eventStart - startMinutes
                        const durationMinutes = eventEnd - eventStart

                        const topPx = offsetMinutes * 2
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
                                    showAttendees={showAttendees}
                                />
                            </div>
                        )
                    })}


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
