import { create } from 'zustand'
import { Reservation, ScheduleSlot } from '@/entities/reservation'
import { RECENT_MEETINGS, UPCOMING_SCHEDULE } from '@/shared/api'

interface ReservationState {
    recentMeetings: Reservation[]
    upcomingSchedules: ScheduleSlot[]
    isLoading: boolean
    selectedDate: Date
    selectedRoomId: string | null
    fetchReservations: () => Promise<void>

    // New Actions
    selectDate: (date: Date) => void
    selectRoom: (roomId: string) => void
    fetchSchedules: () => Promise<void>
}

export const useReservationStore = create<ReservationState>((set, get) => ({
    recentMeetings: RECENT_MEETINGS,
    upcomingSchedules: UPCOMING_SCHEDULE,
    isLoading: false,
    selectedDate: new Date(),
    selectedRoomId: null,

    fetchReservations: async () => {
        set({ isLoading: true })
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        set({
            recentMeetings: RECENT_MEETINGS,
            upcomingSchedules: UPCOMING_SCHEDULE,
            isLoading: false,
        })
    },

    selectDate: (date: Date) => {
        set({ selectedDate: date })
        get().fetchSchedules()
    },
    selectRoom: (roomId: string) => {
        set({ selectedRoomId: roomId })
        get().fetchSchedules()
    },
    fetchSchedules: async () => {
        const { selectedDate, selectedRoomId } = get()
        if (!selectedRoomId) return

        set({ isLoading: true })
        console.log(`Fetching schedules for Room: ${selectedRoomId} on ${selectedDate.toISOString()}`)

        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 300))

        // For now, return static data, but this proves the flow
        set({
            upcomingSchedules: UPCOMING_SCHEDULE,
            isLoading: false,
        })
    },
}))
