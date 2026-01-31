export const ACCESS_TOKEN_KEY = 'accessToken'

export const tokenService = {
    getAccessToken: (): string | null => {
        return sessionStorage.getItem(ACCESS_TOKEN_KEY)
    },
    setAccessToken: (token: string): void => {
        sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
    },
    removeAccessToken: (): void => {
        sessionStorage.removeItem(ACCESS_TOKEN_KEY)
    },
}
