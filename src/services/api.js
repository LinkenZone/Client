import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // Tăng lên 30 giây cho các request thông thường
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);
// Document moderation service
export const documentModerationService = {
  // Lấy danh sách tài liệu chờ duyệt
  async getPendingDocuments() {
    const { data } = await api.get('/admin/documents/pending');
    return data;
  },

  // Lấy tất cả tài liệu (đã duyệt, chờ duyệt, từ chối)
  async getAllDocuments(params) {
    const { data } = await api.get('/admin/documents', { params });
    return data;
  },

  // Phê duyệt tài liệu
  async approveDocument(documentId) {
    const { data } = await api.post(`/admin/documents/${documentId}/approve`);
    return data;
  },

  // Từ chối tài liệu
  async rejectDocument(documentId, reason) {
    const { data } = await api.post(`/admin/documents/${documentId}/reject`, {
      reason,
    });
    return data;
  },

  // Lấy thông tin chi tiết một tài liệu
  async getDocumentDetail(documentId) {
    const { data } = await api.get(`/admin/documents/${documentId}`);
    return data;
  },
};
