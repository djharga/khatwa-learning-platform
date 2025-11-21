'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, MotionProps } from 'framer-motion';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TypingHeading } from '@/components/ui/TypingText';
import type { ReactNode } from 'react';

const Particles = dynamic(
  () => import('@tsparticles/react').then((mod) => mod.Particles),
  { ssr: false, loading: () => null }
);

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

export type UnifiedHeroLayout = 'centered' | 'split';

export interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
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

export interface UnifiedHeroSectionProps {
  variant?: UnifiedHeroVariant;
  layout?: UnifiedHeroLayout;
  eyebrow?: string;
  title: string;
  description: string;
  subtitle?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  actions?: HeroAction[];
  stats?: HeroStat[];
  visual?: HeroVisual;
  className?: string;
  contentClassName?: string;
  particles?: boolean;
  patternIntensity?: 'soft' | 'bold';
  backgroundMode?: 'dark' | 'light';
  backgroundImage?: string;
  ariaLabel?: string;
  enableAnimation?: boolean;
  /** تفعيل تأثير الكتابة التدريجي للعنوان */
  typingEffect?: boolean;
  /** سرعة الكتابة التدريجية */
  typingSpeed?: number;
  /** تأخير بدء الكتابة */
  typingDelay?: number;
  /** تكرار التأثير */
  typingLoop?: boolean;
  /** تأخير إعادة التكرار */
  typingLoopDelay?: number;
}

type ActionKind = NonNullable<HeroAction['variant']> | 'primary';
const actionVariantMap: Record<ActionKind, 'default' | 'secondary' | 'ghost'> = {
  primary: 'default',
  secondary: 'secondary',
  ghost: 'ghost',
};

type VariantTokens = {
  gradient: string;
  accent: string;
  glow: string;
  textClass: string;
  badgeClass: string;
  particleColor: string;
};

