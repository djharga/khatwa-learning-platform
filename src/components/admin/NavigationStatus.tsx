'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Eye,
  EyeOff,
  Download,
  ExternalLink,
  FileText,
  Folder,
  Settings,
  Users,
  BookOpen,
  X,
} from 'lucide-react';
import {
  validateNavigationSystem,
  generateNavigationReport,
  getMissingPages,
  getOrphanedFiles,
  ValidationResult,
  LinkStatus
} from '@/lib/navigation-validator';

/** Props for NavigationStatus modal component */
interface NavigationStatusProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Navigation system health check modal displaying validation results, errors, warnings, and suggestions. Features refresh functionality, detailed view toggle, and report download. Integrates with navigation-validator library for system validation. */
const NavigationStatus = ({ isOpen, onClose }: NavigationStatusProps) => {
  // Validation results from navigation system check
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  // Detailed navigation report with section breakdown
  const [report, setReport] = useState<any>(null);
  // Controls visibility of detailed errors, warnings, and suggestions
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      refreshValidation();
    }
  }, [isOpen]);

  /** Refreshes navigation system validation by running validator and generating report. Simulates 1-second delay for validation process. */
  const refreshValidation = async () => {
    setIsLoading(true);
    try {
      // محاكاة تأخير للتحقق
      await new Promise(resolve => setTimeout(resolve, 1000));

      const validationResult = validateNavigationSystem();
      const reportResult = generateNavigationReport();

      setValidation(validationResult);
      setReport(reportResult);
    } catch (error) {
      console.error('خطأ في التحقق من الروابط:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /** Returns appropriate status icon based on validation results (success, warning, or error) */
  const getStatusIcon = () => {
    if (!validation) return <RefreshCw className="w-6 h-6 text-gray-400" />;

    if (validation.isValid) {
      return <CheckCircle className="w-6 h-6 text-green-600" />;
    } else if (validation.warnings.length > 0) {
      return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
    } else {
      return <XCircle className="w-6 h-6 text-red-600" />;
    }
  };

  /** Returns color identifier based on validation status */
  const getStatusColor = () => {
    if (!validation) return 'gray';

    if (validation.isValid) return 'green';
    if (validation.warnings.length > 0) return 'yellow';
    return 'red';
  };

  /** Returns status text describing validation results */
  const getStatusText = () => {
    if (!validation) return 'جاري التحقق...';

    if (validation.isValid) return 'النظام صحيح';
    if (validation.errors.length > 0) return `${validation.errors.length} أخطاء`;
    if (validation.warnings.length > 0) return `${validation.warnings.length} تحذيرات`;
    return 'غير محدد';
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* رأس النافذة */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <h2 className="text-xl font-bold text-gray-900">حالة نظام الملاحة</h2>
              <p className="text-sm text-gray-600">{getStatusText()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              onClick={refreshValidation}
              disabled={isLoading}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </motion.button>

            <motion.button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showDetails ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </motion.button>

            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* محتوى النافذة */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="mr-3">جاري التحقق من الروابط...</span>
            </div>
          ) : validation && report ? (
            <div className="space-y-6">
              {/* ملخص الحالة */}
              {/* Summary statistics for total links, valid links, errors, and warnings */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-600">{report.summary.totalLinks}</div>
                  <div className="text-sm text-blue-800">إجمالي الروابط</div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-green-600">{report.summary.validLinks}</div>
                  <div className="text-sm text-green-800">روابط صحيحة</div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-red-600">{report.summary.errors}</div>
                  <div className="text-sm text-red-800">أخطاء</div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-yellow-600">{report.summary.warnings}</div>
                  <div className="text-sm text-yellow-800">تحذيرات</div>
                </div>
              </div>

              {/* التفاصيل */}
              {/* Detailed breakdown of errors, warnings, and suggestions */}
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-6"
                >
                  {/* الأخطاء */}
                  {validation.errors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        الأخطاء ({validation.errors.length})
                      </h3>
                      <div className="space-y-2">
                        {validation.errors.map((error, index) => (
                          <div key={index} className="text-sm text-red-800 bg-red-100 p-2 rounded">
                            {error}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* التحذيرات */}
                  {validation.warnings.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        التحذيرات ({validation.warnings.length})
                      </h3>
                      <div className="space-y-2">
                        {validation.warnings.map((warning, index) => (
                          <div key={index} className="text-sm text-yellow-800 bg-yellow-100 p-2 rounded">
                            {warning}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* الاقتراحات */}
                  {validation.suggestions.length > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        اقتراحات التحسين ({validation.suggestions.length})
                      </h3>
                      <div className="space-y-2">
                        {validation.suggestions.map((suggestion, index) => (
                          <div key={index} className="text-sm text-blue-800 bg-blue-100 p-2 rounded">
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* تفاصيل الأقسام */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">تفاصيل الأقسام</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {report.sections.map((section: any) => (
                        <div key={section.id} className="bg-white p-3 rounded border border-gray-200">
                          <div className="font-medium text-gray-900">{section.title}</div>
                          <div className="text-sm text-gray-600">
                            {section.itemCount} رابط • أدوار: {section.roles?.join(', ') || 'غير محدد'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* أزرار الإجراءات */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4 border-t border-gray-200">
                <motion.button
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  {showDetails ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                </motion.button>

                <motion.button
                  onClick={() => {
                    const reportData = JSON.stringify(report, null, 2);
                    const blob = new Blob([reportData], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `navigation-report-${new Date().toISOString().split('T')[0]}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  تحميل التقرير
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">فشل في التحقق من حالة الروابط</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NavigationStatus;