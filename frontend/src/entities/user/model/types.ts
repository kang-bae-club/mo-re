export interface Member {
    id: string
    name: string
    role: string
    team: string // e.g., "선영 사랑 운영팀", "개발팀"
    department: string // e.g. "Product Group"
    avatarUrl?: string // e.g. /profile.jpg
}

export interface Organization {
    id: number
    name: string // e.g., "강배 클럽"
    avatarUrl?: string
}
