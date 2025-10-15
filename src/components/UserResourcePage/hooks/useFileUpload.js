// hooks/useFileUpload.js
import { useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export function useFileUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Vui lòng chọn file để tải lên!");
      return;
    }

    setUploading(true);

    try {
      // Tạo FormData để gửi file
      const formData = new FormData();
      formData.append("file", file);

      // Gửi request với Content-Type: multipart/form-data
      const res = await api.post("/document/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // Theo dõi tiến trình upload (optional)
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      });

      toast.success("Tải file lên thành công!");
      console.log("Upload response:", res.data);

      return res.data; // Return data để component cha có thể sử dụng
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error(
        err.response?.data?.message ||
          "Không thể tải file lên. Vui lòng thử lại!",
      );
      throw err; // Throw error để component cha có thể handle
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    // Cleanup object URL để tránh memory leak
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return {
    file,
    previewUrl,
    uploading,
    handleChange,
    handleUpload,
    reset,
  };
}
