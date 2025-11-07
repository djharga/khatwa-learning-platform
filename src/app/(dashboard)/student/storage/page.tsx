'use client';

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { motion } from 'framer-motion';
import PersonalStorage from '@/components/trainee/PersonalStorage';
import { useAuth } from '@/contexts/AuthContext';
import { HardDrive, Cloud, Database } from 'lucide-react';

export default function StoragePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              المساحة الشخصية
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة ملفاتك الشخصية والنسخ من الدورات (5 GB)
          </p>
        </motion.div>

        {/* Storage Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PersonalStorage userId={user?.id} />
        </motion.div>
      </div>
    </div>
  );
}

