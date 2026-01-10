import { authApi } from '@/shared/api'
import { useSessionStore } from '../model/store'

// 401 에러가 발생했을 때 이를 감지하고 처리
export const initSessionListener = () => {
    if (typeof window !== 'undefined') {
        window.addEventListener('unauthorized', () => {
            authApi.logout().then(() => {
                useSessionStore.getState().clearSession()
            })
        })
    }
}
