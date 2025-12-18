import { create } from 'zustand'
import { Reservation, ScheduleSlot } from '@/entities/reservation'
import { reservationApi } from '@/shared/api'

interface ReservationState {
    recentMeetings: Reservation[]
    upcomingSchedules: ScheduleSlot[]
    isLoading: boolean
    selectedDate: Date
    selectedRoomId: string | null

    // 아래는 fetch 로직을 래핑한 액션들
    fetchRecentMeetings: () => Promise<void>
    selectDate: (date: Date) => void
    selectRoom: (roomId: string) => void
    fetchSchedules: () => Promise<void>
}

export const useReservationStore = create<ReservationState>((set, get) => ({
    recentMeetings: [],
    upcomingSchedules: [],
    isLoading: false,
    selectedDate: new Date(),
    selectedRoomId: null,

    fetchRecentMeetings: async () => {
        set({ isLoading: true })
        try {
            const meetings = await reservationApi.getRecentMeetings()
            set({ recentMeetings: meetings })
        } catch (error) {
            console.error('Failed to fetch recent meetings:', error)
        } finally {
            set({ isLoading: false })
        }
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

        // TODO: 추후 로깅 모듈로 관심사 분리
        console.log(`Fetching schedules for Room: ${selectedRoomId} on ${selectedDate.toISOString()}`)

        await new Promise((resolve) => setTimeout(resolve, 300))

        set({
            isLoading: false,
        })
    },
}))
