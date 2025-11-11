'use client';

import { Container } from '@/components/ui/primitives';
import KhatwaInfoCard from './KhatwaInfoCard';

/**
 * Introduction Section - قسم التعريف بالمنصة
 * يعرض التعريف الأساسي بمنصة خطى باستخدام بطاقة جميلة
 */

const IntroductionSection = () => {
  return (
    <section className="relative py-8 lg:py-10 overflow-hidden">
      <Container size="xl" className="relative z-10">
        <KhatwaInfoCard />
      </Container>
    </section>
  );
};

export default IntroductionSection;

