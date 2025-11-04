import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, TOKEN_KEY } from '../utils/constants';

let currentToken: string | null = null;
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;
let logoutHandler: (() => void) | null = null;

// Allow auth store to register a global logout handler to avoid circular deps
export const registerLogout = (fn: () => void) => {
  logoutHandler = fn;
};

export const setAuthToken = (token: string | null) => {
  currentToken = token;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const clearAuthToken = () => {
  currentToken = null;
  localStorage.removeItem(TOKEN_KEY);
};

const createApi = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // for refresh token via cookies if backend uses it
  });

  // Request interceptor to attach access token
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = currentToken || localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

  // Response interceptor to handle 401 and refresh flow
  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // If no response or status not 401, just reject
      const status = error.response?.status;
      if (status !== 401) {
        return Promise.reject(error);
      }

      // Prevent infinite loop
      if (originalRequest._retry) {
        // second failure -> give up and logout
        clearAuthToken();
        if (logoutHandler) logoutHandler();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Ensure only one refresh request at a time
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = (async () => {
            try {
              const res = await axios.post(
                `${API_BASE_URL}/api/auth/refresh`,
                {},
                { withCredentials: true }
              );
              const newToken = (res.data?.accessToken || null) as string | null;
              if (newToken) {
                setAuthToken(newToken);
              } else {
                clearAuthToken();
              }
              return newToken;
            } catch (e) {
              clearAuthToken();
              if (logoutHandler) logoutHandler();
              return null;
            } finally {
              isRefreshing = false;
            }
          })();
        }

        const newToken = await refreshPromise!;
        if (!newToken) {
          return Promise.reject(error);
        }

        // Retry original request with new token
        originalRequest.headers = originalRequest.headers || {};
        (originalRequest.headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (err) {
        clearAuthToken();
        if (logoutHandler) logoutHandler();
        return Promise.reject(err);
      }
    }
  );

  return instance;
};

export const api = createApi();
