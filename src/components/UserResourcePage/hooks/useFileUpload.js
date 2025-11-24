// hooks/useFileUpload.js
import { useState } from "react";
import { api } from "../../../services/api";
import { toast } from "react-toastify";

export function useFileUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

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
    setUploadProgress(0);

    try {
      // Tạo FormData để gửi file
      const formData = new FormData();
      formData.append("file", file);
      
      // Thêm description nếu có
      if (description.trim()) {
        formData.append("description", description.trim());
      }

      // Gửi request với Content-Type: multipart/form-data
      const res = await api.post("/document/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 300000, // 5 phút (300 giây) để upload file lớn
        // Theo dõi tiến trình upload
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted);
          console.log(`Upload progress: ${percentCompleted}%`);
        },
      });

      // Gán tags cho document sau khi upload thành công
      if (selectedTags.length > 0 && res.data.data?.document?.document_id) {
        try {
          await api.post(`/tags/document/${res.data.data.document.document_id}`, {
            tagIds: selectedTags,
          });
        } catch (tagError) {
          console.error("Error assigning tags:", tagError);
          toast.warning("Tải file thành công nhưng không thể gán tags!");
        }
      }

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
    setUploadProgress(0);
    setDescription("");
    setSelectedTags([]);
    // Cleanup object URL để tránh memory leak
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return {
    file,
    previewUrl,
    uploading,
    uploadProgress,
    description,
    selectedTags,
    handleChange,
    handleUpload,
    setDescription,
    setSelectedTags,
    reset,
  };
}
