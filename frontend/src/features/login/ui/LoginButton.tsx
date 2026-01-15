import { useLogin } from '../model'
import { Button } from '@/shared/ui'

interface LoginButtonProps {
    username?: string
    password?: string
}

export const LoginButton = ({ username, password }: LoginButtonProps) => {
    const { login, isLoading } = useLogin()

    const handleLogin = () => {
        login(username, password)
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
