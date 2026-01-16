import { create } from 'zustand'
import { Organization } from '@/entities/user'
import { authApi } from '@/shared/api'

interface OrganizationState {
    organizations: Organization[]
    isLoading: boolean
    fetchOrganizations: () => Promise<void>
}

export const useOrganizationStore = create<OrganizationState>((set) => ({
    organizations: [],
    isLoading: false,
    fetchOrganizations: async () => {
        set({ isLoading: true })
        try {
            const organizations = await authApi.getOrganizationList()
            set({ organizations })
        } catch (error) {
            console.error('Failed to fetch organization list:', error)
        } finally {
            set({ isLoading: false })
        }
    },
}))
