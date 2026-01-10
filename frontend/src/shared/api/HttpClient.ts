import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const UNAUTHORIZED_EVENT = 'unauthorized'

const instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
        }
        return Promise.reject(error)
    }
)

export const httpClient = {
    get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.get<T>(url, config)
    },
    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.post<T>(url, data, config)
    },
    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.put<T>(url, data, config)
    },
    delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
        return instance.delete<T>(url, config)
    },
}
