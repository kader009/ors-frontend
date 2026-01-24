import { useAppSelector } from '../../redux/hook';

const ORSList = () => {
  const { user } = useAppSelector((state) => state.user);

  const canModify = user?.role === 'admin' || user?.role === 'inspector';

  const dummyData = [
    {
      id: 1,
      vehicle: 'Truck-12',
      score: '78%',
      status: 'Action Required',
      action: 'Replace brake pads',
    },
    { id: 2, vehicle: 'Van-04', score: '92%', status: 'Good', action: 'None' },
    {
      id: 3,
      vehicle: 'Bus-21',
      score: '65%',
      status: 'Action Required',
      action: 'Tire replacement',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold dark:text-white">Vehicle ORS Plans</h2>
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
            {dummyData.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <td className="px-6 py-4 font-medium dark:text-gray-200">
                  {item.vehicle}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`font-bold ${parseInt(item.score) > 80 ? 'text-green-500' : 'text-orange-500'}`}
                  >
                    {item.score}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded-full ${item.status === 'Good' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="text-primary hover:underline text-sm font-medium">
                      View
                    </button>
                    {canModify && (
                      <>
                        <button className="text-blue-500 hover:underline text-sm font-medium">
                          Edit
                        </button>
                        {user?.role === 'admin' && (
                          <button className="text-red-500 hover:underline text-sm font-medium">
                            Delete
                          </button>
                        )}
                      </>
                    )}
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

export default ORSList;
