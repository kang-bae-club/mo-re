import { useEffect } from 'react'
import { useRoomStore } from '@/entities/room'

export const useRoomData = () => {
    const { rooms, stats, fetchRooms, isLoading } = useRoomStore()

    useEffect(() => {
        fetchRooms()
    }, [fetchRooms])

    return { rooms, stats, isLoading }
}
