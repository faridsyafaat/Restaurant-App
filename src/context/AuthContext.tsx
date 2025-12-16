import { createContext } from 'react';
import type { User } from '@/types/User';

export interface UpdateProfilePayload {
  name?: string;
  phone?: string;
  avatar?: File;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;

  login: (token: string, user: User) => void;
  logout: () => void;

  // ✅ TAMBAHAN INI (WAJIB)
  updateProfile: (payload: UpdateProfilePayload | FormData) => Promise<User>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
