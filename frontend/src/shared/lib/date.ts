export const formatDateTime = (isoString?: string | Date): string => {
    if (!isoString) return ''

    const date = typeof isoString === 'string' ? new Date(isoString) : isoString

    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    })
}

export const getTodayString = () => {
    return new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export const formatRelativeTime = (isoString: string): string => {
    if (!isoString) return ''
    const date = new Date(isoString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    // Future (negative diff)
    const isFuture = diff < 0
    const absDiff = Math.abs(diff)

    const diffMin = Math.floor(absDiff / (1000 * 60))
    const diffHour = Math.floor(absDiff / (1000 * 60 * 60))
    const diffDay = Math.floor(absDiff / (1000 * 60 * 60 * 24))

    const suffix = isFuture ? '후' : '전'

    if (diffMin < 1) {
        return isFuture ? '잠시 후' : '방금 전'
    }

    if (diffMin < 60) return `${diffMin}분 ${suffix}`
    if (diffHour < 24) return `${diffHour}시간 ${suffix}`
    return `${diffDay}일 ${suffix}`
}
