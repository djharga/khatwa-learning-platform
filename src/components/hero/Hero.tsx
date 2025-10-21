'use client';

import React, { memo } from 'react';

type HeroVariant = 'home' | 'catalog';

interface HeroProps {
  readonly variant?: HeroVariant;
}

const Hero = ({ variant = 'home' }: HeroProps): React.ReactElement => {
  if (variant === 'catalog') {
    return <CatalogHero />;
  }
  return <HomeHero />;
};

const HomeHero = memo((): React.ReactElement => {
  return <div>Placeholder</div>;
});

HomeHero.displayName = 'HomeHero';

const CatalogHero = memo((): React.ReactElement => {
  return <div>Placeholder</div>;
});

CatalogHero.displayName = 'CatalogHero';

export default Hero;
