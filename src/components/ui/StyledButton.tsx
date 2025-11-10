'use client';

import React, { useState, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Loader2 } from 'lucide-react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'outline'
  | 'ghost'
  | 'link';

export type ButtonSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';

export interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  rounded?: boolean;
  glow?: boolean;
  ripple?: boolean;
}

const rippleAnimation = keyframes`
  0% { transform: scale(0); opacity: 0.9; }
  60% { opacity: 0.4; }
  100% { transform: scale(3.5); opacity: 0; }
`;

const glowPulse = keyframes`
  0%, 100% { filter: brightness(1); opacity: 1; }
  50% { filter: brightness(1.15); opacity: 0.9; }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

const getVariantColors = (v: ButtonVariant) => {
  const map = {
    primary: ['#3b82f6', '#2563eb', '#60a5fa'],
    secondary: ['#64748b', '#475569', '#94a3b8'],
    success: ['#22c55e', '#15803d', '#4ade80'],
    danger: ['#ef4444', '#b91c1c', '#f87171'],
    warning: ['#f59e0b', '#d97706', '#fbbf24'],
    info: ['#06b6d4', '#0e7490', '#22d3ee'],
  } as const;
  const [main, dark, light] = map[v as keyof typeof map] ?? map.primary;
  return { main, dark, light, text: '#fff', glow: `${main}99` };
};

const getSize = (s: ButtonSize) => {
  const map = {
    xs: ['6px 16px', '11px', '28px', 14],
    small: ['10px 24px', '12px', '36px', 16],
    medium: ['14px 36px', '14px', '44px', 18],
    large: ['18px 48px', '16px', '52px', 20],
    xl: ['22px 56px', '18px', '60px', 24],
  } as const;
  const [pad, fs, h, icon] = map[s] ?? map.medium;
  return { pad, fs, h, icon };
};

const Wrapper = styled.div<{ fullWidth?: boolean }>`
  display: ${p => (p.fullWidth ? 'block' : 'inline-block')};
  width: ${p => (p.fullWidth ? '100%' : 'auto')};
  perspective: 800px;
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
  rounded?: boolean;
  glow?: boolean;
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
  border-radius: ${p => (p.rounded ? '9999px' : '12px')};
  padding: ${p => getSize(p.size).pad};
  font-size: ${p => getSize(p.size).fs};
  min-height: ${p => getSize(p.size).h};
  color: ${({ variant }) => getVariantColors(variant).text};
  background: ${({ variant }) => {
    const c = getVariantColors(variant);
    return `linear-gradient(135deg, ${c.main}, ${c.dark})`;
  }};
  cursor: ${p => (p.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.25s ease-out;
  will-change: transform, box-shadow, filter;
  transform: translateZ(0);
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2));
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.04);
    filter: brightness(1.05) drop-shadow(0 6px 16px rgba(0,0,0,0.25));
  }

  &:active:not(:disabled) {
    transform: translateY(0px) scale(0.98);
    filter: brightness(1.1);
  }

  ${({ glow, variant }) =>
    glow &&
    css`
      animation: ${glowPulse} 2.8s ease-in-out infinite;
      box-shadow: 0 0 15px ${getVariantColors(variant).glow},
        0 0 30px ${getVariantColors(variant).glow};
    `}

  &:disabled {
    opacity: 0.6;
  }

  @media (prefers-color-scheme: dark) {
    background: ${({ variant }) => {
      const c = getVariantColors(variant);
      return `linear-gradient(135deg, ${c.dark}, ${c.main})`;
    }};
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

const StyledButtonComponent: React.FC<StyledButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth,
  loading = false,
  icon,
  iconPosition = 'left',
  rounded = false,
  glow = false,
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

  const iconSize = getSize(size).icon;

  return (
    <Wrapper fullWidth={fullWidth}>
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        rounded={rounded}
        glow={glow}
        disabled={disabled || loading}
        loading={loading}
        onClick={handleClick}
        style={{
          flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row',
        }}
        {...props}
      >
        {ripples.map(r => (
          <Ripple key={r.id} x={r.x} y={r.y} />
        ))}
        {loading ? (
          <>
            <Spinner size={iconSize} />
            <span>{children}</span>
          </>
        ) : (
          <>
            {icon && <IconWrap size={iconSize}>{icon}</IconWrap>}
            <span>{children}</span>
          </>
        )}
      </StyledButton>
    </Wrapper>
  );
};

export default StyledButtonComponent;
export { StyledButtonComponent as StyledButton };
