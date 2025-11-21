'use client';

import { motion } from 'framer-motion';
import ConsultingComponent from '../../components/ConsultingComponent';
import PageBackground from '@/components/ui/PageBackground';
import HeroSection from '@/components/ui/HeroSection';

const ConsultingPage = () => {
  return (
    <PageBackground variant="home">
      <HeroSection
        title="استشارات فردية (1:1 Consulting)"
        description="احصل على استشارة شخصية مع خبراء في المراجعة الداخلية والمحاسبة لتطوير مهاراتك وتحقيق أهدافك المهنية."
        variant="primary"
        size="sm"
        className="mx-0 my-0 rounded-none mb-12"
        contentClassName="py-8"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ConsultingComponent />
      </div>
    </PageBackground>
  );
};

export default ConsultingPage;
