'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Star, Award } from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Quick Stats Bar - شريط الإحصائيات السريع
 * يعرض إحصائيات رئيسية عن المنصة بشكل مدمج وغير مزعج
 */

interface Stat {
  icon: typeof Users;
  value: string;
  label: string;
  color: string;
}

const QuickStatsBar = () => {
  const stats: Stat[] = [
    {
      icon: Users,
      value: '15,420',
      label: 'طالب نشط',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: BookOpen,
      value: '15+',
      label: 'دورة متخصصة',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Star,
      value: '4.8',
      label: 'متوسط التقييم',
      color: 'from-amber-500 to-yellow-500',
    },
    {
      icon: Award,
      value: '95%',
      label: 'معدل الرضا',
      color: 'from-emerald-500 to-teal-500',
    },
  ];

  return (
    <section className="relative py-8 lg:py-12 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <Container size="xl" className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative"
              >
                <div className="relative h-full p-4 lg:p-6 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-md">
                  {/* Gradient Accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative flex flex-col items-center text-center space-y-2">
                    <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${stat.color} shadow-sm`}>
                      <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default QuickStatsBar;

