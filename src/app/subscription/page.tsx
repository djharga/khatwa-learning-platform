'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Check,
  Star,
  Crown,
  Zap,
  Shield,
  Users,
  HardDrive,
  Video,
  FileText,
  Award,
  CreditCard,
  Smartphone,
  Headphones,
  Calendar,
  ArrowRight,
  X,
} from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
  courseAccess?: string[];
}

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'الباقة المجانية',
      description: 'ابدأ رحلتك التعليمية مجاناً',
      price: 0,
      period: 'مجاناً للأبد',
      icon: <Zap className="w-6 h-6" />,
      color: 'green',
      features: [
        'وصول إلى 10 دورات أساسية مجانية',
        'مساحة تخزين 500 ميجابايت',
        'دعم مجتمعي',
        'شهادات إتمام الدورات المجانية',
        'محتوى تعليمي أساسي',
        'إمكانية الترقية في أي وقت',
      ],
    },
    {
      id: 'basic',
      name: 'الباقة الأساسية',
      description: 'مثالية للبدء في التعلم',
      price: billingCycle === 'monthly' ? 99 : 950,
      originalPrice: billingCycle === 'monthly' ? 149 : 1190,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      icon: <Star className="w-6 h-6" />,
      color: 'blue',
      features: [
        'وصول إلى 50 دورة أساسية',
        'مساحة تخزين 2 جيجابايت',
        'دعم فني أساسي',
        'شهادات إتمام الدورات',
        'إمكانية الوصول مدى الحياة للدورات المشتركة',
        'تحديثات المحتوى',
      ],
    },
    {
      id: 'professional',
      name: 'الباقة المهنية',
      description: 'للمتعلمين الجادين والمحترفين',
      price: billingCycle === 'monthly' ? 199 : 1990,
      originalPrice: billingCycle === 'monthly' ? 299 : 3588,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      icon: <Crown className="w-6 h-6" />,
      color: 'purple',
      popular: true,
      features: [
        'وصول إلى جميع الدورات (200+ دورة)',
        'مساحة تخزين 5 جيجابايت',
        'دعم فني متقدم',
        'شهادات معتمدة',
        'جلسات مباشرة مع المدرسين',
        'أولوية في الحجز للدورات الجديدة',
        'محتوى حصري ومتقدم',
        'إمكانية الوصول مدى الحياة',
      ],
    },
    {
      id: 'enterprise',
      name: 'الباقة المؤسسية',
      description: 'لحلول التعلم المؤسسي والشركات',
      price: billingCycle === 'monthly' ? 499 : 4990,
      originalPrice: billingCycle === 'monthly' ? 699 : 8388,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      icon: <Shield className="w-6 h-6" />,
      color: 'green',
      features: [
        'وصول كامل لجميع الدورات والمحتوى',
        'مساحة تخزين 20 جيجابايت',
        'دعم فني VIP مع مدير حساب مخصص',
        'شهادات معتمدة مع ختم الشركة',
        'جلسات مخصصة مع خبراء الصناعة',
        'تدريب مخصص لفرق العمل',
        'تقارير مفصلة عن التقدم',
        'تكامل مع أنظمة الشركة',
        'دورات مخصصة حسب احتياجات الشركة',
      ],
    },
  ];

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    // محاكاة عملية الدفع
    alert('سيتم توجيهك لبوابة الدفع الآمنة');
    setShowPaymentModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            اختر الباقة المناسبة لك
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            احصل على تجربة تعليمية متكاملة مع إمكانية الوصول مدى الحياة للدورات المشتركة
          </p>

          {/* مبدل الدورة الزمنية */}
          <div className="inline-flex items-center bg-white rounded-xl shadow-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              سنوي
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                توفير 20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* خطط الاشتراك */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl border-2 p-8 ${
                plan.popular ? 'border-purple-500 scale-105' : 'border-gray-100'
              }`}
            >
              {/* شارة الباقة الشائعة */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    الأكثر شعبية ⭐
                  </div>
                </div>
              )}

              {/* رأس الباقة */}
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  plan.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {plan.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* السعر */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {plan.originalPrice} ريال
                      </span>
                    )}
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price} ريال
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.period}</p>
                  {billingCycle === 'yearly' && plan.originalPrice && (
                    <p className="text-green-600 text-sm font-semibold mt-2">
                      توفير {plan.originalPrice - plan.price} ريال سنوياً
                    </p>
                  )}
                </div>
              </div>

              {/* مميزات الباقة */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* زر الاشتراك */}
              <motion.button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                اشترك الآن
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* الساعات المعتمدة مع شهادة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-8 mb-8 border border-yellow-200"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              الساعات المعتمدة مع شهادة
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              احصل على ساعات تعليم مهني معتمدة (CPE) مع شهادة إتمام رسمية لتطوير مسيرتك المهنية
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-yellow-600 mb-2">40</div>
                <div className="text-gray-600">ساعة تعليم معتمدة</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-orange-600 mb-2">5$</div>
                <div className="text-gray-600">رسوم الشهادة فقط</div>
              </div>
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">IIA</div>
                <div className="text-gray-600">معتمد من المعهد الدولي</div>
              </div>
            </div>
            <motion.button
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              احصل على الشهادة الآن - 5 دولار فقط
            </motion.button>
          </div>
        </motion.div>

        {/* مميزات إضافية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            لماذا تختار منصة خطى؟
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">شهادات معتمدة</h3>
              <p className="text-gray-600">احصل على شهادات معترف بها في سوق العمل</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">محتوى تفاعلي</h3>
              <p className="text-gray-600">فيديوهات ومحتوى تعليمي عالي الجودة</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">مجتمع تعليمي</h3>
              <p className="text-gray-600">تواصل مع المتعلمين والخبراء</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">حماية شاملة</h3>
              <p className="text-gray-600">حماية متقدمة للمحتوى والخصوصية</p>
            </div>
          </div>
        </motion.div>

        {/* الأسئلة الشائعة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            الأسئلة الشائعة
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  هل يمكنني إلغاء الاشتراك في أي وقت؟
                </h3>
                <p className="text-gray-600">
                  نعم، يمكنك إلغاء الاشتراك في أي وقت دون رسوم إضافية. ستحتفظ بالوصول حتى نهاية الفترة المدفوعة.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  هل الشهادات معتمدة دولياً؟
                </h3>
                <p className="text-gray-600">
                  نعم، جميع شهاداتنا معتمدة من جهات دولية مرموقة ومعترف بها في سوق العمل.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ما هي طرق الدفع المتاحة؟
                </h3>
                <p className="text-gray-600">
                  نقبل جميع البطاقات الائتمانية الرئيسية، بالإضافة إلى الدفع عبر مها، مدى، والبنوك المحلية.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  هل يوجد ضمان استرداد المال؟
                </h3>
                <p className="text-gray-600">
                  نعم، نقدم ضمان استرداد المال لمدة 30 يوماً إذا لم تكن راضياً عن الخدمة.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* نافذة الدفع */}
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">إتمام عملية الدفع</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">الباقة المختارة:</span>
                <span className="font-semibold">
                  {plans.find(p => p.id === selectedPlan)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المبلغ:</span>
                <span className="font-bold text-lg">
                  {plans.find(p => p.id === selectedPlan)?.price} ريال
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">الدورة:</span>
                <span>{plans.find(p => p.id === selectedPlan)?.period}</span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="border border-gray-300 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">بطاقة ائتمانية</span>
                </div>
                <input
                  type="text"
                  placeholder="رقم البطاقة"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="تاريخ الانتهاء"
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="border border-gray-300 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">الدفع عبر الهاتف</span>
                </div>
                <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                  ادفع عبر مها/مدى
                </button>
              </div>
            </div>

            <motion.button
              onClick={handlePayment}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              إتمام الدفع
            </motion.button>

            <p className="text-xs text-gray-500 text-center mt-4">
              عملية الدفع آمنة ومشفرة بالكامل
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
