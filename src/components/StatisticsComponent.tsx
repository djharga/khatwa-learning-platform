'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Animated statistic card with emoji icon, counter value, and description. Features gradient background and hover rotation effect.
 */
interface StatCardProps {
  stat: {
    label: string;
    value: number;
    icon: string;
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
      className="relative rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md bg-blue-50 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: stat.delay }}
      viewport={{ once: true }}
    >
      {/* الخلفية المتدرجة الناعمة */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 rounded-3xl`}
      />

      {/* الأيقونة */}
      <motion.div
        className={`w-12 h-12 sm:w-16 sm:h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 mx-auto shadow`}
        whileHover={{ rotate: 4 }}
        transition={{ duration: 0.3 }}
      >
        {stat.icon}
      </motion.div>

      {/* الرقم والعنوان */}
      <div className="text-center space-y-2 relative z-10">
        <motion.div
          className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${stat.textColor}`}
          key={count}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {count.toLocaleString()}
          <span className="text-lg sm:text-xl">{stat.suffix}</span>
        </motion.div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
          {stat.label}
        </h3>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {stat.description}
        </p>
      </div>
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
      icon: '👨‍🎓',
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
      icon: '📚',
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
      icon: '⭐',
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
      icon: '👨‍🏫',
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
    <section className="py-16 sm:py-20 lg:py-24 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* العنوان */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            منصة خطى في أرقام
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            إنجازاتنا وأرقامنا تتحدث عن جودة الخدمة التي نقدمها للمتعلمين والمدربين
          </p>
        </motion.div>

        {/* Grid of statistic cards with animated counters and hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} count={counts[index]} index={index} />
          ))}
        </div>

        {/* Community join call-to-action with action buttons */}
        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-100 relative">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              انضم إلى مجتمعنا المتنامي
            </h3>
            <p className="text-lg sm:text-xl text-gray-700 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              كن جزءاً من أكبر مجتمع تعليمي في المحاسبة والمراجعة الداخلية في الشرق الأوسط
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-700 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                whileTap={{ scale: 0.95 }}
              >
                ابدأ رحلتك التعليمية
              </motion.button>
              <motion.button
                className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:shadow-lg"
                whileTap={{ scale: 0.95 }}
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
