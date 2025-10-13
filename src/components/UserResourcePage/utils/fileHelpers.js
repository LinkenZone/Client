// utils/fileHelpers.js
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
