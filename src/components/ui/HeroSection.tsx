'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, MotionProps } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TypingHeading } from '@/components/ui/TypingText';
import type { ReactNode } from 'react';

const Particles = dynamic(
  () => import('@tsparticles/react').then((mod) => mod.Particles),
  { ssr: false, loading: () => null }
);

// ============================================================================
// TYPE DEFINITIONS - Unified Types Supporting Both Old and New APIs
// ============================================================================

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

// ============================================================================
// VARIANT MAPPING - Maps legacy variants to unified variants
// ============================================================================

const legacyVariantMap: Record<LegacyHeroVariant, UnifiedHeroVariant> = {
  primary: 'default',
  secondary: 'default',
  dark: 'default',
  light: 'default',
  gradient: 'default',
};

const variantTokens: Record<UnifiedHeroVariant, {
  gradient: string;
  accent: string;
  glow: string;
  textClass: string;
  badgeClass: string;
  particleColor: string;
}> = {
  home: {
    gradient: 'from-indigo-950 via-slate-950 to-slate-900',
    accent: 'text-sky-200',
    glow: 'bg-sky-500/10',
    textClass: 'text-white',
    badgeClass: 'bg-white/15 text-white',
    particleColor: '#7dd3fc',
  },
  dashboard: {
    gradient: 'from-[#0f172a] via-[#111827] to-[#0b1120]',
    accent: 'text-emerald-200',
    glow: 'bg-emerald-400/15',
    textClass: 'text-white',
    badgeClass: 'bg-emerald-400/15 text-emerald-50',
    particleColor: '#6ee7b7',
  },
  courses: {
    gradient: 'from-[#1e1b4b] via-[#111032] to-[#030617]',
    accent: 'text-violet-200',
    glow: 'bg-violet-500/15',
    textClass: 'text-white',
    badgeClass: 'bg-white/15 text-white',
    particleColor: '#c4b5fd',
  },
  reports: {
    gradient: 'from-[#0f172a] via-[#172554] to-[#020617]',
    accent: 'text-cyan-200',
    glow: 'bg-cyan-500/15',
    textClass: 'text-white',
    badgeClass: 'bg-cyan-500/15 text-cyan-50',
    particleColor: '#67e8f9',
  },
  community: {
    gradient: 'from-[#1f2937] via-[#111827] to-[#030712]',
    accent: 'text-amber-200',
    glow: 'bg-amber-400/20',
    textClass: 'text-white',
    badgeClass: 'bg-amber-400/15 text-amber-50',
    particleColor: '#fcd34d',
  },
  files: {
    gradient: 'from-[#0f172a] via-[#1e1e2c] to-[#020617]',
    accent: 'text-blue-200',
    glow: 'bg-blue-500/15',
    textClass: 'text-white',
    badgeClass: 'bg-white/15 text-white',
    particleColor: '#93c5fd',
  },
  support: {
    gradient: 'from-[#111827] via-[#0f172a] to-[#020617]',
    accent: 'text-rose-100',
    glow: 'bg-rose-400/20',
    textClass: 'text-white',
    badgeClass: 'bg-rose-400/15 text-rose-50',
    particleColor: '#fb7185',
  },
  paths: {
    gradient: 'from-[#0f172a] via-[#1e1b4b] to-[#020617]',
    accent: 'text-lime-200',
    glow: 'bg-lime-400/15',
    textClass: 'text-white',
    badgeClass: 'bg-lime-400/15 text-lime-50',
    particleColor: '#bef264',
  },
  default: {
    gradient: 'from-slate-900 via-slate-950 to-black',
    accent: 'text-slate-100',
    glow: 'bg-slate-500/20',
    textClass: 'text-white',
    badgeClass: 'bg-white/15 text-white',
    particleColor: '#e2e8f0',
  },
};

