'use client';

import Link from 'next/link';
import { Search, BookOpen, GraduationCap, Brain, Shield } from 'lucide-react';
import Icon from '@/components/ui/icons/IconSystem';
import { Container } from '@/components/ui/primitives';
import Image from 'next/image';

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

        {/* Light Overlay Layers - minimal overlays for text readability only (no watermark to hide) */}
        {/* Subtle dark overlay for text contrast */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.18) 100%)`,
            transform: 'translateZ(0)',
          }}
        />
        
        {/* Very subtle vertical gradient for better text readability */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.08) 70%, rgba(0,0,0,0.12) 100%)`,
            transform: 'translateZ(0)',
          }}
        />
        
        {/* Minimal color overlay for brand consistency */}
        <div 
          className="absolute inset-0 rounded-[3rem]"
          style={{
            background: `linear-gradient(135deg, rgba(30,58,138,0.05) 0%, rgba(67,56,202,0.03) 50%, rgba(30,58,138,0.05) 100%)`,
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
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/15 transition-colors">               
              <Icon name="learning" size="md" className="text-blue-400" />
              <span className="text-white font-semibold text-sm">
                منصة التعلم المهني الرائدة في الشرق الأوسط
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.1] drop-shadow-2xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.6)' }}>                                   
                <span className="block mb-3 font-black text-white">
                  احترف
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-100 to-purple-200 font-black" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>             
                  المراجعة الداخلية والمحاسبة
                </span>
                <span className="block mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-white" style={{ textShadow: '0 3px 15px rgba(0,0,0,0.7)' }}>
                  مع شهادات معتمدة دولياً
                </span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed max-w-4xl mx-auto font-medium drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>       
                منصة تعليمية متكاملة تجمع بين المحتوى الأكاديمي والتطبيق العملي. انضم إلى آلاف المحترفين الذين حققوا النجاح في مسيرتهم المهنية من خلال برامج تدريبية شاملة وشهادات معتمدة من أبرز المؤسسات الدولية.
              </p>
            </div>

            {/* Site Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10">
              <Link href="/courses" className="group px-5 py-6 bg-blue-500/15 backdrop-blur-sm border border-white/30 rounded-2xl text-center hover:bg-blue-500/25 hover:border-white/40 transition-colors min-h-[140px] flex flex-col justify-center items-center">
                <BookOpen className="w-8 h-8 text-blue-300 mb-3 flex-shrink-0" />
                <div className="text-base md:text-lg text-white/95 font-bold mb-1">
                  كورسات متخصصة
                </div>
                <div className="text-xs text-white/80 text-center px-1">
                  برامج تدريبية شاملة في المراجعة الداخلية والمحاسبة
                </div>
              </Link>
              
              <Link href="/cia" className="group px-5 py-6 bg-purple-500/15 backdrop-blur-sm border border-white/30 rounded-2xl text-center hover:bg-purple-500/25 hover:border-white/40 transition-colors min-h-[140px] flex flex-col justify-center items-center">
                <GraduationCap className="w-8 h-8 text-purple-300 mb-3 flex-shrink-0" />
                <div className="text-base md:text-lg text-white/95 font-bold mb-1">
                  شهادة CIA
                </div>
                <div className="text-xs text-white/80 text-center px-1">
                  برنامج زمالة معتمد دولياً من IIA
                </div>
              </Link>
              
              <Link href="/ai-tools" className="group px-5 py-6 bg-emerald-500/15 backdrop-blur-sm border border-white/30 rounded-2xl text-center hover:bg-emerald-500/25 hover:border-white/40 transition-colors min-h-[140px] flex flex-col justify-center items-center">
                <Brain className="w-8 h-8 text-emerald-300 mb-3 flex-shrink-0" />
                <div className="text-base md:text-lg text-white/95 font-bold mb-1">
                  ذكاء اصطناعي
                </div>
                <div className="text-xs text-white/80 text-center px-1">
                  مساعد ذكي لتطوير مهاراتك وتحليل أدائك
                </div>
              </Link>
              
              <Link href="/courses?category=المراجعة الداخلية" className="group px-5 py-6 bg-amber-500/15 backdrop-blur-sm border border-white/30 rounded-2xl text-center hover:bg-amber-500/25 hover:border-white/40 transition-colors min-h-[140px] flex flex-col justify-center items-center">
                <Shield className="w-8 h-8 text-amber-300 mb-3 flex-shrink-0" />
                <div className="text-base md:text-lg text-white/95 font-bold mb-1">
                  المراجعة الداخلية
                </div>
                <div className="text-xs text-white/80 text-center px-1">
                  دورات متخصصة في المراجعة الداخلية والمحاسبة
                </div>
              </Link>
            </div>


            {/* Search Bar */}
            <div className="mt-8">
              <Link href="/courses">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                    <Search className="w-5 h-5 text-white/70" />                                                       
                  </div>
                  <div className="w-full px-6 pr-14 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white/95 placeholder-white/60 hover:bg-white/15 transition-colors cursor-pointer font-medium text-base">    
                    ابحث عن دورة تدريبية...
                  </div>
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
