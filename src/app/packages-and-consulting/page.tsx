'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Star,
  Crown,
  Building,
  User,
  Clock,
  DollarSign,
  Calendar,
  MessageSquare,
  Video,
  ArrowRight,
  Users,
  Award,
  Shield,
  Zap,
  TrendingUp,
} from 'lucide-react';
import ConsultingComponent from '@/components/ConsultingComponent';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  period: string;
  duration: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

interface ConsultationPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

export default function PackagesAndConsultingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'packages' | 'consulting'>('packages');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Read tab from URL params
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'packages' || tab === 'consulting') {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (tab: 'packages' | 'consulting') => {
    setActiveTab(tab);
    router.push(`/packages-and-consulting?tab=${tab}`, { scroll: false });
  };

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'باقة مجانية',
      description: 'ابدأ رحلتك التعليمية مجاناً',
      price: 0,
      period: 'مجاناً للأبد',
      duration: 'مدى الحياة',
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
      name: 'باقة أساسية',
      description: 'مثالية للمبتدئين في عالم المحاسبة والمراجعة',
      price: billingCycle === 'monthly' ? 50 : 425,
      originalPrice: billingCycle === 'monthly' ? 75 : 600,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      duration: 'شهري / سنوي',
      icon: <Star className="w-6 h-6" />,
      color: 'blue',
      features: [
        'وصول لعدد محدد من الكورسات (2 شهرياً)',
        'شهادة حضور إلكترونية',
        'دعم عبر الإيميل',
        'مساحة تخزين 2 جيجا',
      ],
    },
    {
      id: 'professional',
      name: 'باقة برو',
      description: 'الحل الأمثل للمتخصصين والمحترفين',
      price: billingCycle === 'monthly' ? 100 : 850,
      originalPrice: billingCycle === 'monthly' ? 150 : 1200,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      duration: 'شهري / سنوي',
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
    {
      id: 'enterprise-small',
      name: 'الشركات الصغيرة',
      description: 'للشركات الصغيرة والمتوسطة',
      price: billingCycle === 'monthly' ? 200 : 1700,
      originalPrice: billingCycle === 'monthly' ? 300 : 2400,
      period: billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً',
      duration: 'شهري / سنوي',
      icon: <Building className="w-6 h-6" />,
      color: 'orange',
      features: [
        'وصول لـ 5 موظفين',
        'متابعة تقارير الأداء',
        'مكتبة كورسات شاملة',
        'دعم فني مخصص',
      ],
    },
  ];

  const consultationPackages: ConsultationPackage[] = [
    {
      id: 'individual',
      name: 'استشارة فردية',
      description: 'لقاء واحد مع مستشار مهني متخصص',
      price: 50,
      duration: 'ساعة واحدة',
      icon: <User className="w-6 h-6" />,
      color: 'blue',
      features: [
        'تحليل الوضع الحالي',
        'توصيات عملية',
        'خطة تنفيذية',
        'متابعة بعد الجلسة',
      ],
    },
    {
      id: 'monthly',
      name: 'استشارة شهرية',
      description: 'جلسات استشارية منتظمة شهرياً',
      price: 500,
      duration: '5 ساعات شهرياً',
      icon: <Calendar className="w-6 h-6" />,
      color: 'green',
      popular: true,
      features: [
        'جلسات منتظمة',
        'توصيات مكتوبة',
        'تقارير دورية',
        'دعم مستمر',
      ],
    },
    {
      id: 'enterprise',
      name: 'استشارات الشركات',
      description: 'مراجعة شاملة للأنظمة والعمليات',
      price: 1000,
      duration: '10 ساعات',
      icon: <Building className="w-6 h-6" />,
      color: 'purple',
      features: [
        'مراجعة شاملة',
        'خطة تطوير مفصلة',
        'متابعة التنفيذ',
        'دعم فريق كامل',
      ],
    },
  ];

  const handleSubscribe = (planId: string) => {
    alert(`سيتم توجيهك لبوابة الدفع الآمنة للباقة: ${plans.find(p => p.id === planId)?.name}`);
  };

  const handleBookConsultation = (packageId: string) => {
    alert(`سيتم توجيهك لصفحة الحجز للاستشارة: ${consultationPackages.find(p => p.id === packageId)?.name}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-16 lg:py-24">
        <div className="absolute inset-0 bg-[url('/assets/Professional educational platform hero banner.png')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              الباقات والاستشارات
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
              اختر الباقة المناسبة لك واحصل على استشارات متخصصة من خبرائنا لتطوير مسيرتك المهنية
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <motion.button
              onClick={() => handleTabChange('packages')}
              className={`
                relative px-8 py-4 font-semibold text-base whitespace-nowrap
                border-b-2 transition-all duration-300
                ${activeTab === 'packages'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                الباقات
              </span>
            </motion.button>
            <motion.button
              onClick={() => handleTabChange('consulting')}
              className={`
                relative px-8 py-4 font-semibold text-base whitespace-nowrap
                border-b-2 transition-all duration-300
                ${activeTab === 'consulting'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                الاستشارات
              </span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'packages' && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Billing Cycle Toggle */}
              <div className="flex justify-center mb-12">
                <div className="inline-flex items-center bg-white rounded-xl shadow-lg p-1 border border-gray-200">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      billingCycle === 'monthly'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    شهري
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all relative ${
                      billingCycle === 'yearly'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    سنوي
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      توفير 15%
                    </span>
                  </button>
                </div>
              </div>

              {/* Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      relative bg-white rounded-2xl shadow-xl border-2 p-8
                      ${plan.popular ? 'border-purple-500 scale-105 lg:scale-110' : 'border-gray-100'}
                      hover:shadow-2xl transition-all duration-300
                    `}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                          الأكثر شعبية ⭐
                        </div>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <div
                        className={`
                          w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                          ${plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                            plan.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                            plan.color === 'green' ? 'bg-green-100 text-green-600' :
                            'bg-orange-100 text-orange-600'
                          }
                        `}
                      >
                        {plan.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-6 text-sm">{plan.description}</p>
                      <div className="mb-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {plan.originalPrice && (
                            <span className="text-lg text-gray-400 line-through">
                              ${plan.originalPrice}
                            </span>
                          )}
                          <span className="text-4xl font-bold text-gray-900">
                            ${plan.price}
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{plan.duration}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{plan.period}</p>
                        {billingCycle === 'yearly' && plan.originalPrice && (
                          <p className="text-green-600 text-sm font-semibold mt-2">
                            توفير ${plan.originalPrice - plan.price} سنوياً
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 min-h-[200px]">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      onClick={() => handleSubscribe(plan.id)}
                      className={`
                        w-full py-4 px-6 rounded-xl font-bold text-lg transition-all
                        flex items-center justify-center gap-2
                        ${plan.popular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                        }
                        shadow-lg hover:shadow-xl
                      `}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      احجز الآن
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <h4 className="font-bold text-gray-900">ضمان استرداد المال</h4>
                  </div>
                  <p className="text-gray-600 text-sm">30 يوماً كاملة للاسترداد إذا لم تكن راضياً</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-8 h-8 text-green-600" />
                    <h4 className="font-bold text-gray-900">فترة تجريبية مجانية</h4>
                  </div>
                  <p className="text-gray-600 text-sm">7 أيام مجاناً لجميع الباقات المدفوعة</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <h4 className="font-bold text-gray-900">ترقية في أي وقت</h4>
                  </div>
                  <p className="text-gray-600 text-sm">ترقية أو تخفيض الباقة دون رسوم إضافية</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'consulting' && (
            <motion.div
              key="consulting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Consultation Packages */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
                  باقات الاستشارات المتخصصة
                </h2>
                <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                  احصل على استشارات مهنية من خبراء المراجعة الداخلية والمحاسبة لتطوير أعمالك
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {consultationPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`
                        relative bg-white rounded-2xl shadow-xl border-2 p-8
                        ${pkg.popular ? 'border-purple-500 scale-105' : 'border-gray-100'}
                        hover:shadow-2xl transition-all duration-300
                      `}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                            موصى به ⭐
                          </div>
                        </div>
                      )}

                      <div className="text-center mb-8">
                        <div
                          className={`
                            w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center
                            ${pkg.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                              pkg.color === 'green' ? 'bg-green-100 text-green-600' :
                              'bg-purple-100 text-purple-600'
                            }
                          `}
                        >
                          {pkg.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                        <p className="text-gray-600 mb-6 text-sm">{pkg.description}</p>
                        <div className="mb-6">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-4xl font-bold text-gray-900">
                              ${pkg.price}
                            </span>
                          </div>
                          <div className="flex items-center justify-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-sm">{pkg.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 mb-8 min-h-[160px]">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        onClick={() => handleBookConsultation(pkg.id)}
                        className={`
                          w-full py-4 px-6 rounded-xl font-bold text-lg transition-all
                          flex items-center justify-center gap-2
                          ${pkg.popular
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                          }
                          shadow-lg hover:shadow-xl
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ابدأ استشارتك
                        <MessageSquare className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Consultation Sessions Component */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                  جلساتك الاستشارية
                </h2>
                <ConsultingComponent />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
