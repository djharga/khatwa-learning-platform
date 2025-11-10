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
        <section className="relative bg-gradient-to-br from-white dark:from-neutral-900 via-neutral-50/30 dark:via-neutral-800/30 to-neutral-100/50 dark:to-neutral-800/50 py-24 lg:py-36 xl:py-48 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary-100/40 to-secondary-innovate-100/40 dark:from-primary-900/40 dark:to-secondary-innovate-900/40 rounded-full blur-3xl ${prefersReducedMotion ? '' : 'animate-pulse'}`} />
            <div className={`absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-success-100/30 to-primary-100/30 dark:from-success-900/30 dark:to-primary-900/30 rounded-full blur-3xl ${prefersReducedMotion ? '' : 'animate-pulse delay-1000'}`} />
          </div>

          <div className="container mx-auto max-w-7xl px-8 relative z-10 text-center space-y-8">
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full shadow-lg"
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2, duration: 0.5 }}
            >
              <div className={`w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full ${prefersReducedMotion ? '' : 'animate-pulse'}`} />
              <span className="text-slate-700 dark:text-slate-300 font-medium text-sm">منصة خطى للتعليم والتدريب</span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-7xl xl:text-8xl font-bold text-primary-600 dark:text-primary-400"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.4, duration: 0.8 }}
            >
              عن خطى
            </motion.h1>

            <motion.p
              className="text-xl lg:text-2xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto font-medium leading-relaxed"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.6, duration: 0.6 }}
            >
              منصة تعليمية رائدة تجمع بين الخبرة العملية والمعرفة الأكاديمية لتطوير المهارات المهنية في المجال المالي والمراجعي.
            </motion.p>
          </div>
        </section>

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
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">قصة بدايتنا</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
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
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-700">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم الفريق */}
        <section className="relative py-24 lg:py-36 bg-white">
          <div className="absolute inset-0 opacity-5">
            <Image src="/assets/founders-team-image.jpg" alt="فريق العمل" fill className="object-cover" quality={60} />
          </div>

          <div className="container mx-auto max-w-7xl px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">فريق العمل</h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                نخبة من الخبراء والمتخصصين في مجالات المحاسبة والمراجعة الداخلية
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'د. أحمد العتيبي', role: 'مؤسس ومدير تنفيذي', specialty: 'خبير مراجعة داخلية معتمد من IIA', experience: '15+ سنة', img: '/avatars/drew-cano.png' },
                { name: 'د. سارة المحمد', role: 'مديرة التعليم', specialty: 'خبيرة في تحليل المخاطر المالية', experience: '12+ سنة', img: '/avatars/natali-craig.png' },
                { name: 'د. محمد السالم', role: 'مدير الاستشارات', specialty: 'خبير حوكمة وامتثال', experience: '18+ سنة', img: '/avatars/orlando-diggs.png' },
              ].map((m, i) => (
                <motion.div
                  key={m.name}
                  className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-neutral-700 text-center"
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: i * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center">
                      <User className="w-12 h-12 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{m.name}</h3>
                    <p className="text-primary-600 font-medium">{m.role}</p>
                    <p className="text-sm text-slate-600">{m.specialty}</p>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">{m.experience}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم الإنجازات */}
        <section className="py-24 lg:py-36 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-8 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">إنجازاتنا</h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-16">
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
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">{s.number}</div>
                      <div className="text-slate-600 dark:text-slate-400 font-medium">{s.label}</div>
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
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">تواصل معنا</h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto mb-16">
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
