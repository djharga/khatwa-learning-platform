'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import PageBackground from '@/components/ui/PageBackground';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

// ✦ Lazy Loading للأقسام ✦
const CreativeHeroSection = dynamic(() => import('@/components/homepage/CreativeHeroSection'), { ssr: true });
const FeaturedCoursesSection = dynamic(() => import('@/components/homepage/FeaturedCoursesSection'), { ssr: false });
const FellowshipSection = dynamic(() => import('@/components/homepage/FellowshipSection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/homepage/FAQSection'), { ssr: false });
const CTASection = dynamic(() => import('@/components/homepage/CTASection'), { ssr: false });
const IntroductionSection = dynamic(() => import('@/components/homepage/IntroductionSection'), { ssr: false });
const VisionSection = dynamic(() => import('@/components/homepage/VisionSection'), { ssr: false });
const MissionSection = dynamic(() => import('@/components/homepage/MissionSection'), { ssr: false });
const GoalsSection = dynamic(() => import('@/components/homepage/GoalsSection'), { ssr: false });
const ValuesSection = dynamic(() => import('@/components/homepage/ValuesSection'), { ssr: false });

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
      CreativeHeroSection,
      IntroductionSection,
      VisionSection,
      MissionSection,
      GoalsSection,
      ValuesSection,
      FeaturedCoursesSection,
      FellowshipSection,
      FAQSection,
      CTASection,
    ],
    []
  );

  return (
    <PageBackground variant="home">
      {/* ✦ مؤشر تقدم التمرير ✦ */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent backdrop-blur-[1px]">
        <div
          className={`h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 
                     shadow-[0_0_15px_rgba(245,158,11,0.35)]
                     ${prefersReducedMotion 
                       ? 'transition-none' 
                       : 'transition-transform duration-75 ease-linear will-change-transform'
                     } origin-left`}
          style={{ transform: `scaleX(${scrollProgress / 100})` }}
        />
      </div>

      {/* ✦ أقسام الصفحة ✦ */}
      <div className="relative z-10">
        {sections.map((Section, i) => (
          <section
            key={i}
            className={`
              container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16
              ${prefersReducedMotion || !isMounted 
                ? 'opacity-100' 
                : 'animate-fadeInUp opacity-0'
              }
            `}
            style={prefersReducedMotion || !isMounted ? {} : { animationDelay: `${i * 0.08}s` }}
          >
            <Section />
          </section>
        ))}
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
