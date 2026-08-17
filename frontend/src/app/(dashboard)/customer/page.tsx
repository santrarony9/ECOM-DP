export default function CustomerDashboardOverview() {
  const bookings = [
    { id: 'B-1052', service: 'Family Photoshoot', date: '2026-09-02', status: 'Upcoming' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8">
        Welcome Back!
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow px-5 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Upcoming Bookings</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">1</p>
        </div>
        <div className="bg-white rounded-lg shadow px-5 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Completed Shoots</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">3</p>
        </div>
        <div className="bg-white rounded-lg shadow px-5 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Gallery Items</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">142</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Next Shoot</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {bookings.map((booking) => (
              <li key={booking.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">{booking.service}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {booking.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Booking ID: {booking.id}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>
                        Date: <time dateTime={booking.date}>{booking.date}</time>
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
