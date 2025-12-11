import { Reservation, ScheduleSlot, ScheduleAPIResponse, RESERVATION_STATUS } from '@/entities/reservation'
import { MOCK_USER } from './user'

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
        startTime: getRelativeDate(30),
        endTime: getRelativeDate(0),
        meetingDate: getRelativeDate(30).split('T')[0],
        agenda: '2024년 4분기 로드맵 점검',
        status: RESERVATION_STATUS.DONE,
        attendees: [MOCK_USER, MOCK_USER],
    },
    {
        id: 'm2',
        roomName: '회의실 1번',
        organizer: MOCK_USER,
        title: '디자인 시스템 싱크',
        startTime: getRelativeDate(60),
        endTime: getRelativeDate(30),
        meetingDate: getRelativeDate(60).split('T')[0],
        status: RESERVATION_STATUS.DONE,
        attendees: [MOCK_USER],
    },
    {
        id: 'm3',
        roomName: '회의실 1번',
        organizer: MOCK_USER,
        title: 'Backend API 리팩토링 논의',
        startTime: getRelativeDate(120),
        endTime: getRelativeDate(90),
        meetingDate: getRelativeDate(120).split('T')[0],
        status: RESERVATION_STATUS.DONE,
        attendees: [MOCK_USER, MOCK_USER],
    },
    {
        id: 'm4',
        roomName: '회의실 1번',
        organizer: MOCK_USER,
        title: '주간 업무 보고',
        startTime: getRelativeDate(24 * 60),
        endTime: getRelativeDate(24 * 60 - 30),
        meetingDate: getRelativeDate(24 * 60).split('T')[0],
        status: RESERVATION_STATUS.DONE,
        attendees: [MOCK_USER],
    },
    {
        id: 'm5',
        roomName: '회의실 1번',
        organizer: MOCK_USER,
        title: '스프린트 회고',
        startTime: getRelativeDate(2 * 24 * 60),
        endTime: getRelativeDate(2 * 24 * 60 - 60),
        meetingDate: getRelativeDate(2 * 24 * 60).split('T')[0],
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

export const MOCK_SCHEDULE_RESPONSE: ScheduleAPIResponse = {
    roomId: '1',
    reservations: [
        {
            id: 'res_today_1',
            roomName: '대회의실 A',
            organizer: MOCK_USER,
            title: '오전 스크럼',
            startTime: getRelativeDate(240),
            endTime: getRelativeDate(210),
            meetingDate: NOW.toISOString().split('T')[0],
            status: RESERVATION_STATUS.DONE,
            attendees: [MOCK_USER, MOCK_USER],
            agenda: '일일 업무 공유',
        },
        {
            id: 'res_today_2',
            roomName: '대회의실 A',
            organizer: MOCK_USER,
            title: '점심 회식',
            startTime: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), 14, 0).toISOString(),
            endTime: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), 15, 0).toISOString(),
            meetingDate: NOW.toISOString().split('T')[0],
            status: RESERVATION_STATUS.RESERVED,
            attendees: [MOCK_USER],
            agenda: '맛집 탐방',
        },
        {
            id: 'res_tmr_1',
            roomName: '대회의실 A',
            organizer: MOCK_USER,
            title: '주간 기획 회의',
            startTime: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + 1, 10, 0).toISOString(),
            endTime: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + 1, 11, 30).toISOString(),
            meetingDate: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() + 1).toISOString().split('T')[0],
            status: RESERVATION_STATUS.RESERVED,
            attendees: [MOCK_USER, MOCK_USER],
            agenda: '기획서 리뷰',
        },
        {
            id: 'res_yst_1',
            roomName: '대회의실 A',
            organizer: MOCK_USER,
            title: '지난 회의',
            startTime: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - 1, 15, 0).toISOString(),
            endTime: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - 1, 16, 0).toISOString(),
            meetingDate: new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate() - 1).toISOString().split('T')[0],
            status: RESERVATION_STATUS.DONE,
            attendees: [MOCK_USER],
        },
    ],
}
