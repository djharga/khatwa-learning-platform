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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <Calculator className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
                حاسبة تكلفة التخزين السحابي
              </h1>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              احسب احتياجاتك واحصل على توصيات ذكية بالباقة المناسبة
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* أداة الحساب */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                  <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                      <HardDrive className="w-5 h-5" aria-hidden="true" />
                      احسب احتياجاتك
                    </CardTitle>
                    <CardDescription className="text-primary-100 dark:text-primary-200">
                      أدخل بياناتك للحصول على تقدير دقيق للتكلفة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* عدد المتدربين */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                          عدد المتدربين
                        </label>
                        <span className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">{numUsers}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="200"
                        value={numUsers}
                        onChange={(e) => setNumUsers(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
                        aria-label={`عدد المتدربين: ${numUsers}`}
                      />
                      <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        <span>1</span>
                        <span>200</span>
                      </div>
                    </div>

                    {/* مساحة التخزين لكل مستخدم */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">
                          <HardDrive className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-innovate-600 dark:text-secondary-innovate-400" aria-hidden="true" />
                          مساحة التخزين لكل مستخدم (جيجا)
                        </label>
                        <span className="text-xl sm:text-2xl font-bold text-secondary-innovate-600 dark:text-secondary-innovate-400">{storagePerUser} GB</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[0.5, 1, 2, 5].map((size) => (
                          <button
                            key={size}
                            onClick={() => setStoragePerUser(size)}
                            className={`py-2.5 sm:py-3 min-h-[44px] rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                              storagePerUser === size
                                ? 'bg-gradient-to-r from-secondary-innovate-600 to-secondary-innovate-700 text-white shadow-md shadow-secondary-innovate-500/20'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                            aria-label={`اختر ${size} جيجا`}
                            aria-pressed={storagePerUser === size}
                            type="button"
                          >
                            {size} GB
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* عدد الدورات النشطة */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">
                          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-success-600 dark:text-success-400" aria-hidden="true" />
                          عدد الدورات النشطة
                        </label>
                        <span className="text-xl sm:text-2xl font-bold text-success-600 dark:text-success-400">{activeCourses}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={activeCourses}
                        onChange={(e) => setActiveCourses(Number(e.target.value))}
                        className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-success-600"
                        aria-label={`عدد الدورات النشطة: ${activeCourses}`}
                      />
                      <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        <span>1</span>
                        <span>50</span>
                      </div>
                    </div>

                    {/* نوع الفوترة */}
                    <div>
                      <label className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                        دورة الفوترة
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setBillingCycle('monthly')}
                          className={`py-2.5 sm:py-3 min-h-[44px] rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                            billingCycle === 'monthly'
                              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                          }`}
                          aria-label="اختر الفوترة الشهرية"
                          aria-pressed={billingCycle === 'monthly'}
                          type="button"
                        >
                          شهري
                        </button>
                        <button
                          onClick={() => setBillingCycle('yearly')}
                          className={`py-2.5 sm:py-3 min-h-[44px] rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ease-out relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                            billingCycle === 'yearly'
                              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                          }`}
                          aria-label="اختر الفوترة السنوية (وفر 15%)"
                          aria-pressed={billingCycle === 'yearly'}
                          type="button"
                        >
                          سنوي
                          <span className="absolute -top-2 -end-2 bg-success-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-md">
                            وفر 15%
                          </span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* الباقات المقترحة */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
                className="mt-6 sm:mt-8"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6">
                  الباقات المتاحة
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {plans.map((plan, index) => (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.2, ease: 'easeOut' }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className={`relative ${plan.recommended ? 'md:scale-105' : ''}`}
                    >
                      {plan.recommended && (
                        <div className="absolute -top-3 start-1/2 transform -translate-x-1/2 z-10">
                          <span className="bg-gradient-to-r from-primary-600 to-secondary-innovate-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 shadow-md">
                            <Sparkles className="w-3 h-3" aria-hidden="true" />
                            الأنسب لك
                          </span>
                        </div>
                      )}
                      <Card className={`shadow-md ${plan.recommended ? 'border-2 border-primary-500 dark:border-primary-400' : 'border border-neutral-200 dark:border-neutral-700'}`}>
                        <CardContent className="p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
                            {plan.name}
                          </h3>
                          <div className="mb-4 sm:mb-6">
                            <div className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
                              $
                              {billingCycle === 'monthly'
                                ? plan.priceMonthly
                                : plan.priceYearly}
                            </div>
                            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                              {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                            </p>
                          </div>
                          <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                                <span className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                          <button
                            className={`w-full px-4 py-2.5 sm:py-3 min-h-[44px] rounded-lg font-medium text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                              plan.recommended
                                ? 'bg-gradient-to-r from-primary-600 to-secondary-innovate-600 hover:from-primary-700 hover:to-secondary-innovate-700 text-white shadow-primary-500/20'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                            aria-label={`اختر باقة ${plan.name}`}
                            type="button"
                          >
                            اختر هذه الباقة
                          </button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ملخص التكلفة والتوصيات */}
            <div className="space-y-4 sm:space-y-6">
              {/* التقدير */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                  <CardHeader className="bg-gradient-to-r from-success-600 to-success-700 text-white rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                      <DollarSign className="w-5 h-5" aria-hidden="true" />
                      التقدير الذكي
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="p-3 sm:p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1 font-medium">
                        مساحة التخزين المطلوبة
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {totalStorageNeeded.toFixed(1)} GB
                      </p>
                    </div>

                    <div className="p-3 sm:p-4 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800">
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1 font-medium">
                        التكلفة المقدرة
                      </p>
                      <p className="text-xl sm:text-2xl font-bold text-success-600 dark:text-success-400">
                        $
                        {billingCycle === 'monthly'
                          ? estimatedMonthlyCost.toFixed(2)
                          : estimatedYearlyCost.toFixed(2)}
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                      </p>
                    </div>

                    {billingCycle === 'yearly' && (
                      <div className="p-3 sm:p-4 bg-secondary-innovate-50 dark:bg-secondary-innovate-900/20 rounded-lg border border-secondary-innovate-200 dark:border-secondary-innovate-800">
                        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1 font-medium">
                          التوفير السنوي
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-secondary-innovate-600 dark:text-secondary-innovate-400">
                          ${yearlySaving.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* التوصية */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="shadow-md border-2 border-primary-500 dark:border-primary-400">
                  <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                      <Sparkles className="w-5 h-5" aria-hidden="true" />
                      التوصية الذكية
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="p-3 sm:p-4 bg-gradient-to-br from-primary-50 to-secondary-innovate-50 rounded-lg dark:from-primary-900/20 dark:to-secondary-innovate-900/20 border-2 border-primary-200 dark:border-primary-800">
                      <p className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white mb-2">
                        {recommendedPlan.name}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                        بناءً على احتياجاتك ({totalStorageNeeded.toFixed(1)} GB و {numUsers}{' '}
                        مستخدم)، ننصحك بهذه الباقة
                      </p>
                      <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-3">
                        $
                        {billingCycle === 'monthly'
                          ? recommendedPlan.priceMonthly
                          : recommendedPlan.priceYearly}
                        <span className="text-xs sm:text-sm font-normal text-neutral-600 dark:text-neutral-400">
                          /{billingCycle === 'monthly' ? 'شهر' : 'سنة'}
                        </span>
                      </div>
                      <button
                        className="w-full px-4 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-secondary-innovate-600 hover:from-primary-700 hover:to-secondary-innovate-700 text-white rounded-lg font-medium text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        aria-label="الاشتراك في الباقة الموصى بها"
                        type="button"
                      >
                        اشترك الآن
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* نصائح */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.2, ease: 'easeOut' }}
              >
                <Card className="shadow-md border border-neutral-200 dark:border-neutral-700">
                  <CardHeader className="bg-gradient-to-r from-warning-600 to-warning-700 text-white rounded-t-xl">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-bold">
                      <Info className="w-5 h-5" aria-hidden="true" />
                      نصائح للتوفير
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 space-y-2 sm:space-y-3">
                    <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-neutral-700 dark:text-neutral-300">
                        اختر الاشتراك السنوي لتوفير 15%
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-neutral-700 dark:text-neutral-300">
                        أرشف الملفات القديمة لتقليل المساحة المستخدمة
                      </p>
                    </div>
                    <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-success-600 dark:text-success-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-neutral-700 dark:text-neutral-300">
                        استخدم ضغط الملفات لتوفير المساحة
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
