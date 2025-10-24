'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Play, Users, Award } from 'lucide-react';

const CtaSection = () => {
  return (
    <section className="relative py-20 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fadeIn"
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
        </div>

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

        <div
          className="mt-16 sm:mt-20 text-center animate-fadeIn"
        >
          <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            لا تفوت الفرصة! انضم إلينا اليوم واحصل على إمكانية الوصول الكامل لمدة{' '}
            <span className="text-blue-600 font-semibold">30 يوم مجاناً</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
