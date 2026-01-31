import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSessionStore } from '@/entities/session'
import { authApi } from '@/shared/api'
import { tokenService } from '@/shared/lib'

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    // TODO: 아이디와 비밀번호 유효성 검사 - 공통 컴포넌트로 수정 예정
    const login = async (username?: string, password?: string) => {
        if (!username || !password) {
            alert('아이디와 비밀번호를 입력해주세요.')
            return
        }

        setIsLoading(true)
        try {
            const accessToken = await authApi.login(username, password)
            if (accessToken) {
                tokenService.setAccessToken(accessToken)
                // 로그인에 성공하면 전달받은 accessToken을 이용하여 사용자와 조직 정보를 요청
                await useSessionStore.getState().fetchSession()
                navigate(from, { replace: true })
            } else {
                alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
            }
        } catch (error) { // TODO: 5xx 에러 처리는 중앙화하여 처리 예정
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
