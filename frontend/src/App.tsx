import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/ui/Page'
import { RoomDetailPage } from './pages/room/RoomDetailPage'
import { MockInitializer } from './app/MockInitializer'

const App = () => {
    return (
        <>
            <MockInitializer />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:roomId" element={<RoomDetailPage />} />
            </Routes>
        </>
    )
}

export default App
