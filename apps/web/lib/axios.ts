import axios, { type AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';

import { type AxiosCommonResponse } from '@/types';

import { getSession, updateSession } from './session';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export type ResponseType = AxiosCommonResponse<{
  user: {
    email: string;
    name: string;
    id: string;
  }
  accessToken: string;
  refreshToken: string;
}>


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// add request interceptor
instance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor
instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // If it's a 401 error and we haven't retried yet
    if (
      error.response?.status === 401 &&
      !(originalRequest as CustomAxiosRequestConfig)._retry
    ) {
      (originalRequest as CustomAxiosRequestConfig)._retry = true;

      try {
        const session = await getSession();
        if (!session) {
          throw new Error('No session available!');
        }

        const oldRefreshToken = session.refreshToken;

        const { accessToken, refreshToken } = await generateNewToken(oldRefreshToken)

        await updateSession({ accessToken, refreshToken });

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return instance(originalRequest);
      } catch (error) {
        console.error('Error refreshing token:', error);
        redirect('/auth/login')
      }
    }

    return Promise.reject(error);
  }
);

export const apiClient = {
  get: <T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> =>
    instance.get(url, config),
  post: <T, D, R = AxiosResponse<T>>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<R> =>
    instance.post(url, data, config),
};

async function generateNewToken(oldRefreshToken: string) {
  const { data } = await apiClient.post<ResponseType, { refresh: string }>(`/auth/refresh`, { refresh: oldRefreshToken })
  return data.data
}


export default apiClient
