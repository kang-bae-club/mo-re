import { MainButton } from '@/components/ui/main-button'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card'

export const Login = () => {
    const handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-background"
        >
            <Card className="max-w-md border-0 shadow-none">
                <CardHeader className="flex justify-center items-center p-0">
                    <img src="/logo/icon_eng_logo1.png" alt="logo" className="w-[200px] h-[200px]"></img>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handle_submit} className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                id="email"
                                type="email"
                                placeholder="example@email.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="password"
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                            />
                        </div>
                        <MainButton type="submit" className="w-full">
                            로그인
                        </MainButton>
                        <button
                            type="button"
                            className="w-full bg-transparent text-[10px] text-gray-600"
                        >회원가입</button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

