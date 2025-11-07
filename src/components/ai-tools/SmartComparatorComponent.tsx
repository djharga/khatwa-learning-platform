'use client';

/**
 * Smart Comparator Component - المقارن الذكي
 * Enhanced for financial files support (Excel, PDF)
 * Supports financial data comparison with highlighted changes
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  Download,
  Eye,
  Filter,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Image as ImageIcon,
  File,
  FileSpreadsheet,
  FileImage,
  Zap,
  Settings,
} from 'lucide-react';

interface FileData {
  id: string;
  name: string;
  type: 'pdf' | 'word' | 'excel' | 'text' | 'image';
  content: string[];
  size: number;
}

interface ComparisonResult {
  lineIndex: number;
  type: 'addition' | 'deletion' | 'modification' | 'unchanged';
  content: string;
  file1Content?: string;
  file2Content?: string;
}

interface Statistics {
  totalLines: number;
  additions: number;
  deletions: number;
  modifications: number;
  similarity: number;
}

const SmartComparatorComponent = () => {
  const [file1, setFile1] = useState<FileData | null>(null);
  const [file2, setFile2] = useState<FileData | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'addition' | 'deletion' | 'modification'>('all');
  const [viewMode, setViewMode] = useState<'side-by-side' | 'unified'>('side-by-side');

  // Mock data for demonstration
  const mockFiles: FileData[] = [
    {
      id: '1',
      name: 'تقرير_الأداء_المالي_2023.pdf',
      type: 'pdf',
      content: [
        'تقرير الأداء المالي للعام 2023',
        'الإيرادات الإجمالية: 1,250,000 ريال',
        'المصروفات التشغيلية: 750,000 ريال',
        'صافي الربح: 500,000 ريال',
        'نمو الإيرادات: 15% مقارنة بالعام الماضي',
        'معدل العائد على الاستثمار: 12%',
      ],
      size: 2048576,
    },
    {
      id: '2',
      name: 'تقرير_الأداء_المالي_2023_محدث.pdf',
      type: 'pdf',
      content: [
        'تقرير الأداء المالي للعام 2023',
        'الإيرادات الإجمالية: 1,350,000 ريال',
        'المصروفات التشغيلية: 800,000 ريال',
        'المصروفات الرأسمالية: 150,000 ريال',
        'صافي الربح: 400,000 ريال',
        'نمو الإيرادات: 18% مقارنة بالعام الماضي',
        'معدل العائد على الاستثمار: 10%',
        'التوزيعات النقدية: 100,000 ريال',
      ],
      size: 2150400,
    },
    {
      id: '3',
      name: 'ميزانية_الشركة.xlsx',
      type: 'excel',
      content: [
        'الميزانية العمومية',
        'الأصول المتداولة: 500,000',
        'الأصول الثابتة: 1,200,000',
        'الخصوم المتداولة: 300,000',
        'الخصوم طويلة الأجل: 800,000',
        'حقوق المساهمين: 600,000',
      ],
      size: 1024000,
    },
    {
      id: '4',
      name: 'ميزانية_الشركة_محدثة.xlsx',
      type: 'excel',
      content: [
        'الميزانية العمومية',
        'الأصول المتداولة: 550,000',
        'الأصول الثابتة: 1,300,000',
        'الاستثمارات: 200,000',
        'الخصوم المتداولة: 320,000',
        'الخصوم طويلة الأجل: 850,000',
        'حقوق المساهمين: 880,000',
      ],
      size: 1152000,
    },
  ];

  const getFileIcon = (type: FileData['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'word':
        return <File className="w-5 h-5" />;
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5" />;
      case 'image':
        return <FileImage className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const simulateComparison = () => {
    if (!file1 || !file2) return;

    setIsComparing(true);
    setComparisonResults([]);
    setStatistics(null);

    // Simulate processing delay
    setTimeout(() => {
      const results: ComparisonResult[] = [];
      const maxLines = Math.max(file1.content.length, file2.content.length);
      let additions = 0;
      let deletions = 0;
      let modifications = 0;
      let unchanged = 0;

      for (let i = 0; i < maxLines; i+=1) {
        const line1 = file1.content[i];
        const line2 = file2.content[i];

        if (!line1 && line2) {
          results.push({
            lineIndex: i,
            type: 'addition',
            content: line2,
            file2Content: line2,
          });
          additions+=1;
        } else if (line1 && !line2) {
          results.push({
            lineIndex: i,
            type: 'deletion',
            content: line1,
            file1Content: line1,
          });
          deletions+=1;
        } else if (line1 !== line2) {
          results.push({
            lineIndex: i,
            type: 'modification',
            content: `تغيير: "${line1}" إلى "${line2}"`,
            file1Content: line1,
            file2Content: line2,
          });
          modifications+=1;
        } else {
          results.push({
            lineIndex: i,
            type: 'unchanged',
            content: line1,
          });
          unchanged+=1;
        }
      }

      const totalLines = results.length;
      const similarity = Math.round((unchanged / totalLines) * 100);

      setComparisonResults(results);
      setStatistics({
        totalLines,
        additions,
        deletions,
        modifications,
        similarity,
      });
      setIsComparing(false);
    }, 2000);
  };

  const getChangeColor = (type: ComparisonResult['type']) => {
    switch (type) {
      case 'addition':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'deletion':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'modification':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getChangeIcon = (type: ComparisonResult['type']) => {
    switch (type) {
      case 'addition':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'deletion':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'modification':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const filteredResults = comparisonResults.filter(result => 
    filterType === 'all' || result.type === filterType
  );

  const exportReport = () => {
    // Simulate PDF export
    alert('تم تصدير تقرير المقارنة كملف PDF');
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
          المقارن الذكي
        </h1>
        <p className="text-lg text-neutral max-w-3xl mx-auto">
          قارن بين ملفين واستخرج الفروقات بدقة عالية
        </p>
      </motion.div>

      {/* File Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          اختر الملفات للمقارنة
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File 1 */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الملف الأول
            </label>
            <select
              value={file1?.id || ''}
              onChange={(e) => {
                const selected = mockFiles.find(f => f.id === e.target.value);
                setFile1(selected || null);
              }}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">اختر ملف...</option>
              {mockFiles.filter(f => f.id !== file2?.id).map(file => (
                <option key={file.id} value={file.id}>
                  {file.name}
                </option>
              ))}
            </select>
            {file1 && (
              <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {getFileIcon(file1.type)}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{file1.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(file1.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* File 2 */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الملف الثاني
            </label>
            <select
              value={file2?.id || ''}
              onChange={(e) => {
                const selected = mockFiles.find(f => f.id === e.target.value);
                setFile2(selected || null);
              }}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">اختر ملف...</option>
              {mockFiles.filter(f => f.id !== file1?.id).map(file => (
                <option key={file.id} value={file.id}>
                  {file.name}
                </option>
              ))}
            </select>
            {file2 && (
              <div className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                {getFileIcon(file2.type)}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{file2.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {(file2.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={simulateComparison}
            disabled={!file1 || !file2 || isComparing}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center ${
              !file1 || !file2 || isComparing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
            }`}
          >
            {isComparing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                جاري المقارنة...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                ابدأ المقارنة
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Comparison Results */}
      {isComparing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin mx-auto"
              style={{
                animationDirection: 'reverse',
                animationDuration: '0.8s',
              }}
            ></div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            جاري مقارنة الملفات واستخراج الفروقات...
          </p>
          <div className="mt-4 w-full max-w-xs mx-auto">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Display */}
      {!isComparing && comparisonResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Statistics */}
          {statistics && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                إحصائيات المقارنة
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{statistics.totalLines}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">إجمالي السطور</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{statistics.additions}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">إضافات</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{statistics.deletions}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">حذف</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{statistics.modifications}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">تعديلات</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{statistics.similarity}%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">نسبة التشابه</div>
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  فلترة التغييرات:
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">الكل</option>
                  <option value="addition">الإضافات</option>
                  <option value="deletion">الحذف</option>
                  <option value="modification">التعديلات</option>
                </select>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  عرض:
                </label>
                <div className="flex rounded-lg border border-gray-300 dark:border-gray-600">
                  <button
                    onClick={() => setViewMode('side-by-side')}
                    className={`px-3 py-2 text-sm rounded-l-lg transition-colors ${
                      viewMode === 'side-by-side'
                        ? 'bg-green-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    جنب إلى جنب
                  </button>
                  <button
                    onClick={() => setViewMode('unified')}
                    className={`px-3 py-2 text-sm rounded-r-lg transition-colors ${
                      viewMode === 'unified'
                        ? 'bg-green-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    موحد
                  </button>
                </div>
              </div>

              <button
                onClick={exportReport}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                تصدير PDF
              </button>
            </div>
          </div>

          {/* Comparison Display */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                نتائج المقارنة
              </h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {viewMode === 'side-by-side' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-gray-200 dark:divide-gray-700">
                  {/* File 1 */}
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                      {file1?.name}
                    </h4>
                    <div className="space-y-2">
                      {filteredResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${getChangeColor(result.type)}`}
                        >
                          <div className="flex items-center space-x-2 space-x-reverse mb-2">
                            {getChangeIcon(result.type)}
                            <span className="text-sm font-medium">
                              السطر {result.lineIndex + 1}
                            </span>
                          </div>
                          <p className="text-sm">{result.file1Content || result.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* File 2 */}
                  <div className="p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">
                      {file2?.name}
                    </h4>
                    <div className="space-y-2">
                      {filteredResults.map((result, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${getChangeColor(result.type)}`}
                        >
                          <div className="flex items-center space-x-2 space-x-reverse mb-2">
                            {getChangeIcon(result.type)}
                            <span className="text-sm font-medium">
                              السطر {result.lineIndex + 1}
                            </span>
                          </div>
                          <p className="text-sm">{result.file2Content || result.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="space-y-2">
                    {filteredResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg border ${getChangeColor(result.type)}`}
                      >
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          {getChangeIcon(result.type)}
                          <span className="text-sm font-medium">
                            السطر {result.lineIndex + 1}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {result.type === 'addition' ? 'إضافة' :
                             result.type === 'deletion' ? 'حذف' :
                             result.type === 'modification' ? 'تعديل' : 'غير محدث'}
                          </span>
                        </div>
                        <p className="text-sm">{result.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!isComparing && comparisonResults.length === 0 && (!file1 || !file2) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            اختر ملفين للمقارنة
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            حدد ملفين من القائمة لبدء عملية المقارنة واستخراج الفروقات
          </p>
          <div className="flex justify-center space-x-3 space-x-reverse">
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all">
              <Upload className="w-4 h-4 inline mr-2" />
              رفع ملفات
            </button>
            <button className="px-4 py-2 border border-green-500 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
              تصفح الملفات
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SmartComparatorComponent;