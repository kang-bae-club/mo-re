import { DashboardData, DashboardStats } from '@/shared/model'
import { ROOM_STATUS } from '@/entities/room'
import { MOCK_ROOMS } from './room'
import { RECENT_MEETINGS, UPCOMING_SCHEDULE } from './reservation'

export const MOCK_STATS: DashboardStats = {
    totalRooms: MOCK_ROOMS.length,
    availableRooms: MOCK_ROOMS.filter((r) => r.status === ROOM_STATUS.AVAILABLE)
        .length,
    inUseRooms: MOCK_ROOMS.filter((r) => r.status === ROOM_STATUS.IN_USE)
        .length,
}

export const MOCK_DASHBOARD_DATA: DashboardData = {
    lastUpdated: new Date().toISOString(),
    stats: MOCK_STATS,
    rooms: MOCK_ROOMS,
    recentMeetings: RECENT_MEETINGS,
    upcomingSchedules: UPCOMING_SCHEDULE,
}
