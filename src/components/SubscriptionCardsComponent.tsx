'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Rocket, CreditCard, Sparkles, Scale, DollarSign, ShieldCheck, MessageCircle } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  savings?: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'الباقة الأساسية',
    price: 29,
    originalPrice: 49,
    period: 'شهرياً',
    description: 'مثالية للمبتدئين في عالم المحاسبة والمراجعة',
    icon: <Star className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
    features: [
      'وصول إلى 20 دورة أساسية',
      'شهادات إتمام معتمدة',
      'دعم فني عبر البريد الإلكتروني',
      'محتوى قابل للتنزيل',
      'إمكانية الوصول مدى الحياة',
      'تحديثات مجانية لمدة 6 أشهر'
    ],
    buttonText: 'ابدأ مجاناً',
    savings: 'توفير 40%'
  },
  {
    id: 'professional',
    name: 'الباقة المهنية',
    price: 79,
    originalPrice: 129,
    period: 'شهرياً',
    description: 'الحل الأمثل للمتخصصين والمحترفين',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
    features: [
      'وصول كامل لجميع الدورات (150+ دورة)',
      'شهادات معتمدة من IIA',
      'دعم فني مخصص 24/7',
      'جلسات تدريبية فردية',
      'محتوى حصري للمتقدمين',
      'إمكانية الوصول مدى الحياة',
      'تحديثات مجانية دائماً',
      'مواد دراسية إضافية'
    ],
    popular: true,
    buttonText: 'الأكثر شعبية',
    savings: 'توفير 39%'
  },
  {
    id: 'enterprise',
    name: 'الباقة المؤسسية',
    price: 199,
    originalPrice: 299,
    period: 'شهرياً',
    description: 'لحلول الشركات والمؤسسات الكبرى',
    icon: <Crown className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
    features: [
      'وصول كامل لجميع الدورات والمحتوى',
      'شهادات معتمدة من IIA وجهات دولية',
      'مدير حساب مخصص',
      'تدريب مخصص للموظفين',
      'تقارير أداء مفصلة',
      'دعم فني VIP على مدار الساعة',
      'محتوى حصري للمؤسسات',
      'حلول مخصصة للاحتياجات الخاصة',
      'إمكانية الوصول مدى الحياة',
      'تحديثات وتطويرات مستمرة'
    ],
    buttonText: 'تواصل معنا',
    savings: 'توفير 33%'
  }
];

