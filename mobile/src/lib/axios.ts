import { useAuth } from '@clerk/expo'
import axios from 'axios'
import { useEffect } from 'react'

const API_URL = "https://wisper-vkzp.onrender.com/api"

const api = axios.create({
    baseURL: API_URL
})

export const useApi = () => {
    const { getToken } = useAuth()


    useEffect(() => {
        const requestIntersepter = api.interceptors.request.use(async (config) => {
            const token = await getToken()

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        })

        return () => { api.interceptors.request.eject(requestIntersepter) };
    }, [getToken])

    return api
}