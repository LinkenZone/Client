// Simple API service stubs — replace with real HTTP calls to your backend

export const authService = {
  async login({ username }) {
    // TODO: call your backend: POST /auth/login
    return { username };
  },
  async register({ username }) {
    // TODO: call your backend: POST /auth/register
    return { username };
  },
  async logout() {
    // TODO: call your backend if needed
    return true;
  },
};

export const lessonService = {
  async getRecentLessons(user) {
    // TODO: replace with GET /users/:id/recent-lessons
    // Demo 5 items
    return [
      { title: 'Bài 1', description: 'Gần đây 1', rating: 4.5 },
      { title: 'Bài 2', description: 'Gần đây 2', rating: 4.0 },
      { title: 'Bài 3', description: 'Gần đây 3', rating: 5.0 },
      { title: 'Bài 4', description: 'Gần đây 4', rating: 4.2 },
      { title: 'Bài 5', description: 'Gần đây 5', rating: 3.9 },
    ];
  },
};
