'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Upload,
  Edit3,
  Download,
  File,
  BarChart3,
  PieChart,
  TrendingUp,
  CheckCircle,
  Settings,
  Eye,
  Save,
  X,
  Zap,
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  content: string;
  summary: {
    executive: string;
    technical: string;
    simplified: string;
  };
  keyPoints: string[];
  charts: {
    type: 'bar' | 'pie' | 'line';
    data: any;
    title: string;
  }[];
}

interface SummaryStyle {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ExecutiveSummaryComponent = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string>('executive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const summaryStyles: SummaryStyle[] = [
    {
      id: 'executive',
      name: 'تنفيذي',
      description: 'ملخص موجز للقيادة',
      icon: TrendingUp,
    },
    {
      id: 'technical',
      name: 'تقني',
      description: 'تفاصيل فنية مفصلة',
      icon: Settings,
    },
    {
      id: 'simplified',
      name: 'مبسط',
      description: 'شرح بسيط وواضح',
      icon: Eye,
    },
  ];

  const mockReports: Report[] = [
    {
      id: '1',
      title: 'تقرير الأداء المالي الربع السنوي',
      content: 'تقرير طويل يحتوي على تحليل مفصل للأداء المالي...',
      summary: {
        executive: 'الأداء المالي إيجابي مع نمو في الإيرادات بنسبة 15% وزيادة في الأرباح الصافية.',
        technical: 'تحليل التقرير المالي يظهر تحسناً في مؤشرات الربحية مع انخفاض في نسبة الديون إلى 45%.',
        simplified: 'الشركة حققت أرباحاً أكثر هذا الربع مقارنة بالربع السابق.',
      },
      keyPoints: [
        'زيادة الإيرادات بنسبة 15%',
        'تحسن في هامش الربح',
        'انخفاض في التكاليف التشغيلية',
        'استثمارات جديدة في التكنولوجيا',
      ],
      charts: [
        {
          type: 'bar',
          data: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [100, 115, 125, 130] },
          title: 'الإيرادات الربعية',
        },
        {
          type: 'pie',
          data: { labels: ['الإيرادات', 'التكاليف', 'الأرباح'], values: [60, 30, 10] },
          title: 'توزيع التكاليف',
        },
      ],
    },
    {
      id: '2',
      title: 'تقرير التحليل السوقي',
      content: 'تحليل شامل للسوق والمنافسين...',
      summary: {
        executive: 'السوق يشهد نمواً سريعاً مع فرص توسع في الأسواق الناشئة.',
        technical: 'تحليل البيانات يشير إلى اتجاهات إيجابية في القطاع مع زيادة الحصة السوقية.',
        simplified: 'السوق جيد وهناك فرص للنمو.',
      },
      keyPoints: [
        'نمو السوق بنسبة 20%',
        'زيادة الطلب على المنتجات الرقمية',
        'دخول منافسين جدد',
        'فرص في الأسواق الدولية',
      ],
      charts: [
        {
          type: 'line',
          data: { labels: ['2020', '2021', '2022', '2023'], values: [50, 60, 75, 90] },
          title: 'نمو السوق',
        },
      ],
    },
  ];

  const generateSummary = (report: Report) => {
    setIsGenerating(true);
    setTimeout(() => {
      setSelectedReport(report);
      setEditedSummary(report.summary[selectedStyle as keyof typeof report.summary]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate selecting a report based on file
      const randomReport = mockReports[Math.floor(Math.random() * mockReports.length)];
      generateSummary(randomReport);
    }
  };

  const handleExport = (format: 'pdf' | 'ppt') => {
    // Simulate export
    alert(`تم تصدير الملخص كـ ${format === 'pdf' ? 'PDF' : 'PowerPoint'}`);
  };

  const renderMiniChart = (chart: Report['charts'][0]) => {
    // Simple mock chart rendering
    return (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">{chart.title}</h4>
        <div className="h-20 flex items-end justify-around">
          {chart.data.values.map((value: number, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-gradient-to-t from-purple-500 to-blue-600 rounded-t w-4"
                style={{ height: `${(value / Math.max(...chart.data.values)) * 60}px` }}
              ></div>
              <span className="text-xs text-gray-500 mt-1">{chart.data.labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          نسخة المدير التنفيذية
        </h1>
        <p className="text-lg text-neutral max-w-3xl mx-auto">
          تلخيص التقارير الطويلة في صفحة واحدة مع النقاط الرئيسية
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div className="text-center">
          <div className="mb-4">
            <Upload className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              رفع التقرير
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              اختر تقرير طويل لإنشاء ملخص تنفيذي
            </p>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <label className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all cursor-pointer">
              <Upload className="w-4 h-4 inline mr-2" />
              اختر ملف
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <button
              onClick={() => {
                const randomReport = mockReports[Math.floor(Math.random() * mockReports.length)];
                generateSummary(randomReport);
              }}
              className="px-6 py-3 border border-purple-500 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
            >
              <FileText className="w-4 h-4 inline mr-2" />
              اختبار مع تقرير تجريبي
            </button>
          </div>

          {uploadedFile && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              تم رفع: {uploadedFile.name}
            </div>
          )}
        </div>
      </motion.div>

      {/* Style Selection */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            اختر أسلوب الملخص
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {summaryStyles.map((style) => {
              const IconComponent = style.icon;
              const isSelected = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => {
                    setSelectedStyle(style.id);
                    setEditedSummary(selectedReport.summary[style.id as keyof typeof selectedReport.summary]);
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                  }`}
                >
                  <IconComponent className={`w-6 h-6 mb-2 ${isSelected ? 'text-purple-600' : 'text-gray-500'}`} />
                  <h4 className="font-medium text-gray-900 dark:text-white">{style.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{style.description}</p>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Summary Display */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center"
          >
            <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">جاري إنشاء الملخص...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedReport && !isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              ملخص التقرير: {selectedReport.title}
            </h3>
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Edit3 className="w-4 h-4 inline mr-2" />
                {isEditing ? 'إلغاء التعديل' : 'تعديل'}
              </button>
              <button
                onClick={() => handleExport('pdf')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download className="w-4 h-4 inline mr-2" />
                تصدير PDF
              </button>
              <button
                onClick={() => handleExport('ppt')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Download className="w-4 h-4 inline mr-2" />
                تصدير PowerPoint
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Text */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                الملخص التنفيذي
              </h4>
              {isEditing ? (
                <textarea
                  value={editedSummary}
                  onChange={(e) => setEditedSummary(e.target.value)}
                  className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                  placeholder="عدل الملخص هنا..."
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {editedSummary}
                </p>
              )}
            </div>

            {/* Key Points and Charts */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  النقاط الرئيسية
                </h4>
                <ul className="space-y-2">
                  {selectedReport.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  الرسوم البيانية
                </h4>
                <div className="space-y-4">
                  {selectedReport.charts.map((chart, index) => (
                    <div key={index}>
                      {renderMiniChart(chart)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ExecutiveSummaryComponent;