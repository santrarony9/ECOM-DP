export default function AdminDashboardOverview() {
  const stats = [
    { name: 'Total Revenue', stat: '$71,897', change: '12%', changeType: 'increase' },
    { name: 'Active Bookings', stat: '58', change: '2.02%', changeType: 'increase' },
    { name: 'Completed Sessions', stat: '24.57k', change: '3.1%', changeType: 'decrease' },
    { name: 'New Users', stat: '2,401', change: '10%', changeType: 'increase' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8">
        Analytics Overview
      </h1>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                {/* Icon placeholder */}
                <div className="h-6 w-6 text-white bg-indigo-400 rounded-sm"></div>
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.changeType === 'increase' ? '+' : '-'}{item.change}
              </p>
            </dd>
          </div>
        ))}
      </dl>

      {/* Placeholder for charts */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6 h-96 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
          Revenue Chart Placeholder
        </div>
        <div className="bg-white rounded-lg shadow p-6 h-96 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
          Bookings Chart Placeholder
        </div>
      </div>
    </div>
  );
}
