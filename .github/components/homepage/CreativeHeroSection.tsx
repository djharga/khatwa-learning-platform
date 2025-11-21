'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, BookOpen, GraduationCap, Brain, Shield } from 'lucide-react';
import Icon from '@/components/ui/icons/IconSystem';
import { Container } from '@/components/ui/primitives';
import { GlassCard } from '@/components/ui';
import Image from 'next/image';
import { ROUTES } from '@/lib/routes';

/**
 * Creative Hero Section - تصميم إبداعي مبتكر محسّن للأداء
 * 
 * Performance Optimizations:
 * - Static image background (no video)
 * - Single combined overlay layer
 * - Minimal blur effects (2 static light effects)
 * - Reduced backdrop-blur (md instead of xl)
 * - No unnecessary refs or data attributes
 * - GPU acceleration
 * - Optimized image (quality 75, proper sizing)
 */

const CreativeHeroSection = () => {
  return (
    <section
      className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-900 via-accent-900 to-primary-800 mx-4 my-6 rounded-[3rem]"
    >
      {/* Optimized Background - High-quality image without watermark */}
      <div className="absolute inset-0 z-0 rounded-[3rem] overflow-hidden">
        {/* Static Image Background */}
        <Image
          src="/assets/hero-main-banner.jpg"
          alt="خطى للتدريب والاستشارات - منصة التعلم المهني"
          fill
          priority
          className="object-cover rounded-[3rem] brightness-110 contrast-105"
          quality={100}
          sizes="100vw"
          loading="eager"
          style={{
            objectPosition: 'center center',
          }}
        />

        {/* Enhanced Academic Overlay Layers - Purple-Blue Academic Gradient */}
        {/* Primary academic overlay for depth */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(135deg, rgba(91, 54, 232, 0.40) 0%, rgba(30, 64, 175, 0.30) 50%, rgba(91, 54, 232, 0.40) 100%)`,
            transform: 'translateZ(0)',
          }}
        />
        {/* Enhanced gradient overlay from bottom for better text contrast */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(to top, rgba(91, 54, 232, 0.70) 0%, rgba(30, 64, 175, 0.50) 35%, rgba(91, 54, 232, 0.25) 65%, transparent 85%)`,
            transform: 'translateZ(0)',
          }}
        />
        {/* Subtle shimmer overlay for premium feel */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, transparent 50%, rgba(109, 74, 255, 0.12) 100%)`,
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Enhanced Light Effects - Academic Purple & Blue Glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl opacity-60 pointer-events-none animate-pulse-slow" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-academic-accent-500/12 rounded-full blur-3xl opacity-50 pointer-events-none animate-pulse-slow" style={{ transform: 'translateZ(0)', willChange: 'auto', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-500/8 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />

      <Container size="xl" className="relative z-10 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="space-y-10 text-center">
            {/* Enhanced Academic Badge */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/98 backdrop-blur-xl border-2 border-primary-200/60 rounded-full hover:bg-white hover:border-primary-300 transition-all shadow-2xl hover:shadow-[0_10px_40px_rgba(91,54,232,0.25)] hover:scale-105">               
              <Icon name="learning" size="md" className="text-primary-600" />
              <span className="font-bold text-xs md:text-sm bg-gradient-to-r from-primary-700 to-accent-700 bg-clip-text text-transparent" style={{ 
                fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
                letterSpacing: 'normal',
                lineHeight: '1.5'
              }}>
                منصة التعلم المهني الرائدة في الشرق الأوسط
              </span>
            </div>

            {/* Main Heading - Academic Typography */}
            <div className="space-y-8 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight" style={{ 
                fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
                fontWeight: 800,
                letterSpacing: '-0.01em',
                lineHeight: '1.3'
              }}>                                   
                <span className="block mb-5 px-2" style={{ 
                  color: '#FFFFFF',
                  fontWeight: 900,
                  textShadow: '0 6px 25px rgba(0, 0, 0, 0.6), 0 3px 10px rgba(0, 0, 0, 0.5), 0 1px 4px rgba(0, 0, 0, 0.4)',
                  lineHeight: '1.2',
                }}>
                  خطى للتدريب والاستشارات
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl mt-6 px-2" style={{ 
                  color: '#E0E7FF',
                  fontWeight: 700,
                  textShadow: '0 3px 15px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(0, 0, 0, 0.35)',
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  lineHeight: '1.5'
                }}>             
                  احترف المراجعة الداخلية والمحاسبة
                </span>
                <span className="block mt-5 text-xl md:text-2xl lg:text-3xl px-2" style={{ 
                  color: '#F1F5F9',
                  fontWeight: 600,
                  textShadow: '0 3px 12px rgba(0, 0, 0, 0.4), 0 2px 5px rgba(0, 0, 0, 0.3)',
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  lineHeight: '1.6'
                }}>
                  مع شهادات معتمدة دولياً
                </span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto px-6 pt-2" style={{ 
                fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                color: '#F8FAFC',
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)',
                fontWeight: 400,
                letterSpacing: 'normal',
                lineHeight: '1.8'
              }}>       
                منصة تعليمية متكاملة تجمع بين المحتوى الأكاديمي والتطبيق العملي. انضم إلى آلاف المحترفين الذين حققوا النجاح في مسيرتهم المهنية من خلال برامج تدريبية شاملة وشهادات معتمدة من أبرز المؤسسات الدولية.
              </p>
            </div>

            {/* Enhanced Academic Feature Cards with GlassCard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={ROUTES.COURSES}>
                  <GlassCard variant="elevated" hover glow="primary" className="h-full min-h-[160px] text-center flex flex-col justify-center items-center">
                    <div className="mb-4 p-3 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl transition-all duration-300 group-hover:scale-110">
                      <BookOpen className="w-9 h-9 text-primary-600 flex-shrink-0" strokeWidth={2} />
                    </div>
                    <div className="text-sm md:text-base font-bold mb-2" style={{ 
                      fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                      color: '#1E40AF',
                      fontWeight: 700,
                    }}>
                      كورسات متخصصة
                    </div>
                    <div className="text-xs md:text-sm text-center px-2 mt-1 text-neutral-600 dark:text-neutral-400">
                      برامج تدريبية شاملة في المراجعة الداخلية والمحاسبة
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={ROUTES.CIA}>
                  <GlassCard variant="elevated" hover glow="gold" className="h-full min-h-[160px] text-center flex flex-col justify-center items-center">
                    <div className="mb-4 p-3 bg-gradient-to-br from-gold-50 to-gold-100 dark:from-gold-900/30 dark:to-gold-800/30 rounded-2xl transition-all duration-300 group-hover:scale-110">
                      <GraduationCap className="w-9 h-9 text-gold-600 flex-shrink-0" strokeWidth={2} />
                    </div>
                    <div className="text-sm md:text-base font-bold mb-2" style={{ 
                      fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                      color: '#1E40AF',
                      fontWeight: 700,
                    }}>
                      CIA
                    </div>
                    <div className="text-xs md:text-sm text-center px-2 mt-1 text-neutral-600 dark:text-neutral-400">
                      برنامج زمالة معتمد دولياً من IIA
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={ROUTES.AI_TOOLS}>
                  <GlassCard variant="elevated" hover glow="accent" className="h-full min-h-[160px] text-center flex flex-col justify-center items-center">
                    <div className="mb-4 p-3 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/30 dark:to-accent-800/30 rounded-2xl transition-all duration-300 group-hover:scale-110">
                      <Brain className="w-9 h-9 text-accent-600 flex-shrink-0" strokeWidth={2} />
                    </div>
                    <div className="text-sm md:text-base font-bold mb-2" style={{ 
                      fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                      color: '#1E40AF',
                      fontWeight: 700,
                    }}>
                      ذكاء اصطناعي
                    </div>
                    <div className="text-xs md:text-sm text-center px-2 mt-1 text-neutral-600 dark:text-neutral-400">
                      مساعد ذكي لتطوير مهاراتك وتحليل أدائك
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href={ROUTES.INTERNAL_AUDIT}>
                  <GlassCard variant="elevated" hover glow="mint" className="h-full min-h-[160px] text-center flex flex-col justify-center items-center">
                    <div className="mb-4 p-3 bg-gradient-to-br from-mint-50 to-mint-100 dark:from-mint-900/30 dark:to-mint-800/30 rounded-2xl transition-all duration-300 group-hover:scale-110">
                      <Shield className="w-9 h-9 text-mint-600 flex-shrink-0" strokeWidth={2} />
                    </div>
                    <div className="text-sm md:text-base font-bold mb-2" style={{ 
                      fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                      color: '#1E40AF',
                      fontWeight: 700,
                    }}>
                      المراجعة الداخلية
                    </div>
                    <div className="text-xs md:text-sm text-center px-2 mt-1 text-neutral-600 dark:text-neutral-400">
                      دورات متخصصة في المراجعة الداخلية والمحاسبة
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center p-2 bg-white/90 shadow-lg">
            <div className="w-1 h-3 bg-slate-600 rounded-full" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreativeHeroSection;
