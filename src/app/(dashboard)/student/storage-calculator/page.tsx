'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HardDrive,
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  Check,
  X,
  Info,
  Sparkles,
  Calculator,
  BarChart3,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import StyledButton from '@/components/ui/StyledButton';

interface Plan {
  id: string;
  name: string;
  storage: number; // بالجيجا
  users: number;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  recommended?: boolean;
}

export default function StorageCalculatorPage() {
  const [numUsers, setNumUsers] = useState(10);
  const [storagePerUser, setStoragePerUser] = useState(1); // بالجيجا
  const [activeCourses, setActiveCourses] = useState(5);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // الباقات المتاحة
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'باقة أساسية',
      storage: 50,
      users: 10,
      priceMonthly: 99,
      priceYearly: 999,
      features: [
        'مساحة تخزين 50 جيجا',
        'حتى 10 مستخدمين',
        'دعم عبر البريد',
        '2 جيجا لكل مستخدم',
      ],
    },
    {
      id: 'professional',
      name: 'باقة احترافية',
      storage: 200,
      users: 50,
      priceMonthly: 299,
      priceYearly: 2999,
      features: [
        'مساحة تخزين 200 جيجا',
        'حتى 50 مستخدم',
        'دعم مباشر',
        '4 جيجا لكل مستخدم',
        'نسخ احتياطي يومي',
      ],
      recommended: true,
    },
    {
      id: 'enterprise',
      name: 'باقة الشركات',
      storage: 500,
      users: 200,
      priceMonthly: 699,
      priceYearly: 6999,
      features: [
        'مساحة تخزين 500 جيجا',
        'مستخدمين غير محدودين',
        'دعم فوري 24/7',
        '10 جيجا لكل مستخدم',
        'نسخ احتياطي متقدم',
        'تكامل مع الأنظمة',
      ],
    },
  ];

  // حساب الاحتياجات
  const totalStorageNeeded = numUsers * storagePerUser + activeCourses * 0.5; // كل دورة تحتاج 0.5 جيجا تقريباً
  const estimatedMonthlyCost = totalStorageNeeded * 2; // $2 لكل جيجا شهرياً
  const estimatedYearlyCost = estimatedMonthlyCost * 12 * 0.85; // خصم 15% سنوياً

  // التوصية بالباقة
  const recommendedPlan = plans.find(
    (plan) => plan.storage >= totalStorageNeeded && plan.users >= numUsers
  ) || plans[plans.length - 1];

  // حساب التوفير
  const yearlySaving = estimatedMonthlyCost * 12 - estimatedYearlyCost;

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
              <Calculator className="w-8 h-8 text-blue-600" />
              حاسبة تكلفة التخزين السحابي
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              احسب احتياجاتك واحصل على توصيات ذكية بالباقة المناسبة
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* أداة الحساب */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-blue-600" />
                    احسب احتياجاتك
                  </CardTitle>
                  <CardDescription>
                    أدخل بياناتك للحصول على تقدير دقيق للتكلفة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* عدد المتدربين */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Users className="w-4 h-4" />
                        عدد المتدربين
                      </label>
                      <span className="text-2xl font-bold text-blue-600">{numUsers}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="200"
                      value={numUsers}
                      onChange={(e) => setNumUsers(Number(e.target.value))}
                      className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer dark:bg-blue-700"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>200</span>
                    </div>
                  </div>

                  {/* مساحة التخزين لكل مستخدم */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <HardDrive className="w-4 h-4" />
                        مساحة التخزين لكل مستخدم (جيجا)
                      </label>
                      <span className="text-2xl font-bold text-purple-600">{storagePerUser} GB</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[0.5, 1, 2, 5].map((size) => (
                        <button
                          key={size}
                          onClick={() => setStoragePerUser(size)}
                          className={`py-2 rounded-lg font-medium transition-all ${
                            storagePerUser === size
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {size} GB
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* عدد الدورات النشطة */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <BarChart3 className="w-4 h-4" />
                        عدد الدورات النشطة
                      </label>
                      <span className="text-2xl font-bold text-green-600">{activeCourses}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={activeCourses}
                      onChange={(e) => setActiveCourses(Number(e.target.value))}
                      className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer dark:bg-green-700"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* نوع الفوترة */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      <Calendar className="w-4 h-4" />
                      دورة الفوترة
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setBillingCycle('monthly')}
                        className={`py-3 rounded-lg font-medium transition-all ${
                          billingCycle === 'monthly'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        شهري
                      </button>
                      <button
                        onClick={() => setBillingCycle('yearly')}
                        className={`py-3 rounded-lg font-medium transition-all relative ${
                          billingCycle === 'yearly'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        سنوي
                        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          وفر 15%
                        </span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* الباقات المقترحة */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  الباقات المتاحة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.05 }}
                      className={`relative ${plan.recommended ? 'md:scale-105' : ''}`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            الأنسب لك
                          </span>
                        </div>
                      )}
                      <Card className={plan.recommended ? 'border-2 border-blue-500' : ''}>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {plan.name}
                          </h3>
                          <div className="mb-6">
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                              $
                              {billingCycle === 'monthly'
                                ? plan.priceMonthly
                                : plan.priceYearly}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                            </p>
                          </div>
                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <StyledButton
                            variant={plan.recommended ? "primary" : "secondary"}
                            className={`w-full ${
                              plan.recommended
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                                : ''
                            }`}
                          >
                            اختر هذه الباقة
                          </StyledButton>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ملخص التكلفة والتوصيات */}
            <div className="space-y-6">
              {/* التقدير */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    التقدير الذكي
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      مساحة التخزين المطلوبة
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {totalStorageNeeded.toFixed(1)} GB
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      التكلفة المقدرة
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      $
                      {billingCycle === 'monthly'
                        ? estimatedMonthlyCost.toFixed(2)
                        : estimatedYearlyCost.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                    </p>
                  </div>

                  {billingCycle === 'yearly' && (
                    <div className="p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        التوفير السنوي
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        ${yearlySaving.toFixed(2)}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* التوصية */}
              <Card className="border-2 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    التوصية الذكية
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg dark:from-blue-900/20 dark:to-purple-900/20">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">
                      {recommendedPlan.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      بناءً على احتياجاتك ({totalStorageNeeded.toFixed(1)} GB و {numUsers}{' '}
                      مستخدم)، ننصحك بهذه الباقة
                    </p>
                    <div className="text-2xl font-bold text-blue-600 mb-3">
                      $
                      {billingCycle === 'monthly'
                        ? recommendedPlan.priceMonthly
                        : recommendedPlan.priceYearly}
                      <span className="text-sm font-normal text-gray-600">
                        /{billingCycle === 'monthly' ? 'شهر' : 'سنة'}
                      </span>
                    </div>
                    <StyledButton variant="primary" className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                      اشترك الآن
                    </StyledButton>
                  </div>
                </CardContent>
              </Card>

              {/* نصائح */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5 text-orange-600" />
                    نصائح للتوفير
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2 text-sm">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      اختر الاشتراك السنوي لتوفير 15%
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      أرشف الملفات القديمة لتقليل المساحة المستخدمة
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">
                      استخدم ضغط الملفات لتوفير المساحة
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
