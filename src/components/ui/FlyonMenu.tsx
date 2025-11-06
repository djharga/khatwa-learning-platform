'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  href: string;
  label: string;
  icon?: LucideIcon | string;
  badge?: string | number;
  badgeVariant?: 'primary' | 'warning' | 'success' | 'danger' | 'info';
  status?: 'active' | 'inactive';
}

interface FlyonMenuProps {
  items: MenuItem[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  autoActive?: boolean; // تلقائياً تحديد العنصر النشط حسب المسار الحالي
}

/**
 * FlyonUI Menu Component
 * مكون قائمة من FlyonUI Tailwind CSS
 * 
 * Features:
 * - دعم القائمة الأفقية والعمودية
 * - دعم الأيقونات (Lucide Icons أو iconify icons)
 * - دعم Badges مع أنواع مختلفة
 * - دعم حالة النشاط (active/inactive)
 * - تحديد تلقائي للعنصر النشط حسب المسار
 */
const FlyonMenu: React.FC<FlyonMenuProps> = ({
  items,
  orientation = 'horizontal',
  className = '',
  autoActive = true,
}) => {
  const pathname = usePathname();
  
  const baseClasses = orientation === 'horizontal' 
    ? 'menu lg:menu-horizontal' 
    : 'menu menu-vertical';

  const getBadgeClasses = (variant: string = 'primary') => {
    const variants = {
      primary: 'badge-primary',
      warning: 'badge-warning',
      success: 'badge-success',
      danger: 'badge-danger',
      info: 'badge-info',
    };
    return `badge badge-sm ${variants[variant as keyof typeof variants] || variants.primary}`;
  };

  const renderIcon = (icon?: LucideIcon | string) => {
    if (!icon) return null;
    
    // إذا كان string (iconify icon)
    if (typeof icon === 'string') {
      return <span className={`icon-[${icon}] size-5`}></span>;
    }
    
    // إذا كان Lucide Icon component
    const IconComponent = icon as LucideIcon;
    return <IconComponent className="w-5 h-5" />;
  };

  const isActive = (href: string) => {
    if (!autoActive) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <ul className={`${baseClasses} ${className}`}>
      {items.map((item, index) => {
        const active = item.status === 'active' || (item.status !== 'inactive' && isActive(item.href));
        
        return (
          <li key={index}>
            <Link 
              href={item.href}
              className={active ? 'active' : ''}
            >
              {item.icon && renderIcon(item.icon)}
              {item.label}
              {item.badge && (
                <span className={getBadgeClasses(item.badgeVariant)}>
                  {item.badge}
                </span>
              )}
              {item.status === 'inactive' && (
                <span className="badge badge-success size-3 p-0"></span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default FlyonMenu;

