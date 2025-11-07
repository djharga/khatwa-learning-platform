'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Loader2 } from 'lucide-react';

// أنواع الأزرار
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

// أحجام الأزرار
export type ButtonSize = 'xs' | 'small' | 'medium' | 'large' | 'xl';

// واجهة الخصائص
export interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

// أنيميشن الـ ripple
const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

// أنيميشن الـ loading
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// أنيميشن الـ glow
const glowPulse = keyframes`
  0%, 100% {
    opacity: 1;
    filter: brightness(1);
  }
  50% {
    opacity: 0.8;
    filter: brightness(1.2);
  }
`;

// دالة للحصول على ألوان الـ variant
const getVariantColors = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        glow: 'rgba(59, 130, 246, 0.6)',
        text: '#ffffff',
      };
    case 'secondary':
      return {
        main: '#64748b',
        light: '#94a3b8',
        dark: '#475569',
        glow: 'rgba(100, 116, 139, 0.6)',
        text: '#ffffff',
      };
    case 'success':
      return {
        main: '#22c55e',
        light: '#4ade80',
        dark: '#16a34a',
        glow: 'rgba(34, 197, 94, 0.6)',
        text: '#ffffff',
      };
    case 'danger':
      return {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
        glow: 'rgba(239, 68, 68, 0.6)',
        text: '#ffffff',
      };
    case 'warning':
      return {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        glow: 'rgba(245, 158, 11, 0.6)',
        text: '#ffffff',
      };
    case 'info':
      return {
        main: '#06b6d4',
        light: '#22d3ee',
        dark: '#0891b2',
        glow: 'rgba(6, 182, 212, 0.6)',
        text: '#ffffff',
      };
    case 'outline':
      return {
        main: 'transparent',
        light: '#f1f5f9',
        dark: '#e2e8f0',
        glow: 'rgba(59, 130, 246, 0.3)',
        text: '#3b82f6',
      };
    case 'ghost':
      return {
        main: 'transparent',
        light: '#f1f5f9',
        dark: '#e2e8f0',
        glow: 'rgba(59, 130, 246, 0.2)',
        text: '#3b82f6',
      };
    case 'link':
      return {
        main: 'transparent',
        light: 'transparent',
        dark: 'transparent',
        glow: 'transparent',
        text: '#3b82f6',
      };
    default:
      return {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
        glow: 'rgba(59, 130, 246, 0.6)',
        text: '#ffffff',
      };
  }
};

// دالة للحصول على الأحجام
const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'xs':
      return {
        padding: '6px 16px',
        fontSize: '11px',
        minHeight: '28px',
        iconSize: '14px',
      };
    case 'small':
      return {
        padding: '10px 24px',
        fontSize: '12px',
        minHeight: '36px',
        iconSize: '16px',
      };
    case 'medium':
      return {
        padding: '14px 36px',
        fontSize: '14px',
        minHeight: '44px',
        iconSize: '18px',
      };
    case 'large':
      return {
        padding: '18px 48px',
        fontSize: '16px',
        minHeight: '52px',
        iconSize: '20px',
      };
    case 'xl':
      return {
        padding: '22px 56px',
        fontSize: '18px',
        minHeight: '60px',
        iconSize: '24px',
      };
    default:
      return {
        padding: '14px 36px',
        fontSize: '14px',
        minHeight: '44px',
        iconSize: '18px',
      };
  }
};

// الـ Wrapper الرئيسي
const StyledWrapper = styled.div<{ fullWidth?: boolean }>`
  display: ${props => props.fullWidth ? 'block' : 'inline-block'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

// الـ Button Wrapper
const ButtonWrapper = styled.div<{ rounded?: boolean }>`
  position: relative;
  display: inline-block;
  width: 100%;
  border-radius: ${props => props.rounded ? '9999px' : '12px'};
  overflow: hidden;