// Legacy variant styles (for backward compatibility with old HeroSection)
const legacyVariantStyles: Record<LegacyHeroVariant, {
  overlay: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
}> = {
  primary: {
    overlay: 'bg-black/60',
    textColor: 'text-white',
    badgeBg: 'bg-white/30 backdrop-blur-md',
    badgeText: 'text-white',
  },
  secondary: {
    overlay: 'bg-primary-900/60',
    textColor: 'text-white',
    badgeBg: 'bg-white/30 backdrop-blur-md',
    badgeText: 'text-white',
  },
  dark: {
    overlay: 'bg-black/70',
    textColor: 'text-white',
    badgeBg: 'bg-white/20 backdrop-blur-md',
    badgeText: 'text-white',
  },
  light: {
    overlay: 'bg-white/40',
    textColor: 'text-gray-900',
    badgeBg: 'bg-gray-900/10 backdrop-blur-md',
    badgeText: 'text-gray-900',
  },
  gradient: {
    overlay: 'bg-black/60',
    textColor: 'text-white',
    badgeBg: 'bg-white/30 backdrop-blur-md',
    badgeText: 'text-white',
  },
};

const layoutClasses: Record<UnifiedHeroLayout, string> = {
  centered: 'text-center items-center justify-center',
  split: 'grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 items-center',
};

const patternIntensityMap = {
  soft: 'opacity-[0.15]',
  bold: 'opacity-[0.3]',
};

