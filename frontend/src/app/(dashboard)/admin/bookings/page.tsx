export default function AdminBookingsPage() {
  const bookings = [
    { id: 'B-1001', customer: 'Jane Doe', service: 'Wedding Photography', date: '2026-09-15', status: 'Confirmed', amount: '$1,500' },
    { id: 'B-1002', customer: 'John Smith', service: 'Portrait Session', date: '2026-08-20', status: 'Pending', amount: '$250' },
    { id: 'B-1003', customer: 'Alice Johnson', service: 'Corporate Event', date: '2026-08-25', status: 'Confirmed', amount: '$800' },
    { id: 'B-1004', customer: 'Bob Williams', service: 'Family Photoshoot', date: '2026-09-02', status: 'Cancelled', amount: '$300' },
    { id: 'B-1005', customer: 'Charlie Brown', service: 'Engagement Session', date: '2026-10-10', status: 'Confirmed', amount: '$450' },
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold leading-6 text-gray-900">Bookings</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all bookings including customer name, service, date, and status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export CSV
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Booking ID</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Customer</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Service</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{booking.id}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.customer}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.service}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.date}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.amount}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          booking.status === 'Confirmed' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                          booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                          'bg-red-50 text-red-700 ring-red-600/10'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">View<span className="sr-only">, {booking.id}</span></a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
