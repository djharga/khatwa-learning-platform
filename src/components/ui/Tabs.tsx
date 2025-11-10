'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, children, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const childrenArray = React.Children.toArray(children);

  // احسب موقع وعرض التبويب النشط
  const activeChild = containerRef.current?.children?.[activeIndex] as HTMLElement | undefined;
  const indicatorX =
    (activeChild?.getBoundingClientRect().left ?? 0) -
    (containerRef.current?.getBoundingClientRect().left ?? 0);
  const indicatorWidth = activeChild?.clientWidth ?? 0;

  return (
    <div className="relative w-full">
      <TabsPrimitive.List
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          containerRef.current = node;
        }}
        className={cn(
          'relative flex items-center justify-start rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 p-1 backdrop-blur-sm gap-1',
          'border border-neutral-200/60 dark:border-neutral-700/60 shadow-inner',
          'overflow-x-auto scrollbar-none',
          className
        )}
        {...props}
      >
        {childrenArray.map((child, index) => {
          if (!React.isValidElement(child)) return child;
          const newProps = {
            onMouseEnter: () => setActiveIndex(index),
          } as Partial<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>;
          return React.cloneElement(child as React.ReactElement, newProps);
        })}
      </TabsPrimitive.List>

      {/* مؤشر متحرك ديناميكي */}
      <motion.div
        className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full"
        initial={false}
        animate={{ x: indicatorX, width: indicatorWidth }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ transformOrigin: 'left', willChange: 'transform, width' }}
      />
    </div>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'relative flex-1 min-w-[100px] select-none items-center justify-center whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-700 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=active]:shadow-sm',
      'hover:bg-neutral-50 dark:hover:bg-neutral-800/80 hover:text-primary-600 dark:hover:text-primary-400',
      'text-neutral-700 dark:text-neutral-300',
      'disabled:opacity-50 disabled:pointer-events-none',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'data-[state=active]:animate-fade-in',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
