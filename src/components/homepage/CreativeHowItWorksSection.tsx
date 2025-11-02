'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { UserPlus, BookOpen, Play, Award, Sparkles, ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Creative How It Works Section - تصميم إبداعي
 * تخطيط دائري/زمني بدلاً من الخطوات التقليدية
 */

const CreativeHowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const steps = [
    {
      number: 1,
      icon: BookOpen,
      title: 'سجّل واختر الدورة',
      description: 'إنشاء حساب في ثوانٍ واختر الدورة التي تناسبك',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 2,
      icon: Play,
      title: 'تعلم في وتيرتك',
      description: 'ابدأ التعلم فوراً في الوقت والمكان المناسبين لك',
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: 3,
      icon: Award,
      title: 'احصل على الشهادة',
      description: 'أكمل الدورة واحصل على شهادة معتمدة',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-gradient-to-r from-indigo-200/25 via-indigo-300/20 to-indigo-200/25 rounded-full blur-3xl"
          style={{ opacity, scale }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Additional subtle gradients */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-100/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tl from-indigo-100/20 to-transparent rounded-full blur-3xl" />
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
              البساطة في التعقيد
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
            كيف نبدأ؟
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              خطوات بسيطة
            </span>
          </h2>
        </motion.div>

        {/* Circular/Orbital Layout */}
        <div className="relative min-h-[600px] lg:min-h-[800px]">
          {/* Enhanced Central Hub */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="w-36 h-36 lg:w-56 lg:h-56 bg-gradient-to-br from-indigo-600 via-indigo-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/50 relative overflow-hidden">
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-white/30"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
              {/* Inner glow */}
              <motion.div
                className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent"
              />
              <span className="text-5xl lg:text-7xl font-extrabold text-white relative z-10 drop-shadow-lg">
                خطى
              </span>
            </div>
          </motion.div>

          {/* Orbital Steps - Simplified for 3 steps */}
          {steps.map((step, index) => {
            const Icon = step.icon;
            const angle = (index * 120) * (Math.PI / 180) - (Math.PI / 2); // Start from top
            const radius = 280;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={step.number}
                className="absolute top-1/2 left-1/2"
                style={{
                  x: -x,
                  y: -y,
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Connection Line */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 w-32 lg:w-48 h-0.5 origin-left"
                    style={{
                      rotate: `${angle * (180 / Math.PI)}deg`,
                      backgroundColor: 'rgba(99, 102, 241, 0.3)',
                    }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.8 }}
                  />

                  {/* Enhanced Step Card */}
                  <div className={`relative w-52 lg:w-72 bg-gradient-to-br ${step.color} p-1.5 rounded-3xl`}>
                    {/* Enhanced Glow */}
                    <motion.div
                      className={`absolute -inset-3 bg-gradient-to-r ${step.color} rounded-3xl blur-2xl opacity-40`}
                      animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.08, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.4,
                        ease: 'easeInOut',
                      }}
                    />

                    <div className="relative bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-3xl p-6 lg:p-8 text-center shadow-xl border border-neutral-200/50 dark:border-neutral-700/50">
                      {/* Enhanced Number Badge */}
                      <motion.div
                        className={`absolute -top-5 -right-5 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl lg:text-2xl shadow-xl z-20`}
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 15,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        {step.number}
                      </motion.div>

                      {/* Enhanced Icon */}
                      <div className={`w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-5 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30`}>
                        <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                      </div>

                      {/* Enhanced Content */}
                      <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Enhanced Animated Path Indicator */}
          <motion.svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0"
            style={{ opacity: 0.15 }}
          >
            <motion.circle
              cx="50%"
              cy="50%"
              r="280"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="12 6"
              className="text-indigo-300 dark:text-indigo-700"
              animate={{
                strokeDashoffset: [0, -18],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.svg>
        </div>
      </Container>

      {/* Gradient Animation CSS */}
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

export default CreativeHowItWorksSection;

