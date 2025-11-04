import { create } from 'zustand';
import { api, clearAuthToken, registerLogout, setAuthToken } from '../services/api';
import { TOKEN_KEY, ROLES } from '../utils/constants';
import type { User, LoginResponse } from '../types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => {
  const navigateByRole = (role?: string) => {
    if (!role) return;
    if (role === ROLES.ADMIN) {
      window.location.assign('/admin');
    } else if (role === ROLES.GURU) {
      window.location.assign('/guru');
    } else if (role === ROLES.SISWA) {
      window.location.assign('/siswa');
    }
  };

  const logout = () => {
    clearAuthToken();
    localStorage.removeItem(TOKEN_KEY);
    set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
    window.location.assign('/login');
  };

  // Register logout handler for api interceptor
  registerLogout(logout);

  return {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (username: string, password: string) => {
      set({ isLoading: true });
      try {
        const { data } = await api.post<LoginResponse>('/api/auth/login', { username, password });
        const { user, accessToken } = data;
        setAuthToken(accessToken);
        set({ user, accessToken, isAuthenticated: true, isLoading: false });
        navigateByRole(user?.role as unknown as string);
      } catch (error) {
        set({ isLoading: false, isAuthenticated: false });
        throw error;
      }
    },

    logout,

    refreshAuth: async () => {
      set({ isLoading: true });
      try {
        // Load token from localStorage (if any) and set it
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) setAuthToken(token);

        // Verify token and load user data
        const { data: user } = await api.get<User>('/api/auth/me');
        set({ user, accessToken: token, isAuthenticated: true, isLoading: false });
      } catch (error) {
        // Try refresh silently
        try {
          const { data } = await api.post<{ accessToken: string }>('/api/auth/refresh', {});
          const newToken = data?.accessToken;
          if (newToken) {
            setAuthToken(newToken);
            const { data: user } = await api.get<User>('/api/auth/me');
            set({ user, accessToken: newToken, isAuthenticated: true, isLoading: false });
            return;
          }
        } catch (_) {
          // ignore
        }
        // If all fails, logout
        logout();
      }
    },

    changePassword: async (oldPassword: string, newPassword: string) => {
      await api.post('/api/auth/change-password', { oldPassword, newPassword });
    },
  };
});
