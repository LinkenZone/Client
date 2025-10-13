// hooks/useFileUpload.js
import { useState } from "react";

export function useFileUpload() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    // TODO: Implement upload logic
    console.log("Uploading:", file);
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return {
    file,
    previewUrl,
    handleChange,
    handleUpload,
    reset,
  };
}
