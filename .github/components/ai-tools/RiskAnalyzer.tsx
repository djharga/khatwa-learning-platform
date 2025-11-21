'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Shield,
  TrendingUp,
  FileSpreadsheet,
  Download,
  RefreshCw,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import FileUploader, { UploadedFile } from './FileUploader';
import dynamic from 'next/dynamic';

const FinancialCharts = dynamic(
  () => import('./FinancialCharts'),
  { ssr: false }
);

interface Risk {
  id: string;
  name: string;
  category: 'financial' | 'operational' | 'compliance' | 'strategic';
  probability: number; // 0-100
  impact: number; // 0-100
  riskScore: number; // probability * impact / 100
  status: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  mitigation: string[];
}

interface RiskAnalysisResult {
  risks: Risk[];
  riskMatrix: any[];
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  recommendations: string[];
}

export default function RiskAnalyzer() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<RiskAnalysisResult | null>(null);

  // Mock data
  const mockAnalysisResult: RiskAnalysisResult = {
    risks: [
      {
        id: '1',
        name: 'مخاطر السيولة',
        category: 'financial',
        probability: 70,
        impact: 80,
        riskScore: 56,
        status: 'high',
        description: 'خطر عدم القدرة على تلبية الالتزامات قصيرة الأجل',
        mitigation: [
          'زيادة الاحتياطي النقدي',
          'تفاوض أفضل شروط الائتمان',
          'تنويع مصادر التمويل',
        ],
      },
      {
        id: '2',
        name: 'مخاطر الائتمان',
        category: 'financial',
        probability: 60,
        impact: 75,
        riskScore: 45,
        status: 'high',
        description: 'خطر عدم سداد العملاء للديون',
        mitigation: [
          'تحسين سياسات الائتمان',
          'متابعة دورية للعملاء',
          'شراء تأمين الائتمان',
        ],
      },
      {
        id: '3',
        name: 'مخاطر العمليات',
        category: 'operational',
        probability: 50,
        impact: 60,
        riskScore: 30,
        status: 'medium',
        description: 'خطر انقطاع العمليات التشغيلية',
        mitigation: [
          'وضع خطة طوارئ',
          'تنويع الموردين',
          'تدريب الموظفين',
        ],
      },
      {
        id: '4',
        name: 'مخاطر الامتثال',
        category: 'compliance',
        probability: 40,
        impact: 90,
        riskScore: 36,
        status: 'medium',
        description: 'خطر عدم الامتثال للمعايير واللوائح',
        mitigation: [
          'مراجعة دورية للامتثال',
          'تدريب الموظفين على المعايير',
          'استشارة قانونية دورية',
        ],
      },
    ],
    riskMatrix: [
      { name: 'منخفض', count: 5, color: '#10B981' },
      { name: 'متوسط', count: 8, color: '#F59E0B' },
      { name: 'عالي', count: 4, color: '#EF4444' },
      { name: 'حرج', count: 2, color: '#DC2626' },
    ],
    summary: {
      total: 19,
      critical: 2,
      high: 4,
      medium: 8,
      low: 5,
    },
    recommendations: [
      'إعطاء أولوية عالية للمخاطر الحرجة والعالية',
      'وضع خطة عمل فورية للحد من المخاطر الحرجة',
      'مراقبة مستمرة للمخاطر المتوسطة',
      'مراجعة دورية لمصفوفة المخاطر',
    ],
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) return;

    setIsAnalyzing(true);
    
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'high':
        return 'bg-orange-600 text-white';
      case 'medium':
        return 'bg-yellow-500 text-white';
      case 'low':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'financial':
        return 'from-blue-500 to-cyan-500';
      case 'operational':
        return 'from-purple-500 to-pink-500';
      case 'compliance':
        return 'from-orange-500 to-red-500';
      case 'strategic':
        return 'from-indigo-500 to-blue-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          محلل المخاطر
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          تحليل شامل للمخاطر المالية والتشغيلية حسب COSO Framework
        </p>
      </div>

      {/* File Upload */}
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          رفع ملفات البيانات
        </h3>
        <FileUploader
          accept=".xlsx,.xls,.pdf"
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
              : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
          }`}
        >
          {isAnalyzing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              جاري التحليل...
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5" />
              بدء تحليل المخاطر
            </>
          )}
        </button>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'إجمالي المخاطر', value: analysisResult.summary.total, color: 'gray' },
              { label: 'حرجة', value: analysisResult.summary.critical, color: 'red' },
              { label: 'عالية', value: analysisResult.summary.high, color: 'orange' },
              { label: 'متوسطة', value: analysisResult.summary.medium, color: 'yellow' },
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

          {/* Risk Matrix Chart */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              مصفوفة المخاطر
            </h3>
            <FinancialCharts
              type="bar"
              data={analysisResult.riskMatrix}
              dataKey="count"
              xAxisKey="name"
              height={300}
            />
          </div>

          {/* Risks List */}
          <div className="space-y-4">
            {analysisResult.risks.map((risk, index) => (
              <motion.div
                key={risk.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border-r-4 border-orange-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${getCategoryColor(risk.category)}`}>
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {risk.name}
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(risk.status)}`}>
                        {risk.status === 'critical' ? 'حرج' :
                         risk.status === 'high' ? 'عالي' :
                         risk.status === 'medium' ? 'متوسط' : 'منخفض'}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {risk.description}
                    </p>
                  </div>
                </div>

                {/* Risk Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">الاحتمالية</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {risk.probability}%
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">التأثير</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {risk.impact}%
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">نقاط المخاطر</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {risk.riskScore}
                    </div>
                  </div>
                </div>

                {/* Mitigation */}
                <div className="border-t border-gray-200 dark:border-neutral-700 pt-4">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    إجراءات الحد من المخاطر:
                  </h5>
                  <ul className="space-y-1">
                    {risk.mitigation.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              التوصيات الاستراتيجية
            </h3>
            <ul className="space-y-2">
              {analysisResult.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Export */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all border border-orange-400/50 dark:border-orange-300/50 hover:border-orange-300 dark:hover:border-orange-200 ring-1 ring-orange-500/20 hover:ring-orange-400/40">
              <Download className="w-5 h-5" />
              تصدير تقرير المخاطر
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

