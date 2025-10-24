'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Shield, User } from 'lucide-react';

/**
 * Feature card component with animated icon, title, and description. Features gradient background and hover effects.
 */
const FeatureCard: React.FC<{ feature: { icon: React.ReactNode; title: string; description: string; gradient: string; accentColor: string }; index: number; getIconBg: (color: string) => string }> = ({ feature, index, getIconBg }) => {
  return (
    <div
      className={`feature-card bg-gradient-to-br ${feature.gradient} animate-fadeIn`}
    >
      <div className={`feature-icon-wrapper bg-gradient-to-br ${getIconBg(feature.accentColor)}`}>
        {feature.icon}
      </div>
      <h3 className="feature-title">
        {feature.title}
      </h3>
      <p className="feature-description">
        {feature.description}
      </p>
    </div>
  );
};

/**
 * Features showcase component highlighting platform capabilities. Displays three main features with icons, descriptions, and gradient styling. Includes call-to-action section for course browsing.
 */
const FeaturesComponent = () => {
  // Platform feature highlights with icons and gradient styling
  const features = [
    {
      icon: <FileText className="w-12 h-12 text-blue-600" />,
      title: 'وصول آمن إلى ملفات متنوعة',
      description:
        'شجرة محتوى منظمة تضم فيديوهات، صوتيات، ومستندات تعليمية بصيغ Word وExcel وPDF وPowerPoint.',
      gradient: 'from-blue-50 via-blue-100 to-blue-200',
      accentColor: 'blue'
    },
    {
      icon: <User className="w-12 h-12 text-emerald-600" />,
      title: 'حساب شخصي ونسخ قابلة للتعديل',
      description:
        'تمكنك من حفظ نسخ خاصة وتعديلها بسهولة مع تتبع التغييرات لحماية بياناتك.',
      gradient: 'from-emerald-50 via-emerald-100 to-emerald-200',
      accentColor: 'emerald'
    },
    {
      icon: <Shield className="w-12 h-12 text-amber-600" />,
      title: 'حماية كاملة من النسخ والتحميل',
      description:
        'طبقات حماية تمنع النسخ أو التنزيل دون صلاحيات للحفاظ على حقوق المحتوى.',
      gradient: 'from-amber-50 via-amber-100 to-amber-200',
      accentColor: 'amber'
    },
  ];

  /**
   * Returns gradient classes for icon background based on color identifier
   */
  const getIconBg = (color: string) => {
    const gradients = {
      blue: 'from-blue-100 to-blue-200',
      emerald: 'from-emerald-100 to-emerald-200',
      amber: 'from-amber-100 to-amber-200'
    };
    return gradients[color as keyof typeof gradients] || gradients.blue;
  };

  return (
    <section className="spacing-section-lg bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* العنوان */}
        <div
          className="text-center spacing-element-xl animate-fadeIn"
        >
          <h2 className="text-5xl font-bold text-contrast-primary mb-6">
            لماذا تختار <span className="accent-contrast-primary">خطى التعليمية؟</span>
          </h2>
          <p className="text-lg text-contrast-secondary max-w-3xl mx-auto leading-relaxed">
            نمنحك تجربة تعليمية مميزة تجمع بين التقنية الحديثة والمحتوى المتخصص في المحاسبة والمراجعة.
          </p>
        </div>

        {/* الكروت */}
        <div className="cards-grid-3 spacing-grid-spacious">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} getIconBg={getIconBg} />
          ))}
        </div>

        {/* Call-to-action section encouraging users to browse courses */}
        <div
          className="text-center spacing-element-xl animate-fadeIn"
        >
          <div className="card-modern-spacious bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 border-white/30">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ابدأ رحلتك التعليمية الآن</h3>
            <p className="text-lg text-contrast-secondary mb-8">
              انضم إلى آلاف المتعلمين الذين طوروا مهاراتهم مع منصة خطى التعليمية
            </p>
            <Link href="/courses">
              <button
                className="btn-contrast-secondary text-lg px-10 py-4 inline-block cursor-pointer transition-smooth active:scale-95"
              >
                تصفح الدورات
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesComponent;
