'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Profile Dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-4 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 rounded-full p-2">
                <span className="sr-only">Open user menu</span>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  👤
                </div>
                <span className="text-sm font-semibold">اسم المستخدم</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <button className="p-2.5 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
              🔔
            </button>

            {/* Messages */}
            <button className="p-2.5 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
              ✉️
            </button>

            {/* Settings */}
            <button className="p-2.5 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-300 ease-in-out hover:scale-110 active:scale-95">
              ⚙️
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
