import { Calendar, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { useAllOrsPlanQuery, useAllUserQuery } from '../../redux/api/endApi';
import { useAppSelector } from '../../redux/hook';
import type { TORSPlan } from '../../types/ors';
import type { TUser } from '../../types/user';
import DashboardSkeleton from '../../components/skeletons/DashboardSkeleton';

const Dashboard = () => {
  const {
    data: orsData,
    isLoading: isOrsLoading,
    isError: isOrsError,
  } = useAllOrsPlanQuery(undefined);
  const { data: userData, isLoading: isUserLoading } =
    useAllUserQuery(undefined);

  const plans: TORSPlan[] = orsData?.data || [];
  const { user } = useAppSelector((s) => s.user);

  const extractUserId = (ref?: string | { _id?: string } | null) =>
    typeof ref === 'string'
      ? ref
      : ref && typeof ref === 'object'
        ? ref._id
        : undefined;

  // If inspector, only show plans assigned to them or created by them
  const visiblePlans =
    user?.role === 'inspector'
      ? plans.filter((plan) => {
          const assignedId = extractUserId(plan.assignedTo);
          const createdId = extractUserId(plan.createdBy);
          return (
            String(assignedId) === String(user?._id) ||
            String(createdId) === String(user?._id)
          );
        })
      : plans;
  const users: TUser[] = userData?.users || [];

  const inspectors = users.filter((user) => user.role === 'inspector');

  // Descriptive dynamic helpers
  const parseScore = (value: string | number | undefined): number =>
    parseInt(String(value)) || 0;

  const formatShortDate = (dateString?: string): string =>
    dateString
      ? new Intl.DateTimeFormat('en-GB', {
          day: '2-digit',
          month: 'short',
        }).format(new Date(dateString))
      : 'Jan';

  const averageScore = visiblePlans.length
    ? Math.round(
        visiblePlans.reduce(
          (accumulator, plan) =>
            accumulator + parseScore(plan.roadWorthinessScore),
          0,
        ) / visiblePlans.length,
      )
    : 0;

  const actionRequiredCount = visiblePlans.filter(
    (plan) => parseScore(plan.roadWorthinessScore) < 60,
  ).length;
  const recentInspections = [...visiblePlans].slice(-5).reverse();
  const summaryChartPlans = visiblePlans.slice(-12);

  // Dynamic header date (Last 30 Days)
  const today = new Date();
  const thirtyDaysAgo = new Date(new Date().setDate(today.getDate() - 30));
  const dateRangeLabel = `${formatShortDate(thirtyDaysAgo.toISOString())} - ${formatShortDate(today.toISOString())}`;

  if (isOrsLoading || isUserLoading) return <DashboardSkeleton />;

  if (isOrsError)
    return (
      <div className="p-8 text-red-500 font-bold text-center">
        Connection Error.
      </div>
    );

  const avatarColors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-emerald-500',
    'bg-amber-500',
    'bg-pink-500',
    'bg-indigo-500',
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto w-full space-y-6">
      <div className="flex flex-wrap justify-between items-end gap-3 mb-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[#111418] dark:text-white text-3xl font-black leading-tight tracking-tight">
            System Overview
          </h1>
          <p className="text-[#617289] dark:text-gray-400 text-sm font-normal">
            Real-time roadworthiness and inspection metrics
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 rounded-lg text-sm font-bold text-[#111418] dark:text-white hover:bg-gray-50 transition-colors shadow-sm cursor-pointer border-none outline-none">
            <Calendar size={18} className="text-gray-500" />
            <span>{dateRangeLabel}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">
              Average ORS Score
            </p>
            <TrendingUp size={20} className="text-[#07883b]" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-[#111418] dark:text-white tracking-tight text-4xl font-extrabold leading-tight">
              {averageScore}%
            </p>
            <p className="text-[#07883b] text-sm font-bold bg-[#eefaf2] dark:bg-green-500/10 px-2 py-0.5 rounded-full">
              Live
            </p>
          </div>
          <p className="text-[#617289] dark:text-gray-400 text-[12px] mt-2">
            Based on {visiblePlans.length} active records.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">
              Vehicles Requiring Action
            </p>
            <AlertTriangle size={20} className="text-[#e73908]" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-[#111418] dark:text-white tracking-tight text-4xl font-extrabold leading-tight">
              {actionRequiredCount}
            </p>
          </div>
          <p className="text-[#617289] dark:text-gray-400 text-[12px] mt-2">
            Units recording scores below 60%.
          </p>
        </div>

        {/* Inspector Activity (Dynamic UI) */}
        <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-gray-800 border border-[#dbe0e6] dark:border-gray-700 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start">
            <p className="text-[#617289] dark:text-gray-400 text-sm font-medium">
              Inspector Activity
            </p>
            <Users size={20} className="text-primary" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-[#111418] dark:text-white tracking-tight text-4xl font-extrabold leading-tight">
              {inspectors.length > 0 ? inspectors.length : '0'} Active
            </p>
          </div>
          <div className="flex -space-x-2 mt-2">
            {inspectors.slice(0, 4).map((inspector, index) => (
              <div
                key={inspector._id}
                title={inspector.username}
                className={`size-7 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center text-[10px] font-bold text-white shadow-sm transition-transform hover:scale-110 cursor-default ${avatarColors[index % avatarColors.length]}`}
              >
                {inspector.username.substring(0, 2).toUpperCase()}
              </div>
            ))}
            {inspectors.length > 4 && (
              <div className="size-7 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold dark:text-white outline-none">
                +{inspectors.length - 4}
              </div>
            )}
            {inspectors.length === 0 && (
              <p className="text-[10px] text-gray-400 italic">
                No inspectors onboarded yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#dbe0e6] dark:border-gray-700 p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-[#111418] dark:text-white text-xl font-bold leading-tight">
              Score Trends
            </h2>
            <p className="text-[#617289] dark:text-gray-400 text-sm tracking-tight">
              Progression of vehicle readiness
            </p>
          </div>
        </div>
        <div className="h-48 flex items-end gap-2 relative">
          <div className="absolute inset-0 flex flex-col justify-between opacity-20 pointer-events-none">
            {[1, 2, 3, 4].map((gridLineIndex) => (
              <div
                key={gridLineIndex}
                className="border-b border-dashed border-gray-400 dark:border-gray-600 w-full"
              />
            ))}
          </div>
          {summaryChartPlans.map((chartPlan) => (
            <div
              key={chartPlan._id}
              className="flex-1 bg-primary/20 rounded-t relative group hover:bg-primary transition-all duration-300"
              style={{
                height: `${parseScore(chartPlan.roadWorthinessScore)}%`,
              }}
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-700 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-xl whitespace-nowrap">
                {chartPlan.vehicle}: {chartPlan.roadWorthinessScore}% <br />{' '}
                {formatShortDate(chartPlan.createdAt)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-[10px] font-bold text-[#617289] dark:text-gray-400 uppercase tracking-widest px-2 font-mono">
          {summaryChartPlans
            .filter((_, planIndex) => planIndex % 3 === 0)
            .map((planLabel) => (
              <span key={planLabel._id}>
                {formatShortDate(planLabel.createdAt)}
              </span>
            ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[#dbe0e6] dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-[#f0f2f4] dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-[#111418] dark:text-white font-bold">
            Recent Inspections
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#f8fafc] dark:bg-gray-900/50">
              <tr className="text-[10px] font-bold text-[#617289] uppercase tracking-wider">
                <th className="px-6 py-3">Vehicle ID</th>
                <th className="px-6 py-3 text-center">Score</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f2f4] dark:divide-gray-700">
              {recentInspections.map((inspectionRow) => (
                <tr
                  key={inspectionRow._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors text-sm dark:text-gray-300"
                >
                  <td className="px-6 py-4 font-bold">
                    {inspectionRow.vehicle}
                  </td>
                  <td
                    className={`px-6 py-4 text-center font-black ${
                      parseScore(inspectionRow.roadWorthinessScore) >= 80
                        ? 'text-[#07883b]'
                        : parseScore(inspectionRow.roadWorthinessScore) >= 60
                          ? 'text-orange-500'
                          : 'text-red-500'
                    }`}
                  >
                    {String(inspectionRow.roadWorthinessScore).replace('%', '')}
                    %
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        ['A', 'B', 'Good'].includes(
                          inspectionRow.overallTrafficScore,
                        )
                          ? 'bg-green-50 text-green-600 dark:bg-green-500/10'
                          : inspectionRow.overallTrafficScore === 'C'
                            ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10'
                            : 'bg-red-50 text-red-600 dark:bg-red-500/10'
                      }`}
                    >
                      {['A', 'B', 'Good'].includes(
                        inspectionRow.overallTrafficScore,
                      )
                        ? 'Passed'
                        : inspectionRow.overallTrafficScore === 'C'
                          ? 'Average'
                          : inspectionRow.overallTrafficScore}
                    </span>
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

export default Dashboard;
