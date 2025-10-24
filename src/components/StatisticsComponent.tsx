'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { GraduationCap, BookOpen, Star, Users } from 'lucide-react';

/**
 * Animated statistic card with emoji icon, counter value, and description. Features gradient background and hover rotation effect.
 */
interface StatCardProps {
  stat: {
    label: string;
    value: number;
    icon: React.ReactNode;
    suffix: string;
    description: string;
    color: string;
    bgColor: string;
    textColor: string;
    delay: number;
  };
  count: number;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ stat, count, index }) => {
  return (
    <motion.div
      className="stat-card group relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: stat.delay }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      {/* الخلفية المتدرجة الناعمة */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 rounded-3xl transition-opacity duration-300 group-hover:opacity-20`}
      />

      {/* تأثير الإضاءة عند التمرير */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full rounded-3xl"
        transition={{ duration: 0.8 }}
      />

      {/* الأيقونة */}
      <motion.div
        className={`stat-icon ${stat.bgColor} relative z-10 group-hover:shadow-lg`}
        whileHover={{ rotate: 8, scale: 1.1 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
      >
        {stat.icon}
      </motion.div>

      {/* الرقم والعنوان */}
      <div className="text-center relative z-10">
        <motion.div
          className={`stat-value ${stat.textColor} group-hover:scale-105 transition-transform duration-300`}
          key={count}
          initial={{ opacity: 0.7, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {count.toLocaleString('ar-SA')}
          <span className="text-lg sm:text-xl">{stat.suffix}</span>
        </motion.div>
        <h3 className="stat-label group-hover:text-blue-700 transition-colors duration-300">
          {stat.label}
        </h3>
        <p className="stat-description group-hover:text-gray-700 transition-colors duration-300">
          {stat.description}
        </p>
      </div>

      {/* مؤشر التفاعل */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500/30 rounded-full group-hover:bg-blue-500/60 group-hover:w-12 transition-all duration-300" />
    </motion.div>
  );
};

/**
 * Platform statistics section displaying key metrics with animated counters. Features student count, course count, satisfaction rate, and expert count. Includes community call-to-action section.
 */
const StatisticsComponent = () => {
  // Platform metrics with emoji icons and gradient styling
  const stats = [
    {
      label: 'الطلاب المسجلين',
      value: 50000,
      icon: <GraduationCap className="w-8 h-8" />,
      suffix: '+',
      description: 'طالب نشط في منصتنا',
      color: 'from-blue-100 to-blue-200',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      delay: 0,
    },
    {
      label: 'الدورات المتاحة',
      value: 150,
      icon: <BookOpen className="w-8 h-8" />,
      suffix: '+',
      description: 'دورة تدريبية متخصصة',
      color: 'from-blue-100 to-blue-200',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      delay: 0.2,
    },
    {
      label: 'رضا العملاء',
      value: 98,
      icon: <Star className="w-8 h-8" />,
      suffix: '%',
      description: 'معدل رضا المتعلمين',
      color: 'from-blue-100 to-blue-200',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      delay: 0.4,
    },
    {
      label: 'المدربين الخبراء',
      value: 50,
      icon: <Users className="w-8 h-8" />,
      suffix: '+',
      description: 'مدرب معتمد ومختص',
      color: 'from-blue-100 to-blue-200',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      delay: 0.6,
    },
  ];

  // State for animated counter values (currently static, could be animated)
  // TODO: Implement animated counter logic similar to HeroComponent's AnimatedCounter
  const [counts, setCounts] = useState(stats.map(stat => stat.value));

  return (
    <section className="spacing-section-base bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* العنوان */}
        <motion.div
          className="text-center spacing-element-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-contrast-primary mb-4 sm:mb-6">
            منصة خطى في أرقام
          </h2>
          <p className="text-lg sm:text-xl text-contrast-secondary max-w-3xl mx-auto leading-relaxed">
            إنجازاتنا وأرقامنا تتحدث عن جودة الخدمة التي نقدمها للمتعلمين والمدربين
          </p>
        </motion.div>

        {/* Grid of statistic cards with animated counters and hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} count={counts[index]} index={index} />
          ))}
        </div>

        {/* Community join call-to-action with action buttons */}
        <motion.div
          className="spacing-element-xl text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card-modern-spacious bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 border-blue-100">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-contrast-primary mb-4 sm:mb-6">
              انضم إلى مجتمعنا المتنامي
            </h3>
            <p className="text-lg sm:text-xl text-contrast-secondary mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              كن جزءاً من أكبر مجتمع تعليمي في المحاسبة والمراجعة الداخلية في الشرق الأوسط
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <motion.button
                className="btn-contrast-primary px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg w-full sm:w-auto max-w-xs sm:max-w-none"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                ابدأ رحلتك التعليمية
              </motion.button>
              <motion.button
                className="btn-contrast-secondary px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg w-full sm:w-auto max-w-xs sm:max-w-none"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
              >
                تواصل معنا
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsComponent;
