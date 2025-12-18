import { http, HttpResponse } from 'msw'
import { MOCK_ROOMS, RECENT_MEETINGS, MOCK_SCHEDULE_RESPONSE, MOCK_USER } from '@/shared/mocks'

// service worker가 http 요청을 가로채서 처리 
export const handlers = [
    // 1. GET /api/me
    http.get('/api/me', () => {
        return HttpResponse.json({
            user: MOCK_USER,
            organization: {
                id: 1,
                name: '강배 클럽',
                avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Org',
            },
        })
    }),

    // 2. GET /api/rooms
    http.get('/api/rooms', () => {
        return HttpResponse.json(MOCK_ROOMS)
    }),

    // 3. GET /api/rooms/:roomId
    // Query param: ?date=YYYY-MM-DD
    http.get('/api/rooms/:roomId', ({ params, request }) => {
        const { roomId } = params
        const url = new URL(request.url)
        const dateParam = url.searchParams.get('date') // YYYY-MM-DD

        const room = MOCK_ROOMS.find((r) => r.id === roomId)

        if (!room) {
            return new HttpResponse(null, { status: 404 })
        }

        // TODO: 현재 schedule response는 모든 날짜에 대한 모킹 데이터를 포함
        // 추후에는 query param에 해당하는 API 요청으로 클라이언트의 filter 제거

        let filteredReservations = MOCK_SCHEDULE_RESPONSE.reservations

        if (dateParam) {
            filteredReservations = MOCK_SCHEDULE_RESPONSE.reservations.filter(
                (res) => res.meetingDate === dateParam,
            )
        }

        return HttpResponse.json({
            room,
            reservations: filteredReservations,
        })
    }),

    // 4. GET /api/reservations/recent
    http.get('/api/reservations/recent', () => {
        return HttpResponse.json(RECENT_MEETINGS)
    }),
]
