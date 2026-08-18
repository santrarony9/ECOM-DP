"use client";

import { useEffect, useState } from 'react';
import { useBookingStore } from '@/hooks/use-booking-store';
import { fetchApi } from '@/lib/api';

export function Step2Packages() {
  const { data, updateData, nextStep, prevStep } = useBookingStore();
  const selectedServiceId = data.serviceId;
  const selectedPackageId = data.packageId;
  const setPackage = (id: string) => updateData({ packageId: id });
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      if (!selectedServiceId) return;
      try {
        const data = await fetchApi('/packages');
        // Filter packages that belong to the selected service
        const filtered = data.filter((p: any) => p.serviceId === selectedServiceId);
        setPackages(filtered);
      } catch (err) {
        console.error('Failed to load packages:', err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, [selectedServiceId]);

  if (loading) return <div className="py-8 text-center text-gray-500">Loading packages...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Choose a Package</h2>
      
      {packages.length === 0 ? (
        <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
          No packages found for this service.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div 
              key={pkg._id} 
              className={`relative border-2 rounded-2xl p-6 transition flex flex-col ${
                selectedPackageId === pkg._id ? 'border-black bg-gray-50 shadow-md' : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-gray-500 text-sm mb-4 flex-1">{pkg.description}</p>
              
              <div className="bg-white rounded-lg p-3 mb-4 border border-gray-100">
                <p className="text-2xl font-black text-gray-900">₹{pkg.price.toLocaleString()}</p>
                <p className="text-sm font-medium text-gray-500 mt-1">Duration: {pkg.durationMinutes ? `${pkg.durationMinutes / 60} Hours` : "Flexible"}</p>
              </div>
              
              <button 
                onClick={() => setPackage(pkg._id)}
                className={`w-full py-3 rounded-xl font-bold transition-colors ${
                  selectedPackageId === pkg._id ? 'bg-black text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {selectedPackageId === pkg._id ? 'Selected' : 'Select Package'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Back</button>
        <button 
          onClick={nextStep} 
          disabled={!selectedPackageId}
          className="px-6 py-2 bg-black text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
