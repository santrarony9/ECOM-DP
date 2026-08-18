"use client";

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';

export default function AdminDashboardOverview() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await fetchApi('/bookings/all');
        setBookings(data);
      } catch (err) {
        console.error('Failed to load global bookings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.pricing?.totalPrice || 0), 0);
  const activeBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING_PAYMENT');
  const completedBookings = bookings.filter(b => b.status === 'COMPLETED');

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading analytics...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-8">
        Platform Overview
      </h1>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Total Revenue</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Total Bookings</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">{bookings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Active Bookings</h3>
          <p className="mt-2 text-3xl font-bold text-black">{activeBookings.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-6">
          <h3 className="text-sm font-medium text-gray-500 truncate">Completed Shoots</h3>
          <p className="mt-2 text-3xl font-bold text-green-600">{completedBookings.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col items-center justify-center text-gray-400 py-20">
        <p>Charts and deep analytics will go here in Phase 2.</p>
        <p className="text-sm mt-2">Navigate to "Bookings" in the sidebar to see all records.</p>
      </div>
    </div>
  );
}
