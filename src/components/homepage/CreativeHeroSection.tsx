'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Play, Users, BookOpen, Star, Award, Search, Video, MessageCircle } from 'lucide-react';
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

  // Stats data
  const stats = [
    { icon: Users, value: 15420, label: 'طالب نشط', suffix: '' },
    { icon: BookOpen, value: 15, label: 'دورة', suffix: '+' },
    { icon: Star, value: 4.8, label: 'التقييم', suffix: '', decimals: 1 },
    { icon: Award, value: 95, label: 'الرضا', suffix: '%' },
  ];

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

        {/* Enhanced Multi-layer Overlay with Dark Gradients */}
        <div className="absolute inset-0 bg-black/40 rounded-[3rem]" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/50 via-purple-950/40 to-blue-950/50 rounded-[3rem]" />                                              

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

      <Container size="xl" className="relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Enhanced Content */}
          <div className="space-y-8 text-center lg:text-right">
                                    {/* Badge - Enhanced with Glow */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white/40 transition-all duration-300">               
              <div style={{ filter: 'drop-shadow(0 0 10px rgba(59,130,246,0.6))' }}>
                <Icon name="learning" size="md" className="text-blue-400" />
              </div>
              <span className="text-white font-semibold text-sm tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                منصة التعلم المهني الرائدة
              </span>
            </div>

                                    {/* Main Heading - Enhanced with Glow Effects */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.15] tracking-tight">                                   
                <span className="block mb-4 font-black text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" style={{ textShadow: '0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(99,102,241,0.3)' }}>
                  طور مهاراتك في
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-indigo-200 via-purple-200 to-pink-300 font-black drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]" style={{ textShadow: '0 0 40px rgba(99,102,241,0.4), 0 0 80px rgba(147,51,234,0.3)' }}>             
                  المراجعة الداخلية
                </span>
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-200 via-indigo-200 to-blue-300 font-black drop-shadow-[0_0_30px_rgba(147,51,234,0.5)]" style={{ textShadow: '0 0 40px rgba(147,51,234,0.4), 0 0 80px rgba(236,72,153,0.3)' }}>             
                  والمحاسبة
                </span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>       
                انضم إلى آلاف المتعلمين واحصل على تدريب عالي الجودة من خبراء المجال. مسارات تعليمية متكاملة، شهادات معتمدة، ومجتمع نشط يدعم رحلتك المهنية مع تقنيات الذكاء الاصطناعي المتقدمة.                                                  
              </p>
            </div>

                                    {/* Motivational Phrase - Enhanced */}
            <div className="inline-block mt-6 mb-8">
              <div className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white/40 transition-all duration-300">        
                <span className="text-base md:text-lg text-white font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">  
                  ابدأ مع خُطى واصنع مسارك المهني باحتراف
                </span>
              </div>
            </div>

                        {/* Quick Stats - Enhanced with Glow */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
              {stats.map((stat, idx) => {
                const StatIcon = stat.icon;
                const displayValue = stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value;
                const iconColors = ['text-blue-400', 'text-purple-400', 'text-pink-400', 'text-indigo-400'];
                const iconGlow = [
                  'drop-shadow(0 0 10px rgba(59,130,246,0.6))',
                  'drop-shadow(0 0 10px rgba(147,51,234,0.6))',
                  'drop-shadow(0 0 10px rgba(236,72,153,0.6))',
                  'drop-shadow(0 0 10px rgba(99,102,241,0.6))'
                ];
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center lg:items-start text-center lg:text-right p-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white/15 hover:border-white/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <StatIcon className={`w-5 h-5 ${iconColors[idx]}`} style={{ filter: iconGlow[idx] }} />
                      <span className="text-xl font-bold text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {displayValue}{stat.suffix}
                      </span>
                    </div>
                    <span className="text-xs text-white/95 font-medium tracking-wide drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">{stat.label}</span> 
                  </div>
                );
              })}
            </div>

                        {/* Search Bar - Enhanced */}
            <div className="mt-6">
              <Link href="/courses">
                <div className="relative w-full max-w-md mx-auto lg:mx-0 group">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                    <Search className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' }} />                                                       
                  </div>
                  <div className="w-full px-6 pr-14 py-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl text-white/95 placeholder-white/60 hover:bg-white/15 hover:border-white/40 transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] font-medium text-base">    
                    ابحث عن دورة...
                  </div>
                </div>
              </Link>
            </div>

                                    {/* CTA Buttons - Enhanced with Glow Effects */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">                                                 
              <Link href="/courses" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-[0_0_30px_rgba(99,102,241,0.6),0_0_60px_rgba(147,51,234,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.8),0_0_80px_rgba(147,51,234,0.6)] text-lg px-10 py-5 font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 hover:from-blue-500 hover:via-indigo-500 hover:via-purple-500 hover:to-pink-500 active:scale-[0.98] hover:scale-[1.02]">               
                  <Icon name="learning" size="md" className="text-white" />     
                  <span className="tracking-wide">استكشف الدورات</span>
                </button>
              </Link>

              <Link href="/student" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto border-2 border-white/50 text-white bg-white/10 backdrop-blur-xl hover:bg-white/20 hover:border-white/80 text-lg px-8 py-5 font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-[0.98] hover:scale-[1.02]">                                                         
                  <Play className="w-5 h-5" />
                  <span className="tracking-wide">ابدأ الآن</span>
                </button>
              </Link>
            </div>
          </div>

                    {/* Right Column Card - Enhanced */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.3)] bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-2xl border border-white/30 p-8 hover:bg-gradient-to-br hover:from-blue-500/25 hover:via-purple-500/25 hover:to-pink-500/25 hover:border-white/40 hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition-all duration-300">
                {/* Card Content */}
                <div className="space-y-6">
                                    {/* Mockup Screen - Enhanced */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/20">       
                    {/* Static Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  </div>

                  {/* Elements */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* بطاقة الدورات التفاعلية */}
                    <div className="h-24 bg-white/10 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/15 hover:border-white/40 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center gap-2 p-3">
                      <Video className="w-6 h-6 text-blue-400" style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.6))' }} />
                      <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">دورات تفاعلية</span>
                    </div>
                    
                    {/* بطاقة الشهادات المعتمدة */}
                    <div className="h-24 bg-white/10 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/15 hover:border-white/40 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center gap-2 p-3">
                      <Award className="w-6 h-6 text-purple-400" style={{ filter: 'drop-shadow(0 0 8px rgba(147,51,234,0.6))' }} />
                      <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">شهادات معتمدة</span>
                    </div>
                    
                    {/* بطاقة الدعم الفني */}
                    <div className="h-24 bg-white/10 backdrop-blur-sm rounded-xl border border-white/30 hover:bg-white/15 hover:border-white/40 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] flex flex-col items-center justify-center gap-2 p-3">
                      <MessageCircle className="w-6 h-6 text-pink-400" style={{ filter: 'drop-shadow(0 0 8px rgba(236,72,153,0.6))' }} />
                      <span className="text-white text-xs font-semibold text-center drop-shadow-[0_1px_5px_rgba(0,0,0,0.5)]">دعم فني 24/7</span>
                    </div>
                  </div>
                </div>
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
