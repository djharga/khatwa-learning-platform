'use client';

import { motion } from 'framer-motion';
import ModernAdminPanel from '@/components/admin/ModernAdminPanel';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ModernAdminPanel />
      </motion.div>
    </div>
  );
}
