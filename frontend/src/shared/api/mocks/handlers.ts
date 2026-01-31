import { http, HttpResponse } from 'msw'
import { MOCK_ROOMS, RECENT_MEETINGS, MOCK_SCHEDULE_RESPONSE, MOCK_USER } from '@/shared/mocks'

const VALID_PASSWORD = 'password123!'

const createMockJwt = (userId: string) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const payload = btoa(
        JSON.stringify({
            sub: userId,
            exp: Math.floor(Date.now() / 1000) + 60 * 60, // 1 hour
            iat: Math.floor(Date.now() / 1000),
        }),
    )
    const signature = btoa('mock-signature')
    return `${header}.${payload}.${signature}`
}

// service worker가 http 요청을 가로채서 처리 
export const handlers = [
    // 1. GET /api/me
    http.get('/api/me', ({ request }) => {
        const authHeader = request.headers.get('Authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new HttpResponse(null, { status: 401 })
        }

        return HttpResponse.json({
            user: MOCK_USER,
            organization: {
                id: 1,
                name: '강배 클럽',
                avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Org',
            },
        })
    }),

    // 0. POST /api/login
    http.post('/api/login', async ({ request }) => {
        try {
            const body = (await request.json()) as { username?: string; password?: string }
            const { username, password } = body

            console.log('Login Request:', { username })
            if (!MOCK_USER) {
                console.error('MOCK_USER is undefined!')
                return new HttpResponse(null, { status: 500 })
            }

            // 가상의 accessToken과 refreshToken 생성
            if (username === MOCK_USER.username && password === VALID_PASSWORD) {
                const accessToken = createMockJwt(MOCK_USER.memberId)
                const refreshToken = createMockJwt(MOCK_USER.memberId)

                return HttpResponse.json(
                    {
                        accessToken,
                    },
                    {
                        headers: {
                            'Set-Cookie': `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
                        },
                    },
                )
            }

            return new HttpResponse(null, { status: 401 })
        } catch (error) {
            console.error('Login Handler Error:', error)
            return new HttpResponse(null, { status: 500 })
        }
    }),

    // 0. POST /api/logout
    http.post('/api/logout', () => {
        return HttpResponse.json(
            { success: true },
            {
                headers: {
                    'Set-Cookie': 'refreshToken=; Path=/; Max-Age=0',
                },
            },
        )
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

    // 5. GET /api/organizations
    http.get('/api/organizations', () => {
        return HttpResponse.json([
            { id: 1, name: '강배 클럽', avatarUrl: '/logo/icon_eng_logo1.png' },
            { id: 2, name: '다른 조직', avatarUrl: '/logo/icon_eng_logo1.png' },
        ])
    }),
]
