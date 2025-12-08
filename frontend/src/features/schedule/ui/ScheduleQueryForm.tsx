import {
    addMonths,
    format,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    startOfWeek,
    endOfWeek,
} from 'date-fns'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib'
import { useRoomStore } from '@/entities/room'
import { useReservationStore } from '@/entities/reservation'

export const ScheduleQueryForm = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const { rooms } = useRoomStore()
    const {
        selectedDate,
        selectedRoomId,
        selectDate,
        selectRoom,
    } = useReservationStore()

    // Initialize default room
    useEffect(() => {
        if (!selectedRoomId && rooms.length > 0) {
            selectRoom(rooms[0]?.id)
        }
    }, [rooms, selectedRoomId, selectRoom])

    // Sync calendar view with selected date
    useEffect(() => {
        if (selectedDate) {
            setCurrentDate(selectedDate)
        }
    }, [selectedDate])

    const selectedRoom = rooms.find((r) => r.id === selectedRoomId)

    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(monthStart)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }) // 0 = Sunday
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 })

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate,
    })

    const weekDays = ['일', '월', '화', '수', '목', '금', '토']

    const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1))
    const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1))

    const getDayColor = (dayIndex: number, isCurrentMonth: boolean) => {
        if (!isCurrentMonth) return 'text-gray-300'
        if (dayIndex === 0) return 'text-red-500' // Sunday
        if (dayIndex === 6) return 'text-blue-500' // Saturday
        return 'text-gray-600'
    }

    // Header day color
    const getHeaderDayColor = (index: number) => {
        if (index === 0) return 'text-red-500'
        if (index === 6) return 'text-blue-500'
        return 'text-gray-400'
    }

    return (
        <div>
            {/* Calendar Header */}
            <div className="mb-4 flex items-center justify-between px-2">
                <div className="relative flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-1 transition-colors">
                    <span className="font-bold text-gray-800">
                        {format(currentDate, 'yyyy.MM')}
                    </span>
                    <ChevronDown size={14} className="text-gray-500" />

                    <select
                        value={currentDate.getMonth()}
                        onChange={(e) => {
                            const newMonth = parseInt(e.target.value)
                            const newDate = new Date(currentDate)
                            newDate.setMonth(newMonth)
                            setCurrentDate(newDate)
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    >
                        {Array.from({ length: 12 }, (_, i) => i).map((monthIndex) => {
                            const date = new Date(currentDate.getFullYear(), monthIndex, 1)
                            return (
                                <option key={monthIndex} value={monthIndex}>
                                    {format(date, 'yyyy.MM')}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className="flex gap-1">
                    <button
                        onClick={handlePrevMonth}
                        className="rounded p-1 hover:bg-gray-100"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={handleNextMonth}
                        className="rounded p-1 hover:bg-gray-100"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="mb-6 grid grid-cols-7 gap-y-2 text-center text-xs">
                {weekDays.map((day, idx) => (
                    <span key={day} className={cn('font-medium', getHeaderDayColor(idx))}>
                        {day}
                    </span>
                ))}
                {calendarDays.map((day) => {
                    const isSelected = isSameDay(day, selectedDate)
                    const isCurrentMonth = isSameMonth(day, monthStart)
                    const dayOfWeek = day.getDay()

                    return (
                        <button
                            key={day.toISOString()}
                            onClick={() => selectDate(day)}
                            disabled={!isCurrentMonth}
                            className={cn(
                                'mx-auto flex h-7 w-7 items-center justify-center rounded-full transition-colors',
                                !isCurrentMonth && 'text-gray-200 cursor-default', // lighter for disabled
                                isCurrentMonth && !isSelected && 'hover:bg-gray-100',
                                isSelected
                                    ? 'bg-black text-white font-medium'
                                    : getDayColor(dayOfWeek, isCurrentMonth),
                            )}
                        >
                            {format(day, 'd')}
                        </button>
                    )
                })}
            </div>

            {/* Room Selector */}
            <div className="relative mb-6">
                <div
                    className={cn(
                        'flex cursor-pointer items-center justify-between',
                        'border-b border-gray-100 pb-2 font-medium text-gray-700',
                        'transition-colors hover:text-gray-900',
                    )}
                >
                    <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>{selectedRoom?.name || 'Select Room'}</span>
                    </div>

                    <select
                        value={selectedRoomId || ''}
                        onChange={(e) => selectRoom(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    >
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name}
                            </option>
                        ))}
                    </select>

                    <ChevronDown size={16} />
                </div>
            </div>
        </div>
    )
}
