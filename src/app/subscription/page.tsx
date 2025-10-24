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
  Briefcase,
  Building,
  User,
  Clock,
  DollarSign,
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
    // باقات الأفراد
    {
      id: 'free',
      name: 'باقة مجانية (Free)',
      description: 'ابدأ رحلتك التعليمية مجاناً',
      price: 0,
      period: 'مجاناً للأبد',
      icon: <User className="w-6 h-6" />,
      color: 'green',
      features: [
        'دورة تعريفية أو محتوى محدود',
        'مقاطع قصيرة ومقالات أساسية',
        'بدون شهادات معتمدة',
        'دعم محدود',
      ],
    },
    {
      id: 'basic',
      name: 'باقة أساسية (Basic)',
      description: 'مثالية للمبتدئين في عالم المحاسبة والمراجعة',
      price: billingCycle === 'monthly' ? 50 : 425,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      icon: <Star className="w-6 h-6" />,
      color: 'blue',
      features: [
        'وصول لعدد محدد من الكورسات (مثال: 2 شهرياً)',
        'شهادة حضور إلكترونية',
        'دعم عبر الإيميل',
        'مساحة تخزين 2 جيجا',
      ],
    },
    {
      id: 'professional',
      name: 'باقة برو (Pro)',
      description: 'الحل الأمثل للمتخصصين والمحترفين',
      price: billingCycle === 'monthly' ? 100 : 850,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      icon: <Crown className="w-6 h-6" />,
      color: 'purple',
      popular: true,
      features: [
        'وصول كامل لكورسات المحاسبة والمخازن والمشتريات',
        'شهادات معتمدة',
        'خصومات على خدمات الاستشارات',
        'دعم مباشر عبر Zoom أو محادثة',
        'مساحة تخزين 5 جيجا',
      ],
    },
    // باقات الشركات والمؤسسات
    {
      id: 'enterprise-small',
      name: 'الشركات الصغيرة',
      description: 'للشركات الصغيرة والمتوسطة',
      price: billingCycle === 'monthly' ? 200 : 1700,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      icon: <Building className="w-6 h-6" />,
      color: 'green',
      features: [
        'وصول لـ 5 موظفين',
        'متابعة تقارير الأداء',
        'مكتبة كورسات شاملة',
        'دعم فني مخصص',
      ],
    },
    {
      id: 'enterprise-medium',
      name: 'الشركات المتوسطة',
      description: 'للشركات المتوسطة والكبيرة',
      price: billingCycle === 'monthly' ? 300 : 2550,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      icon: <Building className="w-6 h-6" />,
      color: 'orange',
      features: [
        'وصول لـ 15 موظف',
        'ورش عمل مباشرة شهرية',
        'تقارير تحليلية مفصلة',
        'استشارات ربع سنوية',
      ],
    },
    {
      id: 'enterprise-large',
      name: 'الشركات الكبيرة',
      description: 'للشركات الكبيرة والمؤسسات',
      price: billingCycle === 'monthly' ? 500 : 4250,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      icon: <Building className="w-6 h-6" />,
      color: 'red',
      features: [
        'وصول غير محدود للموظفين',
        'برامج تدريب مخصصة',
        'استشارات شهرية مجانية',
        'تكامل مع أنظمة الشركة',
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
                توفير 15%
              </span>
            </button>
          </div>
        </motion.div>

        {/* خطط الاشتراك */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                      {plan.price} دولار
                    </span>
                  </div>
                  <p className="text-gray-600">{plan.period}</p>
                  {billingCycle === 'yearly' && plan.originalPrice && (
                    <p className="text-green-600 text-sm font-semibold mt-2">
                      توفير {plan.originalPrice - plan.price} دولار سنوياً
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

        {/* خدمات الاستشارات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl shadow-xl p-8 mb-8 border border-indigo-200"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-indigo-100 px-6 py-3 rounded-full mb-6">
              <Briefcase className="w-6 h-6 text-indigo-600" />
              <span className="text-indigo-700 font-bold">خدمات الاستشارات المهنية</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              استشارات متخصصة في المراجعة الداخلية
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              احصل على استشارات مهنية من خبراء المراجعة الداخلية لتطوير أعمالك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">استشارة فردية</h4>
              <p className="text-gray-600 text-sm mb-4">لقاء واحد مع مستشار مهني متخصص</p>
              <div className="text-2xl font-bold text-blue-600 mb-4">50 دولار/ساعة</div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div>✓ تحليل الوضع الحالي</div>
                <div>✓ توصيات عملية</div>
                <div>✓ خطة تنفيذية</div>
              </div>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                احجز استشارة
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">استشارة شهرية</h4>
              <p className="text-gray-600 text-sm mb-4">جلسات استشارية منتظمة شهرياً</p>
              <div className="text-2xl font-bold text-green-600 mb-4">500 دولار/5 ساعات</div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div>✓ جلسات منتظمة</div>
                <div>✓ توصيات مكتوبة</div>
                <div>✓ تقارير دورية</div>
              </div>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                اشترك شهرياً
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-500 text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  شامل
                </span>
              </div>
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">استشارات الشركات</h4>
              <p className="text-gray-600 text-sm mb-4">مراجعة شاملة للأنظمة والعمليات</p>
              <div className="text-2xl font-bold text-purple-600 mb-4">1000 دولار/10 ساعات</div>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div>✓ مراجعة شاملة</div>
                <div>✓ خطة تطوير مفصلة</div>
                <div>✓ متابعة التنفيذ</div>
              </div>
              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                اطلب استشارة شاملة
              </button>
            </div>
          </div>
        </motion.div>

        {/* مميزات إضافية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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

        {/* مميزات إضافية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-xl p-8 mb-8 border border-green-200"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-green-100 px-6 py-3 rounded-full mb-6">
              <Shield className="w-6 h-6 text-green-600" />
              <span className="text-green-700 font-bold">مميزات إضافية</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              مميزات تجعلنا الخيار الأفضل
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">فترة تجريبية مجانية</h4>
              <p className="text-gray-600 text-sm">7 أيام مجاناً لجميع الباقات المدفوعة</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">ضمان استرداد المال</h4>
              <p className="text-gray-600 text-sm">30 يوماً كاملة للاسترداد</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">ترقية وتخفيض الباقة</h4>
              <p className="text-gray-600 text-sm">في أي وقت دون رسوم إضافية</p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">دعم فني متعدد اللغات</h4>
              <p className="text-gray-600 text-sm">عربي وإنجليزي على مدار 24 ساعة</p>
            </div>
          </div>
        </motion.div>

        {/* الأسئلة الشائعة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  كيف يمكنني ترقية أو تخفيض الباقة؟
                </h3>
                <p className="text-gray-600">
                  يمكنك تغيير الباقة في أي وقت من خلال لوحة التحكم الخاصة بك دون رسوم إضافية.
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

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  هل الدعم الفني متوفر 24/7؟
                </h3>
                <p className="text-gray-600">
                  نعم، فريق الدعم الفني متوفر على مدار 24 ساعة باللغتين العربية والإنجليزية.
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
                  {plans.find(p => p.id === selectedPlan)?.price} دولار
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
