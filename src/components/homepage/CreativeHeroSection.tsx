'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Play, ArrowLeft } from 'lucide-react';
import Icon from '@/components/ui/icons/IconSystem';
import { Button } from '@/components/ui/primitives';
import { Container } from '@/components/ui/primitives';
import Image from 'next/image';

/**
 * Creative Hero Section - تصميم إبداعي مبتكر
 * تصميم فريد غير تقليدي مع تأثيرات بصرية مبتكرة
 */

const CreativeHeroSection = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  // Reduced 3D tilt effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.querySelector('[data-hero]')?.getBoundingClientRect();
      if (!rect) return;

      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    };

    const hero = document.querySelector('[data-hero]');
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove as EventListener);
      return () => hero.removeEventListener('mousemove', handleMouseMove as EventListener);
    }
  }, [x, y]);

  return (
    <section
      data-hero
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900"
    >
      {/* Hero Banner Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero-main-banner.png"
          alt="خطى للتدريب والاستشارات - منصة التعلم المهني"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/70 via-neutral-800/60 to-primary-900/70" />
      </div>

      {/* Optimized Background Particles - Reduced count for performance */}
      <div className="absolute inset-0 overflow-hidden z-[1] pointer-events-none">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400/30 rounded-full"
          initial={{
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
            y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
          }}
          animate={{
            y: typeof window !== 'undefined' 
              ? [null, Math.random() * window.innerHeight]
              : [0, 100],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
      ))}
      </div>

      {/* Gradient Orbs - Optimized with will-change */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 via-indigo-400/10 to-indigo-500/10 rounded-full blur-3xl will-change-transform"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <Container size="xl" className="relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Content */}
          <motion.div
            className="space-y-8 text-center lg:text-right"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Badge - Simplified */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Icon name="learning" size="md" className="text-primary-400" />
              <span className="text-white font-semibold text-sm">
                منصة التعلم المهني الرائدة
              </span>
            </motion.div>

            {/* Main Heading - Enhanced Typography */}
            <div className="space-y-6">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="block mb-4 font-extrabold">طور مهاراتك في</span>
                <span className="block bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-extrabold">
                  المراجعة الداخلية
                </span>
                <span className="block bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-extrabold">
                  والمحاسبة
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl lg:text-2xl text-neutral-200 dark:text-neutral-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                انضم إلى آلاف المتعلمين واحصل على تدريب عالي الجودة من خبراء المجال. مسارات تعليمية متكاملة، شهادات معتمدة، ومجتمع نشط يدعم رحلتك المهنية مع تقنيات الذكاء الاصطناعي المتقدمة.
              </motion.p>
            </div>

            {/* Motivational Phrase */}
            <motion.div
              className="inline-block mt-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <p className="text-lg md:text-xl text-white font-semibold">
                  ابدأ مع خُطى واصنع مسارك المهني باحتراف
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons - Enhanced with dual action */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white border-0 shadow-xl shadow-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/60 text-lg px-8 py-6 font-bold transition-all duration-300"
                >
                  <Icon name="learning" size="md" className="text-white ml-2" />
                  <span>ابدأ رحلتك الآن</span>
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/50 text-lg px-8 py-6 font-semibold"
                >
                  <Play className="w-5 h-5 ml-2" />
                  <span>شاهد الفيديو</span>
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - Simplified Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main Card */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 backdrop-blur-xl border border-white/20 p-8">
                {/* Card Content */}
                <div className="space-y-6">
                  {/* Mockup Screen */}
                  <div className="relative aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-xl overflow-hidden shadow-elevation-5">
                    {/* Animated Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  </div>

                  {/* Elements */}
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-24 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Simplified */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-white/50 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </div>
      </Container>

      {/* Add gradient animation CSS */}
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

export default CreativeHeroSection;

