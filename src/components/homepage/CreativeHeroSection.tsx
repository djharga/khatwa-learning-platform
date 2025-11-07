'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Search, Video, MessageCircle, Globe, TrendingUp, Users, Star, Zap, Target, CheckCircle2, BookOpen, GraduationCap, Brain, Shield } from 'lucide-react';
import Icon from '@/components/ui/icons/IconSystem';
import { Container } from '@/components/ui/primitives';
import Image from 'next/image';

/**
 * Creative Hero Section - تصميم إبداعي مبتكر محسّن
 * تصميم عصري مع أحدث التصاميم العالمية 2024-2025
 * 
 * Features:
 * - Animated Typography with Split Text
 * - Magnetic Buttons
 * - Parallax Effects
 * - Mesh Gradients
 * - Enhanced Glassmorphism
 * - CountUp Animations
 * - Intersection Observer
 * - Reduced Motion Support
 */

const CreativeHeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);


    return (
    <section
      ref={sectionRef}
      data-hero
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 via-purple-950 to-blue-950 mx-4 my-6 rounded-[3rem]"           
    >
      {/* Enhanced Video Background with better loading strategy */}
      <div className="absolute inset-0 z-0 rounded-[3rem] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover rounded-[3rem]"
          poster="/assets/hero-main-banner.png"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
          {/* Fallback to image if video not available */}
          <Image
            src="/assets/hero-main-banner.png"
            alt="خطى للتدريب والاستشارات - منصة التعلم المهني"
            fill
            priority
            className="object-cover rounded-[3rem]"
            quality={90}
          />
        </video>

        {/* Enhanced Multi-layer Overlay with Dark Gradients - Lightened */}
        <div className="absolute inset-0 bg-black/20 rounded-[3rem]" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-gray-900/25 via-purple-950/20 to-blue-950/25 rounded-[3rem]" />                                              

        {/* Mesh Gradient Layer 1 - Multiple Radial Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.25),transparent_60%)] rounded-[3rem]" />                                      
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(147,51,234,0.25),transparent_60%)] rounded-[3rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.15),transparent_70%)] rounded-[3rem]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(99,102,241,0.20),transparent_60%)] rounded-[3rem]" />
        
                {/* Static Grid Pattern */}
        <div
          className="absolute inset-0 opacity-30 rounded-[3rem]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),      
              linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px) 
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

            {/* Enhanced Light Orbs - Multiple colorful gradients */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-purple-500/20 rounded-full blur-3xl opacity-70 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-indigo-500/20 rounded-full blur-3xl opacity-70" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500/15 via-blue-500/20 to-cyan-500/15 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-3/4 right-1/3 w-64 h-64 bg-gradient-to-r from-pink-500/15 via-rose-500/15 to-purple-500/20 rounded-full blur-3xl opacity-65" />

            {/* Light Rays Effect - Removed for reduced effects */}

      <Container size="xl" className="relative z-10 py-16 lg:py-24 overflow-visible">
        <div className="max-w-6xl mx-auto overflow-visible">
          {/* Main Content - Centered and Professional */}
          <div className="space-y-10 text-center overflow-visible">
            {/* Badge - Enhanced with Glow */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white/40 transition-all duration-300">               
              <div style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.6))' }}>
                <Icon name="learning" size="md" className="text-blue-400" />
              </div>
              <span className="text-white font-semibold text-sm tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                منصة التعلم المهني الرائدة في الشرق الأوسط
              </span>
            </div>

            {/* Main Heading - Professional and Impactful */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.1] tracking-tight">                                   
                <span className="block mb-3 font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" style={{ textShadow: '0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(99,102,241,0.3)' }}>
                  احترف
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 via-purple-200 to-pink-300 font-black drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]" style={{ textShadow: '0 0 40px rgba(99,102,241,0.4), 0 0 80px rgba(147,51,234,0.3)' }}>             
                  المراجعة الداخلية والمحاسبة
                </span>
                <span className="block mt-2 text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  مع شهادات معتمدة دولياً
                </span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl mx-auto font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>       
                منصة تعليمية متكاملة تجمع بين المحتوى الأكاديمي والتطبيق العملي. انضم إلى آلاف المحترفين الذين حققوا النجاح في مسيرتهم المهنية من خلال برامج تدريبية شاملة وشهادات معتمدة من أبرز المؤسسات الدولية.
              </p>
            </div>

            {/* Site Features - Modern and Impactful */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-10 overflow-hidden">
              <Link href="/courses" className="group relative px-5 py-6 bg-gradient-to-br from-blue-500/20 via-indigo-500/15 to-purple-500/20 backdrop-blur-xl border border-white/30 rounded-2xl text-center hover:from-blue-500/30 hover:to-purple-500/30 hover:border-white/50 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] min-h-[140px] flex flex-col justify-center items-center cursor-pointer overflow-hidden">
                <div className="flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-8 h-8 text-blue-300 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.6))' }} />
                </div>
                <div className="text-base md:text-lg text-white/95 font-bold mb-1">
                  كورسات متخصصة
                </div>
                <div className="text-xs text-white/80 text-center leading-relaxed px-1">
                  برامج تدريبية شاملة في المراجعة الداخلية والمحاسبة
                </div>
              </Link>
              
              <Link href="/cia" className="group relative px-5 py-6 bg-gradient-to-br from-purple-500/20 via-pink-500/15 to-rose-500/20 backdrop-blur-xl border border-white/30 rounded-2xl text-center hover:from-purple-500/30 hover:to-rose-500/30 hover:border-white/50 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.2)] hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] min-h-[140px] flex flex-col justify-center items-center cursor-pointer overflow-hidden">
                <div className="flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-8 h-8 text-purple-300 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 8px rgba(147,51,234,0.6))' }} />
                </div>
                <div className="text-base md:text-lg text-white/95 font-bold mb-1">
                  شهادة CIA
                </div>
                <div className="text-xs text-white/80 text-center leading-relaxed px-1">
                  برنامج زمالة معتمد دولياً من IIA
                </div>
              </Link>
              
              <Link href="/ai-tools" className="group relative px-5 py-6 bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-cyan-500/20 backdrop-blur-xl border border-white/30 rounded-2xl text-center hover:from-emerald-500/30 hover:to-cyan-500/30 hover:border-white/50 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] min-h-[140px] flex flex-col justify-center items-center cursor-pointer overflow-hidden">
                <div className="flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-emerald-300 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.6))' }} />
                </div>
                <div className="text-base md:text-lg text-white/95 font-bold mb-1">
                  ذكاء اصطناعي
                </div>
                <div className="text-xs text-white/80 text-center leading-relaxed px-1">
                  مساعد ذكي لتطوير مهاراتك وتحليل أدائك
                </div>
              </Link>
              
              <Link href="/courses?category=المراجعة الداخلية" className="group relative px-5 py-6 bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-red-500/20 backdrop-blur-xl border border-white/30 rounded-2xl text-center hover:from-amber-500/30 hover:to-red-500/30 hover:border-white/50 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] min-h-[140px] flex flex-col justify-center items-center cursor-pointer overflow-hidden">
                <div className="flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-amber-300 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.6))' }} />
                </div>
                <div className="text-base md:text-lg text-white/95 font-bold mb-1">
                  المراجعة الداخلية
                </div>
                <div className="text-xs text-white/80 text-center leading-relaxed px-1">
                  دورات متخصصة في المراجعة الداخلية والمحاسبة
                </div>
              </Link>
            </div>


            {/* Search Bar - Enhanced */}
            <div className="mt-8">
              <Link href="/courses">
                <div className="relative w-full max-w-lg mx-auto group">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                    <Search className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }} />                                                       
                  </div>
                  <div className="w-full px-6 pr-14 py-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl text-white/95 placeholder-white/60 hover:bg-white/15 hover:border-white/40 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] font-medium text-base">    
                    ابحث عن دورة تدريبية...
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Enhanced */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-2 backdrop-blur-sm bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            <div className="w-1 h-3 bg-white/70 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CreativeHeroSection;
