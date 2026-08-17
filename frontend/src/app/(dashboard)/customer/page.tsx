"use client";

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useAuthStore } from '@/hooks/use-auth-store';

export default function CustomerDashboardOverview() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await fetchApi('/bookings/my-bookings');
        setBookings(data);
      } catch (err) {
        console.error('Failed to load bookings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const upcomingBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING_PAYMENT');
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED');

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading your dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8">
        Welcome Back, {user?.name || 'Customer'}!
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow px-5 py-6 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 truncate">Upcoming Bookings</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{upcomingBookings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow px-5 py-6 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 truncate">Completed Shoots</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{completedBookings.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow px-5 py-6 border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 truncate">Total Spent</h3>
          <p className="mt-1 text-3xl font-semibold text-gray-900">
            ₹{bookings.reduce((sum, b) => sum + (b.pricing?.totalPrice || 0), 0).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Recent Bookings</h2>
        
        {bookings.length === 0 ? (
          <div className="bg-white shadow rounded-md p-8 text-center text-gray-500">
            You have no bookings yet. Time to book your first shoot!
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <li key={booking._id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-black truncate">Booking {booking.bookingId}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                          booking.status === 'PENDING_PAYMENT' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex flex-col space-y-1">
                        <p className="flex items-center text-sm text-gray-500">
                          Total Price: ₹{booking.pricing?.totalPrice?.toLocaleString()}
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                          Location: {booking.location?.address}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Date: <time dateTime={booking.scheduledDate}>{new Date(booking.scheduledDate).toLocaleDateString()}</time>
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
