import { create } from 'zustand'

interface TokenState {
    accessToken: string | null
    setAccessToken: (token: string) => void
    removeAccessToken: () => void
}

export const useTokenStore = create<TokenState>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    removeAccessToken: () => set({ accessToken: null }),
}))
