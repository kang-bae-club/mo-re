import { Reservation } from '@/entities/reservation'
import { httpClient } from './HttpClient'

export const reservationApi = {
    getRecentMeetings: async (): Promise<Reservation[]> => {
        try {
            const response = await httpClient.get<Reservation[]>('/api/reservations/recent')
            return response.data
        } catch (error) {
            console.error('Reservation API Error:', error)
            return []
        }
    },
}
