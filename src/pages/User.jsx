// components/UserPage/index.jsx
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContextMenu from '../components/UserResourcePage/ContextMenu';
import DeleteConfirmModal from '../components/UserResourcePage/DeleteConfirmModal';
import DocumentViewer from '../components/UserResourcePage/DocumentViewer';
import FileGrid from '../components/UserResourcePage/FileGrid';
import FileList from '../components/UserResourcePage/FileList';
import { useFileUpload } from '../components/UserResourcePage/hooks/useFileUpload';
import { useFileView } from '../components/UserResourcePage/hooks/useFileView';
import RenameModal from '../components/UserResourcePage/RenameModal';
import Sidebar from '../components/UserResourcePage/Sidebar';
import TopBar from '../components/UserResourcePage/TopBar';
import UploadModal from '../components/UserResourcePage/UploadModal';
import {
  deleteFile,
  downloadFile,
  toggleStar,
  updateFileInformation,
} from '../components/UserResourcePage/utils/fileHelpers';
import {
  loadFile,
  loadRecentFiles,
  loadSharedFiles,
  loadStarredFiles,
} from '../components/UserResourcePage/utils/loadFiles';
import { AuthContext } from '../context/AuthContext';
import { useDebounce } from '../hooks/useDebounce';

export default function UserPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [uploadedLessons, setUploadedLessons] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [renameModal, setRenameModal] = useState({ isOpen: false, document: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, document: null });
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { activeView, setActiveView, viewMode, setViewMode, viewTitle } = useFileView();
  const { 
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
    reset 
  } = useFileUpload();

  // Check URL params and set active view
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam && viewParam !== 'trash') {
      setActiveView(viewParam);
    }
  }, [searchParams, setActiveView]);

  // Function để reload danh sách documents
  const fetchDocuments = async (query = '', user) => {
    try {
      let data;
      switch (activeView) {
        case 'starred':
          data = await loadStarredFiles(query, user);
          break;
        case 'recent':
          data = await loadRecentFiles(query, user);
          break;
        case 'shared':
          data = await loadSharedFiles(query, user);
          break;
        case 'my-zone':
        default:
          data = await loadFile(query, user);
          break;
      }
      if (data) {
        setUploadedLessons(data);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const loadData = async (query = '', user) => {
      let data;
      switch (activeView) {
        case 'starred':
          data = await loadStarredFiles(query, user);
          break;
        case 'recent':
          data = await loadRecentFiles(query, user);
          break;
        case 'shared':
          data = await loadSharedFiles(query, user);
          break;
        case 'my-zone':
        default:
          data = await loadFile(query, user);
          break;
      }
      if (mounted && data) {
        setUploadedLessons(data);
      }
    };

    loadData(debouncedSearchTerm, user);

    return () => {
      mounted = false;
    };
  }, [user, activeView, debouncedSearchTerm]);

  const handleCloseModal = () => {
    setShowUploadModal(false);
    reset();
  };

  const handleUploadClick = async () => {
    try {
      await handleUpload();
      handleCloseModal();
      // Reload danh sách sau khi upload thành công
      await fetchDocuments(debouncedSearchTerm, user);
    } catch (error) {
      // Error đã được handle trong handleUpload
      console.error('Upload failed:', error);
    }
  };

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

  const handleRename = async (documentId, newName) => {
    const msg = await updateFileInformation(documentId, newName);
    setUploadedLessons((prev) =>
      prev.map((doc) => (doc.id === documentId ? { ...doc, name: newName } : doc)),
    );

    toast.success(`${msg}`);
  };

  const handleDownload = async (document) => {
    try {
      const message = await downloadFile(document.id, document.name);
      toast.success(message);
    } catch (error) {
      console.error('Download error:', error);
      // Error is already handled in downloadFile function
    }
  };

  const handleDeleteConfirm = async (document) => {
    try {
      const message = await deleteFile(document.id);

      // Remove from current list after successful delete
      setUploadedLessons((prev) => prev.filter((file) => file.id !== document.id));

      toast.success(`${message}`);
    } catch (err) {
      // Error is already handled in deleteFile function
      console.error('Error deleting document:', err);
    }
  };

  const handleToggleStar = async (document) => {
    try {
      const message = await toggleStar(document.id);

      // Update local state
      setUploadedLessons((prev) =>
        prev.map((doc) => (doc.id === document.id ? { ...doc, isStarred: !doc.isStarred } : doc)),
      );

      toast.success(message);
    } catch (err) {
      console.error('Error toggling star:', err);
      toast.error(err.message);
    }
  };

  const handleViewChange = (viewId) => {
    if (viewId === 'trash') {
      navigate('/trash');
    } else {
      setActiveView(viewId);
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  // Filter files based on search term
  const filteredLessons = uploadedLessons;

  return (
    <div className="flex pt-[20px]" style={{ height: '100vh' }}>
      <Sidebar
        user={user}
        activeView={activeView}
        onViewChange={handleViewChange}
        onUploadClick={() => setShowUploadModal(true)}
      />

      <main className="flex-1 overflow-auto bg-gray-50">
        <TopBar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onSearchChange={handleSearchChange}
          searchTerm={searchTerm}
        />

        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-medium text-gray-800">{viewTitle}</h1>
            {searchTerm && (
              <div className="text-sm text-gray-600">
                Tìm thấy{' '}
                <span className="font-semibold text-blue-600">{filteredLessons.length}</span> kết
                quả
              </div>
            )}
          </div>

          {filteredLessons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 text-6xl">🔍</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-700">
                {searchTerm ? 'Không tìm thấy kết quả' : 'Chưa có tài liệu nào'}
              </h3>
              <p className="max-w-md text-center text-gray-500">
                {searchTerm
                  ? `Không tìm thấy tài liệu nào với từ khóa "${searchTerm}"`
                  : 'Hãy tải lên tài liệu đầu tiên của bạn để bắt đầu'}
              </p>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <FileGrid
                  files={filteredLessons}
                  onFileClick={handleFileClick}
                  onContextMenu={handleContextMenu}
                  onMoreClick={handleMoreClick}
                  onToggleStar={handleToggleStar}
                />
              ) : (
                <FileList
                  files={filteredLessons}
                  onFileClick={handleFileClick}
                  onContextMenu={handleContextMenu}
                  onMoreClick={handleMoreClick}
                  onToggleStar={handleToggleStar}
                />
              )}
            </>
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
        uploading={uploading}
        uploadProgress={uploadProgress}
        description={description}
        onDescriptionChange={setDescription}
        selectedTags={selectedTags}
        onTagsChange={setSelectedTags}
      />

      {selectedDocument && (
        <DocumentViewer document={selectedDocument} onClose={handleCloseViewer} />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          document={contextMenu.document}
          onClose={handleCloseContextMenu}
          onRename={() => {
            setRenameModal({ isOpen: true, document: contextMenu.document });
          }}
          onDownload={() => {
            handleDownload(contextMenu.document);
          }}
          onDelete={() => {
            setDeleteModal({ isOpen: true, document: contextMenu.document });
          }}
        />
      )}

      <RenameModal
        isOpen={renameModal.isOpen}
        document={renameModal.document}
        onClose={() => setRenameModal({ isOpen: false, document: null })}
        onRename={handleRename}
      />

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        document={deleteModal.document}
        onClose={() => setDeleteModal({ isOpen: false, document: null })}
        onConfirm={() => handleDeleteConfirm(deleteModal.document)}
      />
    </div>
  );
}
