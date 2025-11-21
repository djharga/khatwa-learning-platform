'use client';

import { motion } from 'framer-motion';
import { UserCheck, BookOpen } from 'lucide-react';

interface AudiencePrereqsProps {
  audience: string[];
  prerequisites?: string[];
}

export default function AudiencePrereqs({ audience, prerequisites }: AudiencePrereqsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Target Audience */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
            <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">لمَن هذا الكورس</h2>
        </div>

        <ul className="space-y-3">
          {audience.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Prerequisites */}
      {prerequisites && prerequisites.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl">
              <BookOpen className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">المتطلبات</h2>
          </div>

          <ul className="space-y-3">
            {prerequisites.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300 leading-relaxed">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.section>
      )}
    </div>
  );
}

