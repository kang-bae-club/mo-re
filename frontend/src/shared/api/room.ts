import { Room } from '@/entities/room'
import { Reservation } from '@/entities/reservation'
import { httpClient } from './HttpClient'
import { isAxiosError } from 'axios'

export interface RoomDetailResponse {
    room: Room
    reservations: Reservation[]
}

export const roomApi = {
    getRooms: async (): Promise<Room[]> => {
        try {
            const response = await httpClient.get<Room[]>('/api/rooms')
            return response.data
        } catch (error) {
            console.error('API Error:', error)
            return []
        }
    },
    getRoomDetail: async (roomId: string, originDate: string): Promise<RoomDetailResponse | null> => {
        try {
            const response = await httpClient.get<RoomDetailResponse>(`/api/rooms/${roomId}?date=${originDate}`)
            return response.data
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 404) {
                return null
            }
            console.error('API Error:', error)
            return null
        }
    },
}
