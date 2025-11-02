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
              <button className="flex items-center space-x-4 text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                <span className="sr-only">Open user menu</span>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  👤
                </div>
                <span className="text-sm font-medium">اسم المستخدم</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              🔔
            </button>

            {/* Messages */}
            <button className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              ✉️
            </button>

            {/* Settings */}
            <button className="text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
              ⚙️
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
