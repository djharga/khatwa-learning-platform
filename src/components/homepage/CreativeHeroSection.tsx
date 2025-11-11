'use client';

import Link from 'next/link';
import { Search, BookOpen, GraduationCap, Brain, Shield } from 'lucide-react';
import Icon from '@/components/ui/icons/IconSystem';
import { Container } from '@/components/ui/primitives';
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
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-black mx-4 my-6 rounded-[3rem]"
    >
      {/* Optimized Background - High-quality image without watermark */}
      <div className="absolute inset-0 z-0 rounded-[3rem] overflow-hidden">
        {/* Static Image Background */}
        <Image
          src="/assets/hero-main-banner.png"
          alt="خطى للتدريب والاستشارات - منصة التعلم المهني"
          fill
          priority
          className="object-cover rounded-[3rem]"
          quality={90}
          sizes="100vw"
          loading="eager"
          style={{
            objectPosition: 'center center',
          }}
        />

        {/* Light Overlay Layers - Clear transparency for better text readability */}
        {/* Dark overlay with clear transparency */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.5) 100%)`,
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Minimal Light Effects - Reduced blur for better performance */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-2xl opacity-40 pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-2xl opacity-40 pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />

      <Container size="xl" className="relative z-10 py-16 lg:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="space-y-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/15 transition-colors">               
              <Icon name="learning" size="md" className="text-blue-400" />
              <span className="font-semibold text-xs" style={{ 
                fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                color: '#FFFFFF',
                textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                fontWeight: 600,
                letterSpacing: '0.01em'
              }}>
                منصة التعلم المهني الرائدة في الشرق الأوسط
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-5">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] tracking-tight" style={{ 
                fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                color: '#FFFFFF',
                textShadow: '0 4px 24px rgba(0,0,0,0.9), 0 2px 12px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.6)',
                fontWeight: 800,
                letterSpacing: '0'
              }}>                                   
                <span className="block mb-2" style={{ 
                  color: '#FFFFFF',
                  fontWeight: 900,
                  textShadow: '0 4px 24px rgba(0,0,0,0.95), 0 2px 12px rgba(0,0,0,0.85)',
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif'
                }}>
                  خطى للتدريب والاستشارات
                </span>
                <span className="block text-2xl md:text-3xl lg:text-4xl" style={{ 
                  color: '#F8FAFC',
                  fontWeight: 900,
                  textShadow: '0 3px 18px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.75), 0 0 2px rgba(255,255,255,0.3)',
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif'
                }}>             
                  احترف المراجعة الداخلية والمحاسبة
                </span>
                <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl" style={{ 
                  color: '#FFFFFF',
                  fontWeight: 700,
                  textShadow: '0 3px 18px rgba(0,0,0,0.85), 0 2px 10px rgba(0,0,0,0.7)',
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif'
                }}>
                  مع شهادات معتمدة دولياً
                </span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto" style={{ 
                fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                color: '#F1F5F9',
                textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.6)',
                fontWeight: 500,
                letterSpacing: '0',
                lineHeight: '1.8'
              }}>       
                منصة تعليمية متكاملة تجمع بين المحتوى الأكاديمي والتطبيق العملي. انضم إلى آلاف المحترفين الذين حققوا النجاح في مسيرتهم المهنية من خلال برامج تدريبية شاملة وشهادات معتمدة من أبرز المؤسسات الدولية.
              </p>
            </div>

            {/* Site Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10">
              <Link href={ROUTES.COURSES} className="group px-5 py-6 bg-blue-500/15 backdrop-blur-sm border border-white/30 rounded-2xl text-center hover:bg-blue-500/25 hover:border-white/40 transition-colors min-h-[140px] flex flex-col justify-center items-center">
                <BookOpen className="w-8 h-8 text-blue-300 mb-3 flex-shrink-0" />
                <div className="text-base md:text-lg font-bold mb-1" style={{ 
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                  fontWeight: 700,
                  letterSpacing: '0'
                }}>
                  كورسات متخصصة
                </div>
                <div className="text-xs text-center px-1" style={{ 
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#E2E8F0',
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                  fontWeight: 400,
                  lineHeight: '1.5'
                }}>
                  برامج تدريبية شاملة في المراجعة الداخلية والمحاسبة
                </div>
              </Link>
              
              <Link href={ROUTES.CIA} className="group px-5 py-6 bg-purple-500/15 backdrop-blur-sm border border-white/30 rounded-2xl text-center hover:bg-purple-500/25 hover:border-white/40 transition-colors min-h-[140px] flex flex-col justify-center items-center">
                <GraduationCap className="w-8 h-8 text-purple-300 mb-3 flex-shrink-0" />
                <div className="text-base md:text-lg font-bold mb-1" style={{ 
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                  fontWeight: 700,
                  letterSpacing: '0'
                }}>
                  زمالة CIA
                </div>
                <div className="text-xs text-center px-1" style={{ 
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#E2E8F0',
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                  fontWeight: 400,
                  lineHeight: '1.5'
                }}>
                  برنامج زمالة معتمد دولياً من IIA
                </div>
              </Link>
              
              <Link href={ROUTES.AI_TOOLS} className="group px-5 py-6 bg-emerald-500/15 backdrop-blur-sm border border-white/30 rounded-2xl text-center hover:bg-emerald-500/25 hover:border-white/40 transition-colors min-h-[140px] flex flex-col justify-center items-center">
                <Brain className="w-8 h-8 text-emerald-300 mb-3 flex-shrink-0" />
                <div className="text-base md:text-lg font-bold mb-1" style={{ 
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                  fontWeight: 700,
                  letterSpacing: '0'
                }}>
                  ذكاء اصطناعي
                </div>
                <div className="text-xs text-center px-1" style={{ 
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#E2E8F0',
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                  fontWeight: 400,
                  lineHeight: '1.5'
                }}>
                  مساعد ذكي لتطوير مهاراتك وتحليل أدائك
                </div>
              </Link>
              
              <Link href={ROUTES.INTERNAL_AUDIT} className="group px-5 py-6 bg-amber-500/15 backdrop-blur-sm border border-white/30 rounded-2xl text-center hover:bg-amber-500/25 hover:border-white/40 transition-colors min-h-[140px] flex flex-col justify-center items-center">
                <Shield className="w-8 h-8 text-amber-300 mb-3 flex-shrink-0" />
                <div className="text-base md:text-lg font-bold mb-1" style={{ 
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#FFFFFF',
                  textShadow: '0 2px 8px rgba(0,0,0,0.7)',
                  fontWeight: 700,
                  letterSpacing: '0'
                }}>
                  المراجعة الداخلية
                </div>
                <div className="text-xs text-center px-1" style={{ 
                  fontFamily: '"Lemonada", "Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#E2E8F0',
                  textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                  fontWeight: 400,
                  lineHeight: '1.5'
                }}>
                  دورات متخصصة في المراجعة الداخلية والمحاسبة
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2 bg-white/10">
            <div className="w-1 h-3 bg-white/70 rounded-full" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreativeHeroSection;
