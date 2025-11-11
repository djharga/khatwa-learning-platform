/**
 * صفحة إدارة المستخدمين - لوحة الإدارة | منصة خطى التعليمية
 * تتيح للمدير إدارة جميع المستخدمين في المنصة مع صلاحيات شاملة
 */

'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Mail,
  Phone,
  Building,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  MoreVertical,
  Download,
  Upload,
  Link,
  Key,
  Send,
  Globe,
} from 'lucide-react';
import { useAdminStore, type AdminUser } from '@/lib/store/admin-store';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(false);

  // استخدام الـ store مباشرة
  const { users, stats, setUsers, addUser, updateUser, deleteUser, initializeData } = useAdminStore();

  // تهيئة البيانات عند تحميل الصفحة
  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.phone.includes(searchTerm);

      const matchesType = userTypeFilter === 'all' || user.userType === userTypeFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [users, searchTerm, userTypeFilter, statusFilter]);

  // استخدام الإحصائيات من الـ store
  const userStats = useMemo(() => stats.users, [stats]);

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'student': return 'متدرب فردي';
      case 'company': return 'شركة/مؤسسة';
      case 'admin': return 'مدير نظام';
      default: return type;
    }
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'company': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateCustomUrl = (user: AdminUser) => {
    const customUrl = `${user.name.toLowerCase().replace(/\s+/g, '-')}.audit-sa.com`;
    setUsers(users.map(u => u.id === user.id ? { ...u, customUrl } : u));
    alert(`تم إنشاء الرابط المخصص: ${customUrl}`);
  };

  const handleSendInvitation = (user: AdminUser) => {
    alert(`تم إرسال دعوة إلى ${user.email}`);
  };

  const handleSendWhatsappLink = (user: AdminUser) => {
    if (user.whatsappLink) {
      window.open(user.whatsappLink, '_blank');
    }
  };

  // إضافة مستخدم جديد - استخدام الـ store مباشرة
  const handleAddUser = async (userData: Partial<AdminUser>) => {
    try {
      // التحقق من البيانات المطلوبة
      if (!userData.name || !userData.email || !userData.phone || !userData.userType) {
        alert('الاسم والبريد الإلكتروني والهاتف ونوع المستخدم مطلوبون');
        return;
      }

      // التحقق من صحة البريد الإلكتروني
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(userData.email)) {
        alert('البريد الإلكتروني غير صحيح');
        return;
      }

      // التحقق من عدم وجود مستخدم بنفس البريد الإلكتروني
      if (users.some(u => u.email === userData.email)) {
        alert('البريد الإلكتروني مستخدم بالفعل');
        return;
      }

      const newUser: AdminUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        userType: userData.userType as 'student' | 'company' | 'admin',
        companyName: userData.companyName,
        status: 'active',
        storageUsed: 0,
        storageLimit: userData.storageLimit || (userData.userType === 'company' ? 20480 : 5120),
        coursesEnrolled: 0,
        coursesCompleted: 0,
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        isPremium: false,
        customUrl: `${userData.name.toLowerCase().replace(/\s+/g, '-')}.audit-sa.com`,
        whatsappLink: `https://wa.me/${userData.phone.replace(/\D/g, '')}`
      };

      addUser(newUser);
      setShowAddUserModal(false);
      alert('تم إضافة المستخدم بنجاح');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('حدث خطأ أثناء إضافة المستخدم');
    }
  };

  // تعديل مستخدم - استخدام الـ store مباشرة
  const handleEditUser = async (userId: string, userData: Partial<AdminUser>) => {
    try {
      updateUser(userId, userData);
      setSelectedUser(null);
      setShowEditUserModal(false);
      alert('تم تحديث المستخدم بنجاح');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('حدث خطأ أثناء تحديث المستخدم');
    }
  };

  // حذف مستخدم - استخدام الـ store مباشرة
  const handleDeleteUser = async (userId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المستخدم؟')) return;

    try {
      deleteUser(userId);
      if (selectedUser?.id === userId) setSelectedUser(null);
      alert('تم حذف المستخدم بنجاح');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('حدث خطأ أثناء حذف المستخدم');
    }
  };

  // تحديث حالة المستخدم - استخدام الـ store مباشرة
  const handleUpdateUserStatus = async (userId: string, status: 'active' | 'inactive' | 'suspended') => {
    try {
      updateUser(userId, { status });
      alert('تم تحديث حالة المستخدم بنجاح');
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('حدث خطأ أثناء تحديث حالة المستخدم');
    }
  };

  // تصدير قائمة المستخدمين
  const handleExportUsers = () => {
    const csvContent = [
      ['الاسم', 'البريد الإلكتروني', 'الهاتف', 'النوع', 'الحالة', 'التاريخ'],
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.phone,
        getUserTypeLabel(user.userType),
        user.status === 'active' ? 'نشط' : user.status === 'inactive' ? 'غير نشط' : 'معلق',
        user.joinDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `المستخدمين_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 px-6 py-3 rounded-full mb-6 shadow-lg border border-red-200/50 dark:border-red-700/50"
          >
            <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300 font-bold">إدارة المستخدمين والعملاء</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-red-900 to-pink-900 dark:from-white dark:via-red-100 dark:to-pink-100 bg-clip-text text-transparent mb-4"
          >
            نظام إدارة المستخدمين الشامل
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            إدارة شاملة للمستخدمين مع صلاحيات متنوعة وإعدادات مخصصة
          </motion.p>
        </motion.div>

        {/* الإحصائيات */}
        <div className="space-y-6 mb-8">
          {/* البطاقات القصيرة - صف واحد */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-blue-50/50 dark:from-neutral-800 dark:to-blue-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-blue-100/50 dark:border-blue-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">إجمالي المستخدمين</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{userStats.total}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-blue-50/50 dark:from-neutral-800 dark:to-blue-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-blue-100/50 dark:border-blue-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">المتدربين الأفراد</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                  <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">{userStats.students}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-purple-50/50 dark:from-neutral-800 dark:to-purple-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-purple-100/50 dark:border-purple-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">الشركات</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">{userStats.companies}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-red-50/50 dark:from-neutral-800 dark:to-red-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-red-100/50 dark:border-red-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">المديرين</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400">{userStats.admins}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-green-50/50 dark:from-neutral-800 dark:to-green-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-green-100/50 dark:border-green-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">المستخدمين النشطين</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-green-600 dark:text-green-400">{userStats.active}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-yellow-50/50 dark:from-neutral-800 dark:to-yellow-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-yellow-100/50 dark:border-yellow-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">المشتركين المميزين</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                  <Key className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-yellow-600 dark:text-yellow-400">{userStats.premium}</p>
            </motion.div>
          </motion.div>

          {/* البطاقات الطويلة - أفقية */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-1 gap-4"
          >
            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-neutral-800 dark:to-indigo-900/10 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-indigo-100/50 dark:border-indigo-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">إجمالي التخزين</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">{(userStats.totalStorage / 1024).toFixed(1)} GB</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* شريط التحكم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* شريط البحث */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="البحث في المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* الفلاتر */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="all">جميع الأنواع</option>
                <option value="student">متدرب فردي</option>
                <option value="company">شركة/مؤسسة</option>
                <option value="admin">مدير نظام</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="suspended">معلق</option>
              </select>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-3">
              <motion.button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddUserModal(true)}
              >
                <UserPlus className="w-5 h-5" />
                إضافة مستخدم جديد
              </motion.button>

                              <motion.button
                  className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"    
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExportUsers}
                >
                  <Download className="w-5 h-5" />
                  تصدير البيانات
                </motion.button>
            </div>
          </div>
        </motion.div>

        {/* جدول المستخدمين */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المستخدم</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">النوع</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">التخزين</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الدورات</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">آخر دخول</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                          {user.companyName && (
                            <div className="text-sm text-purple-600">{user.companyName}</div>
                          )}
                          {user.customUrl && (
                            <div className="text-xs text-blue-600 flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {user.customUrl}
                            </div>
                          )}
                          {user.isPremium && (
                            <div className="text-xs text-yellow-600 flex items-center gap-1">
                              <Key className="w-3 h-3" />
                              مشترك مميز
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUserTypeColor(user.userType)}`}>
                        {getUserTypeLabel(user.userType)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? <CheckCircle className="w-3 h-3" /> :
                         user.status === 'inactive' ? <XCircle className="w-3 h-3" /> :
                         <XCircle className="w-3 h-3" />}
                        {user.status === 'active' ? 'نشط' :
                         user.status === 'inactive' ? 'غير نشط' : 'معلق'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold">{(user.storageUsed / 1024).toFixed(1)} GB</div>
                        <div className="text-gray-600">من {(user.storageLimit / 1024).toFixed(0)} GB</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(user.storageUsed / user.storageLimit) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold">{user.coursesCompleted}/{user.coursesEnrolled}</div>
                        <div className="text-gray-600">مكتمل</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.lastLogin).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCreateCustomUrl(user)}
                        >
                          <Link className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSendInvitation(user)}
                        >
                          <Mail className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSendWhatsappLink(user)}
                        >
                          <Send className="w-4 h-4" />
                        </motion.button>
                                                  <motion.button
                            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditUserModal(true);
                            }}
                            title="عرض/تعديل"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteUser(user.id)}
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* رسالة عدم وجود نتائج */}
        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100 mt-8"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">لم نتمكن من العثور على أي مستخدمين تطابق معايير البحث الخاصة بك</p>
          </motion.div>
        )}

        {/* نافذة تفاصيل المستخدم */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">تفاصيل المستخدم</h3>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{selectedUser.name}</h4>
                      <p className="text-gray-600">{selectedUser.email}</p>
                      {selectedUser.companyName && (
                        <p className="text-purple-600">{selectedUser.companyName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نوع المستخدم</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUserTypeColor(selectedUser.userType)}`}>
                        {getUserTypeLabel(selectedUser.userType)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status === 'active' ? 'نشط' :
                         selectedUser.status === 'inactive' ? 'غير نشط' : 'معلق'}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <p className="text-gray-900">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانضمام</label>
                      <p className="text-gray-900">{new Date(selectedUser.joinDate).toLocaleDateString('ar-SA')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">الدورات المسجلة</h5>
                      <p className="text-2xl font-bold text-blue-600">{selectedUser.coursesEnrolled}</p>
                      <p className="text-sm text-blue-700">مكتمل: {selectedUser.coursesCompleted}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-2">مساحة التخزين</h5>
                      <p className="text-2xl font-bold text-green-600">{(selectedUser.storageUsed / 1024).toFixed(1)} GB</p>
                      <p className="text-sm text-green-700">من {(selectedUser.storageLimit / 1024).toFixed(0)} GB</p>
                    </div>
                  </div>

                  {selectedUser.customUrl && (
                    <div className="bg-purple-50 p-4 rounded-lg mb-4">
                      <h5 className="font-semibold text-purple-900 mb-2">الرابط المخصص</h5>
                      <p className="text-purple-700 break-all">{selectedUser.customUrl}</p>
                    </div>
                  )}

                                    <div className="flex gap-3 flex-wrap">
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"                          
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                                              onClick={() => {
                          if (selectedUser) {
                            setShowEditUserModal(true);
                          }
                        }}
                    >
                      تعديل البيانات
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"                        
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendInvitation(selectedUser)}        
                    >
                      إرسال دعوة
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"                            
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (selectedUser) {
                          handleDeleteUser(selectedUser.id);
                        }
                      }}
                    >
                      حذف المستخدم
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"                            
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedUser(null)}
                    >
                      إغلاق
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

                  {/* نافذة إضافة/تعديل مستخدم */}
          <AnimatePresence>
            {showAddUserModal && (
              <AddUserModal
                onClose={() => setShowAddUserModal(false)}
                onSave={handleAddUser}
              />
            )}
            {showEditUserModal && selectedUser && (
              <EditUserModal
                user={selectedUser}
                onClose={() => {
                  setShowEditUserModal(false);
                  setSelectedUser(null);
                }}
                onSave={handleEditUser}
              />
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}

 // نموذج إضافة مستخدم جديد
 function AddUserModal({ onClose, onSave }: { onClose: () => void; onSave: (data: Partial<AdminUser>) => void }) {
   const [formData, setFormData] = useState({
     name: '',
     email: '',
     phone: '',
     userType: 'student' as 'student' | 'company' | 'admin',
     companyName: '',
     storageLimit: 5120,
   });
   const [loading, setLoading] = useState(false);
   const [errors, setErrors] = useState<Record<string, string>>({});

   const validate = () => {
     const newErrors: Record<string, string> = {};
     
     if (!formData.name.trim()) {
       newErrors.name = 'الاسم مطلوب';
     }
     
     if (!formData.email.trim()) {
       newErrors.email = 'البريد الإلكتروني مطلوب';
     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
       newErrors.email = 'البريد الإلكتروني غير صحيح';
     }
     
     if (!formData.phone.trim()) {
       newErrors.phone = 'رقم الهاتف مطلوب';
     } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
       newErrors.phone = 'رقم الهاتف غير صحيح';
     }
     
     if (formData.userType === 'company' && !formData.companyName.trim()) {
       newErrors.companyName = 'اسم الشركة مطلوب';
     }
     
     setErrors(newErrors);
     return Object.keys(newErrors).length === 0;
   };

     const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     if (!validate()) return;
     
     setLoading(true);
     try {
       await onSave(formData);
     } finally {
       setLoading(false);
     }
   };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">إضافة مستخدم جديد</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم *</label>
                         <input
               type="text"
               required
               value={formData.name}
               onChange={(e) => {
                 setFormData({ ...formData, name: e.target.value });
                 if (errors.name) setErrors({ ...errors, name: '' });
               }}
               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                 errors.name ? 'border-red-500' : 'border-gray-300'
               }`}
             />
             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني *</label>
             <input
               type="email"
               required
               value={formData.email}
               onChange={(e) => {
                 setFormData({ ...formData, email: e.target.value });
                 if (errors.email) setErrors({ ...errors, email: '' });
               }}
               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                 errors.email ? 'border-red-500' : 'border-gray-300'
               }`}
             />
             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
           </div>

           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف *</label>
             <input
               type="tel"
               required
               value={formData.phone}
               onChange={(e) => {
                 setFormData({ ...formData, phone: e.target.value });
                 if (errors.phone) setErrors({ ...errors, phone: '' });
               }}
               className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                 errors.phone ? 'border-red-500' : 'border-gray-300'
               }`}
               placeholder="+966501234567"
             />
             {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
           </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع المستخدم *</label>
            <select
              required
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">متدرب فردي</option>
              <option value="company">شركة/مؤسسة</option>
              <option value="admin">مدير نظام</option>
            </select>
          </div>

                     {formData.userType === 'company' && (
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة *</label>
               <input
                 type="text"
                 value={formData.companyName}
                 onChange={(e) => {
                   setFormData({ ...formData, companyName: e.target.value });
                   if (errors.companyName) setErrors({ ...errors, companyName: '' });
                 }}
                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                   errors.companyName ? 'border-red-500' : 'border-gray-300'
                 }`}
               />
               {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
             </div>
           )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">حد التخزين (MB)</label>
            <input
              type="number"
              value={formData.storageLimit}
              onChange={(e) => setFormData({ ...formData, storageLimit: parseInt(e.target.value) || 5120 })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <motion.button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? 'جاري الإضافة...' : 'إضافة'}
            </motion.button>
            <motion.button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              إلغاء
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// نموذج تعديل مستخدم
function EditUserModal({ 
  user, 
  onClose, 
  onSave 
}: { 
  user: AdminUser; 
  onClose: () => void; 
  onSave: (userId: string, data: Partial<AdminUser>) => void;
}) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    userType: user.userType,
    companyName: user.companyName || '',
    storageLimit: user.storageLimit,
    status: user.status,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }
    
    if (formData.userType === 'company' && !formData.companyName.trim()) {
      newErrors.companyName = 'اسم الشركة مطلوب';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setLoading(true);
    try {
      await onSave(user.id, formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">تعديل مستخدم</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">الاسم *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+966501234567"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نوع المستخدم *</label>
            <select
              value={formData.userType}
              onChange={(e) => setFormData({ ...formData, userType: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="student">متدرب فردي</option>
              <option value="company">شركة/مؤسسة</option>
              <option value="admin">مدير نظام</option>
            </select>
          </div>

          {formData.userType === 'company' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة *</label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => {
                  setFormData({ ...formData, companyName: e.target.value });
                  if (errors.companyName) setErrors({ ...errors, companyName: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">حالة المستخدم *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="suspended">معلق</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              حد التخزين (MB) - {formData.storageLimit / 1024} GB
            </label>
            <input
              type="range"
              min="1024"
              max="51200"
              step="1024"
              value={formData.storageLimit}
              onChange={(e) => setFormData({ ...formData, storageLimit: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
