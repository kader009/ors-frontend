import { X, ChevronDown, Loader2 } from 'lucide-react';

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    username: string;
    email: string;
    role: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isUpdating: boolean;
}

const UserEditModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  isUpdating,
}: UserEditModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-[#1c2632] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">
            Edit User Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSubmit} className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full h-11 px-4 bg-gray-50 dark:bg-[#101822] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full h-11 px-4 bg-gray-50 dark:bg-[#101822] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">
              Role Selection
            </label>
            <div className="relative">
              <select
                className="w-full h-11 px-4 bg-gray-50 dark:bg-[#101822] border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="admin">Admin</option>
                <option value="inspector">Inspector</option>
                <option value="viewer">Viewer</option>
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 px-4 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#101822] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 h-11 px-4 bg-primary text-white rounded-xl text-sm font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center cursor-pointer"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                'Update User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
