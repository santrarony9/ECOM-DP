"use client";

import { useBookingStore } from '@/hooks/use-booking-store';
import { Clock, HelpCircle, Plus, Minus } from 'lucide-react';

export function Step5DateTime() {
  const { data, updateData, nextStep, prevStep } = useBookingStore();
  
  const flexibility = data.timeFlexibility || 'STRICT';
  const extraHours = data.extraHoursBooked || 0;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">When do you need us?</h2>
      <p className="text-gray-500 mb-8">Select the date, time, and flexibility of your booking.</p>
      
      {/* MOCK DATE PICKER */}
      <div className="py-12 bg-gray-50 border rounded-xl flex items-center justify-center text-gray-500 mb-8 font-medium">
        [Interactive Calendar & Time Picker]
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Time Flexibility
        </h3>
        
        <div className="space-y-4">
          <label className={`block p-5 rounded-xl border-2 cursor-pointer transition-all ${flexibility === 'STRICT' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
            <div className="flex items-start">
              <input 
                type="radio" 
                name="flexibility" 
                className="mt-1 w-4 h-4 text-black focus:ring-black"
                checked={flexibility === 'STRICT'}
                onChange={() => {
                  updateData({ timeFlexibility: 'STRICT', extraHoursBooked: 0 });
                }}
              />
              <div className="ml-3">
                <span className="block font-semibold text-lg">Strict Time (Default)</span>
                <span className="block text-gray-500 text-sm mt-1">
                  I only need the allotted package time. I understand the photographer will leave immediately after the scheduled end time to attend their next booking.
                </span>
              </div>
            </div>
          </label>

          <label className={`block p-5 rounded-xl border-2 cursor-pointer transition-all ${flexibility === 'FLEXIBLE' ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
            <div className="flex items-start">
              <input 
                type="radio" 
                name="flexibility" 
                className="mt-1 w-4 h-4 text-black focus:ring-black"
                checked={flexibility === 'FLEXIBLE'}
                onChange={() => updateData({ timeFlexibility: 'FLEXIBLE', extraHoursBooked: 1 })}
              />
              <div className="ml-3 flex-1">
                <span className="block font-semibold text-lg">Flexible Time</span>
                <span className="block text-gray-500 text-sm mt-1 mb-4">
                  I might need more time. Pre-purchase extra hours now to guarantee the photographer stays longer.
                </span>

                {flexibility === 'FLEXIBLE' && (
                  <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
                    <span className="font-medium text-gray-700">Extra Hours</span>
                    <div className="flex items-center space-x-4">
                      <button 
                        onClick={(e) => { e.preventDefault(); if (extraHours > 1) updateData({ extraHoursBooked: extraHours - 1 }); }}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold w-4 text-center">{extraHours}</span>
                      <button 
                        onClick={(e) => { e.preventDefault(); if (extraHours < 8) updateData({ extraHoursBooked: extraHours + 1 }); }}
                        className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <button onClick={prevStep} className="text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium">Back</button>
        <button onClick={() => {
           updateData({ datetime: '2026-10-15T10:00:00Z' }); // Mock save
           nextStep();
        }} className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium shadow-md shadow-black/10">Continue</button>
      </div>
    </div>
  );
}
