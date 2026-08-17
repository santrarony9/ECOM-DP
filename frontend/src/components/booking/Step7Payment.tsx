"use client";

import { useState } from 'react';
import { useBookingStore } from '@/hooks/use-booking-store';

export function Step7Payment() {
  const { nextStep, prevStep, submitBooking } = useBookingStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayNow = async () => {
    setIsProcessing(true);
    await submitBooking();
    setIsProcessing(false);
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <div className="py-20 bg-gray-50 border rounded flex items-center justify-center text-gray-500 mb-6">
        [Payment Form Placeholder]
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="text-gray-600 px-6 py-2 rounded-md hover:bg-gray-100 transition" disabled={isProcessing}>Back</button>
        <button onClick={handlePayNow} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>

      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Razorpay Checkout</h3>
            <p className="text-gray-500">Processing Payment... Please do not close this window.</p>
          </div>
        </div>
      )}
    </div>
  );
}
