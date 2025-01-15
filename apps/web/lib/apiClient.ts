import { redirect } from "next/navigation";

import { generateNewToken } from "@/features/auth/actions";

import { getSession, updateSession } from "./session";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestConfig extends RequestInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

interface ApiClientConfig {
  baseURL: string;
}

class ApiClient {
  private baseURL: string;
  private requestInterceptor: ((config: RequestConfig) => Promise<RequestConfig>) | null = null;
  private responseInterceptor: ((response: Response) => Promise<Response>) | null = null;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
  }

  setRequestInterceptor(interceptor: (config: RequestConfig) => Promise<RequestConfig>) {
    this.requestInterceptor = interceptor;
  }

  setResponseInterceptor(interceptor: (response: Response) => Promise<Response>) {
    this.responseInterceptor = interceptor;
  }

  private async request<T>(url: string, method: HttpMethod, config: RequestConfig = {}): Promise<T> {
    const fullUrl = new URL(url, this.baseURL);

    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        fullUrl.searchParams.append(key, value);
      });
    }

    const isFormData = config.data instanceof FormData;

    const requestConfig: RequestInit = {
      ...config,
      method,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...config.headers,
      },
    };

    if (config.data) {
      requestConfig.body = isFormData ? config.data : JSON.stringify(config.data);
    }

    if (this.requestInterceptor) {
      const interceptedConfig = await this.requestInterceptor(requestConfig);
      Object.assign(requestConfig, interceptedConfig);
    }

    try {
      let response = await fetch(fullUrl.toString(), requestConfig);

      if (this.responseInterceptor) {
        response = await this.responseInterceptor(response);
      }

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }


  get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, 'GET', config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, 'POST', { ...config, data });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, 'PUT', { ...config, data });
  }

  delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, 'DELETE', config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, 'PATCH', { ...config, data });
  }

  upload<T>(url: string, data: FormData, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, 'POST', { ...config, data });
  }
}

const apiClient = new ApiClient({ baseURL: process.env.NEXT_PUBLIC_API_URL! });

apiClient.setRequestInterceptor(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${session.accessToken}`,
    };
  }
  return config;
});

apiClient.setResponseInterceptor(async (response) => {
  if (response.status === 401) {
    const session = await getSession();
    if (!session?.refreshToken) {
      redirect('/auth/signin');
    }
    try {
      const { accessToken, refreshToken } = await generateNewToken(session.refreshToken);

      await updateSession({ accessToken, refreshToken });

      const newHeaders = new Headers(response.headers);
      newHeaders.set('Authorization', `Bearer ${accessToken}`);

      return await fetch(response.url, {
        ...response,
        headers: newHeaders,
      });
    } catch (error) {
      console.error('Token refresh failed:', error);
      redirect('/auth/signin');
    }
  }
  return response;
});

export default apiClient;

