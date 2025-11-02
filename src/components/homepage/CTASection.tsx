'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Rocket, CheckCircle, ArrowLeft, Play, Sparkles, GraduationCap, Infinity, Award } from 'lucide-react';
import { Container, Button } from '@/components/ui/primitives';

/**
 * CTA Section - دعوة للعمل النهائية المحسنة
 * تصميم احترافي مع خلفية متدرجة جميلة وتأثيرات بصرية مذهلة
 */

const CTASection = () => {
  const features = [
    {
      icon: Infinity,
      text: 'وصول غير محدود',
    },
    {
      icon: GraduationCap,
      text: 'شهادة معتمدة',
    },
    {
      icon: Award,
      text: 'دعم فني 24/7',
    },
  ];

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Enhanced Multi-Layer Gradient Background */}
      <div className="absolute inset-0">
        {/* Primary Gradient - Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
        
        {/* Secondary Gradient - Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-600/40 via-transparent to-indigo-500/40"
          animate={{
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: -1,
            ease: 'easeInOut',
          }}
        />

        {/* Tertiary Gradient - Accent */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-orange-500/30"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: -1,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Animated Gradient Orbs - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Orb - Top Right */}
        <motion.div
          className="absolute -top-20 -right-20 w-[700px] h-[700px] bg-gradient-to-br from-white/20 via-indigo-400/30 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 50, 0],
            y: [0, 50, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: -1,
            ease: 'easeInOut',
          }}
        />
        
        {/* Medium Orb - Bottom Left */}
        <motion.div
          className="absolute -bottom-20 -left-20 w-[800px] h-[800px] bg-gradient-to-tr from-pink-400/20 via-purple-400/30 to-indigo-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -50, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: -1,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
        
        {/* Center Orb */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-r from-white/10 via-purple-300/20 to-pink-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 25,
            repeat: -1,
            ease: 'linear',
          }}
        />

        {/* Accent Orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl"
            style={{
              top: `${20 + i * 30}%`,
              left: `${10 + i * 25}%`,
            }}
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
          transition={{
            duration: 8 + i * 2,
            repeat: -1,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
          />
        ))}
      </div>

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.1]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 6,
          repeat: -1,
          ease: 'linear',
          repeatDelay: 2,
        }}
      />

      {/* Radial Gradient Overlay for Depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(99, 102, 241, 0.3) 60%, rgba(124, 58, 237, 0.5) 100%)',
        }}
      />

      {/* Mesh Gradient Effect */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `
            radial-gradient(at 20% 30%, rgba(255, 255, 255, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(147, 51, 234, 0.25) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(236, 72, 153, 0.2) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.2) 0px, transparent 50%)
          `,
        }}
      />

      <Container size="xl" className="relative z-10">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge with Animation */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-lg"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: -1, repeatDelay: 3 }}
            >
              <Rocket className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-white font-bold text-base">انضم إلى آلاف المتعلمين الناجحين</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </motion.div>

          {/* Main Heading - Enhanced */}
          <motion.h2 
            className="text-5xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="block mb-4 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              جاهز لبدء رحلتك التعليمية؟
            </span>
          </motion.h2>

          {/* Description - Enhanced */}
          <motion.div 
            className="space-y-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="text-2xl lg:text-3xl text-white/95 font-semibold leading-relaxed">
              ابدأ الآن وتمتع بوصول غير محدود لجميع الدورات والموارد التعليمية
            </p>
            <p className="text-xl lg:text-2xl text-white/90 font-medium">
              واحصل على شهادة معتمدة
            </p>
          </motion.div>

          {/* Features List - Enhanced */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 px-6 py-4 bg-white/15 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-white font-bold text-base lg:text-lg">{feature.text}</span>
                  <CheckCircle className="w-5 h-5 text-green-300" />
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons - Enhanced */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link href="/register" className="block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-neutral-50 border-0 shadow-2xl hover:shadow-white/60 transition-all min-w-[240px] px-10 py-6 text-lg font-bold group"
                >
                  <span>ابدأ الآن مجاناً</span>
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </Link>

            <Link href="/courses" className="block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 transition-all min-w-[240px] px-10 py-6 text-lg font-bold shadow-xl group"
                >
                  <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span>تصفح الدورات</span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust Indicators - Enhanced */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {[
              {
                icon: GraduationCap,
                value: '15,420+',
                label: 'طالب نشط',
                delay: 0.1,
              },
              {
                icon: Award,
                value: '15+',
                label: 'دورة متخصصة',
                delay: 0.2,
              },
              {
                icon: Sparkles,
                value: '95%',
                label: 'معدل الرضا',
                delay: 0.3,
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 + stat.delay, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-20 h-20 bg-white/15 backdrop-blur-xl rounded-2xl mb-4 border border-white/20 shadow-xl group-hover:bg-white/20 transition-all duration-300"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <div className="text-4xl lg:text-5xl font-extrabold text-white mb-2 bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-base lg:text-lg text-white/90 font-semibold">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;
