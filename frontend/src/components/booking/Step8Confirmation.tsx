"use client";

import { useBookingStore } from '@/hooks/use-booking-store';
import Link from 'next/link';

export function Step8Confirmation() {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
        ✓
      </div>
      <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-8">Your photographer has been booked successfully.</p>
      <div className="py-10 bg-gray-50 border rounded flex items-center justify-center text-gray-500 mb-6">
        [Booking Summary Placeholder]
      </div>
      <div className="mt-6">
        <Link href="/" className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
