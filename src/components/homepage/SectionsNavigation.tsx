'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Users, MessageCircle, Library } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Sections Navigation - أقسام التنقل الرئيسية
 * روابط سريعة للأقسام الرئيسية في المنصة
 */

interface Section {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const SectionsNavigation = () => {
  const sections: Section[] = [
    {
      id: 'courses',
      name: 'الكورسات',
      description: 'استكشف مجموعتنا الكاملة من الدورات التدريبية',
      href: '/courses',
      icon: BookOpen,
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'fellowship',
      name: 'الزمالة',
      description: 'انضم إلى برنامج زمالة المراجعين الداخليين',
      href: '/cia',
      icon: Users,
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      id: 'consultations',
      name: 'الاستشارات',
      description: 'احصل على استشارات مهنية مخصصة',
      href: '/packages-and-consulting?tab=consulting',
      icon: MessageCircle,
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'library',
      name: 'المكتبة',
      description: 'تصفح الموارد التعليمية والمقالات',
      href: '/resources',
      icon: Library,
      gradient: 'from-orange-500 to-amber-600',
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-200/30 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-indigo-200/30 via-transparent to-transparent rounded-full blur-3xl" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            استكشف منصة
            <span className="block bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent mt-3 bg-[length:200%_auto] animate-gradient">
              خطى التعليمية
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            اختر القسم الذي يناسب احتياجاتك التعليمية والمهنية وابدأ رحلتك نحو التميز
          </p>
        </motion.div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link href={section.href} className="block h-full group">
                  <div className="relative h-full p-6 lg:p-8 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/20 group cursor-pointer overflow-hidden">
                    {/* Enhanced Gradient Glow Effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                    />
                    <motion.div
                      className={`absolute -inset-0.5 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`}
                    />

                    {/* Enhanced Icon */}
                    <div className="relative mb-5">
                      <motion.div 
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg shadow-indigo-500/30 group-hover:shadow-xl group-hover:shadow-indigo-500/50 transition-all duration-300`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        <Icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                      </motion.div>
                    </div>

                    {/* Enhanced Content */}
                    <div className="relative">
                      <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                        {section.name}
                      </h3>
                      <p className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                        {section.description}
                      </p>
                    </div>

                    {/* Enhanced Arrow Indicator */}
                    <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                      <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>

      {/* Gradient Animation CSS */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 200% auto;
        }
      `}</style>
    </section>
  );
};

export default SectionsNavigation;


