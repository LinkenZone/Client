import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import MainLayout from './layouts/MainLayout';
import NaturalPage from './pages/Natural/NaturalPage';
import SocialPage from './pages/Social/SocialPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import UserPage from './pages/User/User';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/home"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/natural"
            element={
              <MainLayout>
                <NaturalPage />
              </MainLayout>
            }
          />
          <Route
            path="/social"
            element={
              <MainLayout>
                <SocialPage />
              </MainLayout>
            }
          />
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/register" element={<MainLayout><Register /></MainLayout>} />
          <Route path="/user" element={<RequireAuth><MainLayout><UserPage /></MainLayout></RequireAuth>} />
          <Route path="/intro" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
