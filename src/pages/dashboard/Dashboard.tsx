import {
  Calendar,
  TrendingUp,
  AlertTriangle,
  Users,
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-wrap justify-between items-end gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-tight">
            System Overview
          </h1>
          <p className="text-[#617289] dark:text-gray-400 text-sm font-normal">
            Real-time roadworthiness and inspection metrics for current fleet
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-lg text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm cursor-pointer">
            <Calendar size={18} className="text-gray-500" />
            <span>Last 30 Days</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">
              Average ORS Score
            </p>
            <TrendingUp size={20} className="text-[#07883b]" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-[#111418] dark:text-white tracking-tight text-4xl font-extrabold leading-tight">
              78%
            </p>
            <p className="text-[#07883b] text-sm font-bold bg-[#eefaf2] dark:bg-green-500/10 px-2 py-0.5 rounded-full">
              +2.4%
            </p>
          </div>
          <p className="text-[#617289] dark:text-gray-400 text-[12px] mt-2">
            Fleet health is currently within normal parameters.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-start">
            <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">
              Vehicles Requiring Action
            </p>
            <AlertTriangle size={20} className="text-[#e73908]" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-[#111418] dark:text-white tracking-tight text-4xl font-extrabold leading-tight">
              12
            </p>
            <p className="text-[#e73908] text-sm font-bold bg-[#fef2f2] dark:bg-red-500/10 px-2 py-0.5 rounded-full">
              -5%
            </p>
          </div>
          <p className="text-[#617289] dark:text-gray-400 text-[12px] mt-2">
            Requires immediate inspection assignment.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start">
            <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">
              Inspector Activity
            </p>
            <Users size={20} className="text-primary" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-[#111418] dark:text-white tracking-tight text-4xl font-extrabold leading-tight">
              Active
            </p>
            <p className="text-[#617289] dark:text-gray-300 text-sm font-medium border border-[#dbe0e6] dark:border-gray-600 px-2 py-0.5 rounded-full">
              Stable
            </p>
          </div>
          <div className="flex -space-x-2 mt-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="size-6 rounded-full border-2 border-white dark:border-gray-800 bg-cover bg-center bg-gray-100"
                style={{
                  backgroundImage: `url(https://i.pravatar.cc/150?u=${i})`,
                }}
              />
            ))}
            <div className="size-6 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold dark:text-white">
              +5
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#dbe0e6] dark:border-gray-700 p-6 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight">
              Roadworthiness Score Trends
            </h2>
            <p className="text-[#617289] dark:text-gray-400 text-sm">
              Aggregated fleet ORS score performance over time
            </p>
          </div>
          <div className="flex bg-[#f0f2f4] dark:bg-gray-700 rounded-lg p-1">
            <button className="px-3 py-1 text-xs font-bold rounded-md bg-white dark:bg-gray-600 shadow-sm text-primary cursor-pointer">
              Weekly
            </button>
            <button className="px-3 py-1 text-xs font-bold rounded-md text-[#617289] dark:text-gray-300 cursor-pointer">
              Monthly
            </button>
          </div>
        </div>
        <div className="h-64 w-full flex flex-col justify-end">
          <div className="flex-1 flex items-end gap-2 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="border-b border-dashed border-gray-200 dark:border-gray-700 w-full h-0"
                />
              ))}
            </div>
            {[65, 72, 70, 78, 82, 80, 85, 75, 78, 68, 72, 88].map(
              (height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-primary/20 rounded-t relative group hover:bg-primary transition-all duration-300"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                    Day {i + 1}: {height}%
                  </div>
                </div>
              ),
            )}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-[#617289] dark:text-gray-400 uppercase tracking-wider px-2">
            <span>01 Oct</span>
            <span>08 Oct</span>
            <span>15 Oct</span>
            <span>22 Oct</span>
            <span>29 Oct</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#dbe0e6] dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-700">
          <h3 className="text-[#111418] dark:text-white font-bold">
            Recent Inspections
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f8fafc] dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold text-[#617289] dark:text-gray-400 uppercase">
                  Vehicle ID
                </th>
                <th className="px-6 py-3 text-[10px] font-bold text-[#617289] dark:text-gray-400 uppercase">
                  Inspector
                </th>
                <th className="px-6 py-3 text-[10px] font-bold text-[#617289] dark:text-gray-400 uppercase">
                  ORS Score
                </th>
                <th className="px-6 py-3 text-[10px] font-bold text-[#617289] dark:text-gray-400 uppercase text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f4] dark:divide-gray-700">
              {[
                {
                  id: 'UK-4829-BZ',
                  name: 'Marcus Wright',
                  score: '92%',
                  status: 'Passed',
                },
                {
                  id: 'NY-1120-XA',
                  name: 'Sarah Chen',
                  score: '42%',
                  status: 'Failed',
                },
                {
                  id: 'TX-9034-LM',
                  name: 'David Miller',
                  score: '74%',
                  status: 'Pending',
                },
              ].map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-[#111418] dark:text-white">
                    {row.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#617289] dark:text-gray-400">
                    {row.name}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-bold ${
                      row.status === 'Passed'
                        ? 'text-[#07883b]'
                        : row.status === 'Failed'
                          ? 'text-[#e73908]'
                          : 'dark:text-white'
                    }`}
                  >
                    {row.score}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        row.status === 'Passed'
                          ? 'bg-[#eefaf2] text-[#07883b] dark:bg-green-500/10'
                          : row.status === 'Failed'
                            ? 'bg-[#fef2f2] text-[#e73908] dark:bg-red-500/10'
                            : 'bg-[#f0f2f4] text-[#617289] dark:bg-gray-700'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 flex justify-center border-t border-[#f0f2f4] dark:border-gray-700">
          <button className="text-primary text-sm font-bold hover:underline cursor-pointer">
            View All Fleet Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
