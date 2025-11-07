'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Lazy load heavy components for better performance
const CreativeHeroSection = dynamic(
  () => import('@/components/homepage/CreativeHeroSection'),
  { 
    ssr: true, // Keep SSR for Hero (above the fold)
    loading: () => <div className="min-h-[85vh] bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-900" />
  }
);

const QuickStatsBar = dynamic(
  () => import('@/components/homepage/QuickStatsBar'),
  { ssr: false }
);

const FeaturedCoursesSection = dynamic(
  () => import('@/components/homepage/FeaturedCoursesSection'),
  { ssr: false }
);

// Replace the CIASpotlightSection import with the new FellowshipSection
const FellowshipSection = dynamic(
  () => import('@/components/homepage/FellowshipSection'),
  { ssr: false }
);

const FAQSection = dynamic(
  () => import('@/components/homepage/FAQSection'),
  { ssr: false }
);

const CTASection = dynamic(
  () => import('@/components/homepage/CTASection'),
  { ssr: false }
);

// Introduction Sections - أقسام التعريف بالمنصة
const IntroductionSection = dynamic(
  () => import('@/components/homepage/IntroductionSection'),
  { ssr: false }
);

const VisionSection = dynamic(
  () => import('@/components/homepage/VisionSection'),
  { ssr: false }
);

const MissionSection = dynamic(
  () => import('@/components/homepage/MissionSection'),
  { ssr: false }
);

const GoalsSection = dynamic(
  () => import('@/components/homepage/GoalsSection'),
  { ssr: false }
);

const ValuesSection = dynamic(
  () => import('@/components/homepage/ValuesSection'),
  { ssr: false }
);


/**
 * Homepage - الصفحة الرئيسية
 * تصميم احترافي محسّن للأداء
 * 
 * Performance Optimizations:
 * - Lazy loading for below-the-fold components
 * - Throttled scroll handler
 * - Optimized animations
 * - Code splitting
 */

export default function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min(
            (window.pageYOffset / totalHeight) * 100,
            100
          );
          setScrollProgress(progress);
          setShowScrollToTop(window.pageYOffset > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">  
      {/* Modern Scroll Progress Bar - Reduced Animation */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-neutral-200/50 dark:bg-neutral-700/50">                                                          
        <div
          className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600"
          style={{
            width: `${scrollProgress}%`,
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Page Content with optimized grid layout and consistent spacing */}
      <div className="relative z-10 grid grid-cols-1 gap-y-4 py-8">
        {/* 1. Hero Section - Above the fold, SSR */}
        <section className="container mx-auto max-w-7xl px-8">
          <CreativeHeroSection />
        </section>

        {/* 2. Introduction Section - التعريف بالمنصة */}
        <section className="container mx-auto max-w-7xl px-8 py-8">
          <IntroductionSection />
        </section>

        {/* 4. Vision Section - الرؤية */}
        <section className="container mx-auto max-w-7xl px-8 py-8">
          <VisionSection />
        </section>

        {/* 5. Mission Section - الرسالة */}
        <section className="container mx-auto max-w-7xl px-8 py-8">
          <MissionSection />
        </section>

        {/* 6. Goals Section - الأهداف */}
        <section className="container mx-auto max-w-7xl px-8 py-8">
          <GoalsSection />
        </section>

        {/* 7. Values Section - القيم والهدف */}
        <section className="container mx-auto max-w-7xl px-8 py-8">
          <ValuesSection />
        </section>

        {/* 10. Featured Courses Section - Priority Section */}
        <section className="container mx-auto max-w-7xl px-8 py-8">
          <FeaturedCoursesSection />
        </section>

        {/* 11. Enhanced Fellowship Section */}
        <section className="container mx-auto max-w-7xl px-8 py-8">
          <FellowshipSection />
        </section>

        {/* 12. FAQ */}
        <section className="container mx-auto max-w-7xl px-8 py-8">
          <FAQSection />
        </section>

        {/* 13. Final CTA */}
        <section className="container mx-auto max-w-7xl px-8 py-8">
          <CTASection />
        </section>
      </div>

      {/* Modern Scroll to Top Button - Reduced Animation */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 z-40 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-600 to-indigo-500 dark:from-indigo-500 dark:to-indigo-400 text-white rounded-full shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2"
          aria-label="العودة إلى الأعلى"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
