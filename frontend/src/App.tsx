import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/ui/Page'
import { RoomDetailPage } from './pages/room/RoomDetailPage'

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:roomId" element={<RoomDetailPage />} />
            </Routes>
        </>
    )
}

export default App
