export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const ROLES = {
  ADMIN: 'ADMIN',
  GURU: 'GURU',
  SISWA: 'SISWA',
} as const;

export type RoleKey = keyof typeof ROLES;
export type RoleValue = typeof ROLES[RoleKey];

export const TOKEN_KEY = 'accessToken';
