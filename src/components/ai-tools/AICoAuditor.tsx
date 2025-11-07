'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  RefreshCw,
  Download,
  TrendingUp,
} from 'lucide-react';
import FileUploader, { UploadedFile } from './FileUploader';

interface AuditIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  location: string;
  suggestion: string;
}

interface AuditResult {
  issues: AuditIssue[];
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  compliance: {
    score: number;
    status: 'compliant' | 'partial' | 'non-compliant';
    standards: string[];
  };
  recommendations: string[];
}

export default function AICoAuditor() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  // Mock data
  const mockAuditResult: AuditResult = {
    issues: [
      {
        id: '1',
        type: 'error',
        severity: 'critical',
        description: 'عدم تطابق في مبلغ الإيرادات بين القوائم المالية',
        location: 'قائمة الدخل - السطر 15',
        suggestion: 'مراجعة حسابات الإيرادات والتأكد من التطابق',
      },
      {
        id: '2',
        type: 'warning',
        severity: 'high',
        description: 'عدم توثيق معاملة مالية كبيرة',
        location: 'الميزانية العمومية - الأصول الثابتة',
        suggestion: 'إضافة مستندات داعمة للمعاملة',
      },
      {
        id: '3',
        type: 'error',
        severity: 'medium',
        description: 'خطأ في تصنيف مصروف كرأسمالي بدلاً من تشغيلي',
        location: 'قائمة الدخل - المصروفات',
        suggestion: 'إعادة تصنيف المصروف حسب طبيعته',
      },
      {
        id: '4',
        type: 'info',
        severity: 'low',
        description: 'ملاحظة: يمكن تحسين توثيق بعض المعاملات',
        location: 'عام',
        suggestion: 'تحسين نظام التوثيق',
      },
    ],
    summary: {
      total: 4,
      critical: 1,
      high: 1,
      medium: 1,
      low: 1,
    },
    compliance: {
      score: 75,
      status: 'partial',
      standards: ['IFRS', 'IIA Standards'],
    },
    recommendations: [
      'معالجة فورية للقضايا الحرجة',
      'مراجعة شاملة لنظام التوثيق',
      'تدريب الموظفين على المعايير المحاسبية',
      'تنفيذ نظام مراقبة مستمر',
    ],
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) return;

    setIsAnalyzing(true);
    
    setTimeout(() => {
      setAuditResult(mockAuditResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <XCircle className="w-5 h-5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />;
      case 'info':
        return <CheckCircle2 className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getIssueColor = (type: string, severity: string) => {
    if (type === 'error' || severity === 'critical') {
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
    }
    if (severity === 'high') {
      return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
    }
    if (severity === 'medium') {
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    }
    return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          المدقق المساعد
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          تحليل ملفات المراجعة واكتشاف الأخطاء والتناقضات تلقائياً
        </p>
      </div>

      {/* File Upload */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          رفع ملفات المراجعة
        </h3>
        <FileUploader
          accept=".xlsx,.xls,.pdf,.doc,.docx"
          multiple={true}
          maxSize={10}
          onFilesChange={setUploadedFiles}
        />
        
        <button
          onClick={handleAnalyze}
          disabled={uploadedFiles.length === 0 || isAnalyzing}
          className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
            uploadedFiles.length === 0 || isAnalyzing
              ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              جاري التحليل...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              بدء المراجعة
            </>
          )}
        </button>
      </div>

      {/* Audit Results */}
      {auditResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'إجمالي القضايا', value: auditResult.summary.total, color: 'gray' },
              { label: 'حرجة', value: auditResult.summary.critical, color: 'red' },
              { label: 'عالية', value: auditResult.summary.high, color: 'orange' },
              { label: 'متوسطة', value: auditResult.summary.medium, color: 'yellow' },
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

          {/* Compliance Score */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              درجة الامتثال
            </h3>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {auditResult.compliance.standards.join(', ')}
                  </span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {auditResult.compliance.score}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${auditResult.compliance.score}%` }}
                    transition={{ duration: 1 }}
                    className={`h-4 rounded-full ${
                      auditResult.compliance.score >= 80
                        ? 'bg-green-600'
                        : auditResult.compliance.score >= 60
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                    }`}
                  />
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg font-semibold ${
                auditResult.compliance.status === 'compliant'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : auditResult.compliance.status === 'partial'
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
              }`}>
                {auditResult.compliance.status === 'compliant' ? 'متوافق' :
                 auditResult.compliance.status === 'partial' ? 'جزئي' : 'غير متوافق'}
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              القضايا المكتشفة
            </h3>
            {auditResult.issues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 ${getIssueColor(issue.type, issue.severity)}`}
              >
                <div className="flex items-start gap-3 mb-2">
                  {getIssueIcon(issue.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{issue.description}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        issue.severity === 'critical' ? 'bg-red-600 text-white' :
                        issue.severity === 'high' ? 'bg-orange-600 text-white' :
                        issue.severity === 'medium' ? 'bg-yellow-500 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {issue.severity === 'critical' ? 'حرج' :
                         issue.severity === 'high' ? 'عالي' :
                         issue.severity === 'medium' ? 'متوسط' : 'منخفض'}
                      </span>
                    </div>
                    <p className="text-sm opacity-80 mb-2">{issue.location}</p>
                    <div className="bg-white/50 dark:bg-black/20 rounded p-2 mt-2">
                      <p className="text-sm font-medium mb-1">اقتراح:</p>
                      <p className="text-sm">{issue.suggestion}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              التوصيات
            </h3>
            <ul className="space-y-2">
              {auditResult.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Export */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all border border-green-400/50 dark:border-green-300/50 hover:border-green-300 dark:hover:border-green-200 ring-1 ring-green-500/20 hover:ring-green-400/40">
              <Download className="w-5 h-5" />
              تصدير تقرير المراجعة
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

