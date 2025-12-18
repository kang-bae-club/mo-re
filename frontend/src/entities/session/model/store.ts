import { create } from 'zustand'
import { Member, Organization } from '@/entities/user'
import { authApi } from '@/shared/api'


interface SessionState {
    user: Member | null
    organization: Organization | null
    isLoading: boolean
    login: () => void
    logout: () => void
    fetchSession: () => Promise<void>
}

export const useSessionStore = create<SessionState>((set) => ({
    user: null,
    organization: null,
    isLoading: false,
    login: () => {
        console.log('Login implemented in future')
    },
    logout: () => set({ user: null }),
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
            set({ isLoading: false })
        }
    },
}))
