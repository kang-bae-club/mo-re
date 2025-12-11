import { create } from 'zustand'
import { Member, Organization } from '@/entities/user'


interface SessionState {
    user: Member | null
    organization: Organization | null
    isLoading: boolean
    login: () => void
    logout: () => void
    setSession: (user: Member, organization: Organization) => void
}

export const useSessionStore = create<SessionState>((set) => ({
    user: null,
    organization: null,
    isLoading: false,
    login: () => {
        console.log('Login implemented in future')
    },
    logout: () => set({ user: null }),
    setSession: (user, organization) => set({ user, organization }),
}))
