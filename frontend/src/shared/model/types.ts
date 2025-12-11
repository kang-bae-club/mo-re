import { Room, RoomFilterType } from '@/entities/room'
import { Reservation, ScheduleSlot } from '@/entities/reservation'

export interface DashboardStats {
    totalRooms: number
    availableRooms: number
    inUseRooms: number
}

// StatsType is now alias for RoomFilterType
// for backward compatibility or replacement
export type StatsType = RoomFilterType

export interface DashboardData {
    lastUpdated: string
    stats: DashboardStats
    rooms: Room[]
    recentMeetings: Reservation[]
    upcomingSchedules: ScheduleSlot[] // Keeping for back-compat if needed, or remove later
}
