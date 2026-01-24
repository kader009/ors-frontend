import { useAppSelector } from '../../redux/hook';
import {
  useAllOrsPlanQuery,
  useOrsDeleteMutation,
} from '../../redux/api/endApi';
import { Loader2, AlertCircle, Pencil, Trash2 } from 'lucide-react';
import type { TORSPlan } from '../../types/ors';
import toast from 'react-hot-toast';

const ORSList = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useAllOrsPlanQuery(undefined);
  const [deleteOrs] = useOrsDeleteMutation();

  const plans = data?.data || [];

  const canModify = user?.role === 'admin' || user?.role === 'inspector';

  const handleOrsDelete = (orsId: string) => {
    toast((t) => (
      <div className="flex items-center gap-4 text-sm font-semibold">
        <span>Permanently delete?</span>
        <button
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              await deleteOrs(orsId).unwrap();
              toast.success('ORS plan deleted');
            } catch {
              toast.error('Failed to delete');
            }
          }}
          className="text-red-600 hover:underline cursor-pointer"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="text-gray-500 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    ));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold dark:text-white">
            ORS Plans Management
          </h1>
          <p>
            Monitor and manage vehicle operational roadworthiness scores for the
            North region.
          </p>
        </div>
        {canModify && (
          <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-md active:scale-95">
            + New ORS Plan
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-[#1c2632] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-[#101822] border-b border-gray-100 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Vehicle
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Score
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Loader2 className="animate-spin" size={32} />
                    <p className="text-sm font-medium">Loading ORS plans...</p>
                  </div>
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center">
                  <div className="flex flex-col items-center gap-2 text-red-500">
                    <AlertCircle size={32} />
                    <p className="text-sm font-medium">
                      Failed to load ORS plans.
                    </p>
                  </div>
                </td>
              </tr>
            ) : plans.length > 0 ? (
              plans.map((item: TORSPlan) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium dark:text-gray-200">
                    {item.vehicle}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold ${parseInt(item.roadWorthinessScore) > 80 ? 'text-green-500' : 'text-orange-500'}`}
                    >
                      {item.roadWorthinessScore}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        ['A', 'B', 'Good'].includes(item.overallTrafficScore)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {item.overallTrafficScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {canModify && (
                        <>
                          <button
                            className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Pencil size={18} />
                          </button>
                          {user?.role === 'admin' && (
                            <button
                              onClick={() => handleOrsDelete(item._id)}
                              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center">
                  <p className="text-gray-500 text-sm font-medium">
                    No ORS plans found.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ORSList;
