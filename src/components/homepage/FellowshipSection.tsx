'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft,
  Globe,
  Sparkles
} from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { ROUTES } from '@/lib/routes';
import { motion } from 'framer-motion';

/**
 * Enhanced Fellowship Section - قسم الزمالة المحسّن
 * تصميم احترافي مدمج وحديث
 */
const FellowshipSection = () => {
  return (
    <section className="relative py-8 lg:py-10 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Compact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-indigo-950/30 dark:via-neutral-900 dark:to-purple-950/30 rounded-2xl p-6 lg:p-8 border border-indigo-200/50 dark:border-indigo-800/50 shadow-xl overflow-hidden"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* CIA Logo Section */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-lg opacity-50"></div>
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden bg-white shadow-lg border-2 border-indigo-200 dark:border-indigo-800 p-2">
                      <Image
                        src="/cia-logo.jpg"
                        alt="CIA Certified Internal Auditor Logo"
                        fill
                        className="object-contain rounded-full"
                        quality={90}
                        sizes="(max-width: 768px) 80px, 96px"
                      />
                    </div>
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                    </div>
                  </div>
                </motion.div>

                {/* Content Section */}
                <div className="flex-1 text-center lg:text-right space-y-4">
                  {/* Title */}
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white mb-2"
                    >
                      زمالة المدقق الداخلي المعتمد
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="text-sm lg:text-base text-indigo-600 dark:text-indigo-400 font-medium mb-3"
                    >
                      Certified Internal Auditor (CIA)
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="flex items-center justify-center lg:justify-start gap-2 text-xs lg:text-sm text-neutral-500 dark:text-neutral-400"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>معتمدة من معهد المراجعين الداخليين العالمي (IIA)</span>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-sm lg:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                  >
                    البرنامج الأكثر طلباً في مجال المراجعة الداخلية - شهادة معترف بها عالمياً تفتح أبواب الفرص المهنية. اكتشف التفاصيل الكاملة والفوائد والموارد التعليمية المتاحة.
                  </motion.p>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="pt-2"
                  >
                    <Link href={ROUTES.CIA}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white rounded-xl font-semibold text-sm lg:text-base shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 transition-all duration-300 relative overflow-hidden"
                      >
                        <span className="relative z-10">اكتشف برنامج الزمالة الكامل</span>
                        <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FellowshipSection;
