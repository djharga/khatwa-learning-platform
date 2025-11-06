'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  BookOpen,
  Award,
  TrendingUp,
  MessageCircle,
  Sparkles,
  Target,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Creative Features Section - تصميم إبداعي للمميزات
 * تخطيط غير تقليدي مع تأثيرات بصرية مبتكرة
 */

interface Feature {
  icon: typeof BookOpen;
  title: string;
  description: string;
  gradient: string;
  delay: number;
  position: 'left' | 'right' | 'center';
}

const CreativeFeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features: Feature[] = [
    {
      icon: BookOpen,
      title: 'دورات تفاعلية',
      description: 'محتوى متطور يدمج التكنولوجيا الحديثة مع الخبرة العملية لتحقيق أفضل النتائج التعليمية',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      delay: 0,
      position: 'left',
    },
    {
      icon: Award,
      title: 'شهادات معتمدة',
      description: 'احصل على شهادات عالمية معترف بها في جميع أنحاء العالم تعزز مسيرتك المهنية',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      delay: 0.2,
      position: 'right',
    },
    {
      icon: TrendingUp,
      title: 'تتبع التقدم',
      description: 'تحليلات متقدمة لمتابعة تقدمك بشكل دقيق وتحسين تجربتك التعليمية',
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
      delay: 0.4,
      position: 'left',
    },
    {
      icon: MessageCircle,
      title: 'دعم فني',
      description: 'فريق دعم متاح 24/7 لتقديم المساعدة الفورية والإجابة على جميع استفساراتك',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      delay: 0.6,
      position: 'right',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Enhanced Abstract Background - Very Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-indigo-100/12 to-transparent dark:from-indigo-900/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-100/12 to-transparent dark:from-indigo-900/8 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
              لماذا نحن مختلفون
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            تجربة تعليمية
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              ثورية
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            نعيد تعريف التعليم الرقمي من خلال الابتكار والتكنولوجيا المتقدمة
          </p>
        </motion.div>

        {/* Features Grid - Simplified Layout */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center p-6 lg:p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: feature.delay, duration: 0.8 }}
                whileHover={{ y: -5 }}
              >
                {/* Icon with Animation */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-40`}
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: feature.delay,
                      }}
                    />
                    
                    {/* Icon Container */}
                    <div className={`relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.15 }}
        >
          <motion.div
            className="inline-block"

          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition duration-500" />
              <div className="relative px-8 py-5 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <p className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                  جاهز لتجربة الفرق؟{' '}
                  <span className="text-indigo-600 dark:text-indigo-400 inline-flex items-center gap-2">
                    ابدأ الآن مجاناً
                    <ArrowRight className="w-5 h-5 inline transition-transform group-hover:translate-x-1" />
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
      `}</style>
    </section>
  );
};

export default CreativeFeaturesSection;

