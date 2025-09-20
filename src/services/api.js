// Simple API service stubs — replace with real HTTP calls to your backend
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function http(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`.replace(/\/+/g, '/'), {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  // Optional: handle 4xx/5xx
  // if (!res.ok) throw new Error(`HTTP ${res.status}`);
  try { return await res.json(); } catch { return null; }
}

export const authService = {
  async login({ username }) {
    // TODO: call your backend
    // return await http('/auth/login', { method: 'POST', body: { username } });
    return { username };
  },
  async register({ username }) {
    // TODO: call your backend
    // return await http('/auth/register', { method: 'POST', body: { username } });
    return { username };
  },
  async logout() {
    // TODO: call your backend if needed
    // return await http('/auth/logout', { method: 'POST' });
    return true;
  },
};

export const lessonService = {
  async getRecentLessons(user) {
    // TODO: replace with GET /users/:id/recent-lessons
    // return await http(`/users/${user.id}/recent-lessons`);
    // Demo 5 items
    return [
      { title: 'Bài 1', description: 'Gần đây 1', rating: 4.5 },
      { title: 'Bài 2', description: 'Gần đây 2', rating: 4.0 },
      { title: 'Bài 3', description: 'Gần đây 3', rating: 5.0 },
      { title: 'Bài 4', description: 'Gần đây 4', rating: 4.2 },
      { title: 'Bài 5', description: 'Gần đây 5', rating: 3.9 },
    ];
  },
  async markRecent(user, lesson) {
    // TODO: call backend to record recent lesson
    // return await http(`/users/${user.id}/recent-lessons`, { method: 'POST', body: { lessonId: lesson.id } });
    return true;
  },
};
