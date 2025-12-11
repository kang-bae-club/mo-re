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

        // 일시적으로 모킹을 위해서 사용. 추후에는 {roomId, originDate} 데이터를 통해 API 호출 예정
        const filteredReservations = MOCK_SCHEDULE_RESPONSE.reservations.filter(
            (res) => res.meetingDate === originDate
        )

        return {
            room,
            reservations: filteredReservations,
        }
    },
}
