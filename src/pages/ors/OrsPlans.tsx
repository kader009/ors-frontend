import { useAppSelector } from '../../redux/hook';
import {
  useAllOrsPlanQuery,
  useOrsDeleteMutation,
} from '../../redux/api/endApi';
import {
  AlertCircle,
  Pencil,
  Trash2,
  Search,
  Filter,
  ChevronDown,
} from 'lucide-react';
import type { TORSPlan } from '../../types/ors';
import toast from 'react-hot-toast';
import { useState } from 'react';
import ORSPlanModal from '../../components/ORSPlanModal';
import ORSUpdateModal from '../../components/ORSUpdateModal';
import TableRowSkeleton from '../../components/skeletons/TableRowSkeleton';
import Skeleton from '../../components/skeletons/Skeleton';

const ORSList = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading, isError } = useAllOrsPlanQuery(undefined);
  const [deleteOrs] = useOrsDeleteMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<TORSPlan | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [scoreFilter, setScoreFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const plans = data?.data || [];

  // If the current user is an inspector, only show plans assigned to them
  // or created by them. Admins and viewers see all (admins can modify).
  const extractUserId = (ref?: string | { _id?: string } | null) =>
    typeof ref === 'string'
      ? ref
      : ref && typeof ref === 'object'
        ? ref._id
        : undefined;

  const visiblePlans =
    user?.role === 'inspector'
      ? plans.filter((plan: TORSPlan) => {
          const assignedId = extractUserId(plan.assignedTo);
          const createdId = extractUserId(plan.createdBy);
          return (
            String(assignedId) === String(user?._id) ||
            String(createdId) === String(user?._id)
          );
        })
      : plans;

  const filteredPlans = visiblePlans.filter((plan: TORSPlan) => {
    const matchesSearch = plan.vehicle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesScore =
      scoreFilter === 'all' || plan.overallTrafficScore === scoreFilter;

    let matchesStatus = true;
    if (statusFilter === 'high')
      matchesStatus = parseInt(plan.roadWorthinessScore) >= 80;
    if (statusFilter === 'medium')
      matchesStatus =
        parseInt(plan.roadWorthinessScore) >= 60 &&
        parseInt(plan.roadWorthinessScore) < 80;
    if (statusFilter === 'low')
      matchesStatus = parseInt(plan.roadWorthinessScore) < 60;

    return matchesSearch && matchesScore && matchesStatus;
  });

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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center md:flex-nowrap gap-4">
        <div className="flex flex-col flex-1 min-w-0">
          <h1 className="text-[#111418] dark:text-white text-3xl font-black tracking-tight">
            Ors Plans Management
          </h1>
          <p className="text-[#617289] dark:text-gray-400 text-sm font-normal">
            Monitor and manage vehicle operational roadworthiness scores.
          </p>
        </div>
        {canModify && (
          <div className="w-full md:w-auto md:shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-4 py-3 md:py-2 rounded-lg font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              + New ORS Plan
            </button>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-[#1c2632] p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="w-full h-11 pl-10 pr-4 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none dark:text-white"
              placeholder="Search by vehicle ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                className="h-11 pl-10 pr-8 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs font-bold dark:text-white outline-none appearance-none cursor-pointer border-none"
                value={scoreFilter}
                onChange={(e) => setScoreFilter(e.target.value)}
              >
                <option value="all">All Grades</option>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
                <option value="Failed">Failed</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            <div className="relative">
              <select
                className="h-11 px-4 pr-8 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs font-bold dark:text-white outline-none appearance-none cursor-pointer border-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="high">High Score (80%+)</option>
                <option value="medium">Average (60-79%)</option>
                <option value="low">At Risk (60%)</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <ORSPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ORSUpdateModal
        isOpen={!!selectedPlan}
        planData={selectedPlan}
        onClose={() => setSelectedPlan(null)}
      />

      <div className="bg-white dark:bg-[#1c2632] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-160">
            <thead className="bg-gray-50 dark:bg-[#101822] border-b border-gray-100 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                  Vehicle
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                  Score
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">
                  Traffic Grade
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <TableRowSkeleton
                  rows={8}
                  renderRows={() => (
                    <>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-12" />
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Skeleton className="size-9 rounded-lg" />
                          <Skeleton className="size-9 rounded-lg" />
                        </div>
                      </td>
                    </>
                  )}
                />
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
              ) : filteredPlans.length > 0 ? (
                filteredPlans.map((item: TORSPlan) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium dark:text-gray-200">
                      {item.vehicle}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-bold ${
                          parseInt(item.roadWorthinessScore) >= 80
                            ? 'text-green-500'
                            : parseInt(item.roadWorthinessScore) >= 60
                              ? 'text-orange-500'
                              : 'text-red-500'
                        }`}
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
                              onClick={() => setSelectedPlan(item)}
                              className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer"
                              title="Edit"
                            >
                              <Pencil size={18} />
                            </button>
                            {user?.role === 'admin' && (
                              <button
                                onClick={() => handleOrsDelete(item._id)}
                                className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
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
    </div>
  );
};

export default ORSList;
