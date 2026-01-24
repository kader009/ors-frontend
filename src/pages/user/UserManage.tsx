import {
  Search,
  Filter,
  ChevronDown,
  Pencil,
  Trash2,
  Loader2,
} from 'lucide-react';
import {
  useAllUserQuery,
  useUserDeleteMutation,
  useUserUpdateMutation,
} from '../../redux/api/endApi';
import type { TUser } from '../../types/user';
import { useState } from 'react';
import toast from 'react-hot-toast';
import UserEditModal from '../../components/UserEditModal';

const UserManage = () => {
  const { data, isLoading, isError } = useAllUserQuery(undefined);
  const [deleteUser] = useUserDeleteMutation();
  const [updateUser, { isLoading: isUpdating }] = useUserUpdateMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<TUser | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });

  const users = data?.users || [];

  const filteredUsers = users.filter((user: TUser) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleDelete = (userId: string) => {
    toast((t) => (
      <div className="flex items-center gap-4 text-sm font-semibold">
        <span>Permanently delete?</span>
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              await deleteUser(userId).unwrap();
              toast.success('User deleted');
            } catch {
              toast.error('Failed to delete');
            }
          }}
          className="text-red-600 hover:underline cursor-pointer"
        >
          Yes
        </button>
        <button onClick={() => toast.dismiss(t.id)} className="text-gray-500 cursor-pointer">
          Cancel
        </button>
      </div>
    ));
  };

  const handleEditClick = (user: TUser) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      await updateUser({
        userId: editingUser._id,
        role: formData.role,
      }).unwrap();
      toast.success('User updated successfully');
      setIsEditModalOpen(false);
    } catch {
      toast.error('Failed to update user');
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap justify-between items-end gap-4">
          <div className="space-y-1">
            <h1 className="text-[#111418] dark:text-white text-3xl font-black tracking-tight">
              System Users
            </h1>
            <p className="text-[#617289] dark:text-gray-400 text-base">
              Manage personnel roles, access levels, and security status across
              the ORS platform.
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                className="w-full h-11 pl-10 pr-4 bg-background-light dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Search by name, email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <select
                  className="h-11 pl-10 pr-8 bg-background-light dark:bg-gray-800 rounded-lg text-sm font-medium text-[#111418] dark:text-white border border-transparent hover:border-gray-300 outline-none appearance-none transition-all cursor-pointer"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="inspector">Inspector</option>
                  <option value="viewer">Viewer</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617289] dark:text-gray-400">
                    User Details
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617289] dark:text-gray-400">
                    Role
                  </th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#617289] dark:text-gray-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Loader2 className="animate-spin" size={32} />
                        <p className="text-sm font-medium">Loading users...</p>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center">
                      <p className="text-red-500 text-sm font-medium">
                        Failed to load users. Please check your permissions.
                      </p>
                    </td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user: TUser) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="text-sm font-bold text-[#111418] dark:text-white leading-tight">
                              {user.username}
                            </p>
                            <p className="text-xs text-[#617289] dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(user)}
                            className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center">
                      <p className="text-gray-500 text-sm font-medium">
                        No users found.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <UserEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleUpdate}
        isUpdating={isUpdating}
      />
    </main>
  );
};

export default UserManage;
