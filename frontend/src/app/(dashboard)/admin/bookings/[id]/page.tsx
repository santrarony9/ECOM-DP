"use client";

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Surcharge state
  const [surchargeName, setSurchargeName] = useState('');
  const [surchargeAmount, setSurchargeAmount] = useState(0);
  const [surchargeReason, setSurchargeReason] = useState('');
  const [isAddingSurcharge, setIsAddingSurcharge] = useState(false);

  useEffect(() => {
    loadBooking();
  }, [id]);

  async function loadBooking() {
    try {
      const data = await fetchApi(`/bookings/${id}`);
      setBooking(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    try {
      await fetchApi(`/bookings/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      loadBooking();
    } catch (error) {
      alert('Failed to update status');
    }
  }

  async function handleAddSurcharge(e: React.FormEvent) {
    e.preventDefault();
    setIsAddingSurcharge(true);
    try {
      await fetchApi(`/bookings/${id}/surcharge`, {
        method: 'POST',
        body: JSON.stringify({ name: surchargeName, amount: Number(surchargeAmount), reason: surchargeReason })
      });
      setSurchargeName('');
      setSurchargeAmount(0);
      setSurchargeReason('');
      loadBooking();
    } catch (error) {
      alert('Failed to add surcharge');
    } finally {
      setIsAddingSurcharge(false);
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-500">Loading booking details...</div>;
  if (!booking) return <div className="p-8 text-center text-red-500">Booking not found</div>;

  return (
    <div>
      <div className="flex items-center space-x-4 mb-8">
        <Link href="/admin/bookings" className="text-blue-600 hover:underline">← Back to Bookings</Link>
        <h1 className="text-2xl font-bold text-gray-900">Booking: {booking.bookingId}</h1>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          booking.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
          booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Customer & Event Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Customer Name</p>
                <p className="font-bold text-gray-900">{booking.customerId?.name || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Customer Contact</p>
                <p className="text-gray-900">{booking.customerId?.email} | {booking.customerId?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Scheduled Date</p>
                <p className="font-bold text-gray-900">{new Date(booking.scheduledDate).toLocaleDateString()} ({booking.startTime} - {booking.endTime})</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Location</p>
                <p className="text-gray-900">{booking.location?.address}, {booking.location?.city} - {booking.location?.pincode}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2">Service Breakdown</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Service</span>
                <span className="font-medium text-gray-900">{booking.serviceId?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Package</span>
                <span className="font-medium text-gray-900">{booking.packageId?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price</span>
                <span className="font-medium text-gray-900">₹{booking.pricing.basePrice}</span>
              </div>
              {booking.pricing.extraHoursPrice > 0 && (
                <div className="flex justify-between text-blue-700 font-medium bg-blue-50 p-2 rounded">
                  <span>Extra Flexible Hours ({booking.extraHoursBooked} hrs)</span>
                  <span>+₹{booking.pricing.extraHoursPrice}</span>
                </div>
              )}
              {booking.pricing.addonsPrice > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Addons Total</span>
                  <span className="font-medium text-gray-900">+₹{booking.pricing.addonsPrice}</span>
                </div>
              )}
              {booking.pricing.deliveryCharge > 0 && (
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Travel/Delivery Charge</span>
                  <span>+₹{booking.pricing.deliveryCharge}</span>
                </div>
              )}
            </div>
            
            {booking.pricing.surcharges && booking.pricing.surcharges.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-bold text-red-600 mb-2">Applied Surcharges</h3>
                {booking.pricing.surcharges.map((s: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm text-red-700 mb-1">
                    <span>{s.name} {s.reason && <span className="text-gray-500">({s.reason})</span>}</span>
                    <span className="font-bold">+₹{s.amount}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 border-t pt-4 flex justify-between items-center text-lg font-black">
              <span>Total Price</span>
              <span>₹{booking.pricing.totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-green-600 font-bold">Advance Paid</span>
              <span className="text-green-600">₹{booking.pricing.advancePaid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center mt-1 text-md font-bold text-blue-800 bg-blue-50 p-2 rounded mt-2">
              <span>Balance Due</span>
              <span>₹{booking.pricing.balanceDue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-8">
          {/* Status Manager */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4 border-l-blue-500">
            <h2 className="text-lg font-bold mb-4">Manage Status</h2>
            <select 
              value={booking.status} 
              onChange={handleStatusChange}
              className="w-full p-2 border border-gray-300 rounded-md font-bold"
            >
              <option value="PENDING_PAYMENT">Pending Payment</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="ASSIGNED">Assigned to Photographer</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Surcharge Manager */}
          <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 border-t-4 border-t-red-500">
            <h2 className="text-lg font-bold text-red-700 mb-1">Add Surcharge</h2>
            <p className="text-xs text-gray-500 mb-4">Add a manual fee (e.g. late night travel, extra equipment). This increases the balance due.</p>
            
            <form onSubmit={handleAddSurcharge} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700">Fee Name</label>
                <input required type="text" value={surchargeName} onChange={e => setSurchargeName(e.target.value)} placeholder="e.g. Outstation Travel" className="mt-1 block w-full p-2 border rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Amount (₹)</label>
                <input required type="number" value={surchargeAmount} onChange={e => setSurchargeAmount(Number(e.target.value))} className="mt-1 block w-full p-2 border rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Reason (Optional)</label>
                <input type="text" value={surchargeReason} onChange={e => setSurchargeReason(e.target.value)} className="mt-1 block w-full p-2 border rounded-md text-sm" />
              </div>
              <button type="submit" disabled={isAddingSurcharge} className="w-full bg-red-600 text-white font-bold py-2 rounded-md hover:bg-red-700 transition">
                {isAddingSurcharge ? 'Adding...' : 'Apply Surcharge'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
