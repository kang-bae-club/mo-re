import { Room, ROOM_STATUS } from '@/entities/room'

export const MOCK_ROOMS: Room[] = [
    {
        id: '1',
        name: '대회의실 A',
        capacity: 20,
        location: '11층 East',
        features: ['화상회의', '대형모니터', '화이트보드'],
        status: ROOM_STATUS.AVAILABLE,
    },
    {
        id: '2',
        name: '집중 회의실',
        capacity: 6,
        location: '11층 West',
        features: ['방음', '모니터'],
        status: ROOM_STATUS.IN_USE,
    },
    {
        id: '3',
        name: '크리에이티브 룸',
        capacity: 10,
        location: '12층 Center',
        features: ['빈백', '스마트보드', '간식'],
        status: ROOM_STATUS.UNAVAILABLE,
    },
]
