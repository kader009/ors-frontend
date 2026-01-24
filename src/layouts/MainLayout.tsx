import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { logout } from '../redux/features/authentication/authSlice';
import toast from 'react-hot-toast';

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  console.log(user)

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth/login');
    toast.success('Successfully logged out!');
  };

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
            className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <span>Dashboard</span>
          </Link>
          <Link
            to="/ors"
            className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <span>ORS Plans</span>
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/users"
              className="flex items-center p-3 text-gray-700 dark:text-gray-200 hover:bg-primary/10 rounded-lg transition-colors"
            >
              <span>Users</span>
            </Link>
          )}
        </nav>
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors px-4"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-white dark:bg-[#1c2632] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8">
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            Welcome, {user?.username}
          </h1>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase">
              {user?.role}
            </span>
          </div>
        </header>

        {/* Content Area */}
        <section className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default MainLayout;
