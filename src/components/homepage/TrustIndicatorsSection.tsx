'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Star, Award, Shield, Building } from 'lucide-react';
import { Container, Card } from '@/components/ui/primitives';
import { cn } from '@/lib/utils';

/**
 * Trust Indicators Section - مؤشرات الثقة
 * يعرض الإحصائيات والشهادات لبناء الثقة
 */

interface StatItem {
  icon: typeof Users;
  value: string;
  label: string;
  color: 'primary' | 'accent' | 'success';
}

interface Certification {
  name: string;
  logo?: string;
}

const TrustIndicatorsSection = () => {
  const stats: StatItem[] = [
    {
      icon: Users,
      value: '10,000+',
      label: 'طالب مسجل',
      color: 'primary',
    },
    {
      icon: BookOpen,
      value: '500+',
      label: 'دورة متاحة',
      color: 'accent',
    },
    {
      icon: Star,
      value: '4.9/5',
      label: 'تقييم المتعلمين',
      color: 'success',
    },
    {
      icon: Award,
      value: '95%',
      label: 'معدل النجاح',
      color: 'success',
    },
  ];

  const certifications: Certification[] = [
    { name: 'CIA', logo: '/certifications/cia-logo.svg' },
    { name: 'CMA', logo: '/certifications/cma-logo.svg' },
    { name: 'IIA', logo: '/certifications/iia-logo.svg' },
  ];

  const colorClasses = {
    primary: 'from-primary-500 to-primary-600 text-primary-600 dark:text-primary-400',
    accent: 'from-accent-500 to-accent-600 text-accent-600 dark:text-accent-400',
    success: 'from-success-500 to-success-600 text-success-600 dark:text-success-400',
  };

  return (
    <section className="relative py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <Container size="xl">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card variant="elevated" size="md" className="text-center">
                  <div className={cn(
                    "w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br flex items-center justify-center",
                    colorClasses[stat.color]
                  )}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 font-medium">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mb-16" />

        {/* Certifications */}
        <div className="text-center mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
            شهادات الاعتماد
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400">
            معتمد من أكبر المؤسسات المهنية العالمية
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center justify-center"
            >
              {cert.logo ? (
                <img
                  src={cert.logo}
                  alt={cert.name}
                  className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              ) : (
                <div className="px-6 py-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <span className="text-xl font-bold text-neutral-700 dark:text-neutral-300">
                    {cert.name}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustIndicatorsSection;

