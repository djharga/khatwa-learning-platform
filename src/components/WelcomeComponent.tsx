'use client';

import { motion } from 'framer-motion';

const WelcomeComponent = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center bg-gradient-to-br from-blue-50/70 via-purple-50/50 to-white px-6 py-24 pt-32 transition-all duration-500 relative overflow-hidden"
      aria-labelledby="welcome-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none"></div>
      <motion.h1
        id="welcome-heading"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative text-5xl md:text-6xl lg:text-7xl font-bold mb-12 text-center leading-tight"
      >
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          <span aria-hidden="true" className="text-6xl">
            🎓
          </span>{' '}
          منصة خطى التعليمية
        </span>
        <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-slate-600 font-medium">
          Khatwa Platform
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative max-w-5xl text-center space-y-8 bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/50"
      >
        <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
          منصة خطى هي بيئة تعليمية متكاملة مخصصة للمراجعة الداخلية والمحاسبة،
          تهدف لتقديم تجربة تعليمية متطورة وشاملة للمدققين، المحاسبين، والمهنيين
          في الوطن العربي.
        </p>
        <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-medium">
          نؤمن بأن التعليم في مجالي التدقيق والمحاسبة هو حق للجميع، ونسعى لجعله
          أكثر سلاسة وفعالية من خلال حلول تقنية مبتكرة تدمج الأساليب التعليمية
          الحديثة مع أدوات الذكاء الاصطناعي.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="max-w-4xl mt-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-8 leading-tight">
          رؤيتنا
        </h2>
        <p className="text-lg md:text-xl text-neutral leading-relaxed tracking-normal">
          أن نكون المنصة التعليمية الرائدة في الوطن العربي لمجالات المراجعة
          الداخلية والمحاسبة، حيث نربط بين المدققين الداخليين، المحاسبين،
          والمعلمين عبر أحدث الأدوات والموارد التعليمية المتخصصة.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="max-w-4xl mt-16 bg-white rounded-2xl shadow-xl p-10 border border-gray-100 transition-all duration-300"
        role="region"
        aria-labelledby="content-heading"
      >
        <h2
          id="content-heading"
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-8 text-center leading-tight"
        >
          محتوى تعليمي متكامل
        </h2>
        <ul
          className="list-disc list-inside text-right text-neutral leading-relaxed tracking-normal space-y-3"
          role="list"
        >
          <li>دورات متخصصة في المراجعة الداخلية والمحاسبة</li>
          <li>محتوى معتمد من معهد المدققين الداخليين والهيئات المحاسبية</li>
          <li>تمارين عملية ومحاكاة واقعية لعمليات المراجعة والتدقيق المالي</li>
          <li>بنك أسئلة شامل مرتبط بالاختبارات المهنية في هذا المجال</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="max-w-6xl mt-20"
        role="region"
        aria-labelledby="services-heading"
      >
        <h2
          id="services-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-16 text-center leading-tight"
        >
          خدماتنا
        </h2>
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          role="list"
        >
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center border border-gray-100 transition-all duration-300"
            role="listitem"
          >
            <div className="text-5xl mb-6" aria-hidden="true">
              📚
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6 leading-tight">
              محتوى تعليمي متكامل
            </h3>
            <ul
              className="list-disc list-inside text-right text-neutral space-y-2 leading-relaxed"
              role="list"
            >
              <li>دورات متخصصة</li>
              <li>محتوى معتمد</li>
              <li>تمارين عملية</li>
              <li>بنك أسئلة</li>
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center border border-gray-100 transition-all duration-300"
            role="listitem"
          >
            <div className="text-5xl mb-6" aria-hidden="true">
              🎓
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6 leading-tight">
              خدمات للطلاب
            </h3>
            <ul
              className="list-disc list-inside text-right text-neutral space-y-2 leading-relaxed"
              role="list"
            >
              <li>تسجيل مجاني</li>
              <li>شهادات معتمدة</li>
              <li>دعم فني 24/7</li>
              <li>منتديات نقاش</li>
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center border border-gray-100 transition-all duration-300"
            role="listitem"
          >
            <div className="text-5xl mb-6" aria-hidden="true">
              👨‍🏫
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6 leading-tight">
              خدمات للمعلمين
            </h3>
            <ul
              className="list-disc list-inside text-right text-neutral space-y-2 leading-relaxed"
              role="list"
            >
              <li>إنشاء دورات</li>
              <li>أدوات تدريس متقدمة</li>
              <li>تحليلات الأداء</li>
              <li>دعم مجتمعي</li>
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 text-center border border-gray-100 transition-all duration-300"
            role="listitem"
          >
            <div className="text-5xl mb-6" aria-hidden="true">
              🏢
            </div>
            <h3 className="text-xl lg:text-2xl font-bold text-primary mb-6 leading-tight">
              خدمات للمؤسسات
            </h3>
            <ul
              className="list-disc list-inside text-right text-neutral space-y-2 leading-relaxed"
              role="list"
            >
              <li>تدريب جماعي</li>
              <li>تقارير مخصصة</li>
              <li>حلول مؤسسية</li>
              <li>دعم فني مخصص</li>
            </ul>
          </motion.article>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.9, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 px-10 py-5 bg-primary text-accent rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 focus:ring-2 focus:ring-primary focus:ring-offset-2 active:scale-95"
        aria-label="ابدأ رحلتك التعليمية الآن"
      >
        ابدأ رحلتك التعليمية
      </motion.button>
    </motion.section>
  );
};

export default WelcomeComponent;
