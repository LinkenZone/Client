import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import Home from "./pages/Home";
import LessonPage from "./pages/LessonPage";
import MainLayout from "./layouts/MainLayout";
import NaturalPage from "./pages/NaturalPage";
import SocialPage from "./pages/SocialPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserPage from "./pages/User";
import AdminPage from "./pages/AdminPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <IntroPage />
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
            path="/lesson"
            element={
              <MainLayout>
                <LessonPage />
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user"
            element={
              <RequireAuth>
                <MainLayout>
                  <UserPage />
                </MainLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <MainLayout>
                  <AdminPage />
                </MainLayout>
              </RequireAdmin>
            }
          />
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

function RequireAdmin({ children }) {
  const { user } = useAuth();
  // Kiểm tra xem user có tồn tại và có phải admin không
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin" && user.username !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
}
