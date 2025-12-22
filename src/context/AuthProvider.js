import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
const API_URL = 'https://restaurant-be-400174736012.asia-southeast2.run.app/api';
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const login = (token, user) => {
        setToken(token);
        setUser(user);
        localStorage.setItem('token', token);
    };
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };
    const updateProfile = async (payload) => {
        const token = localStorage.getItem('token');
        const res = await axios.put(`${API_URL}/auth/profile`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                ...(payload instanceof FormData
                    ? { 'Content-Type': 'multipart/form-data' }
                    : {}),
            },
        });
        const updatedUser = res.data.data;
        setUser(updatedUser);
        return updatedUser;
    };
    return (_jsx(AuthContext.Provider, { value: {
            user,
            token,
            login,
            logout,
            updateProfile,
        }, children: children }));
}
