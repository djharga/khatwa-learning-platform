'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  Rocket, 
  CheckCircle, 
  Infinity, 
  Award, 
  GraduationCap,
  UserPlus
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { Button } from '@/components/ui/Button';

/**
 * CTA Section - دعوة للعمل النهائية
 * تصميم احترافي بسيط بدون تأثيرات معقدة
 */

const CTASection = () => {
  const features = [
    {
      icon: Infinity,
      text: 'وصول غير محدود',
    },
    {
      icon: GraduationCap,
      text: 'شهادة معتمدة',
    },
    {
      icon: Award,
      text: 'دعم فني 24/7',
    },
  ];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/cta-section-background.jpg"
          alt="خلفية دعوة للعمل"
          fill
          className="object-cover"
          quality={80}
          sizes="100vw"
          priority={false}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/85 to-white/90 dark:from-neutral-900/90 dark:via-neutral-900/85 dark:to-neutral-900/90" />
      </div>
      
      <Container size="xl" className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-50 dark:bg-indigo-950/50 rounded-full border border-indigo-200 dark:border-indigo-800">
              <Rocket className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                انضم إلى آلاف المتعلمين الناجحين
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
              جاهز لبدء رحلتك التعليمية؟
            </h2>
            
            {/* Description */}
            <div className="space-y-3 mb-8">
              <p className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
                ابدأ الآن وتمتع بوصول غير محدود لجميع الدورات والموارد التعليمية
              </p>
              <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400">
                واحصل على شهادة معتمدة
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 px-5 py-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <span className="text-base font-semibold text-neutral-900 dark:text-white">
                    {feature.text}
                  </span>
                  <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
              );
            })}
          </div>

          {/* CTA Button - Single Button */}
          <div className="flex items-center justify-center mb-16">
            <Link href="/register">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:min-w-[320px] text-lg px-8 py-4 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="التسجيل للحصول على أحدث الدورات"
              >
                <UserPlus className="w-5 h-5" />
                <span>التسجيل للحصول على أحدث الدورات</span>
              </Button>
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default CTASection;

