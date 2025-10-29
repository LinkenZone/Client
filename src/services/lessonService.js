import { api } from './api';
import { toast } from 'react-toastify';

/**
 * Lấy tất cả bài học
 */
export const getAllLessons = async () => {
  try {
    const response = await api.get('/lessons');
    const lessons = response.data.data;

    if (!lessons || !Array.isArray(lessons)) {
      return [];
    }

    // Chuyển đổi dữ liệu từ API sang format hiển thị
    return lessons.map((lesson) => ({
      _id: lesson._id || lesson.id,
      id: lesson._id || lesson.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      rating: lesson.rating || lesson.avgRating || 0,
      reviewCount: lesson.reviewCount || 0,
      image: lesson.image || lesson.thumbnail,
      category: lesson.category, // 'natural', 'social', 'language'
      subject: lesson.subject, // 'toán', 'lý', 'hóa', 'sinh', 'văn', 'sử', 'địa', etc.
      author: lesson.author || lesson.creator?.name,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
      powerpoint: lesson.powerpoint,
      contentFile: lesson.contentFile,
    }));
  } catch (error) {
    console.error('Error loading lessons:', error);
    toast.error(error.response?.data?.message || 'Không thể tải danh sách bài học!');
    return [];
  }
};

/**
 * Lấy bài học theo danh mục
 */
export const getLessonsByCategory = async (category) => {
  try {
    const response = await api.get(`/lessons?category=${category}`);
    const lessons = response.data.data;

    if (!lessons || !Array.isArray(lessons)) {
      return [];
    }

    return lessons.map((lesson) => ({
      _id: lesson._id || lesson.id,
      id: lesson._id || lesson.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      rating: lesson.rating || lesson.avgRating || 0,
      reviewCount: lesson.reviewCount || 0,
      image: lesson.image || lesson.thumbnail,
      category: lesson.category,
      subject: lesson.subject,
      author: lesson.author || lesson.creator?.name,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
      powerpoint: lesson.powerpoint,
      contentFile: lesson.contentFile,
    }));
  } catch (error) {
    console.error('Error loading lessons by category:', error);
    toast.error(error.response?.data?.message || 'Không thể tải danh sách bài học!');
    return [];
  }
};

/**
 * Lấy bài học nổi bật (featured)
 */
export const getFeaturedLessons = async (limit = 6) => {
  try {
    const response = await api.get(`/lessons/featured?limit=${limit}`);
    const lessons = response.data.data;

    if (!lessons || !Array.isArray(lessons)) {
      return [];
    }

    return lessons.map((lesson) => ({
      _id: lesson._id || lesson.id,
      id: lesson._id || lesson.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      rating: lesson.rating || lesson.avgRating || 0,
      reviewCount: lesson.reviewCount || 0,
      image: lesson.image || lesson.thumbnail,
      category: lesson.category,
      subject: lesson.subject,
      author: lesson.author || lesson.creator?.name,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
      powerpoint: lesson.powerpoint,
      contentFile: lesson.contentFile,
    }));
  } catch (error) {
    console.error('Error loading featured lessons:', error);
    // Nếu endpoint không tồn tại, fallback về getAllLessons và lấy top rated
    try {
      const allLessons = await getAllLessons();
      return allLessons
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
    } catch (fallbackError) {
      toast.error('Không thể tải danh sách bài học nổi bật!');
      return [];
    }
  }
};

/**
 * Tìm kiếm bài học
 */
export const searchLessons = async (query) => {
  try {
    const response = await api.get(`/lessons/search?q=${encodeURIComponent(query)}`);
    const lessons = response.data.data;

    if (!lessons || !Array.isArray(lessons)) {
      return [];
    }

    return lessons.map((lesson) => ({
      _id: lesson._id || lesson.id,
      id: lesson._id || lesson.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      rating: lesson.rating || lesson.avgRating || 0,
      reviewCount: lesson.reviewCount || 0,
      image: lesson.image || lesson.thumbnail,
      category: lesson.category,
      subject: lesson.subject,
      author: lesson.author || lesson.creator?.name,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
      powerpoint: lesson.powerpoint,
      contentFile: lesson.contentFile,
    }));
  } catch (error) {
    console.error('Error searching lessons:', error);
    toast.error(error.response?.data?.message || 'Không thể tìm kiếm bài học!');
    return [];
  }
};

/**
 * Lấy chi tiết bài học
 */
export const getLessonById = async (id) => {
  try {
    const response = await api.get(`/lessons/${id}`);
    const lesson = response.data.data;

    return {
      _id: lesson._id || lesson.id,
      id: lesson._id || lesson.id,
      title: lesson.title,
      description: lesson.description,
      content: lesson.content,
      rating: lesson.rating || lesson.avgRating || 0,
      reviewCount: lesson.reviewCount || 0,
      image: lesson.image || lesson.thumbnail,
      category: lesson.category,
      subject: lesson.subject,
      author: lesson.author || lesson.creator?.name,
      createdAt: lesson.createdAt,
      updatedAt: lesson.updatedAt,
      powerpoint: lesson.powerpoint,
      contentFile: lesson.contentFile,
    };
  } catch (error) {
    console.error('Error loading lesson:', error);
    toast.error(error.response?.data?.message || 'Không thể tải thông tin bài học!');
    throw error;
  }
};
