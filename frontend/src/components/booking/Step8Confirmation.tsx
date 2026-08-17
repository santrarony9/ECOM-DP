"use client";

import { useBookingStore } from '@/hooks/use-booking-store';
import Link from 'next/link';
import { useState } from 'react';

export function Step8Confirmation() {
  const { data, submitBooking } = useBookingStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  // Mock pricing logic for display (this would normally come from the backend response)
  const basePrice = 15000;
  const addonsCount = data.addonIds?.length || 0;
  const addonsPrice = addonsCount * 5000; // Mock average addon price
  const extraHours = data.timeFlexibility === 'FLEXIBLE' ? (data.extraHoursBooked || 0) : 0;
  const extraHoursPrice = extraHours * 3000; // Mock extra hour rate
  const deliveryCharge = 500;
  
  const totalPrice = basePrice + addonsPrice + extraHoursPrice + deliveryCharge;
  const advanceToPay = totalPrice * 0.2;

  const handlePayment = async () => {
    setLoading(true);
    setError('');
    try {
      await submitBooking();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-5xl mx-auto mb-6">
          🎉
        </div>
        <h2 className="text-3xl font-bold mb-4">Booking Successful!</h2>
        <p className="text-gray-500 mb-8">
          Your booking has been successfully saved to our database. Our team will contact you shortly to confirm the photographer assignment.
        </p>
        <Link href="/" className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition font-bold shadow-lg inline-block">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Almost Done!</h2>
        <p className="text-gray-500">Review your order summary and pay the advance to confirm.</p>
      </div>
      
      <div className="bg-gray-50 p-6 rounded-xl border mb-8">
        <h3 className="font-bold text-lg mb-4 border-b pb-2">Order Summary</h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Base Package</span>
            <span className="font-medium text-black">₹{basePrice.toLocaleString()}</span>
          </div>
          
          {addonsCount > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Add-ons ({addonsCount})</span>
              <span className="font-medium text-black">+₹{addonsPrice.toLocaleString()}</span>
            </div>
          )}

          {extraHours > 0 && (
            <div className="flex justify-between text-gray-600">
              <span>Extra Hours ({extraHours} hr)</span>
              <span className="font-medium text-black">+₹{extraHoursPrice.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between text-gray-600">
            <span>Delivery & Handling</span>
            <span className="font-medium text-black">+₹{deliveryCharge.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total Price</span>
            <span>₹{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-green-600 mt-2 font-semibold">
            <span>Advance to Pay Now (20%)</span>
            <span>₹{advanceToPay.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-center text-sm font-medium">
          {error}
        </div>
      )}

      <div className="flex flex-col space-y-3">
        <button 
          onClick={handlePayment}
          disabled={loading}
          className="disabled:opacity-50 w-full bg-black text-white px-6 py-4 rounded-xl hover:bg-gray-800 transition font-bold shadow-lg flex justify-center items-center"
        >
          {loading ? 'Processing...' : `Pay ₹${advanceToPay.toLocaleString()}`}
        </button>
        <Link href="/" className="w-full text-center text-gray-600 px-6 py-4 rounded-xl hover:bg-gray-50 transition font-medium">
          Cancel & Return Home
        </Link>
      </div>
    </div>
  );
}
