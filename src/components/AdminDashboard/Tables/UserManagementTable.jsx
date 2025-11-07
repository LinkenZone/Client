import {
  Ban,
  Calendar,
  CheckCircle,
  Edit2,
  Mail,
  MoreVertical,
  Search,
  Shield,
  User,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../../services/api';

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, inactive, admin
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'details', 'deactivate', 'activate', 'role'
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users');
      console.log(res);
      setUsers(res.data.data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Không thể tải danh sách người dùng!');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateUser = async (userId) => {
    try {
      await api.patch(`/users/${userId}/ban`);
      setUsers((prev) =>
        prev.map((user) => (user.user_id === userId ? { ...user, is_banned: true } : user)),
      );
      toast.success('Đã vô hiệu hóa tài khoản!');
      closeModal();
    } catch (error) {
      console.error('Error deactivating user:', error);
      toast.error('Có lỗi xảy ra khi vô hiệu hóa tài khoản!');
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      await api.patch(`/users/${userId}/unban`);
      setUsers((prev) =>
        prev.map((user) => (user.user_id === userId ? { ...user, is_banned: false } : user)),
      );
      toast.success('Đã kích hoạt tài khoản!');
      closeModal();
    } catch (error) {
      console.error('Error activating user:', error);
      toast.error('Có lỗi xảy ra khi kích hoạt tài khoản!');
    }
  };

  const handleChangeRole = async (userId) => {
    if (!selectedRole) {
      toast.error('Vui lòng chọn vai trò!');
      return;
    }

    try {
      await api.patch(`/users/${userId}/role`, { role: selectedRole });
      setUsers((prev) =>
        prev.map((user) => (user.user_id === userId ? { ...user, role: selectedRole } : user)),
      );
      toast.success('Đã cập nhật vai trò người dùng!');
      closeModal();
    } catch (error) {
      console.error('Error changing user role:', error);
      toast.error('Có lỗi xảy ra khi cập nhật vai trò!');
    }
  };

  const openModal = (type, user) => {
    setModalType(type);
    setSelectedUser(user);
    if (type === 'role') {
      setSelectedRole(user.role);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setModalType('');
    setSelectedRole('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Filter users
  const filteredUsers = users
    .filter((user) => {
      const matchesSearch =
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === 'all') return matchesSearch;
      if (filter === 'active') return matchesSearch && !user.is_banned;
      if (filter === 'inactive') return matchesSearch && user.is_banned;
      if (filter === 'admin') return matchesSearch && user.role === 'admin';

      return matchesSearch;
    })
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

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
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Quản lý người dùng</h2>
        <p className="mt-1 text-sm text-gray-500">
          Quản lý tài khoản người dùng và phân quyền trong hệ thống
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none"
          />
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tất cả ({users.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'active'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Hoạt động ({users.filter((u) => !u.is_banned).length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'inactive'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Vô hiệu ({users.filter((u) => u.is_banned).length})
          </button>
          <button
            onClick={() => setFilter('admin')}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === 'admin'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Admin ({users.filter((u) => u.role === 'admin').length})
          </button>
        </div>
      </div>

      {/* Table */}
      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <User className="mb-3 h-12 w-12 text-gray-300" />
          <p className="text-lg font-medium">Không tìm thấy người dùng</p>
          <p className="text-sm">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm font-semibold text-gray-700">
                <th className="pr-4 pb-3">Người dùng</th>
                <th className="pr-4 pb-3">Email</th>
                <th className="pr-4 pb-3">Vai trò</th>
                <th className="pr-4 pb-3">Ngày tạo</th>
                <th className="pr-4 pb-3">Trạng thái</th>
                <th className="pb-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.user_id} className="text-sm transition-colors hover:bg-gray-50">
                  {/* User Info */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-500 font-semibold text-white">
                        {user.full_name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.full_name || 'N/A'}</p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{user.email}</span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="py-4 pr-4">
                    {user.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                        <Shield className="h-3 w-3" />
                        Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        <User className="h-3 w-3" />
                        User
                      </span>
                    )}
                  </td>

                  {/* Created Date */}
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(user.created_at)}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 pr-4">
                    {!user.is_banned ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                        <CheckCircle className="h-3 w-3" />
                        Hoạt động
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                        <XCircle className="h-3 w-3" />
                        Vô hiệu
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openModal('details', user)}
                        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100"
                        title="Xem chi tiết"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openModal('role', user)}
                        className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        title="Thay đổi vai trò"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      {!user.is_banned ? (
                        <button
                          onClick={() => openModal('deactivate', user)}
                          className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                          title="Vô hiệu hóa"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => openModal('activate', user)}
                          className="rounded-lg p-2 text-green-600 transition-colors hover:bg-green-50"
                          title="Kích hoạt"
                        >
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showModal && selectedUser && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            {/* User Details Modal */}
            {modalType === 'details' && (
              <>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-500 text-lg font-semibold text-white">
                    {selectedUser.full_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedUser.full_name}
                    </h3>
                  </div>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{selectedUser.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      Vai trò: <span className="font-medium">{selectedUser.role}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      Tạo: {formatDate(selectedUser.created_at)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {!selectedUser.is_banned ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-gray-600">
                      Trạng thái:{' '}
                      <span className={!selectedUser.is_banned ? 'text-green-600' : 'text-red-600'}>
                        {!selectedUser.is_banned ? 'Hoạt động' : 'Vô hiệu'}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={closeModal}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                  >
                    Đóng
                  </button>
                </div>
              </>
            )}

            {/* Deactivate Modal */}
            {modalType === 'deactivate' && (
              <>
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                    <Ban className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Vô hiệu hóa tài khoản</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Bạn có chắc chắn muốn vô hiệu hóa tài khoản "
                      <span className="font-medium">{selectedUser.full_name}</span>"? Người dùng sẽ
                      không thể đăng nhập vào hệ thống.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleDeactivateUser(selectedUser.user_id)}
                    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                  >
                    Xác nhận vô hiệu hóa
                  </button>
                </div>
              </>
            )}

            {/* Activate Modal */}
            {modalType === 'activate' && (
              <>
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <UserCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Kích hoạt tài khoản</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Bạn có chắc chắn muốn kích hoạt lại tài khoản "
                      <span className="font-medium">{selectedUser.full_name}</span>"? Người dùng sẽ
                      có thể đăng nhập vào hệ thống.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleActivateUser(selectedUser.user_id)}
                    className="rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
                  >
                    Xác nhận kích hoạt
                  </button>
                </div>
              </>
            )}

            {/* Change Role Modal */}
            {modalType === 'role' && (
              <>
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Thay đổi vai trò</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Chọn vai trò mới cho "
                      <span className="font-medium">{selectedUser.full_name}</span>"
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Vai trò <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="role"
                        value="user"
                        checked={selectedRole === 'user'}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-900">User</p>
                          <p className="text-xs text-gray-500">Người dùng thông thường</p>
                        </div>
                      </div>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-3 transition-colors hover:bg-gray-50">
                      <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={selectedRole === 'admin'}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                      />
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-500" />
                        <div>
                          <p className="font-medium text-gray-900">Admin</p>
                          <p className="text-xs text-gray-500">Quản trị viên hệ thống</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={() => handleChangeRole(selectedUser.user_id)}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
                  >
                    Cập nhật vai trò
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementTable;
