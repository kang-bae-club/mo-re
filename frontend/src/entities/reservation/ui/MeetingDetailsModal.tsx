import { X, ChevronRight, ChevronLeft, Crown } from 'lucide-react'
import { Reservation } from '@/entities/reservation'
import { cn, formatRelativeTime } from '@/shared/lib'
import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface MeetingDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    meeting: Reservation
}

export const MeetingDetailsModal = ({ isOpen, onClose, meeting }: MeetingDetailsModalProps) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const [hoveredAttendee, setHoveredAttendee] = useState<Reservation['attendees'][0] | null>(null)
    const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null)

    const checkScroll = () => {
        // Close tooltip on scroll to prevent detached visual
        setHoveredAttendee(null)
        setTooltipPos(null)

        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            // Use a small buffer (e.g. 1px) to handle rounding inconsistencies
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1)
        }
    }

    useEffect(() => {
        if (isOpen) {
            // Delay checkScroll slightly to ensure content is rendered and measured
            const timeoutId = setTimeout(() => {
                checkScroll()
            }, 50)

            // Add resize listener to re-check on window resize
            window.addEventListener('resize', checkScroll)
            return () => {
                clearTimeout(timeoutId)
                window.removeEventListener('resize', checkScroll)
            }
        }
    }, [isOpen, meeting.attendees])

    if (!isOpen) return null

    const scrollNext = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
        }
    }

    const scrollPrev = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
        }
    }

    return (
        <>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200"
                onClick={onClose}
            >
                <div
                    className="w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between bg-[#3E83A8] p-6 text-white rounded-t-2xl">
                        <h3 className="text-xl font-bold">
                            {/* Assuming today's date for demo, normally derive from meeting.startTime */}
                            24.12.26 / {meeting.roomName}
                        </h3>
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 hover:bg-white/20 transition-colors"
                        >
                            <X size={24} className="text-white" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="space-y-6 p-6 pt-6">
                        {/* Meeting Time & Status */}
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="mb-2 font-bold text-blue-900">회의 시간</div>
                                <div className="text-gray-900">오후 4시 ~ 오후 6시</div>
                            </div>
                            <span className={cn(
                                'px-3 py-1 rounded-full text-xs font-bold',
                                'bg-gray-100 text-gray-600'
                            )}>
                                {formatRelativeTime(meeting.startTime)}
                            </span>
                        </div>

                        {/* Attendees */}
                        <div className="relative group/scroll">
                            <div className="mb-2 font-bold text-blue-900">참석자</div>

                            <div className="flex items-center relative">
                                {/* Left Scroll Button */}
                                {canScrollLeft && (
                                    <button
                                        onClick={scrollPrev}
                                        className={cn(
                                            'absolute left-0 z-10 p-1 rounded-full',
                                            'bg-white/80 shadow-md text-gray-600',
                                            'hover:bg-gray-100 transition-colors',
                                        )}
                                        style={{ left: '-12px' }}
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                )}

                                {/* Scroll Container */}
                                <div
                                    ref={scrollContainerRef}
                                    onScroll={checkScroll}
                                    className="flex items-center gap-4 py-2 overflow-x-auto scrollbar-hide px-1 w-full"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {meeting.attendees.map((attendee, idx) => (
                                        <div
                                            key={idx}
                                            className="relative group cursor-pointer flex flex-col items-center flex-shrink-0"
                                            onMouseEnter={(e) => {
                                                const rect = e.currentTarget.getBoundingClientRect()
                                                setTooltipPos({
                                                    x: rect.left + rect.width / 2,
                                                    y: rect.top,
                                                })
                                                setHoveredAttendee(attendee)
                                            }}
                                            onMouseLeave={() => {
                                                setHoveredAttendee(null)
                                                setTooltipPos(null)
                                            }}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={attendee.avatarUrl}
                                                    alt={attendee.name}
                                                    className="h-10 w-10 rounded-full border border-gray-200 bg-gray-200 object-cover"
                                                />
                                                {/* Organizer Icon (Crown) */}
                                                {idx === 0 && (
                                                    <div className={cn(
                                                        'absolute -top-1.5 -right-1.5 bg-white rounded-full',
                                                        'p-[2px] shadow-sm ring-1 ring-gray-100 z-10',
                                                    )}>
                                                        <Crown size={14} className="text-yellow-400 fill-yellow-400" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Scroll Button */}
                                {canScrollRight && (
                                    <button
                                        onClick={scrollNext}
                                        className={cn(
                                            'absolute right-0 z-10 p-1 rounded-full',
                                            'bg-white/80 shadow-md text-gray-600',
                                            'hover:bg-gray-100 transition-colors',
                                        )}
                                        style={{ right: '-12px' }}
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Agenda */}
                        <div>
                            <div className="mb-2 font-bold text-blue-900">회의 안건</div>
                            <div className="text-gray-900">{meeting.agenda || '안건 없음'}</div>
                        </div>

                        {/* Notification */}
                        {meeting.notification && (
                            <div>
                                <div className="mb-2 font-bold text-blue-900">공지사항</div>
                                <div className="text-gray-900">{meeting.notification}</div>
                            </div>
                        )}
                    </div>

                    {/* Footer / Actions */}
                    <div className="p-6 pt-0">
                        <button
                            onClick={() => {
                                if (meeting.minutesId) {
                                    alert(`View Minutes: ${meeting.minutesId}`)
                                } else {
                                    alert('Write Minutes')
                                }
                            }}
                            className={cn(
                                'w-full rounded-xl py-3 font-bold transition-colors',
                                meeting.minutesId
                                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    : 'bg-blue-500 text-white hover:bg-blue-600',
                            )}
                        >
                            {meeting.minutesId ? '회의록 보기' : '회의록 작성'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Portal/Fixed Tooltip Rendered Outside Modal Structure */}
            {hoveredAttendee && tooltipPos && createPortal(
                <div
                    className={cn(
                        'fixed z-[9999] min-w-max bg-gray-900 text-white text-xs',
                        'rounded px-2 py-1 shadow-xl animate-in fade-in',
                        'zoom-in-95 duration-200 pointer-events-none',
                    )}
                    style={{
                        left: tooltipPos.x,
                        top: tooltipPos.y - 8,
                        transform: 'translate(-50%, -100%)',
                    }}
                >
                    <div className="font-semibold">{hoveredAttendee.name}</div>
                    <div className="text-gray-300">
                        {hoveredAttendee.department} | {hoveredAttendee.team}
                    </div>
                    {/* Triangle pointer */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-gray-900 rotate-45" />
                </div>,
                document.body,
            )}
        </>
    )
}