`;

// الطبقة السفلية (Shadow Layer)
const BottomLayer = styled.div<{ variant: ButtonVariant; rounded?: boolean; glow?: boolean }>`
  position: absolute;
  top: 8px;
  left: -2px;
  right: -2px;
  height: 97%;
  background: ${props => {
    const colors = getVariantColors(props.variant);
    return props.variant === 'outline' || props.variant === 'ghost' || props.variant === 'link'
      ? 'rgba(0, 0, 0, 0.05)'
      : `rgba(0, 0, 0, 0.15)`;
  }};
  border-radius: ${props => props.rounded ? '9999px' : '12px'};
  z-index: 0;
  box-shadow:
    inset 0 3px 4px rgba(0, 0, 0, 0.3),
    inset 0 -50px 4px rgba(0, 0, 0, 0.05),
    0 0px 8px rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${ButtonWrapper}:hover & {
    top: 10px;
    box-shadow:
      inset 0 3px 4px rgba(0, 0, 0, 0.2),
      inset 0 -50px 4px rgba(0, 0, 0, 0.05),
      0 0px 12px rgba(0, 0, 0, 0.5);
  }

  ${ButtonWrapper}:active & {
    top: 12px;
  }
`;

// طبقة الـ Glow
const GlowLayer = styled.div<{ variant: ButtonVariant; rounded?: boolean; glow?: boolean }>`
  position: absolute;
  top: 4px;
  left: 3px;
  right: 3px;
  height: 98%;
  border-radius: ${props => props.rounded ? '9999px' : '12px'};
  z-index: 1;
  filter: blur(0.5px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => {
    const colors = getVariantColors(props.variant);
    const isTransparent = props.variant === 'outline' || props.variant === 'ghost' || props.variant === 'link';
    
    return css`
      background: ${isTransparent 
        ? 'transparent' 
        : `linear-gradient(160deg, ${colors.light}, ${colors.main})`};
      box-shadow:
        ${!isTransparent ? `
          inset 0 3px 4px ${colors.glow},
          inset 0 -50px 4px ${colors.glow.replace('0.6', '0.1')},
          0 0px 8px ${colors.glow}
        ` : 'none'};
      
      ${props.glow && !isTransparent ? css`
        animation: ${glowPulse} 2s ease-in-out infinite;
      ` : ''}
    `;
  }}

  ${ButtonWrapper}:hover & {
    ${props => {
      const colors = getVariantColors(props.variant);
      const isTransparent = props.variant === 'outline' || props.variant === 'ghost' || props.variant === 'link';
      
      return !isTransparent ? css`
        box-shadow:
          inset 0 3px 4px ${colors.glow},
          inset 0 -50px 4px ${colors.glow.replace('0.6', '0.15')},
          0 0px 16px ${colors.glow};
      ` : '';
    }}
  }
`;

// الـ Ripple Effect
const Ripple = styled.span<{ x: number; y: number }>`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ${rippleAnimation} 0.6s ease-out;
  pointer-events: none;
  width: 20px;
  height: 20px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 10;
