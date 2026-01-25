import Skeleton from './Skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-wrap justify-between items-end gap-3 mb-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-xl p-6 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="size-5 rounded-full" />
            </div>
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="h-3 w-40 mt-2" />
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#dbe0e6] dark:border-gray-700 p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
        </div>
        <div className="h-48 flex items-end gap-2 relative">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
            <Skeleton
              key={i}
              className="flex-1 rounded-t"
              style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4 px-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-3 w-12" />
          ))}
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#dbe0e6] dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-700">
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f8fafc] dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-3">
                  <Skeleton className="h-3 w-20" />
                </th>
                <th className="px-6 py-3">
                  <Skeleton className="h-3 w-12 mx-auto" />
                </th>
                <th className="px-6 py-3">
                  <Skeleton className="h-3 w-16 ml-auto" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f4] dark:divide-gray-700">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-24" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-12 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Skeleton className="h-6 w-16 ml-auto rounded" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
