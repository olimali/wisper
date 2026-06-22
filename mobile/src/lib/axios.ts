import { useAuth } from '@clerk/expo'
import axios from 'axios'
import { useCallback } from 'react'

const API_URL = "https://wisper-vkzp.onrender.com/api"

const api = axios.create({
    baseURL: API_URL
})

export const useApi = () => {
    const { getToken } = useAuth();

    const apiWithAuth = useCallback(
        async <T>(config: Parameters<typeof api.request>[0]) => {
            const token = await getToken();
            return api.request<T>({
                ...config,
                headers: { ...config.headers, ...(token && { Authorization: `Bearer ${token}` }) },
            });
        },
        [getToken]
    );

    return { api, apiWithAuth };
};