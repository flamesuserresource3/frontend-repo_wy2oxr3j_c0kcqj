export enum Role {
  ADMIN = 'ADMIN',
  GURU = 'GURU',
  SISWA = 'SISWA',
}

export interface User {
  id: string;
  username: string;
  role: Role;
  namaLengkap: string;
  email: string;
  kelasId?: string | null;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken?: string; // assumed httpOnly cookie in backend; optional here
}
