'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Target } from 'lucide-react';

interface LearningOutcomesProps {
  outcomes: string[];
}

export default function LearningOutcomes({ outcomes }: LearningOutcomesProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200/50 dark:border-neutral-700/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">ماذا ستتعلم</h2>
      </div>

      {/* Academic Design: Grid 2 columns, Checkmark 24px, #10B981, Background #F7F8FC, Padding space-6, Border-radius 14px */}
      <div className="grid md:grid-cols-2 gap-4 bg-[#F7F8FC] p-6 rounded-[14px]" dir="rtl">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <CheckCircle2 className="w-6 h-6 text-[#10B981] flex-shrink-0 mt-0.5" />
            <span className="text-base text-[#111827] leading-relaxed">{outcome}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

