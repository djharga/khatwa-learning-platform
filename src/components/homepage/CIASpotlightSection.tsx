'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Crown, 
  BookOpen, 
  FileText, 
  Target, 
  Video, 
  Headphones, 
  FileSpreadsheet, 
  ChevronRight, 
  Award, 
  Sparkles,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  Users
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { ROUTES } from '@/lib/routes';
import { Button } from '@/components/ui/Button';

/**
 * CIA Spotlight Section - تسليط الضوء على CIA
 * قسم تعليمي احترافي بسيط لعرض برنامج المراجعين الداخليين CIA
 */

const CIASpotlightSection = () => {
  const learningPath = [
    {
      icon: BookOpen,
      title: 'المستوى الأول',
      description: 'الأساسيات والمفاهيم الأولية',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      title: 'المستوى الثاني',
      description: 'الممارسات المهنية المتقدمة',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'المستوى الثالث',
      description: 'المعرفة التجارية والتحليلية',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  const benefits = [
    {
      icon: GraduationCap,
      text: 'شهادة معتمدة دولياً من IIA',
    },
    {
      icon: TrendingUp,
      text: 'تطوير المهارات المهنية',
    },
    {
      icon: Users,
      text: 'فرص وظيفية أفضل',
    },
    {
      icon: CheckCircle2,
      text: 'بنك أسئلة شامل مع حلول تفصيلية',
    },
  ];

  const resources = [
    {
      icon: Video,
      text: 'فيديوهات تعليمية',
    },
    {
      icon: Headphones,
      text: 'بودكاست صوتي',
    },
    {
      icon: FileText,
      text: 'ملفات Word و PDF',
    },
    {
      icon: FileSpreadsheet,
      text: 'جداول Excel تفاعلية',
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <Container size="xl" className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-900 dark:text-white">
                المدقق الداخلي المعتمد (CIA)
              </h2>
            </div>
            <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              شهادة معتمدة دولياً من معهد المراجعين الداخليين (IIA) - البرنامج الأكثر اعتماداً في مجال المراجعة الداخلية
            </p>
          </motion.div>

          {/* What is CIA Section */}
          <motion.div
            className="bg-white dark:bg-neutral-800 rounded-2xl p-8 lg:p-10 mb-8 shadow-lg border border-neutral-200 dark:border-neutral-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 text-center">
              ما هي شهادة CIA؟
            </h3>
            <p className="text-base lg:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed text-center max-w-4xl mx-auto">
              شهادة المدقق الداخلي المعتمد (Certified Internal Auditor) هي الشهادة المهنية الرائدة في مجال المراجعة الداخلية على مستوى العالم. 
              تُمنح من قبل معهد المراجعين الداخليين (IIA) وتعد المعيار الذهبي للمهنيين في هذا المجال.
            </p>
          </motion.div>

          {/* Learning Path */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
              مسار التعلم
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {learningPath.map((level, index) => {
                const Icon = level.icon;
                return (
                  <motion.div
                    key={level.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-shadow text-center"
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${level.color} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                      {level.title}
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {level.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Benefits and Resources Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Benefits */}
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6 lg:p-8 border border-indigo-200 dark:border-indigo-800"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-5 flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                الفوائد المهنية
              </h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      className="flex items-center justify-center gap-3 text-neutral-700 dark:text-neutral-300"
                    >
                      <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                      <span>{benefit.text}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-xl p-6 lg:p-8 border border-emerald-200 dark:border-emerald-800"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-5 flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                المواد التعليمية
              </h3>
              <ul className="space-y-3">
                {resources.map((resource, index) => {
                  const Icon = resource.icon;
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      className="flex items-center justify-center gap-3 text-neutral-700 dark:text-neutral-300"
                    >
                      <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <span>{resource.text}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </div>

          {/* Key Features Summary */}
          <motion.div
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 lg:p-8 mb-8 shadow-md border border-neutral-200 dark:border-neutral-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">3</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">مستويات تعليمية</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">1000+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">سؤال تدريبي</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">24/7</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">وصول للمحتوى</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-1">100%</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">مواد تفاعلية</div>
              </div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Link href={ROUTES.CIA} className="inline-block">
              <Button
                size="lg"
                variant="default"
                className="px-8 py-4 text-lg"
              >
                <Sparkles className="w-5 h-5" />
                ابدأ رحلة التعلم الآن
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CIASpotlightSection;

