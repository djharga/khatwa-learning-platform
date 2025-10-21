'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Shield, User } from 'lucide-react';

/**
 * Feature card component with animated icon, title, and description. Features gradient background and hover effects.
 */
const FeatureCard: React.FC<{ feature: { icon: React.ReactNode; title: string; description: string; gradient: string; accentColor: string }; index: number; getIconBg: (color: string) => string }> = ({ feature, index, getIconBg }) => {
  return (
    <motion.div
      className={`rounded-3xl shadow-lg bg-gradient-to-br ${feature.gradient} hover:shadow-xl transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="p-10 flex flex-col items-center text-center">
        <div className={`mb-6 flex items-center justify-center bg-gradient-to-br ${getIconBg(feature.accentColor)} rounded-full p-5 shadow-lg`}>
          {feature.icon}
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-3">
          {feature.title}
        </h3>
        <p className="text-base text-gray-700 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
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
    <section className="py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
        {/* العنوان */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            لماذا تختار <span className="text-blue-600">خطى التعليمية؟</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            نمنحك تجربة تعليمية مميزة تجمع بين التقنية الحديثة والمحتوى المتخصص في المحاسبة والمراجعة.
          </p>
        </motion.div>

        {/* الكروت */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} getIconBg={getIconBg} />
          ))}
        </div>

        {/* Call-to-action section encouraging users to browse courses */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 text-slate-800 rounded-3xl p-16 shadow-lg border border-white/30">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">ابدأ رحلتك التعليمية الآن</h3>
            <p className="text-lg mb-8 opacity-95">
              انضم إلى آلاف المتعلمين الذين طوروا مهاراتهم مع منصة خطى التعليمية
            </p>
            <Link href="/courses">
              <motion.button
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-4 rounded-2xl font-bold transition-colors duration-300 inline-block cursor-pointer"
                whileTap={{ scale: 0.96 }}
              >
                تصفح الدورات
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesComponent;
