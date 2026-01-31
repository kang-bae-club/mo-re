import { create } from 'zustand'

import { Member, Organization } from '@/entities/user'
import { useRoomStore } from '@/entities/room'
import { useReservationStore } from '@/entities/reservation'
import { authApi } from '@/shared/api'
import { tokenService } from '@/shared/lib'


interface SessionState {
    user: Member | null
    organization: Organization | null
    isLoading: boolean
    isInitialized: boolean
    setSession: (user: Member, organization: Organization) => void
    clearSession: () => void
    fetchSession: () => Promise<void>
    // TODO: organization switch 시에 영향을 받는 reservation, room과 같은 store를 같은 생명주기로 관리
    switchOrganization: (organization: Organization) => void
}

export const useSessionStore = create<SessionState>((set) => ({
    user: null,
    organization: null,
    isLoading: false,
    isInitialized: false,
    setSession: (user, organization) => set({ user, organization }),
    clearSession: () => {
        tokenService.removeAccessToken()
        set({ user: null, organization: null })
    },
    switchOrganization: (organization) => {
        set({ organization })

        useRoomStore.setState({
            selectedRoom: null,
            roomReservations: [],
        })
        useRoomStore.getState().fetchRooms()

        useReservationStore.setState({
            selectedRoomId: null,
            upcomingSchedules: [],
        })
        useReservationStore.getState().fetchRecentMeetings()
    },
    fetchSession: async () => {
        set({ isLoading: true })
        try {
            const session = await authApi.getUserSession()
            if (session) {
                set({ user: session.user, organization: session.organization })
            }
        } catch (error) {
            console.error('Failed to fetch session:', error)
        } finally {
            set({ isLoading: false, isInitialized: true })
        }
    },
}))


