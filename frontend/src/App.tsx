import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/ui/Page'
import { RoomDetailPage } from './pages/room/RoomDetailPage'
import { Login } from './pages/login/ui/Login'
import { RequireAuth } from '@/features/auth'

import { useEffect } from 'react'
import { useSessionStore } from '@/entities/session'
import { UNAUTHORIZED_EVENT } from '@/shared/api/HttpClient'

const App = () => {
    const { logout } = useSessionStore()

    useEffect(() => {
        const handleUnauthorized = () => {
            logout()
        }

        window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized)
        return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized)
    }, [logout])

    return (
        <>
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/room/:roomId" element={<RoomDetailPage />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default App