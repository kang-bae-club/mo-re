import {
    MainLayout,
    Sidebar,
    RightPanel,
    DashboardStatusWidget,
    DashboardHeader,
    RoomListWidget,
    RecentMeetingListWidget,
} from '@/widgets'
import { useSessionStore } from '@/entities/session'
import { useEffect } from 'react'

export const HomePage = () => {
    const { fetchSession } = useSessionStore()

    useEffect(() => {
        fetchSession()
    }, [fetchSession])

    return (
        <MainLayout
            sidebar={<Sidebar />}
            content={
                <div>
                    <DashboardHeader
                        title="회의실 상태"
                        lastUpdated={new Date().toISOString()}
                    />
                    <DashboardStatusWidget />
                    <RoomListWidget />
                    <RecentMeetingListWidget />
                </div>
            }
            rightPanel={<RightPanel />}
        />
    )
}
