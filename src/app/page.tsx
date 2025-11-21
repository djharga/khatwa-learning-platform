'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import PageBackground from '@/components/ui/PageBackground';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { ScrollAnimation } from '@/components/ui';
import UnifiedHeroSection from '@/components/ui/UnifiedHeroSection';
import { heroPresets, heroSectionSpacing } from '@/data/hero-presets';

// ✦ Lazy Loading للأقسام ✦
const FeaturedCoursesSection = dynamic(() => import('@/components/homepage/FeaturedCoursesSection'), { ssr: false });
const FellowshipSection = dynamic(() => import('@/components/homepage/FellowshipSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/homepage/FAQSection'), { ssr: false });
const CTASection = dynamic(() => import('@/components/homepage/CTASection'), { ssr: false });
const VisionSection = dynamic(() => import('@/components/homepage/VisionSection'), { ssr: false });
const MissionSection = dynamic(() => import('@/components/homepage/MissionSection'), { ssr: false });
const GoalsSection = dynamic(() => import('@/components/homepage/GoalsSection'), { ssr: false });
const WhatMakesUsSection = dynamic(() => import('@/components/homepage/WhatMakesUsSection'), { ssr: false });

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [isMounted, setIsMounted] = useState(false);

  // ⚙️ تحسين الأداء مع GPU
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const doc = document.documentElement;
          const total = doc.scrollHeight - window.innerHeight;
          const ratio = (window.scrollY / total) * 100;
          setScrollProgress(Math.min(ratio, 100));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // التأكد من mount قبل عرض الحركات
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sections = useMemo(
    () => [
      VisionSection,
      MissionSection,
      GoalsSection,
      WhatMakesUsSection,
      FeaturedCoursesSection,
      FellowshipSection,
      CTASection,
    ],
    []
  );

  return (
    <PageBackground variant="home">
      {/* ✦ مؤشر تقدم التمرير ✦ */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent backdrop-blur-[1px]">
        <div
          className={`h-full bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 
                     shadow-[0_0_15px_rgba(99,102,241,0.35)]
                     ${prefersReducedMotion 
                       ? 'transition-none' 
                       : 'transition-transform duration-200 ease-out will-change-transform'
                     } origin-left`}
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      {/* ✦ Hero Section الموحّد ✦ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <UnifiedHeroSection {...heroPresets.home} className="mx-auto" />
      </div>

      {/* ✦ أقسام الصفحة ✦ - مع Scroll Animations المحسّنة */}
      <div className="relative z-10">
        {sections.map((Section, i) => {
          // تنويع التأثيرات حسب القسم
          const getDirection = (index: number) => {
            const directions: Array<'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'> = ['up', 'right', 'left', 'fade', 'scale', 'up', 'up'];
            return directions[index] || 'up';
          };

          return (
            <ScrollAnimation
              key={i}
              direction={getDirection(i)}
              delay={i * 0.15}
              duration={0.8}
              className={`container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${heroSectionSpacing}`}
              threshold={0.1}
              triggerOnce={true}
            >
              <Section />
            </ScrollAnimation>
          );
        })}
      </div>

      {/* ✦ زر العودة إلى الأعلى ✦ */}
      <ScrollToTopButton 
        threshold={300}
        position="left"
        offset="bottom-20 left-6"
        size="md"
      />
    </PageBackground>
  );
}
