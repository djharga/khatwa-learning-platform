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

      <div className="grid md:grid-cols-2 gap-4">
        {outcomes.map((outcome, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{outcome}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

