import React, { useContext } from "react";
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
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <ToastContainer position="top-right" autoClose={1500} />
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/natural" element={<NaturalPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute role="user">
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;

function ProtectedRoute({ children, role }) {
  const { user, loading } = useContext(AuthContext);

  // Hiển thị loading khi đang restore user từ localStorage
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Sau khi load xong, kiểm tra user
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
}
