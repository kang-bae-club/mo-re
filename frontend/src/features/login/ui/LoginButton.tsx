import { useLogin } from '../model'
import { Button } from '@/shared/ui'
import { useNavigate, useLocation } from 'react-router-dom'

interface LoginButtonProps {
    username?: string
    password?: string
}

export const LoginButton = ({ username, password }: LoginButtonProps) => {
    const { login, isLoading } = useLogin()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleLogin = async () => {
        const { success, errorMessage } = await login(username, password)
        if (success) {
            navigate(from, { replace: true })
        } else if (errorMessage) {
            alert(errorMessage)
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
