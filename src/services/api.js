// API service using axios with base URL and auth interceptor
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
let authToken = null; // in-memory token

export function setAuthToken(token) {
  authToken = token || null;
}

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

export const authService = {
  async login({ username }) {
    // TODO: call your backend
    // const { data } = await api.post('/auth/login', { username, password });
    // return data;
    // Stub
    return { user: { id: 'u_demo', username }, token: 'demo-token' };
  },
  async register({ username }) {
    // TODO: call your backend
    // const { data } = await api.post('/auth/register', { username, password });
    // return data;
    // Stub
    return { user: { id: 'u_demo', username }, token: 'demo-token' };
  },
  async logout() {
    // TODO: call your backend if needed
    // await api.post('/auth/logout');
    return true;
  },
};

export const lessonService = {
  async getRecentLessons(user) {
    // TODO: replace with GET /users/:id/recent-lessons
    // const { data } = await api.get(`/users/${user.id}/recent-lessons`);
    // return data;
    // Demo 5 items
    return [
      { id: 'l1', title: 'Bài 1', description: 'Gần đây 1', rating: 4.5 },
      { id: 'l2', title: 'Bài 2', description: 'Gần đây 2', rating: 4.0 },
      { id: 'l3', title: 'Bài 3', description: 'Gần đây 3', rating: 5.0 },
      { id: 'l4', title: 'Bài 4', description: 'Gần đây 4', rating: 4.2 },
      { id: 'l5', title: 'Bài 5', description: 'Gần đây 5', rating: 3.9 },
    ];
  },
  async markRecent(user, lesson) {
    // TODO: call backend to record recent lesson
    // await api.post(`/users/${user.id}/recent-lessons`, { lessonId: lesson.id });
    return true; // stub
  },
};
