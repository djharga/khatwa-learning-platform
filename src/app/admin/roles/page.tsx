'use client';

/**
 * صفحة إدارة الصلاحيات - لوحة الإدارة | منصة خطى التعليمية
 * تتيح للمدير إدارة صلاحيات المستخدمين والأدوار
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Users,
  Settings,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Save,
  X,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
}

const defaultRoles: Role[] = [
  {
    id: '1',
    name: 'مدير',
    description: 'صلاحيات كاملة على النظام',
    permissions: ['all'],
    usersCount: 3,
  },
  {
    id: '2',
    name: 'مدرب',
    description: 'إدارة الدورات والمحتوى',
    permissions: ['courses', 'content', 'students'],
    usersCount: 15,
  },
  {
    id: '3',
    name: 'طالب',
    description: 'الوصول إلى الدورات والمحتوى',
    permissions: ['courses', 'content'],
    usersCount: 2547,
  },
  {
    id: '4',
    name: 'مشرف',
    description: 'مراقبة وإدارة المستخدمين',
    permissions: ['users', 'reports'],
    usersCount: 8,
  },
];

const availablePermissions = [
  { id: 'courses', label: 'إدارة الدورات' },
  { id: 'content', label: 'إدارة المحتوى' },
  { id: 'users', label: 'إدارة المستخدمين' },
  { id: 'reports', label: 'عرض التقارير' },
  { id: 'settings', label: 'الإعدادات' },
  { id: 'students', label: 'إدارة الطلاب' },
  { id: 'financial', label: 'الإدارة المالية' },
];

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>(defaultRoles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setShowEditModal(true);
  };

  const handleSaveRole = (updatedRole: Role) => {
    setRoles(roles.map(r => r.id === updatedRole.id ? updatedRole : r));
    setShowEditModal(false);
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
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
                <Shield className="w-8 h-8" />
                إدارة الصلاحيات
              </h1>
              <p className="text-gray-600 mt-1">إدارة أدوار المستخدمين والصلاحيات</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            إضافة دور جديد
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن دور..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRoles.map((role) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Users className="w-4 h-4" />
                  <span>{role.usersCount} مستخدم</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.includes('all') ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                      جميع الصلاحيات
                    </span>
                  ) : (
                    role.permissions.map((perm) => (
                      <span
                        key={perm}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {availablePermissions.find(p => p.id === perm)?.label || perm}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditRole(role)}
                  className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  تعديل
                </button>
                <button
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredRoles.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">لم يتم العثور على أدوار</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">تعديل الدور</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم الدور
                </label>
                <input
                  type="text"
                  value={selectedRole.name}
                  onChange={(e) => setSelectedRole({ ...selectedRole, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف
                </label>
                <textarea
                  value={selectedRole.description}
                  onChange={(e) => setSelectedRole({ ...selectedRole, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الصلاحيات
                </label>
                <div className="space-y-2">
                  {availablePermissions.map((perm) => (
                    <label key={perm.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedRole.permissions.includes(perm.id) || selectedRole.permissions.includes('all')}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRole({
                              ...selectedRole,
                              permissions: [...selectedRole.permissions, perm.id],
                            });
                          } else {
                            setSelectedRole({
                              ...selectedRole,
                              permissions: selectedRole.permissions.filter(p => p !== perm.id),
                            });
                          }
                        }}
                        disabled={selectedRole.permissions.includes('all')}
                        className="rounded"
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => handleSaveRole(selectedRole)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
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