const variantTokens: Record<UnifiedHeroVariant, VariantTokens> = {
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

const layoutClasses: Record<UnifiedHeroLayout, string> = {
  centered: 'text-center items-center justify-center',
  split:
    'grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-10 items-center',
};

const patternIntensityMap = {
  soft: 'opacity-[0.15]',
  bold: 'opacity-[0.3]',
};

export function UnifiedHeroSection({
  variant = 'default',
  layout = 'split',
  eyebrow,
  title,
  description,
  subtitle,
  primaryAction,
  secondaryAction,
  actions,
  stats = [],
  visual,
  className,
  contentClassName,
  particles = true,
  patternIntensity = 'soft',
  backgroundMode = 'dark',
  backgroundImage,
  ariaLabel,
  enableAnimation = true,
  typingEffect = false,
  typingSpeed = 80,
  typingDelay = 500,
  typingLoop = false,
  typingLoopDelay = 2000,
}: UnifiedHeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = enableAnimation && !prefersReducedMotion;
  const shouldUseParticles = particles && shouldAnimate;
  const tokens = variantTokens[variant] ?? variantTokens.default;

  const mergedActions = useMemo(() => {
    const merged: HeroAction[] = [];
    if (primaryAction) merged.push({ ...primaryAction, variant: primaryAction.variant ?? 'primary' });
    if (secondaryAction) merged.push({ ...secondaryAction, variant: secondaryAction.variant ?? 'secondary' });
    if (actions?.length) merged.push(...actions);
    return merged;
  }, [actions, primaryAction, secondaryAction]);

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

  const containerVariants: MotionProps['variants'] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.15 },
    },
  };

  const itemVariants: MotionProps['variants'] = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const textColor = backgroundMode === 'light' ? 'text-neutral-900' : tokens.textClass;
  const statValueColor = backgroundMode === 'light' ? 'text-neutral-900' : 'text-white';
  const statLabelColor = backgroundMode === 'light' ? 'text-neutral-600' : 'text-white/80';
  const statHelperColor = backgroundMode === 'light' ? 'text-neutral-500' : 'text-white/60';

  return (
    <MotionSection
      role="banner"
      aria-label={ariaLabel || title}
      variants={shouldAnimate ? containerVariants : undefined}
      initial={shouldAnimate ? 'hidden' : undefined}
      animate={shouldAnimate ? 'visible' : undefined}
      className={cn(
        'relative overflow-hidden rounded-[2rem] px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28 shadow-2xl',
        backgroundMode === 'light' ? 'bg-white' : !backgroundImage ? `bg-gradient-to-br ${tokens.gradient}` : '',
        className
      )}
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
              priority={variant === 'home'}
            />
          </div>
        )}
        {/* Gradient base */}
        {backgroundMode === 'dark' && !backgroundImage && (
          <div className={cn('absolute inset-0 bg-gradient-to-br', tokens.gradient)} aria-hidden="true" />
        )}

        {/* Pattern */}
        {!backgroundImage && (
          <div
            className={cn(
              'absolute inset-0 pointer-events-none',
              patternIntensityMap[patternIntensity],
              backgroundMode === 'light' ? 'opacity-[0.08]' : ''
            )}
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.25) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
        )}

        {/* Accent glows */}
        {!backgroundImage && (
          <>
            <div
              className={cn(
                'absolute -top-10 right-10 w-64 h-64 blur-3xl rounded-full',
                tokens.glow
              )}
              aria-hidden="true"
            />
            <div
              className={cn(
                'absolute bottom-0 left-0 w-72 h-72 blur-[120px] rounded-full',
                tokens.glow
              )}
              aria-hidden="true"
            />
          </>
        )}

        {/* Particles */}
        {shouldUseParticles && (
          <div className="absolute inset-0">
            <Particles
              id={`hero-particles-${variant}`}
              options={particlesOptions as any}
            />
          </div>
        )}

        {/* Overlay for readability */}
        {!backgroundImage && (
          <div
            className={cn(
              'absolute inset-0',
              backgroundMode === 'light' ? 'bg-white/85' : 'bg-slate-950/25'
            )}
            aria-hidden="true"
          />
        )}
      </div>

      <div className={cn('relative z-10', layout === 'centered' ? 'mx-auto max-w-4xl' : 'max-w-7xl mx-auto', contentClassName)}>
        <div className={cn('flex flex-col gap-12', layout === 'centered' ? 'items-center text-center' : layoutClasses[layout])}>
          <MotionDiv className="space-y-6" variants={shouldAnimate ? itemVariants : undefined}>
            {eyebrow && (
              <motion.span
                initial={shouldAnimate ? { opacity: 0, y: -10 } : {}}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                transition={shouldAnimate ? { duration: 0.4 } : {}}
                className={cn(
                  'inline-flex items-center justify-center rounded-full px-5 py-2 text-xs sm:text-sm font-bold tracking-wide backdrop-blur-sm border',
                  backgroundMode === 'light'
                    ? 'border-primary-200 bg-primary-50 text-primary-700'
                    : tokens.badgeClass + ' border-white/20'
                )}
                dir="rtl"
              >
                {eyebrow}
              </motion.span>
            )}

            {subtitle && (
              <p className={cn('text-base sm:text-lg font-semibold', backgroundImage ? 'text-white' : tokens.accent)} dir="rtl">
                {subtitle}
              </p>
            )}

            {typingEffect ? (
              <TypingHeading
                text={title}
                speed={typingSpeed}
                delay={typingDelay}
                loop={typingLoop}
                loopDelay={typingLoopDelay}
                className={cn(
                  'font-extrabold leading-tight tracking-tight',
                  textColor,
                  layout === 'centered'
                    ? 'text-3xl sm:text-4xl lg:text-5xl'
                    : 'text-3xl sm:text-4xl lg:text-[3.2rem]'
                )}
                dir="rtl"
              />
            ) : (
              <h1
                className={cn(
                  'font-extrabold leading-tight tracking-tight',
                  textColor,
                  layout === 'centered'
                    ? 'text-3xl sm:text-4xl lg:text-5xl'
                    : 'text-3xl sm:text-4xl lg:text-[3.2rem]'
                )}
                dir="rtl"
              >
                {title}
              </h1>
            )}

            <p
              className={cn(
                'text-base sm:text-lg lg:text-xl leading-relaxed text-white/90',
                backgroundMode === 'light' ? 'text-neutral-600' : 'text-white/90'
              )}
              dir="rtl"
            >
              {description}
            </p>

            {mergedActions.length > 0 && (
              <div
                className={cn(
                  'mt-8 flex flex-wrap items-center gap-4',
                  layout === 'centered' ? 'justify-center' : 'justify-start'
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
                      whileHover={shouldAnimate ? { y: -2 } : undefined}
                      whileTap={shouldAnimate ? { scale: 0.98 } : undefined}
                      dir="rtl"
                    >
                      {action.icon && <span className="pl-1">{action.icon}</span>}
                      <span>{action.label}</span>
                    </ActionComponent>
                  );
                })}
              </div>
            )}
          </MotionDiv>

          <MotionDiv
            className={cn(
              'relative w-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl',
              backgroundMode === 'light' && 'border-neutral-200 bg-white/80',
              layout === 'centered' ? 'max-w-3xl' : ''
            )}
            variants={shouldAnimate ? itemVariants : undefined}
          >
            {visual?.badge && (
              <span
                className={cn(
                  'mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold',
                  backgroundMode === 'light' ? 'bg-neutral-900/10 text-neutral-900' : 'bg-white/15 text-white'
                )}
              >
                {visual.badge}
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
                  priority={variant === 'home'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            {!visual?.imageSrc && visual?.custom}
          </MotionDiv>
        </div>
      </div>
    </MotionSection>
  );
}

export default UnifiedHeroSection;

