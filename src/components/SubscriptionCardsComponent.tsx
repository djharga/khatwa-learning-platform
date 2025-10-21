'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown, Rocket } from 'lucide-react';

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
    <motion.section
      className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* خلفية متحركة */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: "radial-gradient(circle at 25% 75%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 75% 25%, #8b5cf6 0%, transparent 50%)",
          backgroundSize: "150% 150%",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان الرئيسي */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-green-200/50 mb-8"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <span className="text-2xl">💳</span>
            </motion.div>
            <span className="text-green-700 font-semibold">باقات اشتراك مرنة</span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
            whileHover={{ scale: 1.02 }}
          >
            اختر الباقة المناسبة لك
          </motion.h2>

          <motion.p
            className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            باقات متنوعة تناسب جميع المستويات والاحتياجات مع إمكانية الترقية في أي وقت
          </motion.p>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full mb-12"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* كروت الباقات */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-white/70 ${
                plan.popular ? 'ring-2 ring-purple-500/50 scale-105' : ''
              }`}
              whileHover={{ scale: plan.popular ? 1.08 : 1.05, y: -10, rotateY: index % 2 === 0 ? 3 : -3 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* شارة الأكثر شعبية */}
              {plan.popular && (
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <span className="flex items-center gap-2">
                    <Rocket className="w-4 h-4" />
                    الأكثر شعبية
                  </span>
                </motion.div>
              )}

              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              <motion.div
                className="relative z-10 text-center"
                whileHover={{ scale: 1.05 }}
              >
                {/* أيقونة الباقة */}
                <motion.div
                  className={`w-20 h-20 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-white">
                    {plan.icon}
                  </div>
                </motion.div>

                {/* اسم الباقة */}
                <motion.h3
                  className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {plan.name}
                </motion.h3>

                {/* وصف الباقة */}
                <motion.p
                  className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {plan.description}
                </motion.p>

                {/* السعر */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className={`text-4xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 text-lg">
                      {plan.period}
                    </span>
                  </div>

                  {plan.savings && (
                    <motion.div
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span>🎉</span>
                      <span>{plan.savings}</span>
                    </motion.div>
                  )}
                </motion.div>

                {/* قائمة الميزات */}
                <motion.div
                  className="space-y-3 mb-8 text-left"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 + featureIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className={`w-5 h-5 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mt-0.5 flex-shrink-0`}
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                      <span className="text-gray-700 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* زر الاشتراك */}
                <motion.button
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                      : `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`
                  }`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {plan.buttonText}
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>

                {/* خط زخرفي */}
                <motion.div
                  className="mt-6 flex justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`w-12 h-1 bg-gradient-to-r ${plan.color} rounded-full group-hover:w-16 transition-all duration-500`}
                    initial={false}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* قسم المقارنة */}
        <motion.div
          className="bg-gradient-to-r from-green-50 to-blue-50 backdrop-blur-sm rounded-3xl p-8 border border-green-200/50 mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 px-6 py-3 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <span className="text-2xl">⚖️</span>
              </motion.div>
              <span className="text-white font-bold">مقارنة الباقات</span>
            </motion.div>

            <h3 className="text-3xl font-bold text-gray-900 mb-4">لماذا تختار باقاتنا؟</h3>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
              نقدم أسعار تنافسية مع جودة عالية وقيمة استثنائية لكل دولار تدفعه
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            viewport={{ once: true }}
          >
            {[
              {
                icon: "💰",
                title: "أسعار تنافسية",
                description: "أفضل الأسعار في السوق مع خصومات تصل إلى 40%",
                color: "from-green-500 to-green-600"
              },
              {
                icon: "🔒",
                title: "ضمان استرداد 30 يوم",
                description: "جرب خدماتنا بدون مخاطر مع ضمان استرداد كامل",
                color: "from-blue-500 to-blue-600"
              },
              {
                icon: "🚀",
                title: "ترقية مجانية",
                description: "يمكنك الترقية إلى باقة أعلى في أي وقت بدون رسوم إضافية",
                color: "from-purple-500 to-purple-600"
              }
            ].map((advantage, index) => (
              <motion.div
                key={advantage.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`w-16 h-16 bg-gradient-to-br ${advantage.color} rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-2xl">{advantage.icon}</span>
                </motion.div>

                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {advantage.title}
                </h4>

                <p className="text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* أسئلة شائعة حول الباقات */}
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-8"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">أسئلة شائعة حول الباقات</h3>
            <p className="text-gray-600">إجابات سريعة على أهم استفساراتك</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            viewport={{ once: true }}
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
              <motion.div
                key={index}
                className="bg-gray-50/50 rounded-2xl p-6 border border-gray-200/50"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.5 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="font-bold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* زر التواصل للاستفسارات */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group relative bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💬
              </motion.span>
              تواصل معنا للاستفسارات
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          <motion.p
            className="text-gray-600 mt-4 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            viewport={{ once: true }}
          >
            فريق المبيعات متاح لمساعدتك في اختيار الباقة المناسبة
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SubscriptionCardsComponent;
