export const ROOM_STATUS = {
    AVAILABLE: 'AVAILABLE',
    IN_USE: 'IN_USE',
    UNAVAILABLE: 'UNAVAILABLE',
} as const

export type RoomStatus = (typeof ROOM_STATUS)[keyof typeof ROOM_STATUS]

export interface Room {
    id: string
    name: string
    capacity: number
    location: string
    features: string[]
    status: RoomStatus
}

export const ROOM_FILTER = {
    TOTAL: 'total',
    AVAILABLE: 'available',
    IN_USE: 'inUse',
} as const

export type RoomFilterType = (typeof ROOM_FILTER)[keyof typeof ROOM_FILTER]
