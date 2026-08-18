"use client";

import { useEffect, useState } from 'react';
import { useBookingStore } from '@/hooks/use-booking-store';
import { fetchApi } from '@/lib/api';

export function Step3Addons() {
  const { data, updateData, nextStep, prevStep } = useBookingStore();
  const selectedAddonIds = data.addonIds || [];
  const toggleAddon = (id: string) => {
    if (selectedAddonIds.includes(id)) {
      updateData({ addonIds: selectedAddonIds.filter(aId => aId !== id) });
    } else {
      updateData({ addonIds: [...selectedAddonIds, id] });
    }
  };
  const [addons, setAddons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAddons() {
      try {
        const data = await fetchApi('/addons');
        setAddons(data);
      } catch (err) {
        console.error('Failed to load addons:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAddons();
  }, []);

  if (loading) return <div className="py-8 text-center text-gray-500">Loading addons...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-900">Level up your shoot (Optional)</h2>
      <p className="text-gray-500 mb-6">Select any additional services you might need.</p>

      {addons.length === 0 ? (
        <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
          No addons available.
        </div>
      ) : (
        <div className="space-y-4">
          {addons.map((addon) => {
            const isSelected = selectedAddonIds.includes(addon._id);
            return (
              <div 
                key={addon._id} 
                onClick={() => toggleAddon(addon._id)}
                className={`cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 flex items-center justify-between ${
                  isSelected ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-6 h-6 rounded border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                    {isSelected && <span className="text-white text-sm">✓</span>}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{addon.name}</h3>
                    <p className="text-sm text-gray-500">{addon.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-gray-900">+₹{addon.price.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium">Back</button>
        <button onClick={nextStep} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
          Continue to Details
        </button>
      </div>
    </div>
  );
}
