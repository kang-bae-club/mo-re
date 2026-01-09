import { useEffect, useMemo } from 'react'
import { useReservationStore } from '@/entities/reservation'

export const useRecentMeetings = () => {
    const { recentMeetings, fetchRecentMeetings, isLoading } = useReservationStore()

    useEffect(() => {
        fetchRecentMeetings()
    }, [fetchRecentMeetings])

    // 최신순(시작 시간 내림차순) 정렬
    const sortedMeetings = useMemo(() => {
        return [...recentMeetings].sort((a, b) => 
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        )
    }, [recentMeetings])

    return { 
        meetings: sortedMeetings, 
        isLoading 
    }
}
