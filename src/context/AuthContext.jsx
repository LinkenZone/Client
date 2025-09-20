import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem('lz_user');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('lz_user', JSON.stringify(user));
    else localStorage.removeItem('lz_user');
  }, [user]);

  const value = useMemo(() => ({ user, setUser }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
