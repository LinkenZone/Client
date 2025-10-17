// components/UserPage/Sidebar/index.jsx
import { Plus } from 'lucide-react';
import NavigationMenu from './NavigationMenu';
import UserInfo from './UserInfo';

export default function Sidebar({ user, activeView, onViewChange, onUploadClick }) {
  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white p-4">
      <button
        onClick={onUploadClick}
        className="mb-4 flex items-center gap-3 rounded-full border border-gray-200 bg-white px-6 py-3 shadow-md transition-shadow hover:shadow-lg"
      >
        <Plus className="h-6 w-6 text-blue-600" />
        <span className="font-medium text-gray-700">Mới</span>
      </button>

      <NavigationMenu activeView={activeView} onViewChange={onViewChange} />
      <UserInfo user={user} />
    </aside>
  );
}
