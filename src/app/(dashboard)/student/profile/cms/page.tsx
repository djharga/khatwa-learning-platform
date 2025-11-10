import { motion } from 'framer-motion';
import CMSComponent from '@/components/CMSComponent';

export default function CMSPage() {
  // في التطبيق الحقيقي، تحقق من صلاحيات المستخدم هنا
  // const user = getCurrentUser();
  // if (!user.hasCMSAccess) {
  //   return <AccessDenied />;
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <CMSComponent />
        </motion.div>
      </div>
    </div>
  );
}
