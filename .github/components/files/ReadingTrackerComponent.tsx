'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Clock,
  Calendar,
  User,
  Download,
  Filter,
  Search,
  BarChart3,
  Users,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, EmptyTableState } from '@/components/ui/Table';

/**
 * Reading record with user, file, duration, and timestamps
 */
interface ReadingRecord {
  id: string;
  user: string;
  fileName: string;
  duration: number; // in minutes
  lastOpened: string;
  totalReads: number;
}

/**
 * Mock data for reading records
 */
const mockReadingRecords: ReadingRecord[] = [
  {
    id: '1',
    user: 'أحمد محمد',
    fileName: 'تقرير المبيعات.pdf',
    duration: 45,
    lastOpened: '2023-10-01T10:00:00',
    totalReads: 5,
  },
  {
    id: '2',
    user: 'فاطمة علي',
    fileName: 'دليل المستخدم.docx',
    duration: 30,
    lastOpened: '2023-10-02T14:30:00',
    totalReads: 3,
  },
  {
    id: '3',
    user: 'محمد حسن',
    fileName: 'عرض تقديمي.pptx',
    duration: 60,
    lastOpened: '2023-10-03T09:15:00',
    totalReads: 7,
  },
  {
    id: '4',
    user: 'سارة أحمد',
    fileName: 'تقرير المالية.xlsx',
    duration: 25,
    lastOpened: '2023-10-04T16:45:00',
    totalReads: 2,
  },
  {
    id: '5',
    user: 'علي محمود',
    fileName: 'وثيقة السياسات.pdf',
    duration: 50,
    lastOpened: '2023-10-05T11:20:00',
    totalReads: 4,
  },
];

/**
 * Reading tracker component for monitoring file access and reading durations
 */
const ReadingTrackerComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('الكل');
  const [dateFilter, setDateFilter] = useState('الكل');

  // Get unique users for filter
  const uniqueUsers = useMemo(() => {
    const users = mockReadingRecords.map(record => record.user);
    return ['الكل', ...Array.from(new Set(users))];
  }, []);

  // Filter records
  const filteredRecords = useMemo(() => {
    return mockReadingRecords.filter(record => {
      const matchesSearch = record.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           record.user.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUser = selectedUser === 'الكل' || record.user === selectedUser;
      const recordDate = new Date(record.lastOpened).toISOString().split('T')[0];
      const matchesDate = dateFilter === 'الكل' || recordDate === dateFilter;

      return matchesSearch && matchesUser && matchesDate;
    });
  }, [searchTerm, selectedUser, dateFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalReads = filteredRecords.reduce((sum, record) => sum + record.totalReads, 0);
    const totalDuration = filteredRecords.reduce((sum, record) => sum + record.duration, 0);
    const averageDuration = filteredRecords.length > 0 ? totalDuration / filteredRecords.length : 0;
    const mostReadingUser = filteredRecords.reduce((max, record) =>
      record.totalReads > max.totalReads ? record : max, filteredRecords[0] || { user: '', totalReads: 0 });

    return {
      totalReads,
      averageDuration: Math.round(averageDuration),
      mostReadingUser: mostReadingUser?.user || '',
    };
  }, [filteredRecords]);

  // Mock chart data for weekly distribution
  const weeklyData = [
    { day: 'السبت', reads: 12 },
    { day: 'الأحد', reads: 15 },
    { day: 'الاثنين', reads: 18 },
    { day: 'الثلاثاء', reads: 22 },
    { day: 'الأربعاء', reads: 20 },
    { day: 'الخميس', reads: 16 },
    { day: 'الجمعة', reads: 10 },
  ];

  // Export functions (mock)
  const exportAsCSV = () => {
    console.log('تصدير كـ CSV');
    // In real implementation, generate CSV
  };

  const exportAsPDF = () => {
    console.log('تصدير كـ PDF');
    // In real implementation, generate PDF
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-20 transition-all duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
              تتبع القراءات
            </h1>
            <p className="text-gray-600 mt-2 text-lg leading-relaxed">
              مراقبة من فتح الملفات ومدة القراءة مع إحصائيات تفصيلية
            </p>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportAsCSV}
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportAsPDF}
              className="bg-red-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </motion.button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الملفات أو المستخدمين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300 text-lg"
            />
          </div>

          <div className="flex gap-6">
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium transition-all duration-300"
            >
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateFilter === 'الكل' ? '' : dateFilter}
              onChange={(e) => setDateFilter(e.target.value || 'الكل')}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium transition-all duration-300"
            />
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">إجمالي القراءات</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalReads}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-xl">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">متوسط المدة</p>
              <p className="text-3xl font-bold text-gray-800">{stats.averageDuration} دقيقة</p>
            </div>
            <div className="p-3 bg-green-100 rounded-xl">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">أكثر المستخدمين قراءة</p>
              <p className="text-lg font-bold text-gray-800">{stats.mostReadingUser}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-3 text-blue-600" />
          توزيع القراءات الأسبوعي
        </h2>
        <div className="flex items-end justify-between h-64 gap-4">
          {weeklyData.map((item, index) => (
            <div key={item.day} className="flex-1 flex flex-col items-center">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(item.reads / 25) * 100}%` }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg mb-2"
                style={{ minHeight: '10px' }}
              ></motion.div>
              <span className="text-sm font-medium text-gray-600">{item.day}</span>
              <span className="text-xs text-gray-500">{item.reads}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Records Table - Academic Design from agent.md */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#111827] mb-2" dir="rtl">سجلات القراءة</h2>
          <p className="text-base text-[#6B7280]" dir="rtl">عرض جميع سجلات قراءة الملفات</p>
        </div>
        {filteredRecords.length === 0 ? (
          <EmptyTableState
            message="لا توجد سجلات قراءة"
            description="لم يتم العثور على أي سجلات قراءة لعرضها"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الملف</TableHead>
                <TableHead>المستخدم</TableHead>
                <TableHead>مدة القراءة</TableHead>
                <TableHead>آخر فتح</TableHead>
                <TableHead>إجمالي القراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record, index) => (
                <TableRow
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell>
                    <div className="flex items-center" dir="rtl">
                      <FileText className="w-5 h-5 text-[#6B7280] ml-2" />
                      <span className="font-medium text-[#111827]">{record.fileName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center" dir="rtl">
                      <User className="w-5 h-5 text-[#6B7280] ml-2" />
                      <span className="text-[#6B7280]">{record.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center" dir="rtl">
                      <Clock className="w-5 h-5 text-[#6B7280] ml-2" />
                      <span className="text-[#111827]">{record.duration} دقيقة</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center" dir="rtl">
                      <Calendar className="w-5 h-5 text-[#6B7280] ml-2" />
                      <span className="text-[#111827]">
                        {new Date(record.lastOpened).toLocaleDateString('ar-SA')} 
                        {' '}
                        {new Date(record.lastOpened).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#EFF6FF] text-[#1E40AF]">
                      {record.totalReads}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </motion.div>
    </div>
  );
};

export default ReadingTrackerComponent;