import { create } from 'zustand'
import { Member, Organization } from '@/entities/user'
import { authApi } from '@/shared/api'


interface SessionState {
    user: Member | null
    organization: Organization | null
    isLoading: boolean
    isInitialized: boolean
    setSession: (user: Member, organization: Organization) => void
    clearSession: () => void
    fetchSession: () => Promise<void>
}

export const useSessionStore = create<SessionState>((set) => ({
    user: null,
    organization: null,
    isLoading: false,
    isInitialized: false,
    setSession: (user, organization) => set({ user, organization }),
    clearSession: () => set({ user: null, organization: null }),
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


