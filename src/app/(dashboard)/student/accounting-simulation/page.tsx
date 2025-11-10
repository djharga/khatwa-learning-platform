"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, TrendingUp, DollarSign, BarChart3, Calculator } from 'lucide-react';

// بيانات عينة للمحاكاة
const sampleCompanyData = {
  name: 'شركة أرامكو السعودية',
  sector: 'الطاقة والنفط',
  size: 'كبيرة',
  standards: 'IFRS'
};

const sampleFinancialStatements = {
  income: {
    revenue: 500000000,
    expenses: 400000000,
    netIncome: 100000000
  },
  balance: {
    assets: 1200000000,
    liabilities: 300000000,
    equity: 900000000
  }
};

// تعريف types
interface AnalysisResults {
  liquidityRatio: string;
  profitabilityRatio: string;
  debtRatio: string;
}

interface DetectedError {
  type: string;
  description: string;
  severity: string;
}

const AccountingSimulation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [detectedErrors, setDetectedErrors] = useState<DetectedError[]>([]);

  const handleAnalysis = () => {
    // محاكاة تحليل القوائم المالية
    const results = {
      liquidityRatio: (sampleFinancialStatements.balance.assets / sampleFinancialStatements.balance.liabilities).toFixed(2),
      profitabilityRatio: ((sampleFinancialStatements.income.netIncome / sampleFinancialStatements.income.revenue) * 100).toFixed(2),
      debtRatio: ((sampleFinancialStatements.balance.liabilities / sampleFinancialStatements.balance.assets) * 100).toFixed(2)
    };

    // اكتشاف أخطاء متعمدة (محاكاة)
    const errors = [
      { type: 'overstated_revenue', description: 'تضخيم الإيرادات بنسبة 10%', severity: 'high' },
      { type: 'understated_liabilities', description: 'إخفاء ديون بقيمة 50 مليون ريال', severity: 'critical' }
    ];

    setAnalysisResults(results);
    setDetectedErrors(errors);
    setCurrentStep(2);
  };

  const handleErrorCorrection = (errorType: string) => {
    // محاكاة تصحيح الخطأ
    setDetectedErrors(prev => prev.filter(error => error.type !== errorType));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">محاكاة بيئة العمل المحاسبية</h1>
          </div>
          <Badge className="px-3 py-1.5 bg-secondary-innovate-100 dark:bg-secondary-innovate-900/20 text-secondary-innovate-800 dark:text-secondary-innovate-300 border-2 border-secondary-innovate-200 dark:border-secondary-innovate-800">مستوى متقدم</Badge>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* الشريط الجانبي */}
          <Card className="lg:col-span-1 shadow-md border border-neutral-200 dark:border-neutral-700">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">أدوات المحاسب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button
                onClick={() => setCurrentStep(1)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-[44px] rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ease-out text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  currentStep === 1
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
                aria-label="تحليل القوائم المالية"
                aria-pressed={currentStep === 1}
                type="button"
              >
                تحليل القوائم المالية
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-[44px] rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ease-out text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  currentStep === 2
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
                aria-label="اكتشاف الأخطاء"
                aria-pressed={currentStep === 2}
                type="button"
              >
                اكتشاف الأخطاء
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-[44px] rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ease-out text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  currentStep === 3
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
                aria-label="تطبيق IFRS/GAAP"
                aria-pressed={currentStep === 3}
                type="button"
              >
                تطبيق IFRS/GAAP
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-[44px] rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ease-out text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  currentStep === 4
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                }`}
                aria-label="تقارير وتوصيات"
                aria-pressed={currentStep === 4}
                type="button"
              >
                تقارير وتوصيات
              </button>
            </CardContent>
          </Card>

          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* بيانات الشركة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-xl">
                  <CardTitle className="text-base sm:text-lg font-bold">بيانات الشركة</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                      <Label className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1 block">اسم الشركة</Label>
                      <p className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">{sampleCompanyData.name}</p>
                    </div>
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                      <Label className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1 block">القطاع</Label>
                      <p className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">{sampleCompanyData.sector}</p>
                    </div>
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                      <Label className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1 block">الحجم</Label>
                      <p className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">{sampleCompanyData.size}</p>
                    </div>
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                      <Label className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1 block">المعايير</Label>
                      <p className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">{sampleCompanyData.standards}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* القوائم المالية */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
            >
              <Tabs defaultValue="income" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-1 min-h-[44px]">
                  <TabsTrigger 
                    value="income"
                    className="rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-600 data-[state=active]:to-primary-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    قائمة الدخل
                  </TabsTrigger>
                  <TabsTrigger 
                    value="balance"
                    className="rounded-lg font-medium text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary-600 data-[state=active]:to-primary-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    الميزانية العمومية
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="income" className="mt-4">
                  <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                    <CardHeader className="bg-gradient-to-r from-success-600 to-success-700 text-white rounded-t-xl">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                        <TrendingUp className="h-5 w-5" aria-hidden="true" />
                        قائمة الدخل (بالريال السعودي)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-3">
                      <div className="flex justify-between items-center p-3 sm:p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800">
                        <span className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">الإيرادات</span>
                        <span className="font-bold text-success-600 dark:text-success-400 text-sm sm:text-base">{sampleFinancialStatements.income.revenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 sm:p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800">
                        <span className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">المصروفات</span>
                        <span className="font-bold text-danger-600 dark:text-danger-400 text-sm sm:text-base">{sampleFinancialStatements.income.expenses.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 sm:p-4 border-2 border-primary-200 dark:border-primary-800 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                        <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">صافي الدخل</span>
                        <span className="font-bold text-primary-600 dark:text-primary-400 text-base sm:text-lg">{sampleFinancialStatements.income.netIncome.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="balance" className="mt-4">
                  <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                    <CardHeader className="bg-gradient-to-r from-secondary-innovate-600 to-secondary-innovate-700 text-white rounded-t-xl">
                      <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                        <BarChart3 className="h-5 w-5" aria-hidden="true" />
                        الميزانية العمومية (بالريال السعودي)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-3">
                      <div className="flex justify-between items-center p-3 sm:p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800">
                        <span className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">الأصول</span>
                        <span className="font-bold text-success-600 dark:text-success-400 text-sm sm:text-base">{sampleFinancialStatements.balance.assets.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 sm:p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800">
                        <span className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">الخصوم</span>
                        <span className="font-bold text-danger-600 dark:text-danger-400 text-sm sm:text-base">{sampleFinancialStatements.balance.liabilities.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 sm:p-4 border-2 border-primary-200 dark:border-primary-800 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                        <span className="text-sm sm:text-base font-bold text-neutral-900 dark:text-white">حقوق المساهمين</span>
                        <span className="font-bold text-primary-600 dark:text-primary-400 text-base sm:text-lg">{sampleFinancialStatements.balance.equity.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* نتائج التحليل */}
            {analysisResults && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                  <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-xl">
                    <CardTitle className="text-base sm:text-lg font-bold">نتائج التحليل المالي</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                      <motion.div
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="text-center p-4 sm:p-6 border-2 border-primary-200 dark:border-primary-800 rounded-xl bg-primary-50 dark:bg-primary-900/20"
                      >
                        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg w-fit mx-auto mb-3">
                          <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-2 font-medium">نسبة السيولة</p>
                        <p className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">{analysisResults.liquidityRatio}</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="text-center p-4 sm:p-6 border-2 border-success-200 dark:border-success-800 rounded-xl bg-success-50 dark:bg-success-900/20"
                      >
                        <div className="p-2 bg-success-100 dark:bg-success-900/30 rounded-lg w-fit mx-auto mb-3">
                          <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-success-600 dark:text-success-400" aria-hidden="true" />
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-2 font-medium">نسبة الربحية</p>
                        <p className="text-xl sm:text-2xl font-bold text-success-600 dark:text-success-400">{analysisResults.profitabilityRatio}%</p>
                      </motion.div>
                      <motion.div
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="text-center p-4 sm:p-6 border-2 border-warning-200 dark:border-warning-800 rounded-xl bg-warning-50 dark:bg-warning-900/20"
                      >
                        <div className="p-2 bg-warning-100 dark:bg-warning-900/30 rounded-lg w-fit mx-auto mb-3">
                          <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-2 font-medium">نسبة الدين</p>
                        <p className="text-xl sm:text-2xl font-bold text-warning-600 dark:text-warning-400">{analysisResults.debtRatio}%</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* الأخطاء المكتشفة */}
            {detectedErrors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="shadow-md border-2 border-danger-200 dark:border-danger-800">
                  <CardHeader className="bg-gradient-to-r from-danger-600 to-danger-700 text-white rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                      <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                      الأخطاء المكتشفة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-3">
                    {detectedErrors.map((error, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.2, ease: 'easeOut' }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 sm:p-4 border-2 border-danger-200 dark:border-danger-800 rounded-lg bg-danger-50 dark:bg-danger-900/20"
                      >
                        <div className="flex-1">
                          <p className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white mb-2">{error.description}</p>
                          <Badge className="px-2 py-1 bg-danger-600 text-white border-0 text-xs">
                            {error.severity === 'high' ? 'عالية' : error.severity === 'critical' ? 'حرجة' : error.severity}
                          </Badge>
                        </div>
                        <button
                          onClick={() => handleErrorCorrection(error.type)}
                          className="px-3 sm:px-4 py-2 min-h-[44px] bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-danger-600 dark:text-danger-400 rounded-lg font-medium text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500 focus-visible:ring-offset-2"
                          aria-label={`تصحيح ${error.description}`}
                          type="button"
                        >
                          تصحيح
                        </button>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* أزرار التحكم */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.2, ease: 'easeOut' }}
              className="flex justify-center gap-3 sm:gap-4"
            >
              {currentStep === 1 && (
                <button
                  onClick={handleAnalysis}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-bold text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  aria-label="بدء التحليل"
                  type="button"
                >
                  بدء التحليل
                </button>
              )}
              {currentStep === 2 && (
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-bold text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  aria-label="تطبيق المعايير"
                  type="button"
                >
                  تطبيق المعايير
                </button>
              )}
              {currentStep === 3 && (
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-bold text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  aria-label="إنشاء التقرير"
                  type="button"
                >
                  إنشاء التقرير
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AccountingSimulation);
