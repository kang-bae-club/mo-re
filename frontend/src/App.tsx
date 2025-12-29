import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/ui/Page'
import { RoomDetailPage } from './pages/room/RoomDetailPage'
import { Login } from './components/Login'

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:roomId" element={<RoomDetailPage />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default App