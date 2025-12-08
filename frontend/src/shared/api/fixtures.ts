import { Member } from '@/entities/user/model/types'
import { Room, ROOM_STATUS } from '@/entities/room/model/types'
import { Reservation, ScheduleSlot, ScheduleAPIResponse, RESERVATION_STATUS } from '@/entities/reservation/model/types'
import { DashboardData, DashboardStats } from '@/shared/model'

export const MOCK_USER: Member = {
    id: 'user1',
    name: '강민준',
    role: '사원',
    department: 'Product Group',
    team: '선영 사랑 운영팀',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
}

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

export const MOCK_STATS: DashboardStats = {
    totalRooms: MOCK_ROOMS.length,
    availableRooms: MOCK_ROOMS.filter((r) => r.status === ROOM_STATUS.AVAILABLE)
        .length,
    inUseRooms: MOCK_ROOMS.filter((r) => r.status === ROOM_STATUS.IN_USE)
        .length,
}

const NOW = new Date()
const getRelativeDate = (minutesAgo: number) => {
    const d = new Date(NOW)
    d.setMinutes(d.getMinutes() - minutesAgo)
    return d.toISOString()
}

export const RECENT_MEETINGS: Reservation[] = [
    {
        id: 'm1',
        roomName: '회의실 1번',
        organizer: MOCK_USER,
        title: '2024년 4분기 로드맵 점검',
        startTime: getRelativeDate(30), // 30m ago start
        endTime: getRelativeDate(0), // Just ended
        agenda: '2024년 4분기 로드맵 점검',
        status: RESERVATION_STATUS.DONE,
        attendees: [MOCK_USER, MOCK_USER],
    },
    {
        id: 'm2',
        roomName: '회의실 1번',
        organizer: MOCK_USER,
        title: '디자인 시스템 싱크',
        startTime: getRelativeDate(60), // 1h ago
        endTime: getRelativeDate(30),
        status: RESERVATION_STATUS.DONE,
        attendees: [MOCK_USER],
    },
    {
        id: 'm3',
        roomName: '회의실 1번',
        organizer: MOCK_USER,
        title: 'Backend API 리팩토링 논의',
        startTime: getRelativeDate(120), // 2h ago
        endTime: getRelativeDate(90),
        status: RESERVATION_STATUS.DONE,
        attendees: [MOCK_USER, MOCK_USER],
    },
    {
        id: 'm4',
        roomName: '회의실 1번',
        organizer: MOCK_USER,
        title: '주간 업무 보고',
        startTime: getRelativeDate(24 * 60), // 1 day ago
        endTime: getRelativeDate(24 * 60 - 30),
        status: RESERVATION_STATUS.DONE,
        attendees: [MOCK_USER],
    },
    {
        id: 'm5',
        roomName: '회의실 1번',
        organizer: MOCK_USER,
        title: '스프린트 회고',
        startTime: getRelativeDate(2 * 24 * 60), // 2 days ago
        endTime: getRelativeDate(2 * 24 * 60 - 60),
        status: RESERVATION_STATUS.DONE,
        attendees: [MOCK_USER],
    },
]

export const UPCOMING_SCHEDULE: ScheduleSlot[] = [
    {
        time: '09:30',
        event: {
            type: 'meeting',
            title: '선영이와의 즐거운 회의',
            organizer: MOCK_USER,
            duration: '30min',
        },
    },
    { time: '11:00', event: null },
    {
        time: '12:00',
        event: {
            type: 'meeting',
            title: '선영이와의 즐거운 회의',
            organizer: MOCK_USER,
            duration: '1h',
        },
    },
]

export const MOCK_DASHBOARD_DATA: DashboardData = {
    lastUpdated: new Date().toISOString(),
    stats: MOCK_STATS,
    rooms: MOCK_ROOMS,
    recentMeetings: RECENT_MEETINGS,
    upcomingSchedules: UPCOMING_SCHEDULE,
}

export const MOCK_SCHEDULE_RESPONSE: ScheduleAPIResponse = {
    roomId: '1',
    reservations: [
        {
            id: 'res_1',
            roomName: '대회의실 A',
            organizer: MOCK_USER,
            title: '주간 기획 회의',
            startTime: getRelativeDate(30),
            endTime: getRelativeDate(-60),
            status: RESERVATION_STATUS.RESERVED,
            attendees: [MOCK_USER, MOCK_USER],
            agenda: '기획서 리뷰',
        },
        {
            id: 'res_2',
            roomName: '대회의실 A',
            organizer: MOCK_USER,
            title: '디자인 싱크',
            startTime: getRelativeDate(-120),
            endTime: getRelativeDate(-180),
            status: RESERVATION_STATUS.RESERVED,
            attendees: [MOCK_USER],
        },
    ],
}
