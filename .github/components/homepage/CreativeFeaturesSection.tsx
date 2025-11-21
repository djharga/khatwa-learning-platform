'use client';

import Image from 'next/image';
import {
  BookOpen,
  Award,
  TrendingUp,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';

/**
 * Creative Features Section - تصميم إبداعي للمميزات
 * بدون animations
 */

interface Feature {
  icon: typeof BookOpen;
  title: string;
  description: string;
  gradient: string;
  position: 'left' | 'right' | 'center';
}

const CreativeFeaturesSection = () => {
  const features: Feature[] = [
    {
      icon: BookOpen,
      title: 'دورات تفاعلية',
      description: 'محتوى متطور يدمج التكنولوجيا الحديثة مع الخبرة العملية لتحقيق أفضل النتائج التعليمية',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      position: 'left',
    },
    {
      icon: Award,
      title: 'شهادات معتمدة',
      description: 'احصل على شهادات عالمية معترف بها في جميع أنحاء العالم تعزز مسيرتك المهنية',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      position: 'right',
    },
    {
      icon: TrendingUp,
      title: 'تتبع التقدم',
      description: 'تحليلات متقدمة لمتابعة تقدمك بشكل دقيق وتحسين تجربتك التعليمية',
      gradient: 'from-emerald-500 via-green-500 to-lime-500',
      position: 'left',
    },
    {
      icon: MessageCircle,
      title: 'دعم فني',
      description: 'فريق دعم متاح 24/7 لتقديم المساعدة الفورية والإجابة على جميع استفساراتك',
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      position: 'right',
    },
  ];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Background Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Team Collaboration Image */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5 dark:opacity-3">
          <Image
            src="/assets/team-collaboration.jpg"
            alt="تعاون الفريق"
            fill
            className="object-cover rounded-full"
            quality={40}
            sizes="600px"
          />
        </div>
        {/* Project Management Image */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] opacity-5 dark:opacity-3">
          <Image
            src="/assets/project-management.jpg"
            alt="إدارة المشاريع"
            fill
            className="object-cover rounded-full"
            quality={40}
            sizes="600px"
          />
        </div>
        {/* Gradient Overlays */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-indigo-100/12 to-transparent dark:from-indigo-900/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-100/12 to-transparent dark:from-indigo-900/8 rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-full border border-indigo-200/50 dark:border-indigo-700/50">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
              لماذا نحن مختلفون
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight heading-tech display-tech text-shadow-sm">
            تجربة تعليمية
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent text-shadow-primary">
              ثورية
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            نعيد تعريف التعليم الرقمي من خلال الابتكار والتكنولوجيا المتقدمة
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 lg:p-8 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 hover:shadow-elevation-4 hover-glow-primary-sm transition-all duration-300 card-tech shadow-elevation-2"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="relative">
                    {/* Static Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-30`} />
                    
                    {/* Icon Container */}
                    <div className={`relative w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <Icon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl lg:text-2xl font-bold text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CreativeFeaturesSection;