const actionVariantMap: Record<'primary' | 'secondary' | 'ghost' | 'outline', 'default' | 'secondary' | 'ghost'> = {
  primary: 'default',
  secondary: 'secondary',
  ghost: 'ghost',
  outline: 'secondary', // Map outline to secondary
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function HeroSection({
  // Content
  title,
  description,
  subtitle,
  eyebrow,

  // Visual
  variant = 'default',
  layout = 'split',
  size,

  // Background
  backgroundImage,
  backgroundVideo,
  backgroundGradient,
  backgroundMode,
  overlayOpacity = 60,

  // Actions (New API)
  primaryAction,
  secondaryAction,
  actions,

  // Legacy CTA (for backward compatibility)
  cta,

  // Legacy Badges (for backward compatibility)
  badges,

  // Stats and Visual
  stats = [],
  visual,

  // Customization
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,

  // Advanced Features
  particles = true,
  patternIntensity = 'soft',
  typingEffect = false,
  typingSpeed = 80,
  typingDelay = 500,
  typingLoop = false,
  typingLoopDelay = 2000,

  // Animation
  enableAnimation = true,
  animationDelay = 0,

  // Accessibility
  ariaLabel,
  role = 'banner',

  // Performance
  imagePriority,
  imageQuality,
  lazyLoad,

  // Children
  children,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = enableAnimation && !prefersReducedMotion;
  const shouldUseParticles = particles && shouldAnimate;
  
  // Ensure component is always visible - use state to track mount
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine if using legacy variant
  const isLegacyVariant = ['primary', 'secondary', 'dark', 'light', 'gradient'].includes(variant);
  const unifiedVariant: UnifiedHeroVariant = isLegacyVariant
    ? legacyVariantMap[variant as LegacyHeroVariant]
    : (variant as UnifiedHeroVariant);

  // Determine background mode from legacy variant if not explicitly set
  const resolvedBackgroundMode = backgroundMode ?? (variant === 'light' ? 'light' : 'dark');

  const tokens = variantTokens[unifiedVariant] ?? variantTokens.default;
  const legacyStyle = isLegacyVariant ? legacyVariantStyles[variant as LegacyHeroVariant] : null;

  // Convert legacy CTA to new actions format
  const convertedActions = useMemo(() => {
    if (cta) {
      const ctaArray = Array.isArray(cta) ? cta : [cta];
      return ctaArray.map((ctaItem): HeroAction => ({
        label: ctaItem.label,
        href: ctaItem.href,
        onClick: ctaItem.onClick,
        icon: ctaItem.icon,
        variant: ctaItem.variant === 'outline' ? 'secondary' : (ctaItem.variant as 'primary' | 'secondary' | undefined) ?? 'primary',
      }));
    }
    return [];
  }, [cta]);

  // Merge all actions
  const mergedActions = useMemo(() => {
    const merged: HeroAction[] = [];
    if (primaryAction) merged.push({ ...primaryAction, variant: primaryAction.variant ?? 'primary' });
    if (secondaryAction) merged.push({ ...secondaryAction, variant: secondaryAction.variant ?? 'secondary' });
    if (actions?.length) merged.push(...actions);
    if (convertedActions.length) merged.push(...convertedActions);
    return merged;
  }, [actions, primaryAction, secondaryAction, convertedActions]);

  // Convert legacy badges to visual badge
  const convertedBadge = useMemo(() => {
    if (badges && badges.length > 0) {
      return badges[0].label; // Use first badge as visual badge
    }
    return visual?.badge;
  }, [badges, visual?.badge]);

  // Particles configuration
  const particlesOptions = useMemo(
    () => ({
      fpsLimit: 60,
      background: { color: { value: 'transparent' } },
      detectRetina: true,
      fullScreen: false,
      particles: {
        number: { value: 28, density: { enable: true, area: 700 } },
        color: { value: tokens.particleColor },
        opacity: { value: { min: 0.1, max: 0.4 } },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'top' as const,
          outModes: { default: 'out' as const },
        },
        links: {
          enable: true,
          distance: 120,
          opacity: 0.2,
          color: tokens.particleColor,
        },
      },
    }),
    [tokens.particleColor]
  );

  const MotionSection = motion.section;
  const MotionDiv = motion.div;

  // Animation variants
  const containerVariants: MotionProps['variants'] = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: MotionProps['variants'] = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.96,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Text colors based on background mode
  const textColor = resolvedBackgroundMode === 'light' ? 'text-neutral-900' : (legacyStyle?.textColor ?? tokens.textClass);
  const statValueColor = resolvedBackgroundMode === 'light' ? 'text-neutral-900' : 'text-white';
  const statLabelColor = resolvedBackgroundMode === 'light' ? 'text-neutral-600' : 'text-white/80';
  const statHelperColor = resolvedBackgroundMode === 'light' ? 'text-neutral-500' : 'text-white/60';

  // Determine if we should use legacy layout (centered, simple)
  const useLegacyLayout = isLegacyVariant && !layout;
  const resolvedLayout: UnifiedHeroLayout = layout ?? 'centered';

  // Legacy size support - adjust padding
  const sizePadding = size === 'sm' ? 'py-12 sm:py-16' :
    size === 'lg' ? 'py-20 sm:py-24 md:py-28 lg:py-32' :
    size === 'xl' ? 'py-24 sm:py-28 md:py-32 lg:py-40' :
    'py-16 sm:py-20 lg:py-28';
  
  return (
    <MotionSection
      role={role}
      aria-label={ariaLabel || title}
      variants={shouldAnimate && isMounted ? containerVariants : undefined}
      initial={shouldAnimate && isMounted ? 'hidden' : { opacity: 1, y: 0, scale: 1 }}
      animate={shouldAnimate && isMounted ? 'visible' : { opacity: 1, y: 0, scale: 1 }}
      className={cn(
        'relative overflow-hidden rounded-[2rem] px-6 sm:px-8 lg:px-12 shadow-2xl',
        sizePadding,
        resolvedBackgroundMode === 'light' ? 'bg-white' : !backgroundImage && !backgroundGradient ? `bg-gradient-to-br ${tokens.gradient}` : '',
        backgroundGradient && !backgroundImage ? backgroundGradient : '',
        className
      )}
      style={{ opacity: isMounted ? undefined : 1 }}
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Background Image */}
        {backgroundImage && (
          <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={backgroundImage}
            alt=""
            fill
              className="object-cover"
            sizes="100vw"
              priority={imagePriority ?? (unifiedVariant === 'home')}
              quality={imageQuality ?? 85}
            loading={lazyLoad ? 'lazy' : 'eager'}
            />
            {/* Legacy overlay support */}
            {isLegacyVariant && legacyStyle && (
              <div
                className={cn('absolute inset-0', legacyStyle.overlay)}
                style={{ opacity: overlayOpacity / 100 }}
            aria-hidden="true"
          />
            )}
          </div>
        )}

        {/* Background Video (Legacy support) */}
        {backgroundVideo && !backgroundImage && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        {/* Background Gradient (Legacy support) */}
        {backgroundGradient && !backgroundImage && !backgroundVideo && (
          <div className={cn('absolute inset-0', backgroundGradient)} aria-hidden="true" />
        )}

        {/* Gradient base */}
        {resolvedBackgroundMode === 'dark' && !backgroundImage && !backgroundGradient && (
          <div className={cn('absolute inset-0 bg-gradient-to-br', tokens.gradient)} aria-hidden="true" />
        )}

        {/* Legacy overlay for gradient/video */}
        {isLegacyVariant && legacyStyle && (backgroundGradient || backgroundVideo) && (
          <div
            className={cn('absolute inset-0', legacyStyle.overlay)}
            style={{ opacity: overlayOpacity / 100 }}
            aria-hidden="true"
          />
        )}

        {/* Pattern */}
        {!backgroundImage && (
          <div
            className={cn(
              'absolute inset-0 pointer-events-none',
              patternIntensityMap[patternIntensity],
              resolvedBackgroundMode === 'light' ? 'opacity-[0.08]' : ''
            )}
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.25) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
        )}

        {/* Accent glows */}
        {!backgroundImage && (
          <>
        <div
              className={cn('absolute -top-10 right-10 w-64 h-64 blur-3xl rounded-full', tokens.glow)}
          aria-hidden="true"
        />
        <div
              className={cn('absolute bottom-0 left-0 w-72 h-72 blur-[120px] rounded-full', tokens.glow)}
              aria-hidden="true"
            />
          </>
        )}

        {/* Particles */}
        {shouldUseParticles && (
          <div className="absolute inset-0">
            <Particles id={`hero-particles-${unifiedVariant}`} options={particlesOptions as any} />
          </div>
        )}

        {/* Overlay for readability */}
        {!backgroundImage && (
          <div
            className={cn(
              'absolute inset-0',
              resolvedBackgroundMode === 'light' ? 'bg-white/85' : 'bg-slate-950/25'
            )}
          aria-hidden="true"
        />
        )}
      </div>

      {/* Content */}
      <div className={cn('relative z-20', useLegacyLayout ? 'max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8' : layout === 'centered' ? 'mx-auto max-w-4xl' : 'max-w-7xl mx-auto', contentClassName)} style={{ opacity: isMounted ? undefined : 1 }}>
        <div className={cn(
          useLegacyLayout ? 'space-y-8' : 'flex flex-col gap-12',
          useLegacyLayout ? '' : (layout === 'centered' ? 'items-center text-center' : layoutClasses[resolvedLayout])
        )}>
          {/* Legacy badges support */}
          {useLegacyLayout && badges && badges.length > 0 && (
            <MotionDiv
              className="flex flex-wrap gap-2 sm:gap-2 md:gap-3 lg:gap-2 xl:gap-3 justify-center"
              variants={shouldAnimate ? itemVariants : undefined}
            >
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={cn(
                    'px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 backdrop-blur-md rounded-full text-xs sm:text-sm md:text-xs lg:text-sm font-medium transition-all duration-300 border drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] flex items-center gap-1.5 sm:gap-2',
                    badge.variant === 'accent' ? 'bg-primary-500/30 text-white border-primary-400/40' :
                    badge.variant === 'success' ? 'bg-green-500/30 text-white border-green-400/40' :
                    badge.variant === 'warning' ? 'bg-yellow-500/30 text-white border-yellow-400/40' :
                    legacyStyle?.badgeBg ?? tokens.badgeClass,
                    badge.variant ? '' : (legacyStyle?.badgeText ?? '')
                  )}
                >
                  {badge.icon && <span className="flex-shrink-0">{badge.icon}</span>}
                  {badge.label}
                </span>
              ))}
            </MotionDiv>
          )}

          <MotionDiv className={useLegacyLayout ? '' : 'space-y-6'} variants={shouldAnimate ? itemVariants : undefined}>
            {/* Eyebrow (New API) */}
            {!useLegacyLayout && eyebrow && (
              <motion.span
                initial={shouldAnimate ? { opacity: 0, y: -10, scale: 0.9 } : {}}
                animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={shouldAnimate ? {
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                } : {}}
                whileHover={shouldAnimate ? {
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 }
                } : undefined}
                className={cn(
                  'inline-flex items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-sm border transition-all duration-300',
                  resolvedBackgroundMode === 'light'
                    ? 'border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 hover:shadow-lg'
                    : tokens.badgeClass + ' border-white/20 hover:bg-white/20 hover:shadow-lg'
                )}
                dir="rtl"
              >
                {eyebrow}
              </motion.span>
            )}

            {/* Subtitle */}
            {subtitle && (
              <p
                className={cn(
                  useLegacyLayout ? 'text-sm sm:text-base md:text-lg lg:text-base xl:text-lg mb-4 text-center' : 'text-base sm:text-lg font-semibold',
                  backgroundImage ? 'text-white' : (useLegacyLayout ? legacyStyle?.textColor ?? tokens.accent : tokens.accent)
                )}
                dir="rtl"
              >
                {subtitle}
              </p>
            )}

            {/* Title */}
            {typingEffect && !useLegacyLayout ? (
              <TypingHeading
                text={title}
                speed={typingSpeed}
                delay={typingDelay}
                loop={typingLoop}
                loopDelay={typingLoopDelay}
                className={cn(
                  'font-extrabold leading-tight tracking-tight',
                  textColor,
                  useLegacyLayout ? 'text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.5rem]' :
                  (layout === 'centered'
                    ? 'text-3xl sm:text-4xl lg:text-5xl'
                    : 'text-3xl sm:text-4xl lg:text-[3.2rem]'),
                  titleClassName
                )}
                dir="rtl"
              />
            ) : (
              <h1
                className={cn(
                  'font-extrabold leading-tight tracking-tight',
                  textColor,
                  useLegacyLayout ? 'text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.5rem] text-center' :
                  (layout === 'centered'
                    ? 'text-3xl sm:text-4xl lg:text-5xl'
                    : 'text-3xl sm:text-4xl lg:text-[3.2rem]'),
                  titleClassName
                )}
              dir="rtl"
            >
              {title}
            </h1>
            )}

          {/* Description */}
          {description && (
              <p
                className={cn(
                  useLegacyLayout ? 'text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl leading-relaxed max-w-3xl mx-auto text-center' : 'text-base sm:text-lg lg:text-xl leading-relaxed',
                  useLegacyLayout ? (legacyStyle?.textColor ?? 'text-white/90') : (resolvedBackgroundMode === 'light' ? 'text-neutral-600' : 'text-white/90'),
                  descriptionClassName
                )}
                dir="rtl"
              >
                {description}
              </p>
            )}

            {/* Actions */}
            {mergedActions.length > 0 && (
              <div
                className={cn(
                  'mt-8 flex flex-wrap items-center gap-4',
                  useLegacyLayout ? 'justify-center' : (layout === 'centered' ? 'justify-center' : 'justify-start')
                )}
              >
                {mergedActions.map((action, index) => {
                  const ActionComponent = action.href ? motion.a : motion.button;
                  const buttonClass = cn(
                    buttonVariants({
                      variant: actionVariantMap[action.variant ?? 'primary'],
                      size: 'lg',
                    }),
                    'min-w-[180px] shadow-lg transition-shadow duration-300',
                    action.variant === 'ghost' && 'bg-white/10 text-white border-white/30'
                  );
                  const baseProps = action.href ? { href: action.href } : { type: 'button' as const };

                  return (
                    <ActionComponent
                      key={`${action.label}-${index}`}
                      {...baseProps}
                      onClick={action.onClick}
                      className={buttonClass}
                      aria-label={action.label}
                      whileHover={shouldAnimate ? {
                        y: -4,
                        scale: 1.02,
                        transition: {
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }
                      } : undefined}
                      whileTap={shouldAnimate ? {
                        scale: 0.96,
                        y: -1,
                        transition: { duration: 0.1 }
                      } : undefined}
                      initial={shouldAnimate ? {
                        opacity: 0,
                        y: 10,
                        scale: 0.95,
                      } : undefined}
                      animate={shouldAnimate ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          delay: animationDelay + 0.3 + (index * 0.1),
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }
                      } : undefined}
                      dir="rtl"
                    >
                      {action.icon && (
                        <motion.span
                          className="pl-1"
                          animate={shouldAnimate ? {
                            x: [0, 4, 0],
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                          } : undefined}
                        >
                          {action.icon}
                        </motion.span>
                      )}
                      <span>{action.label}</span>
                    </ActionComponent>
                  );
                })}
              </div>
            )}

            {/* Legacy CTA buttons (if not converted) */}
            {useLegacyLayout && cta && mergedActions.length === 0 && (
            <MotionDiv
              className="flex flex-wrap gap-3 sm:gap-3 md:gap-4 lg:gap-3 xl:gap-4 justify-center"
              variants={shouldAnimate ? itemVariants : undefined}
              transition={shouldAnimate ? { delay: animationDelay + 0.4 } : undefined}
            >
              {(Array.isArray(cta) ? cta : [cta]).map((button, index) => {
                const ButtonComponent = button.href ? motion.a : motion.button;
                const buttonProps = button.href
                  ? { href: button.href }
                  : { onClick: button.onClick, type: 'button' as const };

                return (
                  <ButtonComponent
                    key={index}
                    {...buttonProps}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-lg text-sm sm:text-base md:text-sm lg:text-base font-semibold transition-all shadow-md',
                        button.variant === 'primary' ? 'bg-white text-blue-700' :
                        button.variant === 'secondary' ? 'bg-white/25 backdrop-blur-sm text-white border border-white/40' :
                        'bg-transparent border-2 border-white text-white'
                      )}
                    whileHover={shouldAnimate ? { 
                      scale: 1.05,
                      boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',
                      transition: { duration: 0.2, ease: 'easeOut' }
                    } : undefined}
                    whileTap={shouldAnimate ? { 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    } : undefined}
                    aria-label={button.label}
                  >
                    {button.icon && <span className="flex-shrink-0">{button.icon}</span>}
                    <span>{button.label}</span>
                  </ButtonComponent>
                );
              })}
            </MotionDiv>
          )}

          {/* Custom Children */}
          {children && (
            <MotionDiv
              variants={shouldAnimate ? itemVariants : undefined}
              transition={shouldAnimate ? { delay: animationDelay + 0.5 } : undefined}
            >
              {children}
              </MotionDiv>
            )}
          </MotionDiv>

          {/* Visual Section (New API) */}
          {!useLegacyLayout && (
            <MotionDiv
              className={cn(
                'relative w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300',
                resolvedBackgroundMode === 'light' && 'border-neutral-200 bg-white/80',
                layout === 'centered' ? 'max-w-3xl' : '',
                shouldAnimate && 'hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:scale-[1.01]'
              )}
              variants={shouldAnimate ? itemVariants : undefined}
              whileHover={shouldAnimate ? {
                y: -4,
                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
              } : undefined}
            >
              {convertedBadge && (
                <span
                  className={cn(
                    'mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                    resolvedBackgroundMode === 'light' ? 'bg-neutral-900/10 text-neutral-900' : 'bg-white/15 text-white'
                  )}
                >
                  {convertedBadge}
                </span>
              )}

              {visual?.imageSrc && (
                <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={visual.imageSrc}
                    alt={visual.imageAlt || ''}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={unifiedVariant === 'home'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}

              {!visual?.imageSrc && visual?.custom && visual.custom}
            </MotionDiv>
          )}
        </div>
      </div>
    </MotionSection>
  );
}
