'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  FileSpreadsheet,
  File,
  Settings,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: 'income' | 'balance' | 'cashflow' | 'comprehensive';
  standard: 'IFRS' | 'GAAP' | 'both';
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'income-statement',
    name: 'قائمة الدخل',
    description: 'تقرير شامل لقائمة الدخل مع جميع البنود التفصيلية',
    type: 'income',
    standard: 'both',
  },
  {
    id: 'balance-sheet',
    name: 'الميزانية العمومية',
    description: 'ميزانية عمومية كاملة مع تفاصيل الأصول والخصوم',
    type: 'balance',
    standard: 'both',
  },
  {
    id: 'cash-flow',
    name: 'قائمة التدفقات النقدية',
    description: 'تحليل شامل للتدفقات النقدية من الأنشطة التشغيلية والاستثمارية والتمويلية',
    type: 'cashflow',
    standard: 'both',
  },
  {
    id: 'comprehensive',
    name: 'تقرير مالي شامل',
    description: 'تقرير مالي متكامل يشمل جميع القوائم المالية',
    type: 'comprehensive',
    standard: 'both',
  },
];

export default function FinancialReportGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [selectedStandard, setSelectedStandard] = useState<'IFRS' | 'GAAP'>('IFRS');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!selectedTemplate) return;

    setIsGenerating(true);
    
    setTimeout(() => {
      setGeneratedReport('report-generated');
      setIsGenerating(false);
    }, 2000);
  };

  const handleExport = (format: 'pdf' | 'word' | 'excel') => {
    // Mock export functionality
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          مولد التقارير المالية
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          توليد تقارير مالية احترافية مع قوالب جاهزة ودعم معايير IFRS و GAAP
        </p>
      </div>

      {/* Template Selection */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          اختر نوع التقرير
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTemplates.map((template) => (
            <motion.div
              key={template.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedTemplate(template.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedTemplate === template.id
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-neutral-700 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {template.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-neutral-700 rounded">
                      {template.standard === 'both' ? 'IFRS & GAAP' : template.standard}
                    </span>
                  </div>
                </div>
                {selectedTemplate === template.id && (
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Standard Selection */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          المعيار المحاسبي
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setSelectedStandard('IFRS')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              selectedStandard === 'IFRS'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            IFRS
          </button>
          <button
            onClick={() => setSelectedStandard('GAAP')}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
              selectedStandard === 'GAAP'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            GAAP
          </button>
        </div>
      </div>

      {/* Generate Button */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <button
          onClick={handleGenerate}
          disabled={!selectedTemplate || isGenerating}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            !selectedTemplate || isGenerating
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              جاري التوليد...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              توليد التقرير
            </>
          )}
        </button>
      </div>

      {/* Generated Report */}
      {generatedReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            التقرير جاهز
          </h3>
          <div className="bg-gray-50 dark:bg-neutral-900 rounded-lg p-8 min-h-[400px] mb-6">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>معاينة التقرير المالي</p>
              <p className="text-sm mt-2">
                {reportTemplates.find(t => t.id === selectedTemplate)?.name} - {selectedStandard}
              </p>
            </div>
          </div>

          {/* Export Options */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all"
            >
              <File className="w-5 h-5" />
              تصدير PDF
            </button>
            <button
              onClick={() => handleExport('word')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              <FileText className="w-5 h-5" />
              تصدير Word
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
            >
              <FileSpreadsheet className="w-5 h-5" />
              تصدير Excel
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

