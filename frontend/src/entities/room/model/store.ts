import { create } from 'zustand'
import { DashboardStats } from '@/shared/model'
import { Room, ROOM_STATUS } from '@/entities/room'
import { MOCK_ROOMS, MOCK_STATS } from '@/shared/api'

interface RoomState {
    rooms: Room[]
    stats: DashboardStats
    setRooms: (rooms: Room[]) => void
    updateRoomStatus: (roomId: string, status: Room['status']) => void
    calculateStats: () => void
}

export const useRoomStore = create<RoomState>((set, get) => ({
    rooms: MOCK_ROOMS,
    stats: MOCK_STATS,
    setRooms: (rooms) => {
        set({ rooms })
        get().calculateStats()
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
