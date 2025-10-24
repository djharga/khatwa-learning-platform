import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'muted';
  className?: string;
}

const sizeMap = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
};

const variantMap = {
  default: 'text-slate-700',
  primary: 'text-blue-600',
  success: 'text-green-600',
  warning: 'text-amber-600',
  error: 'text-red-600',
  info: 'text-blue-500',
  muted: 'text-slate-400',
};

export function Icon({ 
  icon: IconComponent, 
  size = 'md', 
  variant = 'default',
  className 
}: IconProps) {
  return (
    <IconComponent 
      className={cn(
        sizeMap[size],
        variantMap[variant],
        'flex-shrink-0',
        className
      )}
      strokeWidth={2}
    />
  );
}

// Icon with background wrapper
interface IconWrapperProps extends IconProps {
  background?: 'none' | 'light' | 'solid';
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const backgroundMap = {
  none: '',
  light: {
    default: 'bg-slate-100',
    primary: 'bg-blue-50',
    success: 'bg-green-50',
    warning: 'bg-amber-50',
    error: 'bg-red-50',
    info: 'bg-blue-50',
    muted: 'bg-slate-50',
  },
  solid: {
    default: 'bg-slate-600 text-white',
    primary: 'bg-blue-600 text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-amber-600 text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-blue-500 text-white',
    muted: 'bg-slate-400 text-white',
  },
};

const roundedMap = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  full: 'rounded-full',
};

const paddingMap = {
  xs: 'p-1.5',
  sm: 'p-2',
  md: 'p-2.5',
  lg: 'p-3',
  xl: 'p-4',
  '2xl': 'p-5',
};

export function IconWrapper({ 
  icon: IconComponent, 
  size = 'md', 
  variant = 'default',
  background = 'light',
  rounded = 'lg',
  className 
}: IconWrapperProps) {
  if (background === 'none') {
    return <Icon icon={IconComponent} size={size} variant={variant} className={className} />;
  }

  const bgClass = background === 'light' 
    ? backgroundMap.light[variant]
    : backgroundMap.solid[variant];

  return (
    <div 
      className={cn(
        'inline-flex items-center justify-center',
        bgClass,
        roundedMap[rounded],
        paddingMap[size],
        className
      )}
    >
      <IconComponent 
        className={cn(
          sizeMap[size],
          background === 'solid' ? 'text-white' : variantMap[variant],
          'flex-shrink-0'
        )}
        strokeWidth={2}
      />
    </div>
  );
}