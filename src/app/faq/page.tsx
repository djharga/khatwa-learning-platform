'use client';

import { motion } from 'framer-motion';
import FAQComponent from '@/components/FAQComponent';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background parallax-slow">
      <div className="grid-container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="heading-1 text-gradient-modern text-center mb-4">
            <span className="bg-gradient-to-r from-accent via-secondary-learn to-secondary-secure bg-clip-text text-transparent">
              الأسئلة الشائعة - منصة خطى
            </span>
          </h1>
          <p className="body-text text-text-secondary content-normal mx-auto">
            إجابات شاملة على جميع استفساراتك حول منصة خطى التعليمية
          </p>
        </motion.div>
        <FAQComponent />
      </div>
    </div>
  );
}
