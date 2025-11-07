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
      isStarred: doc.is_starred,
    }));
  } catch (err) {
    console.error("Error loading files:", err);
    toast.error(
      err.response?.data?.message || "Không thể tải danh sách tài liệu!",
    );
    return [];
  }
};

export const loadStarredFiles = async () => {
  try {
    const res = await api.get("/document/starred");
    const documents = res.data.data.documents;

    if (!documents || !Array.isArray(documents)) {
      return [];
    }

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
      isStarred: true,
    }));
  } catch (err) {
    console.error("Error loading starred files:", err);
    toast.error(
      err.response?.data?.message || "Không thể tải danh sách tài liệu đánh dấu sao!",
    );
    return [];
  }
};

export const loadRecentFiles = async () => {
  try {
    const res = await api.get("/document/recent");
    const documents = res.data.data.documents;

    if (!documents || !Array.isArray(documents)) {
      return [];
    }

    return documents.map((doc) => ({
      id: doc.document_id,
      name: doc.title,
      status: doc.status || "pending",
      type: "file",
      file_type: doc.file_type,
      file_url: doc.file_url,
      description: doc.description,
      size: doc.file_size || "N/A",
      modified: doc.last_accessed || doc.uploaded_at || "N/A",
      avgRating: doc.avgRating,
      commentCount: doc.commentCount,
      isStarred: doc.is_starred,
    }));
  } catch (err) {
    console.error("Error loading recent files:", err);
    toast.error(
      err.response?.data?.message || "Không thể tải danh sách tài liệu gần đây!",
    );
    return [];
  }
};

export const loadSharedFiles = async () => {
  try {
    const res = await api.get("/document/shared");
    const documents = res.data.data.documents;

    if (!documents || !Array.isArray(documents)) {
      return [];
    }

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
      isStarred: doc.is_starred,
      sharedBy: doc.uploader?.full_name,
    }));
  } catch (err) {
    console.error("Error loading shared files:", err);
    toast.error(
      err.response?.data?.message || "Không thể tải danh sách tài liệu được chia sẻ!",
    );
    return [];
  }
};

export const loadDeletedFile = async () => {
  try {
    const res = await api.get("/document/my-deleted-documents");
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