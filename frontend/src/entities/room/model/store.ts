import { create } from 'zustand'
import { DashboardStats } from '@/shared/model'
import { Room, ROOM_STATUS } from '@/entities/room'
import { Reservation } from '@/entities/reservation'
import { roomApi } from '@/shared/api'


interface RoomState {
    rooms: Room[]
    stats: DashboardStats
    selectedRoom: Room | null
    selectedDate: string | null
    roomReservations: Reservation[]
    isLoading: boolean
    fetchRooms: () => Promise<void>
    fetchRoom: (roomId: string, date?: string) => Promise<void>
    updateRoomStatus: (roomId: string, status: Room['status']) => void
    calculateStats: () => void
}

export const useRoomStore = create<RoomState>((set, get) => ({
    rooms: [],
    stats: {
        totalRooms: 0,
        availableRooms: 0,
        inUseRooms: 0,
    },
    selectedRoom: null,
    selectedDate: new Date().toISOString().split('T')[0],
    roomReservations: [],
    isLoading: false,
    fetchRooms: async () => {
        set({ isLoading: true })
        try {
            const rooms = await roomApi.getRooms()
            set({ rooms })
            get().calculateStats()
        } catch (error) {
            console.error('Failed to fetch rooms:', error)
        } finally {
            set({ isLoading: false })
        }
    },
    fetchRoom: async (roomId, date) => {
        const targetDate = date || get().selectedDate || new Date().toISOString().split('T')[0]

        set({ isLoading: true, selectedRoom: null, roomReservations: [], selectedDate: targetDate })
        try {
            const response = await roomApi.getRoomDetail(roomId, targetDate)
            if (response) {
                set({
                    selectedRoom: response.room,
                    roomReservations: response.reservations,
                })
            }
        } catch (error) {
            console.error('Failed to fetch room:', error)
        } finally {
            set({ isLoading: false })
        }
    },
    updateRoomStatus: (roomId, status) => {
        set((state) => ({
            rooms: state.rooms.map((room) =>
                room.id === roomId ? { ...room, status } : room,
            ),
        }))
        get().calculateStats()
    },
    calculateStats: () => {
        set((state) => {
            const totalRooms = state.rooms.length
            const availableRooms = state.rooms.filter(
                (r) => r.status === ROOM_STATUS.AVAILABLE,
            ).length
            const inUseRooms = state.rooms.filter(
                (r) => r.status === ROOM_STATUS.IN_USE,
            ).length
            return {
                stats: {
                    totalRooms,
                    availableRooms,
                    inUseRooms,
                },
            }
        })
    },
}))
