"use client";

import { useBookingStore } from '@/hooks/use-booking-store';

export function Step5DateTime() {
  const { nextStep, prevStep } = useBookingStore();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Date & Time</h2>
      <div className="py-20 bg-gray-50 border rounded flex items-center justify-center text-gray-500 mb-6">[DateTime Picker Placeholder]</div>
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} className="text-gray-600 px-6 py-2 rounded-md hover:bg-gray-100 transition">Back</button>
        <button onClick={nextStep} className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">Next Step</button>
      </div>
    </div>
  );
}
