import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import IntroPage from './pages/IntroPage';
import LessonPage from './pages/LessonPage';
import LessonDetail from './pages/LessonDetail';
import Login from './pages/Login';
import NaturalPage from './pages/NaturalPage';
import Register from './pages/Register';
import SocialPage from './pages/SocialPage';
import UserPage from './pages/User';
import TrashPage from './pages/TrashPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <ToastContainer position="top-right" autoClose={1500} />
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
          <Route path="/natural" element={<NaturalPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trash"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <TrashPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
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

function ProtectedRoute({ children, allowedRoles }) {
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

  // Kiểm tra role nếu có danh sách allowedRoles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
