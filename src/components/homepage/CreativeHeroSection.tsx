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
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 mx-4 my-6 rounded-[3rem]"
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

        {/* Academic Overlay Layers - Clean blue-gray-white academic colors with reduced blur for logo clarity */}
        {/* Subtle academic blue overlay for text contrast */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(135deg, rgba(30, 58, 138, 0.35) 0%, rgba(51, 65, 85, 0.25) 50%, rgba(30, 58, 138, 0.35) 100%)`,
            transform: 'translateZ(0)',
          }}
        />
        {/* Enhanced gradient overlay from bottom for text area with better contrast */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(to top, rgba(30, 58, 138, 0.65) 0%, rgba(51, 65, 85, 0.45) 35%, rgba(30, 58, 138, 0.2) 65%, transparent 85%)`,
            transform: 'translateZ(0)',
          }}
        />
        {/* Additional subtle white overlay for better logo visibility */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 50%, rgba(255, 255, 255, 0.08) 100%)`,
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Minimal Light Effects - Soft academic blue tones */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-50 pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-slate-400/8 rounded-full blur-3xl opacity-40 pointer-events-none" style={{ transform: 'translateZ(0)', willChange: 'auto' }} />

      <Container size="xl" className="relative z-10 py-16 lg:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="space-y-10 text-center">
            {/* Badge - Enhanced contrast */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/95 backdrop-blur-md border border-blue-200/50 rounded-full hover:bg-white transition-all shadow-xl hover:shadow-2xl">               
              <Icon name="learning" size="md" className="text-blue-700" />
              <span className="font-semibold text-xs md:text-sm" style={{ 
                fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                color: '#1E40AF',
                textShadow: 'none',
                fontWeight: 700,
                letterSpacing: 'normal',
                lineHeight: '1.5'
              }}>
                منصة التعلم المهني الرائدة في الشرق الأوسط
              </span>
            </div>

            {/* Main Heading - Enhanced prominence and contrast */}
            <div className="space-y-8 px-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight" style={{ 
                fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                fontWeight: 700,
                letterSpacing: 'normal',
                lineHeight: '1.4'
              }}>                                   
                <span className="block mb-5 px-2" style={{ 
                  color: '#FFFFFF',
                  fontWeight: 900,
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)',
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  lineHeight: '1.3',
                  letterSpacing: '-0.01em'
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

            {/* Site Features - Enhanced academic cards with better contrast and shadows */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto mt-12">
              <Link href={ROUTES.COURSES} className="group px-6 py-7 bg-white border-2 border-blue-200 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[160px] flex flex-col justify-center items-center shadow-lg" style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <div className="mb-4 p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors duration-300">
                  <BookOpen className="w-9 h-9 text-blue-700 flex-shrink-0" strokeWidth={2} />
                </div>
                <div className="text-sm md:text-base font-bold mb-2" style={{ 
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#1E40AF',
                  textShadow: 'none',
                  fontWeight: 700,
                  letterSpacing: 'normal',
                  lineHeight: '1.5'
                }}>
                  كورسات متخصصة
                </div>
                <div className="text-xs md:text-sm text-center px-2 mt-1" style={{ 
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#475569',
                  textShadow: 'none',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  letterSpacing: 'normal'
                }}>
                  برامج تدريبية شاملة في المراجعة الداخلية والمحاسبة
                </div>
              </Link>
              
              <Link href={ROUTES.CIA} className="group px-6 py-7 bg-white border-2 border-blue-200 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[160px] flex flex-col justify-center items-center shadow-lg" style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <div className="mb-4 p-3 bg-slate-50 rounded-2xl group-hover:bg-slate-100 transition-colors duration-300">
                  <GraduationCap className="w-9 h-9 text-slate-700 flex-shrink-0" strokeWidth={2} />
                </div>
                <div className="text-sm md:text-base font-bold mb-2" style={{ 
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#1E40AF',
                  textShadow: 'none',
                  fontWeight: 700,
                  letterSpacing: 'normal',
                  lineHeight: '1.5'
                }}>
                  CIA
                </div>
                <div className="text-xs md:text-sm text-center px-2 mt-1" style={{ 
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#475569',
                  textShadow: 'none',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  letterSpacing: 'normal'
                }}>
                  برنامج زمالة معتمد دولياً من IIA
                </div>
              </Link>
              
              <Link href={ROUTES.AI_TOOLS} className="group px-6 py-7 bg-white border-2 border-blue-200 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[160px] flex flex-col justify-center items-center shadow-lg" style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <div className="mb-4 p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors duration-300">
                  <Brain className="w-9 h-9 text-blue-700 flex-shrink-0" strokeWidth={2} />
                </div>
                <div className="text-sm md:text-base font-bold mb-2" style={{ 
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#1E40AF',
                  textShadow: 'none',
                  fontWeight: 700,
                  letterSpacing: 'normal',
                  lineHeight: '1.5'
                }}>
                  ذكاء اصطناعي
                </div>
                <div className="text-xs md:text-sm text-center px-2 mt-1" style={{ 
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#475569',
                  textShadow: 'none',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  letterSpacing: 'normal'
                }}>
                  مساعد ذكي لتطوير مهاراتك وتحليل أدائك
                </div>
              </Link>
              
              <Link href={ROUTES.INTERNAL_AUDIT} className="group px-6 py-7 bg-white border-2 border-blue-200 rounded-3xl text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[160px] flex flex-col justify-center items-center shadow-lg" style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <div className="mb-4 p-3 bg-slate-50 rounded-2xl group-hover:bg-slate-100 transition-colors duration-300">
                  <Shield className="w-9 h-9 text-slate-700 flex-shrink-0" strokeWidth={2} />
                </div>
                <div className="text-sm md:text-base font-bold mb-2" style={{ 
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#1E40AF',
                  textShadow: 'none',
                  fontWeight: 700,
                  letterSpacing: 'normal',
                  lineHeight: '1.5'
                }}>
                  المراجعة الداخلية
                </div>
                <div className="text-xs md:text-sm text-center px-2 mt-1" style={{ 
                  fontFamily: '"Cairo", "Tajawal", "IBM Plex Sans Arabic", "Segoe UI", system-ui, sans-serif',
                  color: '#475569',
                  textShadow: 'none',
                  fontWeight: 400,
                  lineHeight: '1.6',
                  letterSpacing: 'normal'
                }}>
                  دورات متخصصة في المراجعة الداخلية والمحاسبة
                </div>
              </Link>
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
