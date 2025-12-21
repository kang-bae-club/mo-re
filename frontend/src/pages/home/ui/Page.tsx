import {
    MainLayout,
    Sidebar,
    RightPanel,
    StatusSection,
    DashboardHeader,
    RoomGrid,
    RecentMeetingsTable,
} from '@/widgets'
import { useEffect } from 'react'
import { useRoomStore } from '@/entities/room'
import { useReservationStore } from '@/entities/reservation'
import { useSessionStore } from '@/entities/session'

export const HomePage = () => {
    const { stats, rooms, fetchRooms } = useRoomStore()
    const { recentMeetings, fetchRecentMeetings } = useReservationStore()
    const { fetchSession } = useSessionStore()

    useEffect(() => {
        fetchSession()
        fetchRooms()
        fetchRecentMeetings()
    }, [fetchSession, fetchRooms, fetchRecentMeetings])

    return (
        <MainLayout
            sidebar={<Sidebar />}
            content={
                <div>
                    <DashboardHeader
                        title="회의실 상태"
                        lastUpdated={new Date().toISOString()}
                    />
                    <StatusSection stats={stats} />
                    <RoomGrid rooms={rooms} />
                    <RecentMeetingsTable
                        meetings={recentMeetings}
                    />
                </div>
            }
            rightPanel={<RightPanel />}
        />
    )
}
