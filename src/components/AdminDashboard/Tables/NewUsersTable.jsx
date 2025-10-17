// components/AdminDashboard/Tables/NewUsersTable.jsx
import React from "react";
import { Search, Edit2, Trash2 } from "lucide-react";

const users = [
  {
    id: 1,
    name: "Jhon Smith",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Jhon Smith",
    role: "Admin",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Jhon Smith",
    role: "Customer",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function NewUsersTable() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">New Users</h3>
        <button className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
          <Search className="h-4 w-4" />
          Search
        </button>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
          Show By All
        </button>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg p-2 text-blue-600 hover:bg-blue-50">
                <Edit2 className="h-4 w-4" />
              </button>
              <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
