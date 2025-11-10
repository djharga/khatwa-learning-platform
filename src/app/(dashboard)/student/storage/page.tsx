'use client';

import { motion } from 'framer-motion';
import PersonalStorage from '@/components/trainee/PersonalStorage';
import { useAuth } from '@/contexts/AuthContext';
import { HardDrive, Cloud, Database } from 'lucide-react';

export default function StoragePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <HardDrive className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              المساحة الشخصية
            </h1>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            إدارة ملفاتك الشخصية والنسخ من الدورات (5 GB)
          </p>
        </motion.div>

        {/* Storage Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
        >
          <PersonalStorage userId={user?.id} />
        </motion.div>
      </div>
    </div>
  );
}

