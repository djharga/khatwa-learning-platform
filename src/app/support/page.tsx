'use client';

import SupportComponent from '../../components/SupportComponent';
import PageBackground from '@/components/ui/PageBackground';
import HeroSection from '@/components/ui/HeroSection';
import { heroPresets, heroSectionSpacing } from '@/data/hero-presets';

const supportHeroPreset = heroPresets.support;

const SupportPage = () => {
  return (
    <PageBackground variant="support" pattern>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
        <HeroSection {...supportHeroPreset} />
      </div>

      <section
        id="support-center"
        className={`grid-container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 ${heroSectionSpacing}`}
      >
        <SupportComponent />
      </section>
    </PageBackground>
  );
};

export default SupportPage;
