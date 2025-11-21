'use client';

import React, { useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion as motionTokens } from '@/tokens';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export type ButtonSize = 'sm' | 'default' | 'lg' | 'icon';

export interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ripple?: boolean;
}

const rippleAnimation = keyframes`
  0% { transform: scale(0); opacity: 0.9; }
  60% { opacity: 0.4; }
  100% { transform: scale(3.5); opacity: 0; }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

// Academic Color Palette from agent.md
const getVariantColors = (v: ButtonVariant) => {
  const map = {
    primary: {
      main: '#5B36E8',
      hover: '#6D4AFF',
      active: '#4C2EC7',
      text: '#FFFFFF',
      focus: 'rgba(91, 54, 232, 0.3)',
      disabled: '#D1D5DB',
      disabledText: '#9CA3AF',
    },
    secondary: {
      main: 'transparent',
      hover: '#F7F8FC',
      active: '#EDE9FE',
      text: '#5B36E8',
      border: '#5B36E8',
      borderHover: '#6D4AFF',
      focus: 'rgba(91, 54, 232, 0.2)',
      disabled: '#D1D5DB',
      disabledText: '#9CA3AF',
    },
    ghost: {
      main: 'transparent',
      hover: '#F7F8FC',
      active: '#E5E7EB',
      text: '#6B7280',
      textHover: '#111827',
      focus: 'rgba(107, 114, 128, 0.2)',
      disabled: '#D1D5DB',
      disabledText: '#9CA3AF',
    },
    success: {
      main: '#10B981',
      hover: '#059669',
      active: '#047857',
      text: '#FFFFFF',
      focus: 'rgba(16, 185, 129, 0.3)',
      disabled: '#D1D5DB',
      disabledText: '#9CA3AF',
    },
    danger: {
      main: '#EF4444',
      hover: '#DC2626',
      active: '#B91C1C',
      text: '#FFFFFF',
      focus: 'rgba(239, 68, 68, 0.3)',
      disabled: '#D1D5DB',
      disabledText: '#9CA3AF',
    },
    warning: {
      main: '#F59E0B',
      hover: '#D97706',
      active: '#B45309',
      text: '#FFFFFF',
      focus: 'rgba(245, 158, 11, 0.3)',
      disabled: '#D1D5DB',
      disabledText: '#9CA3AF',
    },
    info: {
      main: '#3B82F6',
      hover: '#2563EB',
      active: '#1D4ED8',
      text: '#FFFFFF',
      focus: 'rgba(59, 130, 246, 0.3)',
      disabled: '#D1D5DB',
      disabledText: '#9CA3AF',
    },
  } as const;
  return map[v as keyof typeof map] ?? map.primary;
};

// Academic sizing from agent.md
const getSize = (s: ButtonSize) => {
  const map = {
    sm: {
      padding: '8px 16px', // space-2 space-4
      fontSize: '14px',
      height: '36px',
      iconSize: 14,
    },
    default: {
      padding: '12px 24px', // space-3 space-6
      fontSize: '16px',
      height: '48px',
      iconSize: 16,
    },
    lg: {
      padding: '16px 32px', // space-4 space-8
      fontSize: '18px',
      height: '56px',
      iconSize: 18,
    },
    icon: {
      padding: '0',
      fontSize: '16px',
      height: '40px',
      width: '40px',
      iconSize: 20,
    },
  } as const;
  return map[s] ?? map.default;
};

const Wrapper = styled.div<{ fullWidth?: boolean }>`
  display: ${p => (p.fullWidth ? 'block' : 'inline-block')};
  width: ${p => (p.fullWidth ? '100%' : 'auto')};
`;

const Ripple = styled.span<{ x: number; y: number }>`
  position: absolute;
  left: ${p => p.x}px;
  top: ${p => p.y}px;
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  transform: scale(0);
  animation: ${rippleAnimation} 0.7s ease-out forwards;
  pointer-events: none;
  filter: blur(2px);
