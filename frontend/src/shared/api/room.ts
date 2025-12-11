import { Room } from '@/entities/room'
import { Reservation } from '@/entities/reservation'
import { MOCK_ROOMS, MOCK_SCHEDULE_RESPONSE } from '@/shared/mocks'

export interface RoomDetailResponse {
    room: Room
    reservations: Reservation[]
}

export const roomApi = {
    getRoomDetail: async (roomId: string, originDate: string): Promise<RoomDetailResponse | null> => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        const room = MOCK_ROOMS.find((r) => r.id === roomId)

        if (!room) return null

        return {
            room,
            reservations: MOCK_SCHEDULE_RESPONSE.reservations,
        }
    },
}
