"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import StyledButton from '@/components/ui/StyledButton';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

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
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary">محاكاة بيئة العمل المحاسبية</h1>
        <Badge variant="outline">مستوى متقدم</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* الشريط الجانبي */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">أدوات المحاسب</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <StyledButton
              variant={currentStep === 1 ? "primary" : "secondary"}
              size="medium"
              fullWidth
              onClick={() => setCurrentStep(1)}
              className="justify-start"
            >
              تحليل القوائم المالية
            </StyledButton>
            <StyledButton
              variant={currentStep === 2 ? "primary" : "secondary"}
              size="medium"
              fullWidth
              onClick={() => setCurrentStep(2)}
              className="justify-start"
            >
              اكتشاف الأخطاء
            </StyledButton>
            <StyledButton
              variant={currentStep === 3 ? "primary" : "secondary"}
              size="medium"
              fullWidth
              onClick={() => setCurrentStep(3)}
              className="justify-start"
            >
              تطبيق IFRS/GAAP
            </StyledButton>
            <StyledButton
              variant={currentStep === 4 ? "primary" : "secondary"}
              size="medium"
              fullWidth
              onClick={() => setCurrentStep(4)}
              className="justify-start"
            >
              تقارير وتوصيات
            </StyledButton>
          </CardContent>
        </Card>

        {/* المحتوى الرئيسي */}
        <div className="lg:col-span-3 space-y-6">
          {/* بيانات الشركة */}
          <Card>
            <CardHeader>
              <CardTitle>بيانات الشركة</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-sm font-medium">اسم الشركة</Label>
                <p className="text-lg font-semibold">{sampleCompanyData.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">القطاع</Label>
                <p className="text-lg font-semibold">{sampleCompanyData.sector}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">الحجم</Label>
                <p className="text-lg font-semibold">{sampleCompanyData.size}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">المعايير</Label>
                <p className="text-lg font-semibold">{sampleCompanyData.standards}</p>
              </div>
            </CardContent>
          </Card>

          {/* القوائم المالية */}
          <Tabs defaultValue="income" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="income">قائمة الدخل</TabsTrigger>
              <TabsTrigger value="balance">الميزانية العمومية</TabsTrigger>
            </TabsList>
            <TabsContent value="income">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    قائمة الدخل (بالريال السعودي)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>الإيرادات</span>
                    <span className="font-semibold text-green-600">{sampleFinancialStatements.income.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>المصروفات</span>
                    <span className="font-semibold text-red-600">{sampleFinancialStatements.income.expenses.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded bg-gray-50">
                    <span className="font-semibold">صافي الدخل</span>
                    <span className="font-bold text-blue-600">{sampleFinancialStatements.income.netIncome.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="balance">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    الميزانية العمومية (بالريال السعودي)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>الأصول</span>
                    <span className="font-semibold text-green-600">{sampleFinancialStatements.balance.assets.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>الخصوم</span>
                    <span className="font-semibold text-red-600">{sampleFinancialStatements.balance.liabilities.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded bg-gray-50">
                    <span className="font-semibold">حقوق المساهمين</span>
                    <span className="font-bold text-blue-600">{sampleFinancialStatements.balance.equity.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* نتائج التحليل */}
          {analysisResults && (
            <Card>
              <CardHeader>
                <CardTitle>نتائج التحليل المالي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded">
                    <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-sm text-gray-600">نسبة السيولة</p>
                    <p className="text-2xl font-bold">{analysisResults.liquidityRatio}</p>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm text-gray-600">نسبة الربحية</p>
                    <p className="text-2xl font-bold">{analysisResults.profitabilityRatio}%</p>
                  </div>
                  <div className="text-center p-4 border rounded">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="text-sm text-gray-600">نسبة الدين</p>
                    <p className="text-2xl font-bold">{analysisResults.debtRatio}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* الأخطاء المكتشفة */}
          {detectedErrors.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  الأخطاء المكتشفة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {detectedErrors.map((error, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border border-red-200 rounded bg-red-50">
                    <div>
                      <p className="font-semibold">{error.description}</p>
                      <Badge variant="destructive" className="mt-1">{error.severity}</Badge>
                    </div>
                    <StyledButton
                      size="small"
                      variant="secondary"
                      onClick={() => handleErrorCorrection(error.type)}
                    >
                      تصحيح
                    </StyledButton>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* أزرار التحكم */}
          <div className="flex justify-center gap-4">
            {currentStep === 1 && (
              <StyledButton onClick={handleAnalysis} size="large" variant="primary" className="px-8">
                بدء التحليل
              </StyledButton>
            )}
            {currentStep === 2 && (
              <StyledButton onClick={() => setCurrentStep(3)} size="large" variant="primary" className="px-8">
                تطبيق المعايير
              </StyledButton>
            )}
            {currentStep === 3 && (
              <StyledButton onClick={() => setCurrentStep(4)} size="large" variant="primary" className="px-8">
                إنشاء التقرير
              </StyledButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AccountingSimulation);
