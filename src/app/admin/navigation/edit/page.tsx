'use client';

/**
 * صفحة تعديل الروابط والتنقل - لوحة الإدارة | منصة خطى التعليمية
 * تتيح للمدير إدارة روابط التنقل والقوائم
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Navigation,
  Plus,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  X,
  Link as LinkIcon,
  Menu,
  Home,
} from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  order: number;
  visible: boolean;
  children?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { id: '1', label: 'الرئيسية', href: '/', icon: 'home', order: 1, visible: true },
  { id: '2', label: 'الدورات', href: '/courses', icon: 'book', order: 2, visible: true },
  { id: '3', label: 'المدونة', href: '/blog', icon: 'blog', order: 3, visible: true },
  { id: '4', label: 'عن المنصة', href: '/about', icon: 'info', order: 4, visible: true },
  { id: '5', label: 'اتصل بنا', href: '/contact', icon: 'contact', order: 5, visible: true },
];

export default function NavigationEditPage() {
  const [navItems, setNavItems] = useState<NavItem[]>(defaultNavItems);
  const [editingItem, setEditingItem] = useState<NavItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleSave = () => {
    // TODO: Implement save logic
    console.log('Saving navigation:', navItems);
    alert('تم حفظ التغييرات بنجاح');
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الرابط؟')) {
      setNavItems(navItems.filter(item => item.id !== id));
    }
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newItems = [...navItems];
      [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
      newItems[index - 1].order = index;
      newItems[index].order = index + 1;
      setNavItems(newItems);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < navItems.length - 1) {
      const newItems = [...navItems];
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      newItems[index].order = index + 1;
      newItems[index + 1].order = index + 2;
      setNavItems(newItems);
    }
  };

  const handleToggleVisibility = (id: string) => {
    setNavItems(navItems.map(item =>
      item.id === id ? { ...item, visible: !item.visible } : item
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Navigation className="w-8 h-8" />
                تعديل الروابط والتنقل
              </h1>
              <p className="text-gray-600 mt-1">إدارة روابط القوائم والتنقل في المنصة</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              إضافة رابط
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              حفظ التغييرات
            </button>
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Menu className="w-5 h-5" />
              روابط القائمة الرئيسية
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(index)}
                        disabled={index === navItems.length - 1}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="w-5 h-5 text-gray-400" />
                        <div>
                          <h3 className="font-medium text-gray-900">{item.label}</h3>
                          <p className="text-sm text-gray-500">{item.href}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.visible}
                          onChange={() => handleToggleVisibility(item.id)}
                          className="rounded"
                        />
                        <span className="text-sm text-gray-600">ظاهر</span>
                      </label>

                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {navItems.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <Navigation className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">لا توجد روابط في القائمة</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              إضافة رابط جديد
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">تعديل الرابط</h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  النص
                </label>
                <input
                  type="text"
                  value={editingItem.label}
                  onChange={(e) => setEditingItem({ ...editingItem, label: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الرابط
                </label>
                <input
                  type="text"
                  value={editingItem.href}
                  onChange={(e) => setEditingItem({ ...editingItem, href: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => {
                    setNavItems(navItems.map(item =>
                      item.id === editingItem.id ? editingItem : item
                    ));
                    setEditingItem(null);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  حفظ
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

