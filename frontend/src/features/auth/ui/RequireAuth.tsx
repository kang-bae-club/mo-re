import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useSessionStore } from '@/entities/session'
import { useEffect, ReactNode } from 'react'

/**  리액트 컴포넌트는 다른 컴포넌트를 내부에 품을 수 있다. 
 *  RequireAuth 내부에 있는 컴포넌트들을 children으로 받고 세션이 없으면 로그인 페이지를, 세션이 존재하면 children으로 받은 내부 컴포넌트를 출력함
 * */
export const RequireAuth = ({ children }: { children?: ReactNode }) => {
    const { user, isInitialized, isLoading, fetchSession } = useSessionStore()
    const location = useLocation()

    useEffect(() => {
        if (!isInitialized && !isLoading) {
            fetchSession()
        }
    }, [isInitialized, isLoading, fetchSession])

    if (!isInitialized || (isLoading && !user)) {
        return null
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children || <Outlet />
}
