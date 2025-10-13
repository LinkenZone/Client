// components/UserPage/index.jsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/UserResourcePage/Sidebar";
import TopBar from "../components/UserResourcePage/TopBar";
import FileGrid from "../components/UserResourcePage/FileGrid";
import FileList from "../components/UserResourcePage/FileList";
import UploadModal from "../components/UserResourcePage/UploadModal";
import { useFileUpload } from "../components/UserResourcePage/hooks/useFileUpload";
import { useFileView } from "../components/UserResourcePage/hooks/useFileView";
import { loadFile } from "../components/UserResourcePage/utils/loadFiles";

export default function UserPage() {
  const { user } = useContext(AuthContext);
  const [uploadedLessons, setUploadedLessons] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const { activeView, setActiveView, viewMode, setViewMode, viewTitle } =
    useFileView();
  const { file, previewUrl, handleChange, handleUpload, reset } =
    useFileUpload();

  useEffect(() => {
    let mounted = true;

    const fetchDocuments = async () => {
      try {
        const data = await loadFile();
        if (mounted && data) {
          setUploadedLessons(data);
        }
      } catch (error) {
        console.error("Error loading documents:", error);
      }
    };

    fetchDocuments();

    return () => {
      mounted = false;
    };
  }, [user]);

  const handleCloseModal = () => {
    setShowUploadModal(false);
    reset();
  };

  const handleUploadClick = async () => {
    await handleUpload();
    handleCloseModal();
  };

  return (
    <div className="flex h-screen pt-16">
      <Sidebar
        user={user}
        activeView={activeView}
        onViewChange={setActiveView}
        onUploadClick={() => setShowUploadModal(true)}
      />

      <main className="flex-1 overflow-auto bg-gray-50">
        <TopBar viewMode={viewMode} onViewModeChange={setViewMode} />

        <div className="p-6">
          <h1 className="mb-6 text-2xl font-medium text-gray-800">
            {viewTitle}
          </h1>

          {viewMode === "grid" ? (
            <FileGrid files={uploadedLessons} />
          ) : (
            <FileList files={uploadedLessons} />
          )}
        </div>
      </main>

      <UploadModal
        isOpen={showUploadModal}
        onClose={handleCloseModal}
        file={file}
        previewUrl={previewUrl}
        onFileChange={handleChange}
        onUpload={handleUploadClick}
      />
    </div>
  );
}
