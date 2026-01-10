import { Button, Input, Card, CardContent, CardHeader } from '@/shared/ui'
import { LoginButton } from '@/features/login'
import { useState } from 'react'

export const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Card className="max-w-md border-0 shadow-none">
            <CardHeader className="flex justify-center items-center p-0">
                <img src="/logo/icon_eng_logo1.png" alt="logo" className="w-[200px] h-[200px]"></img>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            id="username"
                            type="text"
                            placeholder="아이디를 입력하세요"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Input
                            id="password"
                            type="password"
                            placeholder="비밀번호를 입력하세요"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <LoginButton username={username} password={password} />
                    <Button variant="link" size="sm" type="button" className='w-full text-xs text-muted-foreground'>회원가입</Button>
                </form>
            </CardContent>
        </Card>
    )
}
