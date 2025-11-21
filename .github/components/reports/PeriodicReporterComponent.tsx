'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  CheckCircle,
  AlertCircle,
  X,
  FileText,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Download,
  Settings,
  Play,
} from 'lucide-react';

/**
 * Periodic report configuration interface
 */
interface PeriodicReport {
  id: string;
  name: string;
  type: 'performance' | 'financial' | 'student' | 'course';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  dataIncluded: string[];
  template: 'standard' | 'detailed' | 'minimal';
  schedule: {
    time: string;
    dayOfWeek?: number; // 0-6 for weekly
    dayOfMonth?: number; // 1-31 for monthly
  };
  lastRun?: string;
  nextRun: string;
  isActive: boolean;
}

/**
 * Mock data for periodic reports
 */
const mockPeriodicReports: PeriodicReport[] = [
  {
    id: '1',
    name: 'تقرير الأداء الأسبوعي',
    type: 'performance',
    frequency: 'weekly',
    dataIncluded: ['courses', 'students', 'performance'],
    template: 'detailed',
    schedule: { time: '09:00', dayOfWeek: 1 },
    lastRun: '2023-10-15',
    nextRun: '2023-10-22',
    isActive: true,
  },
  {
    id: '2',
    name: 'تقرير مالي شهري',
    type: 'financial',
    frequency: 'monthly',
    dataIncluded: ['financial', 'courses'],
    template: 'standard',
    schedule: { time: '08:00', dayOfMonth: 1 },
    lastRun: '2023-09-01',
    nextRun: '2023-10-01',
    isActive: true,
  },
  {
    id: '3',
    name: 'تقرير الطلاب اليومي',
    type: 'student',
    frequency: 'daily',
    dataIncluded: ['students', 'performance'],
    template: 'minimal',
    schedule: { time: '18:00' },
    lastRun: '2023-10-16',
    nextRun: '2023-10-17',
    isActive: false,
  },
];

/**
 * Data options for inclusion
 */
const dataOptions = [
  { key: 'courses', label: 'الدورات', icon: FileText },
  { key: 'students', label: 'الطلاب', icon: Users },
  { key: 'performance', label: 'الأداء', icon: TrendingUp },
  { key: 'financial', label: 'المالية', icon: DollarSign },
];

/**
 * Template options
 */
const templateOptions = [
  { key: 'standard', label: 'قياسي' },
  { key: 'detailed', label: 'مفصل' },
  { key: 'minimal', label: 'بسيط' },
];

/**
 * Frequency options
 */
const frequencyOptions = [
  { key: 'daily', label: 'يومي' },
  { key: 'weekly', label: 'أسبوعي' },
  { key: 'monthly', label: 'شهري' },
  { key: 'yearly', label: 'سنوي' },
];

/**
 * Periodic Reporter Component
 * Tool for creating automated periodic reports with scheduling
 */
