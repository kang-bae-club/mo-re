import { Room } from '@/entities/room'
import { Reservation } from '@/entities/reservation'

export interface RoomDetailResponse {
    room: Room
    reservations: Reservation[]
}

export const roomApi = {
    getRooms: async (): Promise<Room[]> => {
        try {
            const response = await fetch('/api/rooms')
            if (!response.ok) throw new Error('Failed to fetch rooms')
            return await response.json()
        } catch (error) {
            console.error('API Error:', error)
            return []
        }
    },
    getRoomDetail: async (roomId: string, originDate: string): Promise<RoomDetailResponse | null> => {
        try {
            const response = await fetch(`/api/rooms/${roomId}?date=${originDate}`)

            if (!response.ok) {
                if (response.status === 404) return null
                throw new Error('Failed to fetch room detail')
            }

            return await response.json()
        } catch (error) {
            console.error('API Error:', error)
            return null
        }
    },
}
