import { create } from 'zustand'
import { Reservation, ScheduleSlot } from '@/entities/reservation'

interface ReservationState {
    recentMeetings: Reservation[]
    upcomingSchedules: ScheduleSlot[]
    isLoading: boolean
    selectedDate: Date
    selectedRoomId: string | null
    fetchReservations: () => Promise<void>

    selectDate: (date: Date) => void
    selectRoom: (roomId: string) => void
    fetchSchedules: () => Promise<void>
    setInitialData: (reservations: Reservation[], schedules: ScheduleSlot[]) => void
}

export const useReservationStore = create<ReservationState>((set, get) => ({
    recentMeetings: [],
    upcomingSchedules: [],
    isLoading: false,
    selectedDate: new Date(),
    selectedRoomId: null,

    fetchReservations: async () => {
        set({ isLoading: true })
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        set({
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

        await new Promise((resolve) => setTimeout(resolve, 300))

        set({
            // upcomingSchedules will be updated via setInitialData or real API later
            isLoading: false,
        })
    },
    setInitialData: (reservations: Reservation[], schedules: ScheduleSlot[]) => {
        set({
            recentMeetings: reservations,
            upcomingSchedules: schedules,
        })
    },
}))
