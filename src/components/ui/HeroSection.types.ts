/**
 * Type definitions for HeroSection component
 * 
 * This file exports all types and interfaces used by HeroSection
 * for better type safety and reusability.
 * 
 * NOTE: This component now supports both legacy and unified APIs
 * for backward compatibility.
 */

import { ReactNode } from 'react';

// Legacy variant types (for backward compatibility)
export type LegacyHeroVariant = 'primary' | 'secondary' | 'dark' | 'light' | 'gradient';
export type LegacyHeroSize = 'sm' | 'md' | 'lg' | 'xl';

// New unified variant types
export type UnifiedHeroVariant =
  | 'home'
  | 'dashboard'
  | 'courses'
  | 'reports'
  | 'community'
  | 'files'
  | 'support'
  | 'paths'
  | 'default';

// Combined variant type (supports both old and new)
export type HeroVariant = LegacyHeroVariant | UnifiedHeroVariant;
export type HeroSize = LegacyHeroSize;
export type UnifiedHeroLayout = 'centered' | 'split';

// Legacy CTA interface (for backward compatibility)
export interface HeroCTA {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: ReactNode;
}

// New action interface
export interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
}

// Legacy badge interface (for backward compatibility)
export interface HeroBadge {
  label: string;
  icon?: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning';
}

export interface HeroStat {
  label: string;
  value: string;
  helper?: string;
  icon?: ReactNode;
}

export interface HeroVisual {
  imageSrc?: string;
  imageAlt?: string;
  stats?: HeroStat[];
  custom?: ReactNode;
  badge?: string;
}

// Unified props interface supporting both old and new APIs
export interface HeroSectionProps {
  // Content (required)
  title: string;
  description?: string;
  subtitle?: string;
  eyebrow?: string;

  // Visual - New API
  variant?: HeroVariant;
  layout?: UnifiedHeroLayout;
  size?: HeroSize; // Legacy support

  // Background
  backgroundImage?: string;
  backgroundVideo?: string; // Legacy support
  backgroundGradient?: string; // Legacy support
  backgroundMode?: 'dark' | 'light';
  overlayOpacity?: number; // Legacy: 0-100, default 60

  // Actions - New API
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  actions?: HeroAction[];

  // Legacy CTA support (for backward compatibility)
  cta?: HeroCTA | HeroCTA[];

  // Legacy Badges support (for backward compatibility)
  badges?: HeroBadge[];

  // Stats and Visual
  stats?: HeroStat[];
  visual?: HeroVisual;

  // Customization
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;

  // Advanced Features
  particles?: boolean;
  patternIntensity?: 'soft' | 'bold';
  typingEffect?: boolean;
  typingSpeed?: number;
  typingDelay?: number;
  typingLoop?: boolean;
  typingLoopDelay?: number;

  // Animation
  enableAnimation?: boolean;
  animationDelay?: number;

  // Accessibility
  ariaLabel?: string;
  role?: string;

  // Performance (Legacy support)
  imagePriority?: boolean;
  imageQuality?: number;
  lazyLoad?: boolean;

  // Children
  children?: ReactNode;
}

// Re-export for convenience (backward compatibility)
export type { HeroSectionProps as UnifiedHeroSectionProps };
