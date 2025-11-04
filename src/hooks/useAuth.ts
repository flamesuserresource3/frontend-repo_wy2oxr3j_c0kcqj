import { useMemo } from 'react';
import { useAuthStore } from '../store/authStore';
import { Role } from '../types';

export const useAuth = () => {
  const state = useAuthStore();

  const helpers = useMemo(() => ({
    isAdmin: () => state.user?.role === Role.ADMIN,
    isGuru: () => state.user?.role === Role.GURU,
    isSiswa: () => state.user?.role === Role.SISWA,
  }), [state.user]);

  return { ...state, ...helpers };
};

export default useAuth;
