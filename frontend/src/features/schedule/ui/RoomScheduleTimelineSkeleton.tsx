

export const RoomScheduleTimelineSkeleton = () => {
    // Generate dummy slots for visual structure
    const dummySlots = Array.from({ length: 10 }, (_, i) => i)

    return (
        <div className="relative flex flex-col w-full h-[600px] overflow-hidden pr-2">
            <div className="relative flex-1 animate-pulse">
                {dummySlots.map((i) => (
                    <div
                        key={i}
                        className="flex items-start h-[60px] relative"
                    >
                        {/* Time label skeleton */}
                        <div className="w-[50px] pr-3 flex justify-end">
                            <div className="h-3 w-8 bg-gray-200 rounded mt-[-4px]" />
                        </div>

                        {/* Grid line */}
                        <div className="flex-1 border-t border-gray-100 h-full w-full relative">
                            {/* Random event skeletons for effect */}
                            {i % 3 === 0 && (
                                <div className="absolute top-2 left-0 right-2 h-[45px] bg-gray-100 rounded-r border-l-4 border-gray-200 opacity-50" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
