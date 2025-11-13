import { toast } from 'react-toastify';
import { api } from '../../../services/api';

export const loadFile = async (query = '', user) => {
  try {
    const isSearch = query.trim() !== '';
    const endpoint = isSearch
      ? `/document/search?q=${encodeURIComponent(query)}`
      : `/document/my-documents`;
    const res = await api.get(endpoint);
    const documents = res.data.data.documents;

    // Kiểm tra dữ liệu hợp lệ
    if (!documents || !Array.isArray(documents)) {
      return [];
    }

    // Chuyển đổi dữ liệu từ API sang format hiển thị
    const listDocuments = documents.map((doc) => ({
      id: doc.document_id,
      name: doc.title,
      status: doc.status || 'pending',
      uploader: doc.uploader?.full_name,
      type: 'file',
      file_type: doc.file_type,
      file_url: doc.file_url,
      description: doc.description,
      size: doc.file_size || 'N/A',
      modified: doc.uploaded_at || doc.approved_at || 'N/A',
      avgRating: doc.avgRating,
      commentCount: doc.commentCount,
      isStarred: doc.is_starred,
    }));

    const filteredDocuments = listDocuments.filter((doc) => doc.uploader === user.full_name);

    return isSearch ? filteredDocuments : listDocuments;
  } catch (err) {
    console.error('Error loading files:', err);
    toast.error(err.response?.data?.message || 'Không thể tải danh sách tài liệu!');
    return [];
  }
};

export const loadStarredFiles = async (query = '', user) => {
  try {
    const isSearch = query.trim() !== '';
    const endpoint = isSearch
      ? `/document/search?q=${encodeURIComponent(query)}`
      : '/document/starred';
    const res = await api.get(endpoint);
    const documents = res.data.data.documents;

    if (!documents || !Array.isArray(documents)) {
      return [];
    }

    const listDocuments = documents.map((doc) => ({
      id: doc.document_id,
      name: doc.title,
      status: doc.status || 'pending',
      uploader: doc.uploader?.full_name,
      type: 'file',
      file_type: doc.file_type,
      file_url: doc.file_url,
      description: doc.description,
      size: doc.file_size || 'N/A',
      modified: doc.uploaded_at || doc.approved_at || 'N/A',
      avgRating: doc.avgRating,
      commentCount: doc.commentCount,
      isStarred: doc.is_starred,
    }));

    const filteredDocuments = listDocuments.filter(
      (doc) => doc.uploader === user.full_name && doc.isStarred === true,
    );

    return isSearch ? filteredDocuments : listDocuments;
  } catch (err) {
    console.error('Error loading starred files:', err);
    toast.error(err.response?.data?.message || 'Không thể tải danh sách tài liệu đánh dấu sao!');
    return [];
  }
};

export const loadRecentFiles = async (query = '', user) => {
  try {
    const isSearch = query.trim() !== '';
    const endpoint = isSearch
      ? `/document/search?q=${encodeURIComponent(query)}`
      : '/document/recent';
    const res = await api.get(endpoint);
    const documents = res.data.data.documents;

    if (!documents || !Array.isArray(documents)) {
      return [];
    }

    const listDocuments = documents.map((doc) => ({
      id: doc.document_id,
      name: doc.title,
      status: doc.status || 'pending',
      uploader: doc.uploader?.full_name,
      type: 'file',
      file_type: doc.file_type,
      file_url: doc.file_url,
      description: doc.description,
      size: doc.file_size || 'N/A',
      modified: doc.last_accessed || doc.uploaded_at || 'N/A',
      avgRating: doc.avgRating,
      commentCount: doc.commentCount,
      isStarred: doc.is_starred,
    }));

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const filteredDocuments = listDocuments.filter(
      (doc) => doc.uploader === user.full_name && new Date(doc.modified) >= thirtyDaysAgo,
    );

    return isSearch ? filteredDocuments : listDocuments;
  } catch (err) {
    console.error('Error loading recent files:', err);
    toast.error(err.response?.data?.message || 'Không thể tải danh sách tài liệu gần đây!');
    return [];
  }
};

export const loadSharedFiles = async (query = '', user) => {
  try {
    const isSearch = query.trim() !== '';
    const endpoint = isSearch
      ? `/document/search?q=${encodeURIComponent(query)}`
      : '/document/shared';
    const res = await api.get(endpoint);
    const documents = res.data.data.documents;

    if (!documents || !Array.isArray(documents)) {
      return [];
    }

    const listDocuments = documents.map((doc) => ({
      id: doc.document_id,
      name: doc.title,
      status: doc.status || 'pending',
      uploader: doc.uploader?.full_name,
      type: 'file',
      file_type: doc.file_type,
      file_url: doc.file_url,
      description: doc.description,
      size: doc.file_size || 'N/A',
      modified: doc.uploaded_at || doc.approved_at || 'N/A',
      avgRating: doc.avgRating,
      commentCount: doc.commentCount,
      isStarred: doc.is_starred,
      sharedBy: doc.uploader?.full_name,
    }));

    const filteredDocuments = listDocuments.filter((doc) => doc.uploader === user.full_name);

    return isSearch ? filteredDocuments : listDocuments;
  } catch (err) {
    console.error('Error loading shared files:', err);
    toast.error(err.response?.data?.message || 'Không thể tải danh sách tài liệu được chia sẻ!');
    return [];
  }
};

export const loadDeletedFile = async () => {
  try {
    const res = await api.get('/document/my-deleted-documents');
    const documents = res.data.data.documents;

    // Kiểm tra dữ liệu hợp lệ
    if (!documents || !Array.isArray(documents)) {
      return [];
    }

    // Chuyển đổi dữ liệu từ API sang format hiển thị
    return documents.map((doc) => ({
      id: doc.document_id,
      name: doc.title,
      status: doc.status || 'pending',
      type: 'file',
      file_type: doc.file_type,
      file_url: doc.file_url,
      description: doc.description,
      size: doc.file_size || 'N/A',
      modified: doc.uploaded_at || doc.approved_at || 'N/A',
      avgRating: doc.avgRating,
      commentCount: doc.commentCount,
    }));
  } catch (err) {
    console.error('Error loading files:', err);
    toast.error(err.response?.data?.message || 'Không thể tải danh sách tài liệu!');
    return [];
  }
};