const PeriodicReporterComponent = () => {
  const [reports, setReports] = useState<PeriodicReport[]>(mockPeriodicReports);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingReport, setEditingReport] = useState<PeriodicReport | null>(null);
  const [previewReport, setPreviewReport] = useState<PeriodicReport | null>(null);
  const [newReport, setNewReport] = useState<Partial<PeriodicReport>>({
    name: '',
    type: 'performance',
    frequency: 'weekly',
    dataIncluded: [],
    template: 'standard',
    schedule: { time: '09:00' },
    isActive: true,
  });

  /**
   * Handles creating or updating a periodic report
   */
  const handleSaveReport = () => {
    if (!newReport.name || newReport.dataIncluded?.length === 0) return;

    const report: PeriodicReport = {
      id: editingReport?.id || Date.now().toString(),
      name: newReport.name!,
      type: newReport.type!,
      frequency: newReport.frequency!,
      dataIncluded: newReport.dataIncluded!,
      template: newReport.template!,
      schedule: newReport.schedule!,
      nextRun: calculateNextRun(newReport.frequency!, newReport.schedule!),
      isActive: newReport.isActive!,
    };

    if (editingReport) {
      setReports(reports.map(r => r.id === editingReport.id ? report : r));
    } else {
      setReports([...reports, report]);
    }

    setShowCreateModal(false);
    setEditingReport(null);
    setNewReport({
      name: '',
      type: 'performance',
      frequency: 'weekly',
      dataIncluded: [],
      template: 'standard',
      schedule: { time: '09:00' },
      isActive: true,
    });
  };

  /**
   * Calculates next run date based on frequency and schedule
   */
  const calculateNextRun = (frequency: string, schedule: any): string => {
    const now = new Date();
    switch (frequency) {
      case 'daily':
        now.setDate(now.getDate() + 1);
        break;
      case 'weekly': {
        const daysUntilNext = (schedule.dayOfWeek - now.getDay() + 7) % 7 || 7;
        now.setDate(now.getDate() + daysUntilNext);
        break;
      }
      case 'monthly':
        now.setMonth(now.getMonth() + 1, schedule.dayOfMonth);
        break;
      case 'yearly':
        now.setFullYear(now.getFullYear() + 1);
        break;
    }
    return now.toISOString().split('T')[0];
  };

  /**
   * Deletes a periodic report
   */
  const handleDeleteReport = (id: string) => {
    setReports(reports.filter(r => r.id !== id));
  };

  /**
   * Toggles active status of a report
   */
  const handleToggleActive = (id: string) => {
    setReports(reports.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  /**
   * Shows preview for a report
   */
  const handlePreview = (report: PeriodicReport) => {
    setPreviewReport(report);
    setShowPreviewModal(true);
  };

  /**
   * Simulates sending report via email
   */
  const handleSendEmail = (report: PeriodicReport) => {
    // Mock email sending
    alert(`تم إرسال التقرير "${report.name}" عبر البريد الإلكتروني بنجاح!`);
  };

  /**
   * Gets the last generated report
   */
  const lastGeneratedReport = reports.find(r => r.lastRun) || null;

  /**
   * Report card component
   */
  const ReportCard = ({ report }: { report: PeriodicReport }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800">{report.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{report.type}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePreview(report)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setEditingReport(report);
              setNewReport(report);
              setShowCreateModal(true);
            }}
            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteReport(report.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          <span>{frequencyOptions.find(f => f.key === report.frequency)?.label}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          <span>التالي: {report.nextRun}</span>
        </div>
        {report.lastRun && (
          <div className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span>الأخير: {report.lastRun}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs ${report.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {report.isActive ? 'نشط' : 'معطل'}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleToggleActive(report.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium ${report.isActive ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
          >
            {report.isActive ? 'تعطيل' : 'تفعيل'}
          </button>
          <button
            onClick={() => handleSendEmail(report)}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg text-xs font-medium hover:bg-blue-200"
          >
            <Mail className="w-3 h-3 inline mr-1" />
            إرسال
          </button>
        </div>
      </div>
    </motion.div>
  );

  /**
   * Create/Edit Modal
   */
  const CreateModal = () => (
    <AnimatePresence>
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {editingReport ? 'تعديل التقرير الدوري' : 'إنشاء تقرير دوري جديد'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingReport(null);
                  setNewReport({
                    name: '',
                    type: 'performance',
                    frequency: 'weekly',
                    dataIncluded: [],
                    template: 'standard',
                    schedule: { time: '09:00' },
                    isActive: true,
                  });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم التقرير</label>
                <input
                  type="text"
                  value={newReport.name || ''}
                  onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="أدخل اسم التقرير"
                />
              </div>

              {/* Type and Frequency */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نوع التقرير</label>
                  <select
                    value={newReport.type || 'performance'}
                    onChange={(e) => setNewReport({ ...newReport, type: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="performance">أداء</option>
                    <option value="financial">مالي</option>
                    <option value="student">طلاب</option>
                    <option value="course">دورات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">التكرار</label>
                  <select
                    value={newReport.frequency || 'weekly'}
                    onChange={(e) => setNewReport({ ...newReport, frequency: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {frequencyOptions.map(opt => (
                      <option key={opt.key} value={opt.key}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Data Included */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البيانات المراد تضمينها</label>
                <div className="grid grid-cols-2 gap-3">
                  {dataOptions.map(option => {
                    const Icon = option.icon;
                    return (
                      <label key={option.key} className="flex items-center space-x-3 space-x-reverse p-3 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={newReport.dataIncluded?.includes(option.key) || false}
                          onChange={(e) => {
                            const included = newReport.dataIncluded || [];
                            if (e.target.checked) {
                              setNewReport({ ...newReport, dataIncluded: [...included, option.key] });
                            } else {
                              setNewReport({ ...newReport, dataIncluded: included.filter(k => k !== option.key) });
                            }
                          }}
                          className="rounded"
                        />
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Template */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">قالب التقرير</label>
                <select
                  value={newReport.template || 'standard'}
                  onChange={(e) => setNewReport({ ...newReport, template: e.target.value as any })}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {templateOptions.map(opt => (
                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Schedule */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الجدولة</label>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <input
                    type="time"
                    value={newReport.schedule?.time || '09:00'}
                    onChange={(e) => setNewReport({ ...newReport, schedule: { ...newReport.schedule!, time: e.target.value } })}
                    className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {newReport.frequency === 'weekly' && (
                    <select
                      value={newReport.schedule?.dayOfWeek || 1}
                      onChange={(e) => setNewReport({ ...newReport, schedule: { ...newReport.schedule!, dayOfWeek: parseInt(e.target.value) } })}
                      className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={0}>الأحد</option>
                      <option value={1}>الاثنين</option>
                      <option value={2}>الثلاثاء</option>
                      <option value={3}>الأربعاء</option>
                      <option value={4}>الخميس</option>
                      <option value={5}>الجمعة</option>
                      <option value={6}>السبت</option>
                    </select>
                  )}
                  {newReport.frequency === 'monthly' && (
                    <select
                      value={newReport.schedule?.dayOfMonth || 1}
                      onChange={(e) => setNewReport({ ...newReport, schedule: { ...newReport.schedule!, dayOfMonth: parseInt(e.target.value) } })}
                      className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Preview Button */}
              <button
                onClick={() => handlePreview(newReport as PeriodicReport)}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-2" />
                معاينة التقرير
              </button>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleSaveReport}
                  disabled={!newReport.name || newReport.dataIncluded?.length === 0}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingReport ? 'تحديث التقرير' : 'إنشاء التقرير'}
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingReport(null);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  /**
   * Preview Modal
   */
  const PreviewModal = () => (
    <AnimatePresence>
      {showPreviewModal && previewReport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">معاينة التقرير: {previewReport.name}</h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Mock Report Content */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-4">تقرير {previewReport.type}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previewReport.dataIncluded.map(data => (
                    <div key={data} className="bg-white p-4 rounded-lg shadow">
                      <h5 className="font-semibold mb-2">{dataOptions.find(d => d.key === data)?.label}</h5>
                      <p className="text-sm text-gray-600">محتوى تجريبي للبيانات المختارة.</p>
                      <div className="mt-2 h-20 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                        رسم بياني تجريبي
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                    <Download className="w-4 h-4 inline mr-2" />
                    تحميل التقرير
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
              التقارير الدورية
            </h1>
            <p className="text-gray-600 mt-2 text-lg leading-relaxed">
              إنشاء وإدارة التقارير الدورية الآلية
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            تقرير دوري جديد
          </motion.button>
        </div>
      </motion.div>

      {/* Last Generated Report */}
      {lastGeneratedReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            آخر تقرير تم إنشاؤه
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg">{lastGeneratedReport.name}</h3>
              <p className="text-sm text-gray-600">تم إنشاؤه في: {lastGeneratedReport.lastRun}</p>
            </div>
            <button
              onClick={() => handlePreview(lastGeneratedReport)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Eye className="w-4 h-4 mr-2" />
              عرض
            </button>
          </div>
        </motion.div>
      )}

      {/* Scheduled Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      <CreateModal />
      <PreviewModal />

      {/* Empty State */}
      {reports.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            لا توجد تقارير دورية
          </h3>
          <p className="text-gray-600 text-lg mb-8">
            ابدأ بإنشاء تقرير دوري جديد لتتبع البيانات بانتظام
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            إنشاء تقرير دوري
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default PeriodicReporterComponent;