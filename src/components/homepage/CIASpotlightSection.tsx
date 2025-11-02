'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Crown, BookOpen, FileText, Target, Video, Headphones, FileSpreadsheet, ChevronRight, Award, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { Button } from '@/components/ui/Button';

/**
 * CIA Spotlight Section - تسليط الضوء على زمالة CIA
 * قسم بارز لعرض برنامج زمالة المراجعين الداخليين CIA
 */

const CIASpotlightSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: '3 مستويات تعليمية',
      description: 'برنامج متكامل عبر ثلاثة مستويات',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Target,
      title: 'بنك أسئلة شامل',
      description: 'آلاف الأسئلة التدريبية المحلولة',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: FileText,
      title: 'ملفات متعددة',
      description: 'Word, Excel, Video, Podcast',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: Award,
      title: 'شهادة معتمدة',
      description: 'اعتماد دولي معترف به',
      color: 'from-amber-500 to-orange-500',
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
        
        {/* Overlay Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <Container size="xl" className="relative z-10">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Header */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2">
                    زمالة المدقق الداخلي (CIA)
                  </h2>
                  <p className="text-xl text-white/90 font-medium">
                    برنامج متخصص شامل للمراجعة الداخلية
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group"
                  >
                    <div className="relative h-full p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                      {/* Icon */}
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-lg font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-white/80">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Description */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
                برنامج متكامل يعتمد على أحدث معايير المراجعة الداخلية مع محاور تعليمية مفصلة، 
                مواد تفاعلية متنوعة، وبنك أسئلة شامل لتحضيرك للحصول على شهادة CIA العالمية
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/cia">
                <Button
                  size="lg"
                  className="px-10 py-6 text-lg font-bold bg-white text-indigo-700 hover:bg-white/90 shadow-2xl hover:shadow-white/50 transition-all duration-300 inline-flex items-center gap-3"
                >
                  <Sparkles className="w-6 h-6" />
                  ابدأ رحلة الزمالة
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CIASpotlightSection;

