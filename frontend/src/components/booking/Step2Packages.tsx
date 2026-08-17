"use client";

import { useBookingStore } from '@/hooks/use-booking-store';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Check, Clock, Package as PackageIcon } from 'lucide-react';

interface PackageData {
  _id: string;
  serviceId: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  deliverables: string[];
  allowExtraHours: boolean;
  extraHourRate: number;
}

export function Step2Packages() {
  const { data, updateData, nextStep, prevStep } = useBookingStore();
  const [packages, setPackages] = useState<PackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApi('/packages')
      .then(res => setPackages(res))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const selectedId = data.packageId;
  const filteredPackages = packages.filter(pkg => pkg.serviceId === data.serviceId);

  if (loading) {
    return <div className="py-20 text-center text-gray-500 animate-pulse">Loading packages...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500 font-medium">Failed to load packages: {error}</div>;
  }

  if (filteredPackages.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        <p className="mb-4">No packages found for this service.</p>
        <button onClick={prevStep} className="text-black underline">Go back and select a different service</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Select a Package</h2>
      <p className="text-gray-500 mb-8">Choose the package that best fits your needs.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {filteredPackages.map(pkg => {
          const isSelected = selectedId === pkg._id;
          return (
            <div 
              key={pkg._id}
              onClick={() => updateData({ packageId: pkg._id })}
              className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col h-full ${isSelected ? 'border-black bg-gray-50 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-white shadow-sm'}`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 bg-black text-white p-1 rounded-full">
                  <Check className="w-4 h-4" />
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-2xl">{pkg.name}</h3>
                  <div className="text-sm font-medium text-gray-500 flex items-center mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {pkg.durationMinutes / 60} Hours
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-2xl">₹{pkg.price.toLocaleString()}</div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">{pkg.description}</p>
              
              <div className="mt-auto">
                <h4 className="font-semibold text-sm mb-3 uppercase tracking-wider text-gray-400">Deliverables</h4>
                <ul className="space-y-2">
                  {pkg.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-8 pt-6 border-t">
        <button onClick={prevStep} className="text-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition font-medium">Back</button>
        <button 
          onClick={nextStep} 
          disabled={!selectedId}
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition font-medium shadow-md shadow-black/10"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
