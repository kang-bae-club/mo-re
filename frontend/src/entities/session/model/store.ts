import { create } from 'zustand'
import { Member, Organization } from '@/entities/user'
import { MOCK_USER } from '@/shared/api'

interface SessionState {
    user: Member | null
    organization: Organization | null
    isLoading: boolean
    login: () => void
    logout: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
    user: {
        ...MOCK_USER,
    },
    organization: {
        id: 1,
        name: '강배 클럽',
        avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Org',
    },
    isLoading: false,
    login: () => {
        console.log('Login implemented in future')
    },
    logout: () => set({ user: null }),
}))
