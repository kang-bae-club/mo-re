import { useState } from 'react'
import { ScheduleQueryForm, RoomScheduleTimeline, RoomScheduleTimelineSkeleton } from '@/features/schedule'
import { useReservationStore } from '@/entities/reservation'
import { Reservation } from '@/entities/reservation'
import { MeetingDetailsModal } from '@/entities/reservation'
import { MOCK_SCHEDULE_RESPONSE } from '@/shared/api'

export const RightPanel = () => {
    const { isLoading, selectedDate, selectedRoomId } = useReservationStore()
    const [selectedMeeting, setSelectedMeeting] = useState<Reservation | null>(null)

    const showSkeleton = isLoading || !selectedDate || !selectedRoomId

    const handleMeetingClick = (reservation: Reservation) => {
        setSelectedMeeting(reservation)
    }

    return (
        <>
            <ScheduleQueryForm />

            {showSkeleton ? (
                <RoomScheduleTimelineSkeleton />
            ) : (
                <RoomScheduleTimeline
                    reservations={MOCK_SCHEDULE_RESPONSE.reservations}
                    onMeetingClick={handleMeetingClick}
                />
            )}

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
