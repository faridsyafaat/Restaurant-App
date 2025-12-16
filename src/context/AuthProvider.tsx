import { useState, ReactNode } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import type { User } from '@/types/User';

const API_URL =
  'https://restaurant-be-400174736012.asia-southeast2.run.app/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string, user: User) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateProfile = async (
    payload: FormData | { name?: string; phone?: string }
  ): Promise<User> => {
    const token = localStorage.getItem('token');

    const res = await axios.put(`${API_URL}/auth/profile`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(payload instanceof FormData
          ? { 'Content-Type': 'multipart/form-data' }
          : {}),
      },
    });

    const updatedUser: User = res.data.data;
    setUser(updatedUser);

    return updatedUser;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
