'use client';

import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * HeroSection - Reusable Hero Component with Design System Standards
 * 
 * Features:
 * - WCAG AA compliant (contrast ≥ 4.5:1)
 * - Responsive breakpoints (640, 768, 1024, 1280)
 * - Typography scale (1.25 ratio - Minor Third)
 * - Spacing system (8px base unit)
 * - Performance optimized
 * - Built-in accessibility
 * - Theme variants support
 * 
 * @example
 * <HeroSection
 *   title="عنوان رئيسي"
 *   description="وصف تفصيلي"
 *   variant="primary"
 *   backgroundImage="/path/to/image.jpg"
 *   cta={{ label: "ابدأ الآن", href: "/start" }}
 * />
 */

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

const variantStyles: Record<HeroVariant, {
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

const sizeStyles: Record<HeroSize, {
  minHeight: string;
  padding: string;
  titleSize: string;
  descriptionSize: string;
}> = {
  sm: {
    minHeight: 'min-h-[40vh] sm:min-h-[45vh]',
    padding: 'py-12 sm:py-16',
    titleSize: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
    descriptionSize: 'text-sm sm:text-base md:text-lg',
  },
  md: {
    minHeight: 'min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh]',
    padding: 'py-16 sm:py-20 md:py-24',
    titleSize: 'text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.5rem]',
    descriptionSize: 'text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl',
  },
  lg: {
    minHeight: 'min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] lg:min-h-[75vh]',
    padding: 'py-20 sm:py-24 md:py-28 lg:py-32',
    titleSize: 'text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]',
    descriptionSize: 'text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-2xl',
  },
  xl: {
    minHeight: 'min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[85vh]',
    padding: 'py-24 sm:py-28 md:py-32 lg:py-40',
    titleSize: 'text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem]',
    descriptionSize: 'text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl',
  },
};

const badgeVariantStyles = {
  default: 'bg-white/30 text-white border-white/40',
  accent: 'bg-primary-500/30 text-white border-primary-400/40',
  success: 'bg-green-500/30 text-white border-green-400/40',
  warning: 'bg-yellow-500/30 text-white border-yellow-400/40',
};

const ctaVariantStyles = {
  primary: 'bg-white text-blue-700 hover:bg-white/90',
  secondary: 'bg-white/25 backdrop-blur-sm text-white hover:bg-white/35 border border-white/40',
  outline: 'bg-transparent border-2 border-white text-white hover:bg-white/10',
};

export default function HeroSection({
  title,
  description,
  subtitle,
  variant = 'primary',
  size = 'md',
  backgroundImage,
  backgroundVideo,
  backgroundGradient,
  overlayOpacity = 60,
  badges = [],
  stats = [],
  cta,
  children,
  className = '',
  contentClassName = '',
  titleClassName = '',
  descriptionClassName = '',
  enableAnimation = true,
  animationDelay = 0,
  ariaLabel,
  role = 'banner',
  imagePriority = true,
  imageQuality = 85,
  lazyLoad = false,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = enableAnimation && !prefersReducedMotion;
  
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const overlayClass = overlayOpacity === 60 
    ? variantStyle.overlay 
    : `bg-black/${overlayOpacity}`;

  // Animation variants
  const containerVariants: MotionProps['variants'] = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: MotionProps['variants'] = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const MotionSection = motion.section;
  const MotionDiv = motion.div;

  return (
    <MotionSection
      className={`relative ${sizeStyle.minHeight} flex items-center justify-center overflow-hidden mx-4 my-4 rounded-2xl ${className}`}
      role={role}
      aria-label={ariaLabel || title}
      variants={shouldAnimate ? containerVariants : undefined}
      initial={shouldAnimate ? 'hidden' : 'visible'}
      animate="visible"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 rounded-2xl overflow-hidden">
        {/* Background Image */}
        {backgroundImage && (
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority={imagePriority}
            quality={imageQuality}
            className="object-cover rounded-2xl"
            sizes="100vw"
            loading={lazyLoad ? 'lazy' : 'eager'}
            aria-hidden="true"
          />
        )}

        {/* Background Video */}
        {backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            aria-hidden="true"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        {/* Background Gradient */}
        {backgroundGradient && !backgroundImage && !backgroundVideo && (
          <div
            className={`absolute inset-0 rounded-2xl ${backgroundGradient}`}
            aria-hidden="true"
          />
        )}

        {/* 60% Dark Overlay - Primary overlay for contrast */}
        <div
          className={`absolute inset-0 rounded-2xl ${overlayClass}`}
          style={{ transform: 'translateZ(0)' }}
          aria-hidden="true"
        />

        {/* Background Pattern - Reduced opacity to 0.15 */}
        <div
          className="absolute inset-0 opacity-[0.15] z-[1]"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Decorative Light Effects - Reduced opacity to 0.15 */}
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-2xl opacity-[0.15] pointer-events-none z-[1]"
          style={{ transform: 'translateZ(0)', willChange: 'auto' }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-purple-500/8 rounded-full blur-2xl opacity-[0.15] pointer-events-none z-[1]"
          style={{ transform: 'translateZ(0)', willChange: 'auto' }}
          aria-hidden="true"
        />
      </div>

      {/* Content Layer */}
      <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8 xl:px-8 ${sizeStyle.padding} w-full ${contentClassName}`}>
        <div className="space-y-8">
          {/* Badges */}
          {badges.length > 0 && (
            <MotionDiv
              className="flex flex-wrap gap-2 sm:gap-2 md:gap-3 lg:gap-2 xl:gap-3 justify-center"
              variants={shouldAnimate ? itemVariants : undefined}
            >
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 md:px-3 md:py-1.5 lg:px-4 lg:py-2 ${
                    badge.variant ? badgeVariantStyles[badge.variant] : variantStyle.badgeBg
                  } backdrop-blur-md rounded-full text-xs sm:text-sm md:text-xs lg:text-sm font-medium ${
                    badge.variant ? '' : variantStyle.badgeText
                  } hover:opacity-80 transition-all duration-300 border ${
                    badge.variant ? '' : 'border-white/40'
                  } drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] flex items-center gap-1.5 sm:gap-2`}
                >
                  {badge.icon && <span className="flex-shrink-0">{badge.icon}</span>}
                  {badge.label}
                </span>
              ))}
            </MotionDiv>
          )}

          {/* Title */}
          <MotionDiv
            variants={shouldAnimate ? itemVariants : undefined}
            transition={shouldAnimate ? { delay: animationDelay + 0.1 } : undefined}
          >
            {subtitle && (
              <p
                className={`text-sm sm:text-base md:text-lg lg:text-base xl:text-lg ${variantStyle.textColor} mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium text-center`}
                style={{ color: 'rgba(255, 255, 255, 0.95)' }}
              >
                {subtitle}
              </p>
            )}
            <h1
              className={`${sizeStyle.titleSize} font-extrabold leading-tight ${variantStyle.textColor} text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] ${titleClassName}`}
              style={{ fontWeight: 800, color: 'rgba(255, 255, 255, 0.95)' }}
              dir="rtl"
            >
              {title}
            </h1>
          </MotionDiv>

          {/* Description */}
          {description && (
            <MotionDiv
              variants={shouldAnimate ? itemVariants : undefined}
              transition={shouldAnimate ? { delay: animationDelay + 0.2 } : undefined}
            >
              <p
                className={`${sizeStyle.descriptionSize} ${variantStyle.textColor} leading-relaxed max-w-3xl mx-auto text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] font-medium ${descriptionClassName}`}
                style={{ color: 'rgba(255, 255, 255, 0.95)' }}
              >
                {description}
              </p>
            </MotionDiv>
          )}

          {/* Stats */}
          {stats.length > 0 && (
            <MotionDiv
              className="flex flex-wrap gap-4 sm:gap-4 md:gap-6 lg:gap-4 xl:gap-6 justify-center"
              variants={shouldAnimate ? itemVariants : undefined}
              transition={shouldAnimate ? { delay: animationDelay + 0.3 } : undefined}
            >
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 sm:gap-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                >
                  {stat.icon && (
                    <span className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0">
                      {stat.icon}
                    </span>
                  )}
                  <span
                    className="text-sm sm:text-base md:text-sm lg:text-base font-semibold"
                    style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-sm sm:text-base md:text-sm lg:text-base"
                    style={{ color: 'rgba(255, 255, 255, 0.95)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </MotionDiv>
          )}

          {/* CTA Buttons */}
          {cta && (
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
                    className={`flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-4 md:py-2 lg:px-5 lg:py-2.5 rounded-lg text-sm sm:text-base md:text-sm lg:text-base font-semibold transition-all hover:scale-105 shadow-md hover:shadow-lg ${
                      button.variant ? ctaVariantStyles[button.variant] : ctaVariantStyles.primary
                    }`}
                    whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
                    whileTap={shouldAnimate ? { scale: 0.95 } : undefined}
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
        </div>
      </div>
    </MotionSection>
  );
}

