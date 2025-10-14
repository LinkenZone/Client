import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import IntroPage from './pages/IntroPage';
import LessonPage from './pages/LessonPage';
import Login from './pages/Login';
import NaturalPage from './pages/NaturalPage';
import Register from './pages/Register';
import SocialPage from './pages/SocialPage';
import UserPage from './pages/User';

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
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}
