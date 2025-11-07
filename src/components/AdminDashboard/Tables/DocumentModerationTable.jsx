import { AlertCircle, Calendar, Check, Eye, FileText, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../../services/api';
import DocumentViewer from '../../UserResourcePage/DocumentViewer';

const DocumentModerationTable = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [filter, setFilter] = useState('pending');
  const [viewingDocument, setViewingDocument] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const res = await api.get('/document/all-documents');
        setDocuments(res.data.data.allDocuments);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [filter]);

  const handleApprove = async (docId) => {
    try {
      await api.patch(`/document/${docId}/approve`);

      setDocuments((prev) =>
        prev.map((doc) => (doc.document_id === docId ? { ...doc, status: 'approved' } : doc)),
      );
      toast.success('Đã phê duyệt tài liệu!');
    } catch (error) {
      console.error('Error approving document:', error);
      toast.error('Có lỗi xảy ra khi phê duyệt tài liệu!');
    }
  };

  const handleReject = async (docId) => {
    if (!rejectionReason.trim()) {
      toast.error('Vui lòng nhập lý do từ chối!');
      return;
    }

    try {
      await api.patch(`/document/${docId}/reject`, { reason: rejectionReason });

      setDocuments((prev) =>
        prev.map((doc) =>
          doc.document_id === docId ? { ...doc, status: 'rejected', rejectionReason } : doc,
        ),
      );
      setShowModal(false);
      setSelectedDoc(null);
      setRejectionReason('');
      toast.success('Đã từ chối tài liệu!');
    } catch (error) {
      console.error('Error rejecting document:', error);
      toast.error('Có lỗi xảy ra khi từ chối tài liệu!');
    }
  };

  const openRejectModal = (doc) => {
    setSelectedDoc(doc);
    setShowModal(true);
  };

  const handleViewDocument = (doc) => {
    // Format document để phù hợp với DocumentViewer
    const formattedDoc = {
      id: doc.document_id,
      name: doc.title,
      file_type: doc.file_type,
      file_url: doc.file_url,
      description: doc.description,
      size: doc.file_size,
    };
    setViewingDocument(formattedDoc);
  };

  const closeDocumentViewer = () => {
    setViewingDocument(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredDocuments =
    filter === 'pending' ? documents.filter((doc) => doc.status === 'pending') : documents;

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Kiểm duyệt tài liệu</h2>
          <p className="mt-1 text-sm text-gray-500">Danh sách tài liệu cần được phê duyệt</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('pending')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Chờ duyệt ({documents.filter((d) => d.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả
          </button>
        </div>
      </div>

      {/* Table */}
      {filteredDocuments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <FileText className="mb-3 h-12 w-12 text-gray-300" />
          <p className="text-lg font-medium">Không có tài liệu nào</p>
          <p className="text-sm">
            {filter === 'pending' ? 'Không có tài liệu chờ duyệt' : 'Danh sách trống'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                <th className="w-[23.75%] pr-4 pb-3">Tài liệu</th>
                <th className="w-[23.75%] pr-4 pb-3">Người tải lên</th>
                {/* <th className="w-[10%] pr-4 pb-3">Danh mục</th> */}
                <th className="w-[12.5%] pr-4 pb-3">Ngày tải</th>
                <th className="w-[12.5%] pr-4 pb-3">Trạng thái</th>
                <th className="w-[27.5%] pb-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDocuments.map((doc) => (
                <tr key={doc.document_id} className="text-sm transition-colors hover:bg-gray-50">
                  {/* Document Info */}
                  <td className="py-4 pr-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-50">
                        <FileText className="h-5 w-5 text-orange-500" />
                      </div>
                      <div className="max-w-[200px] min-w-0">
                        <p className="truncate font-medium text-gray-900" title={doc.title}>
                          {doc.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {doc.file_type}
                          {/* {doc.fileName} • {doc.fileSize} */}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Uploader */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{doc.uploader.full_name}</p>
                        <p className="text-xs text-gray-500">{doc.uploader.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  {/* <td className="py-4 pr-4">
                    <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"> */}
                  {/* {doc.category} */}
                  {/* </span>
                  </td> */}

                  {/* Date */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(doc.uploaded_at)}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 pr-4">
                    {doc.status === 'pending' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-medium text-yellow-700">
                        <AlertCircle className="h-3 w-3" />
                        Chờ duyệt
                      </span>
                    )}
                    {doc.status === 'approved' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <Check className="h-3 w-3" />
                        Đã duyệt
                      </span>
                    )}
                    {doc.status === 'rejected' && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                        <X className="h-3 w-3" />
                        Đã từ chối
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* Nút Xem - Luôn hiển thị */}
                      <button
                        onClick={() => handleViewDocument(doc)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-blue-600"
                        title="Xem tài liệu"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Xem
                      </button>

                      {/* Nút Duyệt và Từ chối - Chỉ hiện khi pending */}
                      {doc.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(doc.document_id)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-green-600"
                            title="Phê duyệt"
                          >
                            <Check className="h-3.5 w-3.5" />
                            Duyệt
                          </button>
                          <button
                            onClick={() => openRejectModal(doc)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
                            title="Từ chối"
                          >
                            <X className="h-3.5 w-3.5" />
                            Từ chối
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Rejection Modal */}
      {showModal && selectedDoc && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Từ chối tài liệu</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Bạn có chắc chắn muốn từ chối tài liệu "
                  <span className="font-medium">{selectedDoc.title}</span>"?
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Lý do từ chối <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
                placeholder="Nhập lý do từ chối tài liệu..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedDoc(null);
                  setRejectionReason('');
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => handleReject(selectedDoc.document_id)}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Viewer */}
      {viewingDocument && (
        <DocumentViewer document={viewingDocument} onClose={closeDocumentViewer} />
      )}
    </div>
  );
};

export default DocumentModerationTable;
