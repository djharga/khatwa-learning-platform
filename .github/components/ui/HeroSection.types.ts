/**
 * Type definitions for HeroSection component
 * 
 * This file exports all types and interfaces used by HeroSection
 * for better type safety and reusability.
 */

import { ReactNode } from 'react';

export type HeroVariant = 'primary' | 'secondary' | 'dark' | 'light' | 'gradient';
export type HeroSize = 'sm' | 'md' | 'lg' | 'xl';

export interface HeroCTA {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: ReactNode;
}

export interface HeroBadge {
  label: string;
  icon?: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning';
}

export interface HeroStat {
  value: string | number;
  label: string;
  icon?: ReactNode;
}

export interface HeroSectionProps {
  // Content
  title: string;
  description?: string;
  subtitle?: string;
  
  // Visual
  variant?: HeroVariant;
  size?: HeroSize;
  backgroundImage?: string;
  backgroundVideo?: string;
  backgroundGradient?: string;
  overlayOpacity?: number; // 0-100, default 60
  
  // Elements
  badges?: HeroBadge[];
  stats?: HeroStat[];
  cta?: HeroCTA | HeroCTA[];
  children?: ReactNode;
  
  // Customization
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  
  // Animation
  enableAnimation?: boolean;
  animationDelay?: number;
  
  // Accessibility
  ariaLabel?: string;
  role?: string;
  
  // Performance
  imagePriority?: boolean;
  imageQuality?: number;
  lazyLoad?: boolean;
}

