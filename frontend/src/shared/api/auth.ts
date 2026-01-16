import { Member } from '@/entities/user'
import { httpClient } from './HttpClient'

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
            const response = await httpClient.get<AuthSessionResponse>('/api/me')
            return response.data
        } catch (error) {
            console.error('Auth API Error:', error)
            return null
        }
    },
    // TODO: 로그인 후 세션 및 유저 정보 저장
    login: async (username?: string, password?: string): Promise<boolean> => {
        try {
            const response = await httpClient.post('/api/login', { username, password })
            return response.status === 200
        } catch {
            return false
        }
    },
    logout: async (): Promise<boolean> => {
        try {
            const response = await httpClient.post('/api/logout')
            return response.status === 200
        } catch {
            return false
        }
    },
    getOrganizationList: async (): Promise<Organization[]> => {
        try {
            const response = await httpClient.get<Organization[]>('/api/organizations')
            return response.data
        } catch (error) {
            console.error('Fetch Org Error:', error)
            return []
        }
    },
}
