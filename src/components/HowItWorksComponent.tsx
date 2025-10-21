'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  howItWorksSteps,
  type HowItWorksVariant,
} from './how-it-works/how-it-works-data';

/** Type definition for landing page step combining step number with landing variant data from how-it-works-data */
type LandingStep = HowItWorksVariant & { step: number };

/** How it works section displaying the 4-step process for getting started on the platform. Features animated step cards with icons, descriptions, and connecting arrows. Includes final call-to-action for registration. */
const HowItWorksComponent = () => {
  // Transform how-it-works data to extract landing variant for display
  const landingSteps = useMemo<LandingStep[]>(
    () =>
      howItWorksSteps.map((stepDefinition) => ({
        step: stepDefinition.step,
        ...stepDefinition.landing,
      })),
    []
  );

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30 overflow-hidden">
      {/* Animated background gradients and decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(99,102,241,0.03),transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <motion.div
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              كيف تعمل المنصة؟
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
            أربع خطوات بسيطة تفصلك عن بدء رحلتك التعليمية المثالية في عالم
            المحاسبة والمراجعة
          </p>
        </motion.div>

        {/* Grid of 4 step cards with staggered entrance animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {landingSteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className={`group relative ${step.background ?? ''} rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden`}
              role="listitem"
            >
              {/* خلفية متدرجة متحركة */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.gradient ?? ''} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
              ></div>

              {/* رقم الخطوة */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.15 + 0.2,
                  type: 'spring',
                  stiffness: 200,
                }}
                viewport={{ once: true }}
                className={`relative -top-3 left-1/2 transform -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${step.gradient ?? ''} text-white rounded-2xl flex items-center justify-center font-bold text-lg sm:text-xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 mb-6 sm:mb-8`}
                aria-label={`الخطوة ${step.step}`}
              >
                {step.step}
              </motion.div>

              {/* الأيقونة */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.15 + 0.4,
                  type: 'spring',
                  stiffness: 200,
                }}
                viewport={{ once: true }}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 bg-gradient-to-br ${step.gradient ?? ''} rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                aria-hidden="true"
              >
                <step.icon
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${step.text ?? ''} group-hover:scale-110 transition-all duration-300`}
                  aria-hidden="true"
                />
              </motion.div>

              {/* المحتوى */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.6, duration: 0.6 }}
                viewport={{ once: true }}
                className="relative text-center space-y-3 sm:space-y-4"
              >
                <h3
                  className={`text-xl sm:text-2xl font-bold leading-tight transition-colors duration-300 ${step.text ?? ''}`}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* تأثير الإشعاع */}
              <motion.div
                className={`absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r ${step.gradient ?? ''} opacity-0 group-hover:opacity-20`}
                initial={false}
                animate={{
                  opacity: [0, 0.2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5,
                }}
              />

              {/* السهم للشاشات الكبيرة */}
              {index < landingSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10"
                >
                  <ArrowRight className={`w-6 h-6 ${step.text ?? ''}`} />
                </motion.div>
              )}
            </motion.article>
          ))}
        </div>

        {/* Final call-to-action encouraging users to start their learning journey */}
        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
              جاهز لبدء رحلتك التعليمية؟
            </h3>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
              انضم إلى مجتمعنا المتنامي من المتعلمين والمختصين في المحاسبة
              والمراجعة الداخلية
            </p>
            <motion.button
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-white/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ الآن مجاناً
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksComponent;