const SubscriptionCardsComponent: React.FC = () => {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden animate-fadeIn"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <div
          className="text-center mb-16 animate-fadeIn"
        >
          <div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200/50 mb-8"
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-green-700 font-semibold">باقات اشتراك مرنة</span>
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            اختر الباقة المناسبة لك
          </h2>

          <p
            className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            باقات متنوعة تناسب جميع المستويات والاحتياجات مع إمكانية الترقية في أي وقت
          </p>

          <div
            className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-12"
          />
        </div>

        {/* كروت الباقات */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {subscriptionPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`group pricing-card ${
                plan.popular ? 'pricing-card--popular' : ''
              } animate-fadeIn hover-scale-subtle`}
            >
              {/* شارة الأكثر شعبية */}
              {plan.popular && (
                <div
                  className="pricing-badge"
                >
                  <span className="flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    الأكثر شعبية
                  </span>
                </div>
              )}

              <div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />

              <div className="pricing-header">
                {/* أيقونة الباقة */}
                <div
                  className={`pricing-icon bg-gradient-to-br ${plan.color}`}
                >
                  <div className="text-white">
                    {plan.icon}
                  </div>
                </div>

                {/* اسم الباقة */}
                <h3 className="pricing-name">
                  {plan.name}
                </h3>

                {/* وصف الباقة */}
                <p className="pricing-description">
                  {plan.description}
                </p>
              </div>

              {/* السعر */}
              <div className="pricing-price-wrapper">
                {plan.originalPrice && (
                  <div className="pricing-price-original">
                    ${plan.originalPrice}
                  </div>
                )}
                <div className="flex items-center justify-center gap-2">
                  <span className={`pricing-price-current bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                    ${plan.price}
                  </span>
                  <span className="pricing-price-period">
                    {plan.period}
                  </span>
                </div>

                {plan.savings && (
                  <div
                    className="pricing-savings"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{plan.savings}</span>
                  </div>
                )}
              </div>

              {/* قائمة الميزات */}
              <div className="pricing-features">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="pricing-feature-item"
                  >
                    <div
                      className={`pricing-feature-check bg-gradient-to-r ${plan.color}`}
                    >
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="pricing-feature-text">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* زر الاشتراك */}
              <button
                className={`w-full hover-scale-subtle transition-smooth ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    : `bg-gradient-to-r ${plan.color} hover:opacity-90`
                } text-white py-4 px-6 rounded-2xl font-bold text-lg`}
              >
                <span className="flex items-center justify-center gap-2">
                  {plan.buttonText}
                  →
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* قسم المقارنة */}
        <div
          className="bg-gradient-to-r from-green-50 to-blue-50 backdrop-blur-sm rounded-3xl p-8 border border-green-200/50 mb-12 animate-fadeIn"
        >
          <div
            className="text-center mb-8"
          >
            <div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 rounded-full mb-6"
            >
              <Scale className="w-6 h-6" />
              <span className="text-white font-bold">مقارنة الباقات</span>
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار باقاتنا؟</h3>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
              نقدم أسعار تنافسية مع جودة عالية وقيمة استثنائية لكل دولار تدفعه
            </p>
          </div>

          <div
            className="grid md:grid-cols-3 gap-8 animate-fadeIn"
          >
            {[
              {
                icon: <DollarSign className="w-6 h-6" />,
                title: "أسعار تنافسية",
                description: "أفضل الأسعار في السوق مع خصومات تصل إلى 40%",
                color: "from-green-500 to-green-600"
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "ضمان استرداد 30 يوم",
                description: "جرب خدماتنا بدون مخاطر مع ضمان استرداد كامل",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: <Rocket className="w-6 h-6" />,
                title: "ترقية مجانية",
                description: "يمكنك الترقية إلى باقة أعلى في أي وقت بدون رسوم إضافية",
                color: "from-purple-500 to-purple-600"
              }
            ].map((advantage, index) => (
              <div
                key={advantage.title}
                className="text-center animate-fadeIn"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg`}
                >
                  {advantage.icon}
                </div>

                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h4>

                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* أسئلة شائعة حول الباقات */}
        <div
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50 animate-fadeIn"
        >
          <div
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">أسئلة شائعة حول الباقات</h3>
            <p className="text-gray-600">إجابات سريعة على أهم استفساراتك</p>
          </div>

          <div
            className="grid md:grid-cols-2 gap-6 animate-fadeIn"
          >
            {[
              {
                question: "هل يمكنني تغيير الباقة في أي وقت؟",
                answer: "نعم، يمكنك الترقية أو تغيير الباقة في أي وقت بدون رسوم إضافية."
              },
              {
                question: "ما هي طرق الدفع المتاحة؟",
                answer: "نقبل جميع البطاقات الائتمانية والحسابات البنكية والمحافظ الإلكترونية."
              },
              {
                question: "هل توجد فترة تجريبية مجانية؟",
                answer: "نعم، نقدم فترة تجريبية مجانية لمدة 14 يوم للباقة المهنية."
              },
              {
                question: "هل الشهادات معتمدة دولياً؟",
                answer: "نعم، جميع شهاداتنا معتمدة من IIA وجهات دولية مرموقة أخرى."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50/50 rounded-2xl p-6 border border-gray-200/50 animate-fadeIn"
              >
                <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* زر التواصل للاستفسارات */}
        <div
          className="text-center mt-12 animate-fadeIn"
        >
          <button
            className="group relative bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-smooth shadow-lg hover:shadow-xl hover-scale-subtle"
          >
            <span className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5" />
              تواصل معنا للاستفسارات
              →
            </span>
          </button>

          <p
            className="text-gray-600 mt-4 text-sm"
          >
            فريق المبيعات متاح لمساعدتك في اختيار الباقة المناسبة
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionCardsComponent;
