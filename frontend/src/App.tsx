import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/ui/Page'
import { RoomDetailPage } from './pages/room/RoomDetailPage'
import { Login } from './pages/login/ui/Login'
import { RequireAuth } from '@/features/auth'

const App = () => {
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