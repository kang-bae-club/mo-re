import { create } from 'zustand'
import { Member, Organization } from '@/entities/user'
import { authApi } from '@/shared/api'


interface SessionState {
    user: Member | null
    organization: Organization | null
    isLoading: boolean
    isInitialized: boolean
    login: (username?: string, password?: string) => Promise<boolean>
    logout: () => Promise<void>
    fetchSession: () => Promise<void>
}

export const useSessionStore = create<SessionState>((set, get) => ({
    user: null,
    organization: null,
    isLoading: false,
    isInitialized: false,
    login: async (username, password) => {
        const success = await authApi.login(username, password)
        if (success) {
            await get().fetchSession()
        }
        return success
    },
    logout: async () => {
        await authApi.logout()
        set({ user: null })
    },
    fetchSession: async () => {
        set({ isLoading: true })
        try {
            const session = await authApi.getUserSession()
            if (session) {
                set({ user: session.user, organization: session.organization })
            }
        } catch (error) {
            console.error('Failed to fetch session:', error)
        } finally {
            set({ isLoading: false, isInitialized: true })
        }
    },
}))
