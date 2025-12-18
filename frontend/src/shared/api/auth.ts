import { Member } from '@/entities/user'

interface Organization {
    id: number
    name: string
    avatarUrl: string
}

export interface AuthSessionResponse {
    user: Member
    organization: Organization
}

export const authApi = {
    getUserSession: async (): Promise<AuthSessionResponse | null> => {
        try {
            const response = await fetch('/api/me')
            if (!response.ok) throw new Error('Failed to fetch session')
            return await response.json()
        } catch (error) {
            console.error('Auth API Error:', error)
            return null
        }
    },
}
