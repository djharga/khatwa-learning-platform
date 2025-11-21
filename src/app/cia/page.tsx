'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Award,
  Target,
  CheckCircle2,
  FileText,
  Brain,
  MonitorPlay,
  ChevronDown,
  ArrowRight,
  Users,
  Clock,
  Shield,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// --- Data Definitions ---

const courseParts = [
  {
    id: 1,
    title: "الجزء الأول: أساسيات التدقيق الداخلي",
    summary: "يركز على المفاهيم الأساسية، الحوكمة، وإدارة المخاطر.",
    questionCount: "750+ سؤال",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
    details: [
      "أسس التدقيق الداخلي",
      "الاستقلالية والموضوعية",
      "الكفاءة والعناية المهنية اللازمة",
      "برنامج ضمان وتحسين الجودة",
      "الحوكمة وإدارة المخاطر والرقابة",
      "مخاطر الاحتيال"
    ]
  },
  {
    id: 2,
    title: "الجزء الثاني: ممارسة التدقيق الداخلي",
    summary: "يغطي العمليات التشغيلية، التخطيط، وتنفيذ مهام التدقيق.",
    questionCount: "850+ سؤال",
    icon: Target,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    details: [
      "إدارة نشاط التدقيق الداخلي",
      "التخطيط للمهمة",
      "تنفيذ المهمة",
      "الإبلاغ عن نتائج المهمة ومراقبة التقدم"
    ]
  },
  {
    id: 3,
    title: "الجزء الثالث: المعرفة التجارية للتدقيق",
    summary: "يتناول الفطنة التجارية، أمن المعلومات، والمالية.",
    questionCount: "950+ سؤال",
    icon: Award,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
    details: [
      "الفطنة التجارية",
      "أمن المعلومات",
      "تكنولوجيا المعلومات",
      "الإدارة المالية"
    ]
  }
];

const features = [
  {
    title: "بنك أسئلة شامل",
    description: "أكثر من 2500 سؤال تدريبي يحاكي الاختبار الحقيقي مع تفسيرات مفصلة للإجابات.",
    icon: CheckCircle2,
    className: "md:col-span-2",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "خرائط ذهنية",
    description: "ملخصات بصرية ذكية لتبسيط المفاهيم المعقدة وسرعة الاسترجاع.",
    icon: Brain,
    className: "md:col-span-1",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "محاكاة للامتحان",
    description: "نظام اختبارات يحاكي بيئة الامتحان الفعلي من حيث الوقت والضغط.",
    icon: MonitorPlay,
    className: "md:col-span-1",
    gradient: "from-orange-500 to-red-500"
  },
  {
    title: "مواد دراسية محدثة",
    description: "محتوى متوافق مع أحدث معايير IIA وتحديثات المنهج لعام 2025.",
    icon: FileText,
    className: "md:col-span-2",
    gradient: "from-emerald-500 to-teal-500"
  }
];

const syllabus = [
  {
    title: "الوحدة الأولى: الإطار المهني الدولي (IPPF)",
    duration: "10 ساعات",
    lessons: 5,
    content: "شرح تفصيلي للمعايير الدولية، ميثاق الأخلاقيات، والتعريفات الأساسية."
  },
  {
    title: "الوحدة الثانية: الحوكمة وإدارة المخاطر",
    duration: "12 ساعة",
    lessons: 6,
    content: "مفاهيم الحوكمة المؤسسية، أطر إدارة المخاطر (COSO)، ودور التدقيق الداخلي."
  },
  {
    title: "الوحدة الثالثة: أدوات وتقنيات التدقيق",
    duration: "15 ساعة",
    lessons: 8,
    content: "أخذ العينات، التحليل المالي، واستخدام التكنولوجيا في التدقيق."
  },
  {
    title: "الوحدة الرابعة: الاحتيال والرقابة",
    duration: "8 ساعات",
    lessons: 4,
    content: "مؤشرات الاحتيال، طرق الكشف عنه، وأنواع الضوابط الرقابية."
  }
];

const stats = [
  { icon: Users, value: "10,000+", label: "طالب مسجل" },
  { icon: Clock, value: "90%", label: "نسبة نجاح" },
  { icon: Shield, value: "2025", label: "منهج محدث" },
];

// --- Components ---

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Abstract Background Shapes */}
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 blur-3xl" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <Image src="/assets/certifed.jpg" alt="Certified" width={500} height={300} className="rounded-lg shadow-lg" />
          </div>
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-right"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              شهادة معتمدة دولياً
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              المراجع الداخلي المعتمد (CIA) <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                بوابتك للعالمية
              </span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              احصل على الشهادة الأكثر تقديراً في مجال التدقيق الداخلي. منهج شامل، أدوات تفاعلية، ودعم مستمر لضمان نجاحك من المحاولة الأولى.
            </p>
            <div className="flex flex-wrap gap-4 justify-end">
              <Link
                href="/question-bank"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg flex items-center gap-2"
              >
                تصفح بنك الأسئلة
                <HelpCircle className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white hover:bg-slate-100 text-blue-600 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center gap-2 border border-slate-200 dark:bg-slate-800 dark:text-blue-400 dark:border-slate-700"
              >
                تواصل معنا
                <ArrowRight className="w-5 h-5 rotate-180" />
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-end gap-x-8 gap-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <stat.icon className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <span className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CourseStructure = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            هيكل الشهادة
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            تنقسم شهادة CIA إلى ثلاثة أجزاء أساسية، تم تصميم منهجنا ليغطي كل جزء بعمق وشمولية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courseParts.map((part, idx) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6", part.bg, part.color)}>
                <part.icon className="w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {part.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                {part.summary}
              </p>

              <div className="space-y-3 mb-8">
                {part.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {detail}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  {part.questionCount}
                </span>
                <button className="text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                  التفاصيل
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            لماذا تختار منصتنا؟
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            نوفر لك أحدث الأدوات والتقنيات التعليمية لضمان تجربة تعلم فريدة وفعالة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "relative overflow-hidden rounded-3xl p-8 group",
                "bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800",
                feature.className
              )}
            >
              <div className={cn(
                "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 rounded-bl-full transition-transform group-hover:scale-110",
                feature.gradient
              )} />

              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white bg-gradient-to-br shadow-lg",
                feature.gradient
              )}>
                <feature.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveSyllabus = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
              المنهج الدراسي التفاعلي
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg leading-relaxed">
              تم تصميم المنهج الدراسي بعناية فائقة ليغطي كافة جوانب الشهادة، مع تقسيم ذكي للوحدات يسهل عملية التعلم والمراجعة.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">هل تعلم؟</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                يتم تحديث هذا المنهج بشكل دوري ليتوافق مع أحدث إصدارات معهد المدققين الداخليين (IIA).
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {syllabus.map((item, idx) => (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-right hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <span className="font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-slate-400 transition-transform duration-300",
                      openIndex === idx && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 border-t border-slate-200 dark:border-slate-800">
                        <div className="flex gap-4 mb-4 text-sm text-slate-500 dark:text-slate-400 mt-4">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {item.lessons} دروس
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300">
                          {item.content}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function CIAFellowshipPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <HeroSection />
      {/* Images Section */}
      <section className="py-12 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">


        </div>
      </section>
      <CourseStructure />
      <FeaturesSection />
      <InteractiveSyllabus />


    </main>
  );
}
