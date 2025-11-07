'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  FileSpreadsheet,
  Download,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import FileUploader, { UploadedFile } from './FileUploader';
import dynamic from 'next/dynamic';

const FinancialCharts = dynamic(
  () => import('./FinancialCharts'),
  { ssr: false }
);

interface FinancialRatio {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  status: 'good' | 'warning' | 'critical';
  description: string;
}

interface AnalysisResult {
  ratios: FinancialRatio[];
  trends: any[];
  insights: string[];
  recommendations: string[];
}

export default function FinancialDataAnalyzer() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Mock data for demonstration
  const mockAnalysisResult: AnalysisResult = {
    ratios: [
      {
        name: 'نسبة السيولة',
        value: 2.5,
        previousValue: 2.1,
        change: 19.05,
        status: 'good',
        description: 'نسبة جيدة تشير إلى قدرة الشركة على سداد الالتزامات قصيرة الأجل',
      },
      {
        name: 'نسبة الربحية',
        value: 15.8,
        previousValue: 18.2,
        change: -13.19,
        status: 'warning',
        description: 'انخفاض في الربحية يتطلب مراجعة التكاليف والإيرادات',
      },
      {
        name: 'نسبة المديونية',
        value: 0.45,
        previousValue: 0.52,
        change: -13.46,
        status: 'good',
        description: 'تحسن في نسبة المديونية يدل على تحسن الوضع المالي',
      },
      {
        name: 'نسبة دوران الأصول',
        value: 1.2,
        previousValue: 1.4,
        change: -14.29,
        status: 'warning',
        description: 'انخفاض في كفاءة استخدام الأصول',
      },
    ],
    trends: [
      { name: 'Q1', revenue: 500000, expenses: 400000, profit: 100000 },
      { name: 'Q2', revenue: 550000, expenses: 420000, profit: 130000 },
      { name: 'Q3', revenue: 600000, expenses: 450000, profit: 150000 },
      { name: 'Q4', revenue: 650000, expenses: 480000, profit: 170000 },
    ],
    insights: [
      'تحسن ملحوظ في نسبة السيولة بنسبة 19%',
      'انخفاض في الربحية يتطلب مراجعة استراتيجية التسعير',
      'تحسن في هيكل المديونية يدل على إدارة مالية جيدة',
      'نمو مستمر في الإيرادات على مدار العام',
    ],
    recommendations: [
      'مراجعة هيكل التكاليف لتحسين الربحية',
      'استغلال السيولة المتاحة في استثمارات قصيرة الأجل',
      'تحسين كفاءة استخدام الأصول من خلال تحليل العمليات',
      'مراقبة مستمرة للمؤشرات المالية الرئيسية',
    ],
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) return;

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
      case 'critical':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <TrendingUp className="w-5 h-5" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5" />;
      case 'critical':
        return <TrendingDown className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          محلل البيانات المالية
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          رفع ملفات Excel أو PDF للقوائم المالية للحصول على تحليل شامل تلقائي
        </p>
      </div>

      {/* File Upload Section */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          رفع الملفات المالية
        </h3>
        <FileUploader
          accept=".xlsx,.xls,.pdf"
          multiple={true}
          maxSize={10}
          maxFiles={3}
          onFilesChange={setUploadedFiles}
        />
        
        <button
          onClick={handleAnalyze}
          disabled={uploadedFiles.length === 0 || isAnalyzing}
          className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            uploadedFiles.length === 0 || isAnalyzing
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              جاري التحليل...
            </>
          ) : (
            <>
              <BarChart3 className="w-5 h-5" />
              بدء التحليل
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Financial Ratios */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-blue-600" />
                النسب المالية
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisResult.ratios.map((ratio, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-2 ${getStatusColor(ratio.status)} border-current`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{ratio.name}</h4>
                      {getStatusIcon(ratio.status)}
                    </div>
                    
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-2xl font-bold">{ratio.value}</span>
                      {ratio.change !== undefined && (
                        <span className={`text-sm flex items-center gap-1 ${
                          ratio.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {ratio.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                          {Math.abs(ratio.change).toFixed(2)}%
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm opacity-80">{ratio.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trends Chart */}
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                اتجاهات الأداء المالي
              </h3>
              <FinancialCharts
                type="line"
                data={analysisResult.trends}
                dataKey="profit"
                xAxisKey="name"
                height={300}
              />
            </div>

            {/* Insights */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
                الرؤى الرئيسية
              </h3>
              <ul className="space-y-2">
                {analysisResult.insights.map((insight, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                التوصيات
              </h3>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <div className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0 mt-2" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Export Button */}
            <div className="flex justify-end">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                <Download className="w-5 h-5" />
                تصدير التقرير
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

