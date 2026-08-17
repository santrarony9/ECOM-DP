"use client";

import { useBookingStore } from '@/hooks/use-booking-store';
import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { Camera, Check } from 'lucide-react';

interface Service {
  _id: string;
  name: string;
  description: string;
  basePrice: number;
}

export function Step1Services() {
  const { data, updateData, nextStep } = useBookingStore();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApi('/services')
      .then(res => setServices(res))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const selectedId = data.serviceId;

  if (loading) {
    return <div className="py-20 text-center text-gray-500 animate-pulse">Loading amazing services...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500 font-medium">Failed to load services: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">What kind of shoot?</h2>
      <p className="text-gray-500 mb-8">Select the primary service you are looking for.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {services.map(service => {
          const isSelected = selectedId === service._id;
          return (
            <div 
              key={service._id}
              onClick={() => updateData({ serviceId: service._id, packageId: undefined })}
              className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all flex flex-col h-full ${isSelected ? 'border-black bg-gray-50 shadow-md' : 'border-gray-100 hover:border-gray-200 bg-white shadow-sm'}`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 bg-black text-white p-1 rounded-full">
                  <Check className="w-4 h-4" />
                </div>
              )}
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-black">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-2">{service.name}</h3>
              <p className="text-sm text-gray-500 mb-4 flex-grow">{service.description}</p>
              <div className="font-semibold pt-4 border-t text-sm">
                Starting at ₹{service.basePrice.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end mt-8 pt-6 border-t">
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
