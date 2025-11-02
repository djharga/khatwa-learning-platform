'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Users, BookOpen, Star, Rocket, CheckCircle } from 'lucide-react';
import { Container, Button } from '@/components/ui/primitives';

/**
 * CTA Section - دعوة للعمل النهائية
 * تحفيز المستخدم على التسجيل مع تصميم محسّن
 */

const CTASection = () => {
  const stats = [
    {
      value: '10000+',
      label: 'طالب نشط',
      icon: Users,
      delay: 0.1,
    },
    {
      value: '500+',
      label: 'دورة متاحة',
      icon: BookOpen,
      delay: 0.2,
    },
    {
      value: '4.9/5',
      label: 'تقييم الطلاب',
      icon: Star,
      delay: 0.3,
    },
  ];

  return (
    <section className="relative py-24 lg:py-36 overflow-hidden">
      {/* Enhanced Multi-Layer Background Gradient */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-accent-600 to-primary-700" />
        
        {/* Animated Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 200%',
          }}
        />
      </div>
      
      {/* Animated Gradient Orbs - Enhanced */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Orb - Top Right */}
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-white/20 via-primary-400/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, -100, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Medium Orb - Bottom Left */}
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-white/15 via-accent-400/25 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -100, 0],
            y: [0, 100, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        
        {/* Small Orb - Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-r from-white/10 to-purple-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Additional Accent Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[200px] h-[200px] bg-white/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>
      
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 3,
        }}
      />
      
      {/* Radial Gradient Overlay for Depth */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(99, 102, 241, 0.2) 50%, rgba(124, 58, 237, 0.4) 100%)',
        }}
      />
      
      {/* Mesh Gradient Effect */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(at 20% 30%, rgba(255, 255, 255, 0.1) 0px, transparent 50%),
            radial-gradient(at 80% 70%, rgba(147, 51, 234, 0.2) 0px, transparent 50%),
            radial-gradient(at 50% 50%, rgba(236, 72, 153, 0.15) 0px, transparent 50%)
          `,
        }}
      />

      <Container size="xl" className="relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Rocket className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-sm">انضم إلى آلاف المتعلمين</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2 
            className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            جاهز لبدء رحلتك التعليمية؟
          </motion.h2>

          {/* Description */}
          <motion.p 
            className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            ابدأ الآن وتمتع بوصول غير محدود لجميع الدورات والموارد التعليمية
            <br className="hidden lg:block" />
            واحصل على شهادة معتمدة
          </motion.p>

          {/* Features List */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              'وصول غير محدود',
              'شهادات معتمدة',
              'دعم فني 24/7',
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full"
              >
                <CheckCircle className="w-5 h-5 text-white" />
                <span className="text-white font-medium text-sm">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons - بدون زر ابدأ رحلتك المتكرر */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary-600 hover:bg-neutral-100 border-0 shadow-2xl hover:shadow-white/50 transition-all min-w-[200px]"
              animated
            >
              <Link href="/register" className="flex items-center gap-2">
                <span className="font-bold">إنشاء حساب مجاني</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm min-w-[200px]"
              animated
            >
              <Link href="/demo" className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                <span>شاهد العرض التوضيحي</span>
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators - Enhanced */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + stat.delay, duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-md rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base text-white/80 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTASection;

