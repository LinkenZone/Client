// pages/TrashPage.jsx
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileGrid from '../components/UserResourcePage/FileGrid';
import FileList from '../components/UserResourcePage/FileList';
import Sidebar from '../components/UserResourcePage/Sidebar';
import TopBar from '../components/UserResourcePage/TopBar';
import DocumentViewer from '../components/UserResourcePage/DocumentViewer';
import ContextMenu from '../components/UserResourcePage/ContextMenu';
import PermanentDeleteModal from '../components/UserResourcePage/PermanentDeleteModal';
import { useFileView } from '../components/UserResourcePage/hooks/useFileView';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import  {loadDeletedFile} from './../components/UserResourcePage/utils/loadFiles';
import { restoreFile, permanentDeleteFile } from './../components/UserResourcePage/utils/fileHelpers';

export default function TrashPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [trashedFiles, setTrashedFiles] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [permanentDeleteModal, setPermanentDeleteModal] = useState({ isOpen: false, document: null });

  const { viewMode, setViewMode } = useFileView();

  // Load trashed files from API
  useEffect(() => {
    const loadTrashedFiles = async () => {
      const trashed = await loadDeletedFile();
      if (trashed && Array.isArray(trashed)) {
        setTrashedFiles(trashed);
      }
    };

    loadTrashedFiles();
  }, []);

  const handleFileClick = (document) => {
    setSelectedDocument(document);
  };

  const handleCloseViewer = () => {
    setSelectedDocument(null);
  };

  const handleContextMenu = (e, document) => {
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      document,
    });
  };

  const handleMoreClick = (e, document) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({
      x: rect.left,
      y: rect.bottom + 5,
      document,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleRestore = async (document) => {
    try {
      const message = await restoreFile(document.id);
      
      const updatedTrash = trashedFiles.filter(file => file.id !== document.id);
      setTrashedFiles(updatedTrash);
      
      toast.success(`${message}`);
    } catch (error) {
      // Error is already handled in restoreFile function
      console.error('Error restoring document:', error);
    }
  };

  const handlePermanentDeleteConfirm = async (document) => {
    try {
      const message = await permanentDeleteFile(document.id);
      
      // Remove from trash list after successful delete
      const updatedTrash = trashedFiles.filter(file => file.id !== document.id);
      setTrashedFiles(updatedTrash);
      
      toast.success(`${message}`);
    } catch (error) {
      // Error is already handled in permanentDeleteFile function
      console.error('Error permanently deleting document:', error);
    }
  };

  const handleDownload = (document) => {
    const link = window.document.createElement('a');
    link.href = document.file_url || document.url;
    link.download = document.name;
    link.target = '_blank';
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    
    toast.success('Đang tải xuống tài liệu...');
  };

  const handleViewChange = (viewId) => {
    if (viewId === 'trash') {
      return;
    } else {
      navigate(`/user?view=${viewId}`);
    }
  };

  return (
    <div className="flex pt-[88px]" style={{ height: '100vh' }}>
      <Sidebar
        user={user}
        activeView="trash"
        onViewChange={handleViewChange}
      />

      <main className="flex-1 overflow-auto bg-gray-50">
        <TopBar viewMode={viewMode} onViewModeChange={setViewMode} />

        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-medium text-gray-800">Thùng rác</h1>
            {trashedFiles.length > 0 && (
              <p className="text-sm text-gray-500">
                {trashedFiles.length} tài liệu
              </p>
            )}
          </div>

          {trashedFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <svg
                className="mb-4 h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <p className="text-lg">Thùng rác trống</p>
              <p className="mt-2 text-sm">Các tài liệu đã xóa sẽ hiển thị ở đây</p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <FileGrid 
                  files={trashedFiles} 
                  onFileClick={handleFileClick}
                  onContextMenu={handleContextMenu}
                  onMoreClick={handleMoreClick}
                />
              ) : (
                <FileList 
                  files={trashedFiles} 
                  onFileClick={handleFileClick}
                  onContextMenu={handleContextMenu}
                  onMoreClick={handleMoreClick}
                />
              )}
            </>
          )}
        </div>
      </main>

      {selectedDocument && (
        <DocumentViewer 
          document={selectedDocument} 
          onClose={handleCloseViewer} 
        />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          isTrash={true}
          onClose={handleCloseContextMenu}
          onRestore={() => {
            handleRestore(contextMenu.document);
          }}
          onDownload={() => {
            handleDownload(contextMenu.document);
          }}
          onDelete={() => {
            setPermanentDeleteModal({ isOpen: true, document: contextMenu.document });
          }}
        />
      )}

      <PermanentDeleteModal
        isOpen={permanentDeleteModal.isOpen}
        document={permanentDeleteModal.document}
        onClose={() => setPermanentDeleteModal({ isOpen: false, document: null })}
        onConfirm={() => handlePermanentDeleteConfirm(permanentDeleteModal.document)}
      />
    </div>
  );
}
