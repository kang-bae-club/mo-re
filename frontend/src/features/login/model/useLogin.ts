import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSessionStore } from '@/entities/session'
import { authApi } from '@/shared/api'

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const login = async (username?: string, password?: string) => {
        if (!username || !password) {
            alert('아이디와 비밀번호를 입력해주세요.')
            return
        }

        setIsLoading(true)
        try {
            const success = await authApi.login(username, password)
            if (success) {
                await useSessionStore.getState().fetchSession()
                navigate(from, { replace: true })
            } else {
                alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
            }
        } catch (error) {
            console.error('Login failed', error)
            alert('로그인 중 오류가 발생했습니다.')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        login,
        isLoading,
    }
}
