import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { getSession } from './session';


const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器
instance.interceptors.request.use(async (config) => {
  const session = await getSession();
  const token = session?.accessToken; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

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


export default apiClient
