import { api } from './api';

const VISIT_STORAGE_KEY = 'linkenzone_visit_recorded';

/**
 * Ghi nhận lượt truy cập của user (chỉ 1 lần mỗi session)
 * Sử dụng sessionStorage để đảm bảo mỗi session chỉ gọi 1 lần
 */
export const recordVisit = async () => {
  try {
    // Kiểm tra xem đã ghi nhận visit trong session này chưa
    const hasRecorded = sessionStorage.getItem(VISIT_STORAGE_KEY);
    
    if (hasRecorded) {
      console.log('Visit already recorded in this session');
      return;
    }

    // Gọi API để ghi nhận visit
    await api.post('/reports/visit');
    
    // Đánh dấu đã ghi nhận visit trong session này
    sessionStorage.setItem(VISIT_STORAGE_KEY, 'true');
    
    console.log('Visit recorded successfully');
  } catch (error) {
    console.error('Failed to record visit:', error);
    // Không throw error để không ảnh hưởng đến UX
  }
};
