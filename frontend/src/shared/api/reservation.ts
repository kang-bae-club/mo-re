import { Reservation } from '@/entities/reservation'

export const reservationApi = {
    getRecentMeetings: async (): Promise<Reservation[]> => {
        try {
            const response = await fetch('/api/reservations/recent')
            if (!response.ok) throw new Error('Failed to fetch recent meetings')
            return await response.json()
        } catch (error) {
            console.error('Reservation API Error:', error)
            return []
        }
    },
}
