
import { ROOM_FILTER, ROOM_STATUS, Room } from '@/entities/room'


export const FILTER_CONFIG = {
    [ROOM_FILTER.TOTAL]: {
        label: '전체 회의실',
        color: 'bg-blue-50 text-blue-600',
        filter: () => true,
        modalTitle: '전체 회의실',
    },
    [ROOM_FILTER.AVAILABLE]: {
        label: '사용 가능',
        color: 'bg-green-50 text-green-600',
        filter: (room: Room) => room.status === ROOM_STATUS.AVAILABLE,
        modalTitle: '사용 가능한 회의실',
    },
    [ROOM_FILTER.IN_USE]: {
        label: '사용 중',
        color: 'bg-red-50 text-red-600',
        filter: (room: Room) => room.status === ROOM_STATUS.IN_USE,
        modalTitle: '사용 중인 회의실',
    },
} as const

export const STATUS_UI_CONFIG = {
    [ROOM_STATUS.AVAILABLE]: {
        label: '사용 가능',
        badge: 'bg-green-100 text-green-700',
        border: 'border-green-200 hover:border-green-400',
    },
    [ROOM_STATUS.IN_USE]: {
        label: '사용 중',
        badge: 'bg-red-100 text-red-700',
        border: 'border-red-200 hover:border-red-400',
    },
    [ROOM_STATUS.UNAVAILABLE]: {
        label: '사용 불가',
        badge: 'bg-gray-100 text-gray-500',
        border: 'border-gray-200 opacity-60',
    },
} as const