`;

// الـ Button الرئيسي
const StyledButton = styled.button<{
  variant: ButtonVariant;
  size: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  rounded?: boolean;
  hasIcon?: boolean;
  iconPosition?: 'left' | 'right';
}>`
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: ${props => getSizeStyles(props.size).minHeight};
  padding: ${props => getSizeStyles(props.size).padding};
  font-size: ${props => getSizeStyles(props.size).fontSize};
  font-weight: 600;
  border: none;
  border-radius: ${props => props.rounded ? '9999px' : '12px'};
  cursor: ${props => (props.disabled || props.loading) ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.hasIcon ? '8px' : '0'};
  flex-direction: ${props => props.iconPosition === 'right' ? 'row-reverse' : 'row'};
  overflow: hidden;
  
  ${props => {
    const colors = getVariantColors(props.variant);
    const isTransparent = props.variant === 'outline' || props.variant === 'ghost' || props.variant === 'link';
    
    return css`
      background: ${isTransparent 
        ? 'transparent' 
        : `linear-gradient(135deg, ${colors.main}, ${colors.dark})`};
      color: ${colors.text};
      border: ${props.variant === 'outline' ? `2px solid ${colors.main}` : `1px solid ${colors.glow.replace('0.6', '0.3')}`};
      
      box-shadow: ${isTransparent ? 'none' : `
        inset 0 3px 4px rgba(255, 255, 255, 0.3),
        inset 0 10px 16px rgba(0, 0, 0, 0.05),
        0 10px 16px rgba(0, 0, 0, 0.1),
        0 0 0 1px ${colors.glow.replace('0.6', '0.2')},
        0 0 8px ${colors.glow.replace('0.6', '0.3')}
      `};
    `;
  }}

  &:hover:not(:disabled) {
    transform: translateY(-2px) scale(1.05);
    ${props => {
      const colors = getVariantColors(props.variant);
      const isTransparent = props.variant === 'outline' || props.variant === 'ghost' || props.variant === 'link';
      
      return css`
        ${!isTransparent ? `
          box-shadow:
            inset 0 3px 4px rgba(255, 255, 255, 0.4),
            inset 0 -3px 4px rgba(0, 0, 0, 0.05),
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            0 0 0 1px ${colors.glow.replace('0.6', '0.3')},
            0 0 12px ${colors.glow.replace('0.6', '0.5')};
        ` : `
          box-shadow: 
            0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05),
            0 0 0 1px ${colors.glow.replace('0.6', '0.2')},
            0 0 8px ${colors.glow.replace('0.6', '0.3')};
        `}
        ${props.variant === 'link' ? `
          text-decoration: underline;
        ` : ''}
      `;
    }}
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    ${props => {
      const isTransparent = props.variant === 'outline' || props.variant === 'ghost' || props.variant === 'link';
      return !isTransparent ? css`
        box-shadow:
          inset 0 3px 4px rgba(255, 255, 255, 0.2),
          inset 0 10px 16px rgba(0, 0, 0, 0.1),
          0 4px 8px rgba(0, 0, 0, 0.15);
      ` : '';
    }}
  }

  &:focus-visible {
    outline: none;
    ${props => {
      const colors = getVariantColors(props.variant);
      return css`
        box-shadow:
          0 0 0 3px ${colors.glow.replace('0.6', '0.3')},
          0 0 0 5px ${colors.glow.replace('0.6', '0.1')};
      `;
    }}
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Loading state */
  ${props => props.loading && css`
    pointer-events: none;
    opacity: 0.8;
  `}

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    ${props => {
      const colors = getVariantColors(props.variant);
      const isTransparent = props.variant === 'outline' || props.variant === 'ghost' || props.variant === 'link';
      
      if (isTransparent) {
        return css`
          color: ${colors.text};
        `;
      }
      
      return css`
        background: linear-gradient(135deg, ${colors.dark}, ${colors.main});
        box-shadow:
          inset 0 3px 4px rgba(255, 255, 255, 0.1),
          inset 0 10px 16px rgba(0, 0, 0, 0.2),
          0 10px 16px rgba(0, 0, 0, 0.3);
      `;
    }}
  }
`;

// مكون الـ Loading Spinner
const LoadingSpinner = styled(Loader2)<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  animation: ${spinAnimation} 1s linear infinite;
`;

// مكون الـ Icon Wrapper
const IconWrapper = styled.span<{ size: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  flex-shrink: 0;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

// المكون الرئيسي
const StyledButtonComponent: React.FC<StyledButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
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
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleIdRef = useRef(0);

  // معالجة الـ ripple effect
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && !disabled && !loading && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 10;
      const y = e.clientY - rect.top - 10;
      const id = rippleIdRef.current++;

      setRipples(prev => [...prev, { x, y, id }]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 600);
    }

    if (onClick && !disabled && !loading) {
      onClick(e);
    }
  };

  const sizeStyles = getSizeStyles(size);
  const hasIcon = !!icon || loading;

  return (
    <StyledWrapper fullWidth={fullWidth}>
      <ButtonWrapper rounded={rounded}>
        <BottomLayer variant={variant} rounded={rounded} glow={glow} />
        <GlowLayer variant={variant} rounded={rounded} glow={glow} />
        <StyledButton
          ref={buttonRef}
          variant={variant}
          size={size}
          disabled={disabled || loading}
          loading={loading}
          rounded={rounded}
          hasIcon={hasIcon}
          iconPosition={iconPosition}
          onClick={handleClick}
          {...props}
        >
          {ripples.map(ripple => (
            <Ripple key={ripple.id} x={ripple.x} y={ripple.y} />
          ))}
          
          {loading ? (
            <>
              <LoadingSpinner size={parseInt(sizeStyles.iconSize)} />
              <span>{children}</span>
            </>
          ) : (
            <>
              {icon && (
                <IconWrapper size={parseInt(sizeStyles.iconSize)}>
                  {icon}
                </IconWrapper>
              )}
              <span>{children}</span>
            </>
          )}
        </StyledButton>
      </ButtonWrapper>
    </StyledWrapper>
  );
};

export default StyledButtonComponent;
export { StyledButtonComponent as StyledButton };
