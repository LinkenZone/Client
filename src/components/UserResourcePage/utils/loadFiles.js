import { api } from "../../../services/api";
import { toast } from "react-toastify";

export const loadFile = async () => {
  try {
    const res = await api.get("/document/my-documents");
    const documents = res.data.data.documents;

    // Kiểm tra dữ liệu hợp lệ
    if (!documents || !Array.isArray(documents)) {
      return [];
    }

    // Chuyển đổi dữ liệu từ API sang format hiển thị
    return documents.map((doc) => ({
      id: doc.document_id,
      name: doc.title,
      status: doc.status || "pending",
      type: "file",
      file_type: doc.file_type,
      file_url: doc.file_url,
      description: doc.description,
      size: doc.file_size || "N/A",
      modified: doc.uploaded_at || doc.approved_at || "N/A",
      avgRating: doc.avgRating,
      commentCount: doc.commentCount,
    }));
  } catch (err) {
    console.error("Error loading files:", err);
    toast.error(
      err.response?.data?.message || "Không thể tải danh sách tài liệu!",
    );
    return [];
  }
};