`;

const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
}>`
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  font-weight: 600;
  font-family: 'Inter', 'Segoe UI', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
  border-radius: 10px; /* radius-md from agent.md */
  padding: ${p => getSize(p.size).padding};
  font-size: ${p => getSize(p.size).fontSize};
  min-height: ${p => getSize(p.size).height};
  ${p => {
    if (p.size === 'icon') {
      const iconSize = getSize('icon') as { width: string };
      return `width: ${iconSize.width}; min-width: ${iconSize.width};`;
    }
    return '';
  }}
  color: ${({ variant }) => getVariantColors(variant).text};
  background: ${({ variant }) => {
    const c = getVariantColors(variant);
    if (variant === 'secondary') {
      return c.main;
    }
    if (variant === 'ghost') {
      return c.main;
    }
    return c.main;
  }};
  ${({ variant }) => {
    if (variant === 'secondary') {
      const secondaryColors = getVariantColors('secondary') as { border: string };
      return css`border: 1.5px solid ${secondaryColors.border};`;
    }
    return '';
  }}
  cursor: ${p => (p.disabled || p.loading ? 'not-allowed' : 'pointer')};
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1); /* ease-standard */
  will-change: transform, box-shadow;
  transform: translateZ(0);
  user-select: none;
  
  /* Primary Button Shadow (elevation-2 on hover) */
  ${({ variant }) => variant === 'primary' && css`
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* elevation-2 */
  `}

  /* Hover States */
  &:hover:not(:disabled):not(:has([aria-busy="true"])) {
    ${({ variant }) => {
      const c = getVariantColors(variant);
      if (variant === 'primary') {
        return css`
          background: ${c.hover};
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* elevation-2 */
          transform: translateY(-1px);
        `;
      }
      if (variant === 'secondary') {
        const secondaryColors = getVariantColors('secondary') as { hover: string; borderHover: string };
        return css`
          background: ${secondaryColors.hover};
          border-color: ${secondaryColors.borderHover};
        `;
      }
      if (variant === 'ghost') {
        const ghostColors = getVariantColors('ghost') as { hover: string; textHover: string };
        return css`
          background: ${ghostColors.hover};
          color: ${ghostColors.textHover};
        `;
      }
      return css`
        background: ${c.hover};
      `;
    }}
  }

  /* Active States */
  &:active:not(:disabled):not(:has([aria-busy="true"])) {
    ${({ variant }) => {
      const c = getVariantColors(variant);
      if (variant === 'primary') {
        return css`
          background: ${c.active};
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06); /* elevation-1 */
          transform: translateY(0);
        `;
      }
      return css`
        background: ${c.active};
        transform: scale(0.98);
      `;
    }}
  }

  /* Focus States */
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ variant }) => getVariantColors(variant).focus || 'rgba(91, 54, 232, 0.3)'};
  }

  /* Disabled States */
  &:disabled {
    ${({ variant }) => {
      const c = getVariantColors(variant);
      if (variant === 'primary') {
        return css`
          background: ${c.disabled || '#D1D5DB'};
          color: ${c.disabledText || '#9CA3AF'};
        `;
      }
      return css`
        opacity: 0.5;
        cursor: not-allowed;
      `;
    }}
  }

  /* Icon Button Specific Styles */
  ${({ variant, size }) => size === 'icon' && variant === 'ghost' && css`
    background: transparent;
    &:hover:not(:disabled) {
      background: #F7F8FC;
      color: #111827;
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
    &:active {
      transform: none;
    }
  }
`;

const Spinner = styled(Loader2)<{ size: number }>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  animation: ${spin} 1s linear infinite;
`;

const IconWrap = styled.span<{ size: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${p => p.size}px;
  height: ${p => p.size}px;
`;

const MotionStyledButton = motion(StyledButton);

const StyledButtonComponent: React.FC<StyledButtonProps> = ({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth,
  loading = false,
  icon,
  iconPosition = 'left',
  ripple = true,
  disabled,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const ref = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && !disabled && !loading && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 12;
      const y = e.clientY - rect.top - 12;
      const id = rippleId.current++;
      setRipples(prev => [...prev, { x, y, id }]);
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);
    }
    onClick?.(e);
  };

  const sizeConfig = getSize(size);
  const iconSize = sizeConfig.iconSize;

  // Motion props for press effect
  const motionProps = prefersReducedMotion || disabled || loading
    ? {}
    : {
        whileTap: motionTokens.press.standard,
        transition: motionTokens.press.standard.transition,
      };

  return (
    <Wrapper fullWidth={fullWidth}>
      <MotionStyledButton
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        loading={loading}
        onClick={handleClick}
        aria-busy={loading}
        style={{
          flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row',
        }}
        {...motionProps}
        {...props}
      >
        {ripples.map(r => (
          <Ripple key={r.id} x={r.x} y={r.y} />
        ))}
        {loading ? (
          <>
            <Spinner size={iconSize} />
            {children}
          </>
        ) : (
          <>
            {icon && <IconWrap size={iconSize}>{icon}</IconWrap>}
            {children}
          </>
        )}
      </MotionStyledButton>
    </Wrapper>
  );
};

export default StyledButtonComponent;
export { StyledButtonComponent as StyledButton };
