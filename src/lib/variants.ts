import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

/**
 * Button Variants - توحيد أنماط الأزرار
 */
export const buttonVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white hover:from-primary-700 hover:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50 border border-primary-400/50 dark:border-primary-300/50 hover:border-primary-300 dark:hover:border-primary-200 ring-1 ring-primary-500/20 hover:ring-primary-400/40",
        secondary: "bg-transparent border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 ring-1 ring-primary-500/20 hover:ring-primary-400/40",
        admin: "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-700 dark:via-indigo-700 dark:to-blue-700 text-white hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 dark:hover:from-purple-800 dark:hover:via-indigo-800 dark:hover:to-blue-800 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 border border-purple-400/50 dark:border-purple-300/50 hover:border-purple-300 dark:hover:border-purple-200 ring-1 ring-purple-500/20 hover:ring-purple-400/40",
        gradient: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl border border-indigo-400/50 dark:border-indigo-300/50 hover:border-indigo-300 dark:hover:border-indigo-200 ring-1 ring-indigo-500/20 hover:ring-indigo-400/40",
        outline: "bg-white dark:bg-neutral-800 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 ring-1 ring-indigo-500/20 hover:ring-indigo-400/40",
        ghost: "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-transparent hover:border-neutral-300/50 dark:hover:border-neutral-600/50 ring-1 ring-neutral-300/10 hover:ring-neutral-400/20",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl border border-red-400/50 dark:border-red-300/50 hover:border-red-300 dark:hover:border-red-200 ring-1 ring-red-500/20 hover:ring-red-400/40",
        success: "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl border border-green-400/50 dark:border-green-300/50 hover:border-green-300 dark:hover:border-green-200 ring-1 ring-green-500/20 hover:ring-green-400/40",
      },
      size: {
        xs: "h-[32px] px-3 py-1.5 text-xs",
        sm: "h-[38px] px-4 py-2 text-sm",
        md: "h-[42px] px-5 py-2.5 text-sm",
        lg: "h-[48px] px-6 py-3 text-base",
        xl: "h-[56px] px-8 py-4 text-lg",
        nav: "h-[44px] px-5 py-2.5 text-sm",
      },
      interactive: {
        true: "hover:scale-105 active:scale-95 cursor-pointer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      interactive: true,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Link Variants - توحيد أنماط الروابط
 */
export const linkVariants = cva(
  // Base styles
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 ease-in-out focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 no-underline hover:no-underline",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white hover:from-primary-700 hover:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50",
        secondary: "bg-transparent border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20",
        admin: "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-700 dark:via-indigo-700 dark:to-blue-700 text-white hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 dark:hover:from-purple-800 dark:hover:via-indigo-800 dark:hover:to-blue-800 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50",
        gradient: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
        outline: "bg-white dark:bg-neutral-800 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50",
        ghost: "text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80",
        nav: "text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80",
      },
      size: {
        xs: "h-[32px] px-3 py-1.5 text-xs",
        sm: "h-[38px] px-4 py-2 text-sm",
        md: "h-[42px] px-5 py-2.5 text-sm",
        lg: "h-[48px] px-6 py-3 text-base",
        xl: "h-[56px] px-8 py-4 text-lg",
        nav: "h-[44px] px-5 py-2.5 text-sm",
      },
      active: {
        true: "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-md",
        false: "",
      },
      interactive: {
        true: "hover:scale-105 active:scale-95",
        false: "",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
      active: false,
      interactive: true,
    },
  }
);

export type LinkVariants = VariantProps<typeof linkVariants>;

/**
 * Card Variants - توحيد أنماط البطاقات
 */
export const cardVariants = cva(
  // Base styles
  "bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-neutral-700 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "hover:shadow-md",
        elevated: "shadow-lg hover:shadow-xl",
        outlined: "border-2",
        flat: "shadow-none border-none",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;

/**
 * Badge Variants - توحيد أنماط الشارات
 */
export const badgeVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-full font-semibold",
  {
    variants: {
      variant: {
        default: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
        primary: "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300",
        success: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
        warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
        danger: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
        info: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
      },
      size: {
        xs: "px-2 py-0.5 text-xs",
        sm: "px-2.5 py-1 text-xs",
        md: "px-3 py-1 text-sm",
        lg: "px-4 py-1.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;

/**
 * Helper function to combine variants with custom classes
 */
export function getButtonClasses(variant?: ButtonVariants["variant"], size?: ButtonVariants["size"], className?: string) {
  return cn(buttonVariants({ variant, size }), className);
}

export function getLinkClasses(variant?: LinkVariants["variant"], size?: LinkVariants["size"], active?: boolean, className?: string) {
  return cn(linkVariants({ variant, size, active }), className);
}

export function getCardClasses(variant?: CardVariants["variant"], padding?: CardVariants["padding"], className?: string) {
  return cn(cardVariants({ variant, padding }), className);
}

export function getBadgeClasses(variant?: BadgeVariants["variant"], size?: BadgeVariants["size"], className?: string) {
  return cn(badgeVariants({ variant, size }), className);
}

