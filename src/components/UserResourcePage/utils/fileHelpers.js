// utils/fileHelpers.js
import { api } from "../../../services/api";
import { toast } from 'react-toastify';

export const getStatusText = (status) => {
  const statusMap = {
    approved: "Đã duyệt",
    pending: "Chờ duyệt",
    rejected: "Từ chối",
  };
  return statusMap[status] || "Không xác định";
};

export const getStatusClasses = (status) => {
  const classMap = {
    approved: "bg-[#d4edda] text-[#155724]",
    pending: "bg-[#fff3cd] text-[#856404]",
    rejected: "bg-[#f8d7da] text-[#721c24]",
  };
  return classMap[status] || "bg-gray-200 text-gray-600";
};

export const downloadFile = async (documentId, fileName) => {
  try {
    // Gọi API để lấy download URL từ Cloudinary
    const response = await api.get(`/document/${documentId}/download`);
    
    // Lấy downloadUrl từ response
    const { downloadUrl, fileName: serverFileName } = response.data.data;
    
    // Sử dụng fileName từ server nếu không có fileName được truyền vào
    const finalFileName = fileName || serverFileName || 'download';
    
    // Tạo thẻ <a> để download từ Cloudinary URL
    const link = window.document.createElement('a');
    link.href = downloadUrl;
    link.download = finalFileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);

    return response.data.message || "Đang tải xuống tài liệu...";
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Không thể tải xuống tài liệu!"
    );
    throw err;
  }
};

export const restoreFile = async (id) => {
  try {
    const res = await api.patch("/document/restore",{"document_id":id});
    const message = res.data.message;
 
    if (message) {
      return message;
    }
    return "Khôi phục tài liệu thành công!";
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Không thể khôi phục tài liệu!",
    );
    throw err; 
  }
};

export const permanentDeleteFile = async (id) => {
  try {
    const res = await api.delete("/document/permanent", { data: { document_id: id } });
    const message = res.data.message;
    
    // Kiểm tra dữ liệu hợp lệ
    if (message) {
      return message;
    }
    return "Xóa vĩnh viễn tài liệu thành công!";
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Không thể xóa vĩnh viễn tài liệu!",
    );
    throw err; 
  }
};

export const deleteFile = async (id) => {
  try {
    const res = await api.delete(`/document/${id}`);
    const message = res.data.message;
    
    return message;
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Không thể xóa tài liệu!",
    );
    throw err; 
  }
};

export const updateFileInformation = async(id, title) => {
  try {
    const res = await api.patch(`document/${id}`, {title: title});
    const message = res.data.message;
    
    if (message) {
      return message;
    }
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Không thể xóa tài liệu!",
    );
    throw err; 
  }
};

export const toggleStar = async (documentId) => {
  try {
    const response = await api.patch(`/document/${documentId}/star`);
    return response.data.message;
  } catch (err) {
    const errorMessage = err.response?.data?.message || 'Không thể đánh dấu/bỏ đánh dấu sao';
    throw new Error(errorMessage);
  }
};