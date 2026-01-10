import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from '@/App'
import { initSessionListener } from '@/entities/session'

initSessionListener()

async function enableMocking() {
    if (!import.meta.env.DEV) {
        return
    }

    const { worker } = await import('@/shared/api/mocks/browser')
    // `worker.start()`는 서비스 워커가 실행되어 요청을 가로챌 준비가 되면 handler에 정의된 로직을 실행
    return worker.start()
}

enableMocking().then(() => {
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StrictMode>,
    )
})
