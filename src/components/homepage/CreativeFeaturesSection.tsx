'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  BookOpen,
  Award,
  TrendingUp,
  MessageCircle,
  Smartphone,
  Shield,
  Sparkles,
  Zap,
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
      description: 'محتوى متطور يدمج التكنولوجيا الحديثة مع الخبرة العملية',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      delay: 0,
      position: 'left',
    },
    {
      icon: Award,
      title: 'شهادات عالمية',
      description: 'اعتمادات دولية معترف بها في جميع أنحاء العالم',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      delay: 0.2,
      position: 'center',
    },
    {
      icon: TrendingUp,
      title: 'تتبع ذكي',
      description: 'تحليلات متقدمة لمتابعة تقدمك وتحسين تجربتك',
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
      delay: 0.4,
      position: 'right',
    },
    {
      icon: MessageCircle,
      title: 'دعم ذكي',
      description: 'مساعد ذكي متاح 24/7 لتقديم المساعدة الفورية',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      delay: 0.6,
      position: 'left',
    },
    {
      icon: Smartphone,
      title: 'تعلم متعدد',
      description: 'منصة واحدة تعمل بسلاسة على جميع الأجهزة',
      gradient: 'from-indigo-500 via-blue-500 to-cyan-500',
      delay: 0.8,
      position: 'center',
    },
    {
      icon: Shield,
      title: 'أمان متقدم',
      description: 'حماية شاملة للمحتوى والبيانات بأحدث التقنيات',
      gradient: 'from-red-500 via-rose-500 to-pink-500',
      delay: 1,
      position: 'right',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Enhanced Abstract Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-indigo-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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

        {/* Features Grid - Non-traditional Layout */}
        <div ref={ref} className="space-y-8 lg:space-y-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: feature.delay, duration: 0.8 }}
              >
                {/* Icon with Animation */}
                <motion.div
                  className={`flex-shrink-0 ${isEven ? 'lg:order-2' : ''}`}
                  whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    {/* Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-2xl opacity-50`}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: feature.delay,
                      }}
                    />
                    
                    {/* Enhanced Icon Container */}
                    <div className={`relative w-32 h-32 md:w-36 md:h-36 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300`}>
                      <Icon className="w-16 h-16 md:w-20 md:h-20 text-white" />
                      
                      {/* Subtle Animated Border - Less intensive */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-white/40"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </div>

                    {/* Reduced Floating Particles for Performance */}
                    {[...Array(2)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full opacity-60`}
                        style={{
                          top: `${30 + i * 40}%`,
                          right: `${-15 + i * 10}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.3, 0.6, 0.3],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Enhanced Content */}
                <motion.div
                  className={`flex-1 text-center lg:text-right ${isEven ? 'lg:text-left' : ''}`}
                  whileHover={{ x: isEven ? -3 : 3 }}
                  transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
                >
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-neutral-900 dark:text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-base lg:text-lg xl:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                    {feature.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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

