'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  RefreshCw,
  Download,
  Shield,
} from 'lucide-react';
import FileUploader, { UploadedFile } from './FileUploader';

interface ComplianceCheck {
  id: string;
  standard: string;
  requirement: string;
  status: 'compliant' | 'non-compliant' | 'partial';
  description: string;
  recommendation?: string;
}

interface ComplianceResult {
  overallScore: number;
  standards: {
    IFRS: { score: number; status: string };
    GAAP: { score: number; status: string };
    IIA: { score: number; status: string };
  };
  checks: ComplianceCheck[];
  nonCompliances: ComplianceCheck[];
  recommendations: string[];
}

export default function ComplianceAnalyzer() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<string[]>(['IFRS', 'GAAP', 'IIA']);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [complianceResult, setComplianceResult] = useState<ComplianceResult | null>(null);

  const standards = [
    { id: 'IFRS', name: 'IFRS', description: 'المعايير الدولية لإعداد التقارير المالية' },
    { id: 'GAAP', name: 'GAAP', description: 'مبادئ المحاسبة المقبولة عموماً' },
    { id: 'IIA', name: 'IIA Standards', description: 'معايير معهد المراجعين الداخليين' },
  ];

  // Mock data
  const mockComplianceResult: ComplianceResult = {
    overallScore: 78,
    standards: {
      IFRS: { score: 85, status: 'compliant' },
      GAAP: { score: 72, status: 'partial' },
      IIA: { score: 75, status: 'partial' },
    },
    checks: [
      {
        id: '1',
        standard: 'IFRS',
        requirement: 'IFRS 15 - الإيرادات من العقود مع العملاء',
        status: 'compliant',
        description: 'تم تطبيق IFRS 15 بشكل صحيح في الاعتراف بالإيرادات',
      },
      {
        id: '2',
        standard: 'IFRS',
        requirement: 'IFRS 16 - عقود الإيجار',
        status: 'partial',
        description: 'بعض عقود الإيجار لم يتم تصنيفها بشكل صحيح',
        recommendation: 'مراجعة جميع عقود الإيجار وتطبيق IFRS 16 بشكل كامل',
      },
      {
        id: '3',
        standard: 'GAAP',
        requirement: 'Revenue Recognition',
        status: 'non-compliant',
        description: 'عدم تطابق في معايير الاعتراف بالإيرادات مع GAAP',
        recommendation: 'تعديل سياسات الاعتراف بالإيرادات لتتوافق مع GAAP',
      },
      {
        id: '4',
        standard: 'IIA',
        requirement: 'Standard 1100 - Independence and Objectivity',
        status: 'compliant',
        description: 'المراجعة الداخلية مستقلة وموضوعية',
      },
      {
        id: '5',
        standard: 'IIA',
        requirement: 'Standard 2200 - Planning',
        status: 'partial',
        description: 'خطة المراجعة تحتاج إلى تحديث',
        recommendation: 'تحديث خطة المراجعة السنوية',
      },
    ],
    nonCompliances: [
      {
        id: '3',
        standard: 'GAAP',
        requirement: 'Revenue Recognition',
        status: 'non-compliant',
        description: 'عدم تطابق في معايير الاعتراف بالإيرادات مع GAAP',
        recommendation: 'تعديل سياسات الاعتراف بالإيرادات لتتوافق مع GAAP',
      },
    ],
    recommendations: [
      'معالجة فورية لعدم الامتثال لمعايير GAAP',
      'تحديث سياسات المحاسبة لتتوافق مع جميع المعايير',
      'تدريب الموظفين على أحدث المعايير',
      'تنفيذ نظام مراقبة مستمر للامتثال',
    ],
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0 || selectedStandards.length === 0) return;

    setIsAnalyzing(true);
    
    setTimeout(() => {
      setComplianceResult(mockComplianceResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const toggleStandard = (standardId: string) => {
    setSelectedStandards(prev =>
      prev.includes(standardId)
        ? prev.filter(id => id !== standardId)
        : [...prev, standardId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'partial':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'non-compliant':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'partial':
        return <AlertTriangle className="w-5 h-5" />;
      case 'non-compliant':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          محلل الامتثال
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          فحص الامتثال لمعايير IFRS, GAAP, IIA مع تقارير تفصيلية
        </p>
      </div>

      {/* Standards Selection */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          اختر المعايير للفحص
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {standards.map((standard) => (
            <motion.div
              key={standard.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => toggleStandard(standard.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedStandards.includes(standard.id)
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-gray-200 dark:border-neutral-700 hover:border-indigo-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Shield className={`w-5 h-5 ${
                  selectedStandards.includes(standard.id)
                    ? 'text-indigo-600'
                    : 'text-gray-400'
                }`} />
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {standard.name}
                </h4>
                {selectedStandards.includes(standard.id) && (
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-auto" />
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {standard.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          رفع ملفات القوائم المالية
        </h3>
        <FileUploader
          accept=".xlsx,.xls,.pdf"
          multiple={true}
          maxSize={10}
          onFilesChange={setUploadedFiles}
        />
        
        <button
          onClick={handleAnalyze}
          disabled={uploadedFiles.length === 0 || selectedStandards.length === 0 || isAnalyzing}
          className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            uploadedFiles.length === 0 || selectedStandards.length === 0 || isAnalyzing
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              جاري الفحص...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              بدء فحص الامتثال
            </>
          )}
        </button>
      </div>

      {/* Compliance Results */}
      {complianceResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Overall Score */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-4">النتيجة الإجمالية</h3>
            <div className="flex items-center gap-6">
              <div className="text-5xl font-bold">{complianceResult.overallScore}%</div>
              <div className="flex-1">
                <div className="w-full bg-white/20 rounded-full h-4 mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${complianceResult.overallScore}%` }}
                    transition={{ duration: 1 }}
                    className="h-4 bg-white rounded-full"
                  />
                </div>
                <p className="text-sm opacity-90">
                  {complianceResult.overallScore >= 80 ? 'امتثال جيد' :
                   complianceResult.overallScore >= 60 ? 'امتثال جزئي' : 'يحتاج تحسين'}
                </p>
              </div>
            </div>
          </div>

          {/* Standards Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(complianceResult.standards).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg"
              >
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">{key}</h4>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {value.score}%
                </div>
                <div className={`text-sm px-3 py-1 rounded-full inline-block ${
                  value.status === 'compliant'
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                }`}>
                  {value.status === 'compliant' ? 'متوافق' : 'جزئي'}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compliance Checks */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              تفاصيل الفحص
            </h3>
            <div className="space-y-4">
              {complianceResult.checks.map((check, index) => (
                <motion.div
                  key={check.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-2 ${getStatusColor(check.status)}`}
                >
                  <div className="flex items-start gap-3">
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-neutral-700 rounded">
                          {check.standard}
                        </span>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {check.requirement}
                        </h4>
                      </div>
                      <p className="text-sm opacity-80 mb-2">{check.description}</p>
                      {check.recommendation && (
                        <div className="bg-white/50 dark:bg-black/20 rounded p-2 mt-2">
                          <p className="text-sm font-medium mb-1">توصية:</p>
                          <p className="text-sm">{check.recommendation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Non-Compliances */}
          {complianceResult.nonCompliances.length > 0 && (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-600" />
                عدم الامتثال ({complianceResult.nonCompliances.length})
              </h3>
              <div className="space-y-3">
                {complianceResult.nonCompliances.map((item) => (
                  <div key={item.id} className="bg-white/50 dark:bg-black/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-1 bg-red-600 text-white rounded">
                        {item.standard}
                      </span>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {item.requirement}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {item.description}
                    </p>
                    {item.recommendation && (
                      <p className="text-sm font-medium text-red-700 dark:text-red-400">
                        توصية: {item.recommendation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              التوصيات
            </h3>
            <ul className="space-y-2">
              {complianceResult.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Export */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
              <Download className="w-5 h-5" />
              تصدير تقرير الامتثال
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

