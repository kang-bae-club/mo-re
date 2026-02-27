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

// TODO: 현재는 단순히 ok state만 체크, 추후에 응답 코드별 던지는 예외를 커스터마이징 (공통 에러 Http응답 정의)
export const authApi = {
    getUserSession: async (): Promise<AuthSessionResponse | null> => {
        try {
            const response = await httpClient.get<AuthSessionResponse>('/v1/users/me')
            return response.data
        } catch (error) {
            console.error('Auth API Error:', error)
            return null
        }
    },
    login: async (username?: string, password?: string): Promise<string | null> => {
        try {
            const response = await httpClient.post<{
                accessToken: string
            }>('/v1/users/login', { username, password })

            if (response.status === 200 && response.data.accessToken) {
                return response.data.accessToken
            }
            return null
        } catch {
            return null
        }
    },
    logout: async (): Promise<boolean> => {
        try {
            const response = await httpClient.post('/v1/users/logout')
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
