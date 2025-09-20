#Cách thay bằng API thật (tham khảo)

Trong api.js, thay các dòng TODO:

authService.login:

return await http('/auth/login', { method: 'POST', body: { username, password } });

authService.register:

return await http('/auth/register', { method: 'POST', body: { username, password } });

lessonService.getRecentLessons:

return await http(/users/${user.id}/recent-lessons);

lessonService.markRecent:

return await http(/users/${user.id}/recent-lessons, { method: 'POST', body: { lessonId: lesson.id } });
