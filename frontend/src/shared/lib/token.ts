// 메모리 상에 토큰을 저장 (새로고침 시 초기화됨에 주의)
let _accessToken: string | null = null

export const tokenService = {
    getAccessToken: (): string | null => {
        return _accessToken
    },
    setAccessToken: (token: string): void => {
        _accessToken = token
    },
    removeAccessToken: (): void => {
        _accessToken = null
    },
}
