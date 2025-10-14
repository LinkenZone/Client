import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
let token = localStorage.getItem('token');

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
