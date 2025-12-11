import { useEffect } from 'react'
import { useRoomStore } from '@/entities/room'
import { useSessionStore } from '@/entities/session'
import { useReservationStore } from '@/entities/reservation'
import {
    MOCK_ROOMS,
    MOCK_USER,
    RECENT_MEETINGS,
    UPCOMING_SCHEDULE,
} from '@/shared/mocks'

export function MockInitializer() {
    const setRooms = useRoomStore((state) => state.setRooms)
    const setSession = useSessionStore((state) => state.setSession)
    const setInitialReservations = useReservationStore((state) => state.setInitialData)

    useEffect(() => {
        console.log('📦 Initializing Mock Data...')

        setRooms(MOCK_ROOMS)

        const mockOrg = {
            id: 1,
            name: '강배 클럽',
            avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Org',
        }
        setSession(MOCK_USER, mockOrg)

        setInitialReservations(RECENT_MEETINGS, UPCOMING_SCHEDULE)

        console.log('✅ Mock Data Injected')
    }, [])

    return null
}
