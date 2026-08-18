"use client";

import Link from 'next/link';
import { useAuthStore } from '@/hooks/use-auth-store';
import { Search, User, Menu } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-black text-black tracking-tighter uppercase">
              InstaImage
            </Link>
            
            {/* Minimalist Desktop Nav */}
            <nav className="hidden md:flex space-x-6">
              <Link href="/services" className="text-sm font-semibold text-gray-600 hover:text-black transition">Services</Link>
              <Link href="/portfolio" className="text-sm font-semibold text-gray-600 hover:text-black transition">Portfolio</Link>
              <Link href="/photographers" className="text-sm font-semibold text-gray-600 hover:text-black transition">Creators</Link>
            </nav>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6">
            <button className="hidden md:flex text-gray-500 hover:text-black transition">
              <Search className="h-5 w-5" />
            </button>

            <div className="hidden md:flex items-center">
              {user ? (
                <div className="relative group cursor-pointer">
                  <div className="flex items-center space-x-2 text-gray-600 hover:text-black transition font-semibold text-sm">
                    <User className="h-5 w-5" />
                    <span>Account</span>
                  </div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl py-2 hidden group-hover:block border border-gray-100">
                    <Link href="/customer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Bookings</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Sign out</button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-black transition">
                  Login
                </Link>
              )}
            </div>

            <Link href="/booking" className="hidden sm:inline-flex bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition shadow-sm">
              Book Now
            </Link>

            <button className="md:hidden p-2 text-black">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
