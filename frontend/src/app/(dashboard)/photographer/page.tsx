export default function PhotographerDashboardOverview() {
  const assignments = [
    { id: 'A-2041', customer: 'Jane Doe', type: 'Wedding', date: '2026-09-15', location: 'Grand Hotel', status: 'Confirmed' },
    { id: 'A-2042', customer: 'John Smith', type: 'Portrait', date: '2026-08-20', location: 'City Park', status: 'Action Required' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8">
        Upcoming Schedule
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow px-5 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Pending Shoots</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">4</p>
        </div>
        <div className="bg-white rounded-lg shadow px-5 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Completed This Month</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">12</p>
        </div>
        <div className="bg-white rounded-lg shadow px-5 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Estimated Earnings</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">$3,250</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Assignments</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <li key={assignment.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {assignment.type} for {assignment.customer}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        assignment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {assignment.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {assignment.location}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        <time dateTime={assignment.date}>{assignment.date}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
