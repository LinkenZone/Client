import React, { createContext, useContext, useMemo, useState } from 'react';
import { authService, setAuthToken } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login({ username, password }) {
    // Kiểm tra đăng nhập admin trước
    if (username === 'admin' && password === 'admin@Liken123') {
      const adminUser = {
        id: 'admin',
        username: 'admin',
        email: 'admin@linkenzone.com',
        role: 'admin'
      };
      const adminData = {
        user: adminUser,
        token: 'admin-token-' + Date.now()
      };
      setAuthToken(adminData.token);
      setUser(adminUser);
      return adminData;
    }

    // Đăng nhập bình thường cho user khác
    const data = await authService.login({ username, password });
    setAuthToken(data?.token);
    setUser(data?.user || null);
    return data;
  }

  async function register({ username }) {
    const data = await authService.register({ username });
    setAuthToken(data?.token);
    setUser(data?.user || null);
    return data;
  }

  async function logout() {
    await authService.logout();
    setAuthToken(null);
    setUser(null);
  }

  const value = useMemo(() => ({ user, login, register, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
