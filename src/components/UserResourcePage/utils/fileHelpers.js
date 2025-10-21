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
    const res = await api.delete(`/document/:${id}`);
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
}