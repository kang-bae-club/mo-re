import { ScheduleQueryForm, RoomScheduleTimeline, RoomScheduleTimelineSkeleton } from '@/features/schedule'
import { useReservationStore } from '@/entities/reservation'
import { MOCK_SCHEDULE_RESPONSE } from '@/shared/mocks'

export const RightPanel = () => {
    const { isLoading, selectedDate, selectedRoomId } = useReservationStore()

    const showSkeleton = isLoading || !selectedDate || !selectedRoomId

    return (
        <>
            <ScheduleQueryForm />

            {showSkeleton ? (
                <RoomScheduleTimelineSkeleton />
            ) : (
                <RoomScheduleTimeline
                    reservations={MOCK_SCHEDULE_RESPONSE.reservations}
                />
            )}
        </>
    )
}
