import {
    MainLayout,
    Sidebar,
    RightPanel,
    StatusSection,
    DashboardHeader,
    RoomGrid,
    RecentMeetingsTable,
} from '@/widgets'
import { useRoomStore } from '@/entities/room'
import { useReservationStore } from '@/entities/reservation'

// DashboardContent removed

export const HomePage = () => {
    const { stats, rooms } = useRoomStore()
    const { recentMeetings } = useReservationStore()
    // In a real app we might fetch here:
    // useEffect(() => { useRoomStore.getState().calculateStats() }, [])

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
