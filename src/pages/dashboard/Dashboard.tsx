const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1c2632] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Total Vehicles
          </p>
          <h3 className="text-2xl font-bold dark:text-white">124</h3>
        </div>
        <div className="bg-white dark:bg-[#1c2632] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm">Avg. Score</p>
          <h3 className="text-2xl font-bold text-green-500">82%</h3>
        </div>
        <div className="bg-white dark:bg-[#1c2632] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Pending Actions
          </p>
          <h3 className="text-2xl font-bold text-red-500">12</h3>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1c2632] p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-bold mb-4 dark:text-white">
          Recent Activity
        </h2>
        <div className="text-gray-500 dark:text-gray-400">
          Activity chart or list will be here...
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
