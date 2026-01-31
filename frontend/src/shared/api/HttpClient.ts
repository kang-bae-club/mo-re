import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { tokenService } from '@/shared/lib'

export const UNAUTHORIZED_EVENT = 'unauthorized'

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
})

// 401 에러 발생 시 unauthorized event 발생
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
        }
        return Promise.reject(error)
    },
)

instance.interceptors.request.use(
    (config) => {
        const accessToken = tokenService.getAccessToken()
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error),
)

export const httpClient = {
    get: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.get<T>(url, config)
    },
    post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.post<T>(url, data, config)
    },
    put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.put<T>(url, data, config)
    },
    delete: <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.delete<T>(url, config)
    },
}
