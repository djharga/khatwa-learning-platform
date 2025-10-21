'use client';

import React from 'react';
import Image from 'next/image';
import { useMemo } from 'react';
import OverviewIcon from './ui/icons/OverviewIcon';
import ShoppingBagIcon from './ui/icons/ShoppingBagIcon';
import FolderIcon from './ui/icons/FolderIcon';
import IDBadgeIcon from './ui/icons/IDBadgeIcon';
import IDCardIcon from './ui/icons/IDCardIcon';
import UsersThreeIcon from './ui/icons/UsersThreeIcon';
import NotebookIcon from './ui/icons/NotebookIcon';
import ChatTeardropIcon from './ui/icons/ChatTeardropIcon';

const Sidebar = () => {
  const sidebarItems = useMemo(
    () => [
      {
        id: 'overview',
        label: 'نظرة عامة',
        icon: OverviewIcon,
        isActive: true,
      },
      { id: 'courses', label: 'الدورات', icon: ShoppingBagIcon },
      { id: 'projects', label: 'المشاريع', icon: FolderIcon },
      { id: 'students', label: 'الطلاب', icon: IDBadgeIcon },
      { id: 'instructors', label: 'المدربين', icon: IDCardIcon },
      { id: 'corporate', label: 'الشركات', icon: UsersThreeIcon },
      { id: 'blog', label: 'المدونة', icon: NotebookIcon },
      { id: 'support', label: 'الدعم', icon: ChatTeardropIcon },
    ],
    []
  );

  return (
    <aside className="w-[220px] bg-white border-r border-neutral-200 flex flex-col overflow-y-auto scrollbar-hide">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg rounded-xl">
            <span className="text-xl">🎓</span>
          </div>
          <div>
            <div className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent">
              خطى التعليمية
            </div>
            <div className="text-xs text-neutral-600">
              منصة التعلم المهني
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 space-y-1 px-4"
        role="navigation"
        aria-label="القائمة الرئيسية"
      >
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === 'overview';
          return (
            <button
              key={item.id}
              className={`w-full flex items-center transition-all duration-300 hover:scale-[1.02] ${
                isActive
                  ? 'bg-primary-50 border border-primary-200'
                  : 'hover:bg-neutral-50'
              } gap-3 p-4 rounded-xl min-h-11`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon
                width={24}
                height={24}
                color={isActive ? '#6366f1' : '#6b7280'}
              />
              <span
                className={`text-sm font-medium ${isActive ? 'text-primary-700' : 'text-neutral-700'}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-neutral-100 p-4">
        <div className="flex items-center bg-neutral-50 hover:bg-neutral-100 transition-all duration-300 cursor-pointer hover:scale-[1.02] gap-3 p-3 rounded-xl min-h-11">
          <Image
            src="/avatars/byewind.png"
            alt="المدير الإداري"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-sm font-medium text-neutral-700">
            المدير الإداري
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
