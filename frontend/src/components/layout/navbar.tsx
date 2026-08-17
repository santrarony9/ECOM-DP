"use client";

import Link from 'next/link';
import { useAuthStore } from '@/hooks/use-auth-store';
import { Search, User, ShoppingBag, MapPin, Menu } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Location */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-3xl font-black text-black tracking-tighter">
              InstaImage
            </Link>
            <div className="hidden md:flex items-center text-sm">
              <MapPin className="h-5 w-5 text-blue-600 mr-1" />
              <div>
                <p className="font-bold text-gray-900 leading-none">Delivery to</p>
                <p className="text-gray-500 text-xs">Kolkata, WB</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm transition-colors"
                placeholder="Search for 'Wedding Shoot', 'Drone', 'Candid'..."
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="relative group cursor-pointer">
                  <div className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium">
                    <User className="h-6 w-6" />
                    <span>Account</span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 hidden group-hover:block border">
                    <Link href="/customer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Bookings</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Sign out</button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium flex items-center space-x-1">
                  <span>Login</span>
                </Link>
              )}
            </div>

            <Link href="/booking" className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold flex items-center space-x-2 hover:bg-blue-700 transition transform hover:scale-105 active:scale-95 shadow-sm">
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">Book Now</span>
            </Link>

            <button className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="pb-4 md:hidden">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              placeholder="Search services..."
            />
          </div>
        </div>
      </div>
    </header>
  );
}
