'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitCompare,
  FileSpreadsheet,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Download,
  RefreshCw,
} from 'lucide-react';
import FileUploader, { UploadedFile } from './FileUploader';
import dynamic from 'next/dynamic';

const FinancialCharts = dynamic(
  () => import('./FinancialCharts'),
  { ssr: false }
);

interface ComparisonItem {
  item: string;
  period1: number;
  period2: number;
  change: number;
  changePercent: number;
  status: 'increase' | 'decrease' | 'stable';
  significance: 'high' | 'medium' | 'low';
}

interface ComparisonResult {
  summary: {
    totalItems: number;
    increased: number;
    decreased: number;
    stable: number;
    significantChanges: number;
  };
  items: ComparisonItem[];
  anomalies: string[];
  recommendations: string[];
}

export default function FinancialStatementsComparator() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'year' | 'quarter'>('year');

  // Mock data
  const mockComparisonResult: ComparisonResult = {
    summary: {
      totalItems: 25,
      increased: 15,
      decreased: 8,
      stable: 2,
      significantChanges: 5,
    },
    items: [
      {
        item: 'الإيرادات',
        period1: 5000000,
        period2: 5800000,
        change: 800000,
        changePercent: 16,
        status: 'increase',
        significance: 'high',
      },
      {
        item: 'تكلفة المبيعات',
        period1: 3000000,
        period2: 3500000,
        change: 500000,
        changePercent: 16.67,
        status: 'increase',
        significance: 'high',
      },
      {
        item: 'صافي الربح',
        period1: 1000000,
        period2: 1200000,
        change: 200000,
        changePercent: 20,
        status: 'increase',
        significance: 'high',
      },
      {
        item: 'المصروفات التشغيلية',
        period1: 800000,
        period2: 900000,
        change: 100000,
        changePercent: 12.5,
        status: 'increase',
        significance: 'medium',
      },
      {
        item: 'الأصول المتداولة',
        period1: 2000000,
        period2: 1800000,
        change: -200000,
        changePercent: -10,
        status: 'decrease',
        significance: 'high',
      },
    ],
    anomalies: [
      'انخفاض غير عادي في الأصول المتداولة بنسبة 10%',
      'زيادة كبيرة في تكلفة المبيعات تتجاوز نمو الإيرادات',
      'تحسن ملحوظ في هامش الربح الصافي',
    ],
    recommendations: [
      'مراجعة أسباب انخفاض الأصول المتداولة',
      'تحليل هيكل التكاليف لتحسين الكفاءة',
      'الاستفادة من تحسن الربحية في استثمارات استراتيجية',
    ],
  };

  const handleCompare = async () => {
    if (uploadedFiles.length < 2) return;

    setIsComparing(true);
    
    setTimeout(() => {
      setComparisonResult(mockComparisonResult);
      setIsComparing(false);
    }, 2000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          مقارن القوائم المالية
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          قارن بين فترات مالية مختلفة واكتشف التغيرات والتقلبات المهمة
        </p>
      </div>

      {/* Period Selection */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          نوع المقارنة
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedPeriod('year')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              selectedPeriod === 'year'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            سنوي (Year-over-Year)
          </button>
          <button
            onClick={() => setSelectedPeriod('quarter')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              selectedPeriod === 'quarter'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            ربع سنوي (Quarter-over-Quarter)
          </button>
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          رفع ملفات القوائم المالية (يُفضل ملفين)
        </h3>
        <FileUploader
          accept=".xlsx,.xls,.pdf"
          multiple={true}
          maxSize={10}
          maxFiles={2}
          onFilesChange={setUploadedFiles}
        />
        
        <button
          onClick={handleCompare}
          disabled={uploadedFiles.length < 2 || isComparing}
          className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            uploadedFiles.length < 2 || isComparing
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isComparing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              جاري المقارنة...
            </>
          ) : (
            <>
              <GitCompare className="w-5 h-5" />
              بدء المقارنة
            </>
          )}
        </button>
      </div>

      {/* Comparison Results */}
      <AnimatePresence>
        {comparisonResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'إجمالي البنود', value: comparisonResult.summary.totalItems, color: 'blue' },
                { label: 'زيادة', value: comparisonResult.summary.increased, color: 'green' },
                { label: 'انخفاض', value: comparisonResult.summary.decreased, color: 'red' },
                { label: 'تغيرات مهمة', value: comparisonResult.summary.significantChanges, color: 'orange' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br from-${stat.color}-500 to-${stat.color}-600 rounded-xl p-4 text-white`}
                >
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg overflow-x-auto">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                تفاصيل المقارنة
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-neutral-700">
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">البند</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">الفترة الأولى</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">الفترة الثانية</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">التغير</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">النسبة</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonResult.items.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/50"
                    >
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                        {item.item}
                        {item.significance === 'high' && (
                          <AlertTriangle className="w-4 h-4 text-orange-500 inline-block mr-1" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatCurrency(item.period1)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {formatCurrency(item.period2)}
                      </td>
                      <td className={`py-3 px-4 text-sm font-semibold ${
                        item.status === 'increase' ? 'text-green-600' : 
                        item.status === 'decrease' ? 'text-red-600' : 
                        'text-gray-600'
                      }`}>
                        {item.change > 0 ? '+' : ''}{formatCurrency(item.change)}
                      </td>
                      <td className={`py-3 px-4 text-sm font-semibold flex items-center gap-1 ${
                        item.status === 'increase' ? 'text-green-600' : 
                        item.status === 'decrease' ? 'text-red-600' : 
                        'text-gray-600'
                      }`}>
                        {item.status === 'increase' ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : item.status === 'decrease' ? (
                          <TrendingDown className="w-4 h-4" />
                        ) : null}
                        {item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Anomalies */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                التقلبات غير العادية
              </h3>
              <ul className="space-y-2">
                {comparisonResult.anomalies.map((anomaly, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>{anomaly}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                التوصيات
              </h3>
              <ul className="space-y-2">
                {comparisonResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Export */}
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all border border-purple-400/50 dark:border-purple-300/50 hover:border-purple-300 dark:hover:border-purple-200 ring-1 ring-purple-500/20 hover:ring-purple-400/40">
                <Download className="w-5 h-5" />
                تصدير التقرير المقارن
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

