'use client';

import { motion } from 'framer-motion';
import SupportComponent from '../../components/SupportComponent';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-background parallax-slow">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(49,130,246,0.05),transparent_50%)] pointer-events-none animate-pulse-glow"></div>
      <div className="relative grid-container py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-element-xl"
        >
          <h1 className="heading-1 text-gradient-modern">
            <span className="bg-gradient-to-r from-accent via-secondary-learn to-secondary-secure bg-clip-text text-transparent">
              الدعم الفني ومركز المساعدة
            </span>
          </h1>
          <p className="body-text text-text-secondary content-wide mx-auto leading-relaxed">
            نحن هنا لمساعدتك في كل خطوة. ابحث عن الإجابات في قاعدة المعرفة أو
            تواصل معنا مباشرة.
          </p>
        </motion.div>

        <SupportComponent />
      </div>
    </div>
  );
};

export default SupportPage;
