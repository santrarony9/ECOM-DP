"use client";

import { useBookingStore } from '@/hooks/use-booking-store';
import { Plus, Check } from 'lucide-react';

const MOCK_ADDONS = [
  { id: '64d1f1e1c1b1a1a1a1a1a1a1', name: 'Drone Photography', price: 5000, description: 'Add aerial drone shots to your package.' },
  { id: '64d1f1e1c1b1a1a1a1a1a1a2', name: 'Extra Photographer', price: 8000, description: 'Hire an additional photographer for more coverage.' },
  { id: '64d1f1e1c1b1a1a1a1a1a1a3', name: 'Express Delivery (48 Hours)', price: 3000, description: 'Get your edited photos delivered within 48 hours guaranteed.' },
];

export function Step3Addons() {
  const { data, updateData, nextStep, prevStep } = useBookingStore();
  
  const selectedIds = data.addonIds || [];

  const toggleAddon = (id: string) => {
    if (selectedIds.includes(id)) {
      updateData({ addonIds: selectedIds.filter(a => a !== id) });
    } else {
      updateData({ addonIds: [...selectedIds, id] });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Enhance Your Shoot</h2>
      <p className="text-gray-500 mb-8">Select any optional add-ons you'd like to include with your package.</p>
      
      <div className="space-y-4 mb-10">
        {MOCK_ADDONS.map(addon => {
          const isSelected = selectedIds.includes(addon.id);
          return (
            <div 
              key={addon.id}
              onClick={() => toggleAddon(addon.id)}
              className={`p-5 rounded-xl border-2 cursor-pointer transition-all flex items-start space-x-4 ${isSelected ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
            >
              <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-black text-white' : 'bg-gray-100 text-transparent'}`}>
                <Check className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-lg">{addon.name}</h3>
                  <span className="font-bold">+₹{addon.price}</span>
                </div>
                <p className="text-sm text-gray-500">{addon.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <button onClick={prevStep} className="text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium">Back</button>
        <button onClick={nextStep} className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium shadow-md shadow-black/10">Continue</button>
      </div>
    </div>
  );
}
