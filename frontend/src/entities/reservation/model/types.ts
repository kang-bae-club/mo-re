import { Member } from '@/entities/user'

export interface Reservation {
    id: string
    roomName: string
    organizer: Member
    title: string
    startTime: string
    endTime: string
    meetingDate: string

    agenda?: string
    notification?: string
    status: RESERVATION_STATUS
    attendees: Member[]
    minutesId?: string
}

export enum RESERVATION_STATUS {
    PENDING = 'PENDING',
    RESERVED = 'RESERVED',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export interface ScheduleEvent {
    type: string
    title: string
    organizer: Member
    duration: string
}

export interface ScheduleSlot {
    time: string
    event: ScheduleEvent | null
}

export interface ScheduleAPIResponse {
    roomId: string
    reservations: Reservation[]
}
