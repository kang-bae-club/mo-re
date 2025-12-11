import { useState } from 'react'
import { ChevronDown, ChevronUp, MapPin, Users, Settings } from 'lucide-react'
import { Room } from '@/entities/room'
import { cn } from '@/shared/lib'

interface RoomInfoAccordionProps {
    room: Room
}

export const RoomInfoAccordion = ({ room }: RoomInfoAccordionProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border rounded-lg bg-white overflow-hidden mb-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                <div className="font-semibold text-gray-700">회의실 정보</div>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
            </button>
            <div
                className={cn(
                    'transition-all duration-200 ease-in-out',
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
                )}
            >
                <div className="p-4 border-t bg-white space-y-3">
                    <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">수용 인원: {room.capacity}명</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">위치: {room.location}</span>
                    </div>
                    <div className="flex items-start text-gray-600">
                        <Settings className="w-4 h-4 mr-2 mt-0.5" />
                        <div className="text-sm flex flex-wrap gap-1">
                            {room.features.map((feature, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-500"
                                >
                                    #{feature}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
