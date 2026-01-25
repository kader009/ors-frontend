import Skeleton from './Skeleton';

const ORSListSkeleton = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </div>

      {/* Filter Bar Skeleton */}
      <div className="bg-white dark:bg-[#1c2632] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-11 w-32 rounded-lg" />
            <Skeleton className="h-11 w-40 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-[#1c2632] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-[#101822] border-b border-gray-100 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4">
                <Skeleton className="h-3 w-20" />
              </th>
              <th className="px-6 py-4">
                <Skeleton className="h-3 w-16" />
              </th>
              <th className="px-6 py-4">
                <Skeleton className="h-3 w-24" />
              </th>
              <th className="px-6 py-4 text-right">
                <Skeleton className="h-3 w-16 ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-4 w-12" />
                </td>
                <td className="px-6 py-4">
                  <Skeleton className="h-6 w-20 rounded-full" />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="size-9 rounded-lg" />
                    <Skeleton className="size-9 rounded-lg" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ORSListSkeleton;
