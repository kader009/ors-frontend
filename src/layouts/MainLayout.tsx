import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { logout } from '../redux/features/authentication/authSlice';
import { baseApi } from '../redux/api/baseApi';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate('/auth/login');
    toast.success('Successfully logged out!');
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // close sidebar on route change
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#1c2632] border-r border-gray-200 dark:border-gray-800 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">ORS Tracker</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 rounded-lg transition-colors font-medium"
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/ors"
            className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 rounded-lg transition-colors font-medium"
          >
            <FileText size={20} />
            <span>ORS Plans</span>
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/users"
              className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 rounded-lg transition-colors font-medium"
            >
              <Users size={20} />
              <span>Users</span>
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors px-4 font-semibold cursor-pointer"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white dark:bg-[#1c2632] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>

            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              Welcome, {user?.username}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
              {user?.role}
            </span>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/30"
              onClick={closeSidebar}
              aria-hidden
            />
            <aside className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-[#1c2632] border-r border-gray-200 dark:border-gray-800 shadow-lg flex flex-col">
              <div className="p-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-primary">ORS Tracker</h2>
                <button
                  onClick={closeSidebar}
                  className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 px-4 space-y-2">
                <Link
                  to="/dashboard"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 rounded-lg transition-colors font-medium"
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/ors"
                  onClick={closeSidebar}
                  className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 rounded-lg transition-colors font-medium"
                >
                  <FileText size={20} />
                  <span>ORS Plans</span>
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/users"
                    onClick={closeSidebar}
                    className="flex items-center gap-3 p-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 rounded-lg transition-colors font-medium"
                  >
                    <Users size={20} />
                    <span>Users</span>
                  </Link>
                )}
              </nav>
              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => {
                    closeSidebar();
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors px-4 font-semibold cursor-pointer"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
