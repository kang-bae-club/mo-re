import { useSessionStore } from '@/entities/session'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/shared/ui'

interface LoginButtonProps {
    username?: string
    password?: string
}

export const LoginButton = ({ username, password }: LoginButtonProps) => {
    const { login } = useSessionStore()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async () => {
        if (!username || !password) {
            alert('아이디와 비밀번호를 입력해주세요.')
            return
        }

        setIsLoading(true)
        try {
            const success = await login(username, password)
            if (success) {
                navigate(from, { replace: true })
            } else {
                alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.')
            }
        } catch (error) {
            console.error('Login failed')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            type="submit"
            className="w-full"
            onClick={(e) => {
                e.preventDefault()
                handleLogin()
            }}
            disabled={isLoading}
        >
            {isLoading ? '로그인 중...' : '로그인'}
        </Button>
    )
}
