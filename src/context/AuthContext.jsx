import React, { createContext, useContext, useMemo, useState } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login({ username }) {
    const u = await authService.login({ username });
    setUser(u);
    return u;
  }

  async function register({ username }) {
    const u = await authService.register({ username });
    setUser(u);
    return u;
  }

  async function logout() {
    await authService.logout();
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
