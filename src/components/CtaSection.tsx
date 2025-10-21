'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Users, Award } from 'lucide-react';

/**
 * Animated statistic card with icon, title, and subtitle. Features hover scale effect and entrance animation.
 */
interface StatCardProps {
  stat: {
    icon: React.ComponentType;
    title: string;
    subtitle: string;
    delay: number;
  };
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => (
  <motion.div
    className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay: stat.delay }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
  >
    <stat.icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-4 drop-shadow-sm" />
    <motion.div
      className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2"
      whileHover={{ scale: 1.05 }}
    >
      {stat.title}
    </motion.div>
    <div className="text-base sm:text-lg text-gray-600 font-medium">{stat.subtitle}</div>
  </motion.div>
);

/**
 * Call-to-action section encouraging user registration and course browsing. Features platform statistics, animated stat cards, and dual CTA buttons with gradient styling.
 */
const CtaSection = () => {
  // Platform statistics displayed in animated cards
  const stats = [
    { icon: Users, title: '50,000+', subtitle: 'طالب نشط', delay: 0.3 },
    { icon: Award, title: '150+', subtitle: 'دورة تعليمية', delay: 0.4 },
    { icon: Play, title: '24/7', subtitle: 'دعم فني', delay: 0.5 },
  ];

  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,197,253,0.1),transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(196,181,253,0.05),transparent_60%)] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title and description */}
        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">
            ابدأ{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-sm">
              رحلتك التعليمية
            </span>{' '}
            اليوم
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
            انضم إلى آلاف المتعلمين وطور مهاراتك في المراجعة الداخلية والمحاسبة مع منصة خطى التعليمية المتطورة
          </p>
        </motion.div>

        {/* Animated statistics cards with hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-14 mb-16 sm:mb-20 lg:mb-24 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </div>

        {/* Primary and secondary call-to-action buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 hover:shadow-xl focus:ring-4 focus:ring-blue-500/50"
              aria-label="سجل الآن مجاناً وابدأ رحلتك التعليمية"
            >
              <span>سجل الآن مجاناً</span>
              <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/courses"
              className="group inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-300 px-10 py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 hover:shadow-xl focus:ring-4 focus:ring-gray-300/50"
              aria-label="تصفح الدورات المتاحة"
            >
              <Play className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span>تصفح الدورات</span>
            </Link>
          </motion.div>
        </div>

        {/* Free trial offer message */}
        <motion.div
          className="mt-16 sm:mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            لا تفوت الفرصة! انضم إلينا اليوم واحصل على إمكانية الوصول الكامل لمدة{' '}
            <span className="text-blue-600 font-semibold">30 يوم مجاناً</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
