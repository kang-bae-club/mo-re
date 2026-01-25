import { useEffect } from 'react'
import { useOrganizationStore } from './store'

export const useOrganizationList = () => {
    const organizations = useOrganizationStore((state) => state.organizations)
    const isLoading = useOrganizationStore((state) => state.isLoading)
    const fetchOrganizations = useOrganizationStore((state) => state.fetchOrganizations)

    useEffect(() => {
        fetchOrganizations()
    }, [fetchOrganizations])

    return {
        organizations,
        isLoading,
    }
}
