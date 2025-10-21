'use client';

import { motion } from 'framer-motion';
import ContactComponent from '@/components/ContactComponent';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background parallax-fast">
      <div className="grid-container py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="heading-1 text-gradient-modern text-center mb-4">
            <span className="bg-gradient-to-r from-accent via-secondary-learn to-secondary-secure bg-clip-text text-transparent">
              خدمة العملاء والاتصال
            </span>
          </h1>
          <p className="body-text text-text-secondary content-normal mx-auto">
            نحن هنا لمساعدتك في كل خطوة من رحلتك التعليمية
          </p>
        </motion.div>
        <ContactComponent />
      </div>
    </div>
  );
}
