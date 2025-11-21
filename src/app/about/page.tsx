'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  BookOpen,
  Star,
  Shield,
  Target,
  Heart,
  Zap,
  CheckCircle,
  ChevronUp,
  User,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import PageBackground from '@/components/ui/PageBackground';
import HeroSection from '@/components/ui/HeroSection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

// Lazy load heavy components
const ChatAssistantWidget = dynamic(() => import('@/components/ChatAssistantWidget'), { ssr: false });
const ContactComponent = dynamic(() => import('@/components/ContactComponent'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-lg" />,
});

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <PageBackground variant="home">
      {/* شريط تقدم الصفحة */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary-600 dark:bg-primary-500 z-50"
        style={{ width: `${scrollProgress}%` }}
        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
      />

      <div className="relative z-10">
        {/* قسم الهيرو */}
        <HeroSection
          title="عن خطى"
          description="منصة تعليمية رائدة تجمع بين الخبرة العملية والمعرفة الأكاديمية لتطوير المهارات المهنية في المجال المالي والمراجعي."
          variant="light"
          size="lg"
          badges={[
            { 
              label: 'منصة خطى للتعليم والتدريب',
              variant: 'default'
            }
          ]}
          backgroundGradient="bg-gradient-to-br from-white dark:from-neutral-900 via-neutral-50/30 dark:via-neutral-800/30 to-neutral-100/50 dark:to-neutral-800/50"
          overlayOpacity={0}
          className="mx-0 my-0 rounded-none"
          enableAnimation={!prefersReducedMotion}
        />

        {/* قسم القصة */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-8 grid lg:grid-cols-2 gap-16 items-center">
            {/* الصورة */}
            <div className="relative order-2 lg:order-1 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/company-story-image.jpg"
                alt="قصة شركة خطى"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>

            {/* النص */}
            <div className="space-y-8 order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">قصة بدايتنا</h2>
              <p className="text-base text-slate-700 leading-relaxed">
                تأسست منصة خطى في عام 2023 بهدف سد الفجوة بين التعليم الأكاديمي والمتطلبات العملية في سوق العمل السعودي والعربي.
              </p>

              {[
                {
                  icon: Target,
                  color: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
                  title: 'الرؤية',
                  text: 'أن نصبح المنصة العربية الرائدة في تعليم وتطوير مهارات الشباب لمواكبة سوق العمل العالمي.',
                },
                {
                  icon: Heart,
                  color: 'bg-green-100 text-green-600',
                  title: 'الرسالة',
                  text: 'تمكين الخريجين ورواد الأعمال من امتلاك المهارات والأدوات اللازمة لرفع جودة أعمال الشركات.',
                },
                {
                  icon: Zap,
                  color: 'bg-purple-100 text-purple-600',
                  title: 'القيم',
                  text: 'التميز، الابتكار، النزاهة، والتركيز على النتائج العملية في كل ما نقدمه.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-700">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم الإنجازات */}
        <section className="py-24 lg:py-36 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">إنجازاتنا</h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-16">
              مسيرة من التميز والابتكار في خدمة التعليم المهني
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '5000+', label: 'متخصص معتمد', icon: Users, color: 'from-blue-500 to-blue-600' },
                { number: '50+', label: 'دورة تدريبية', icon: BookOpen, color: 'from-green-500 to-green-600' },
                { number: '95%', label: 'رضا المتدربين', icon: Star, color: 'from-purple-500 to-purple-600' },
                { number: '24/7', label: 'دعم فني', icon: Shield, color: 'from-orange-500 to-orange-600' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-slate-200/50 dark:border-neutral-700/50 text-center"
                  initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  whileInView={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${s.color} rounded-2xl flex items-center justify-center mx-auto text-white`}>
                      <s.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">{s.number}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{s.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم التواصل */}
        <section className="py-24 lg:py-36">
          <div className="container mx-auto max-w-7xl px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">تواصل معنا</h2>
            <p className="text-lg text-slate-700 max-w-3xl mx-auto mb-16">
              نحن هنا لمساعدتك في رحلتك المهنية وتطوير مهاراتك
            </p>
            <div className="max-w-4xl mx-auto">
              <ContactComponent />
            </div>
          </div>
        </section>
      </div>

      {/* أدوات */}
      <ChatAssistantWidget />

      {/* زر العودة للأعلى */}
      <ScrollToTopButton 
        threshold={300}
        position="right"
        offset="bottom-8 right-8"
        size="md"
      />
    </PageBackground>
  );
}
