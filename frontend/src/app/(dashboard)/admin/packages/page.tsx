"use client";

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [serviceId, setServiceId] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(120);
  const [allowExtraHours, setAllowExtraHours] = useState(false);
  const [extraHourRate, setExtraHourRate] = useState(0);
  const [isPopular, setIsPopular] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [pkgs, svcs] = await Promise.all([
        fetchApi('/packages'),
        fetchApi('/services')
      ]);
      setPackages(pkgs);
      setServices(svcs);
      if (svcs.length > 0) setServiceId(svcs[0]._id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetchApi('/packages', {
        method: 'POST',
        body: JSON.stringify({ 
          name, description, price: Number(price), serviceId, 
          durationMinutes: Number(durationMinutes), 
          allowExtraHours, extraHourRate: Number(extraHourRate), 
          isPopular, isActive 
        }),
      });
      // Reset basic fields
      setName('');
      setDescription('');
      loadData();
    } catch (error) {
      alert('Failed to create package');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this package?')) return;
    try {
      await fetchApi(`/packages/${id}`, { method: 'DELETE' });
      loadData();
    } catch (error) {
      alert('Failed to delete package');
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Manage Packages</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Add New Package</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Service</label>
            <select required value={serviceId} onChange={(e) => setServiceId(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
              {services.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Base Price (₹)</label>
            <input required type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Duration (Minutes)</label>
            <input required type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
          </div>
          
          <div className="flex flex-col justify-center space-y-2 mt-4">
            <div className="flex items-center">
              <input type="checkbox" checked={allowExtraHours} onChange={(e) => setAllowExtraHours(e.target.checked)} className="h-4 w-4 text-blue-600 rounded" />
              <label className="ml-2 block text-sm text-gray-900">Allow Flexible Extra Hours</label>
            </div>
            {allowExtraHours && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-2">Extra Hour Rate (₹)</label>
                <input required type="number" value={extraHourRate} onChange={(e) => setExtraHourRate(Number(e.target.value))} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
              </div>
            )}
          </div>
          
          <div className="flex flex-col justify-center space-y-2 mt-4">
            <div className="flex items-center">
              <input type="checkbox" checked={isPopular} onChange={(e) => setIsPopular(e.target.checked)} className="h-4 w-4 text-blue-600 rounded" />
              <label className="ml-2 block text-sm text-gray-900">Mark as "Bestseller/Popular"</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="h-4 w-4 text-blue-600 rounded" />
              <label className="ml-2 block text-sm text-gray-900">Active</label>
            </div>
          </div>

          <div className="col-span-2 pt-4 border-t">
            <button type="submit" disabled={isSubmitting} className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? 'Creating...' : 'Create Package'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading packages...</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Package Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{pkg.name}</div>
                    {pkg.isPopular && <span className="text-xs text-yellow-600 font-bold">Popular</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{pkg.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pkg.durationMinutes / 60} Hours</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleDelete(pkg._id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
