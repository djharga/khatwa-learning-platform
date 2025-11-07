'use client';

import { motion } from 'framer-motion';
import ModernAdminPanel from '@/components/admin/ModernAdminPanel';

export default function AdminPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <ModernAdminPanel />
    </motion.div>
  );
}
