'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  disableIndicator?: boolean;
};

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, children, disableIndicator = false, ...props }, forwardedRef) => {
    const listRef = React.useRef<HTMLDivElement | null>(null);
    const [indicatorStyle, setIndicatorStyle] = React.useState({ x: 0, width: 0 });

    const updateIndicator = React.useCallback(() => {
      if (disableIndicator) return;
      const list = listRef.current;
      if (!list) return;

      const active = list.querySelector('[data-state="active"]') as HTMLElement | null;
      if (!active) return;

      const listRect = list.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();

      setIndicatorStyle({
        x: activeRect.left - listRect.left + list.scrollLeft,
        width: activeRect.width,
      });
    }, [disableIndicator]);

    React.useLayoutEffect(updateIndicator, [updateIndicator]);

    React.useEffect(() => {
      const list = listRef.current;
      if (!list) return;

      const resizeObs = new ResizeObserver(updateIndicator);
      resizeObs.observe(list);
      list.addEventListener('scroll', updateIndicator, { passive: true });
      return () => {
        resizeObs.disconnect();
        list.removeEventListener('scroll', updateIndicator);
      };
    }, [updateIndicator]);

    return (
      <div className="relative w-full">
        <TabsPrimitive.List
          ref={(node) => {
            listRef.current = node;
            if (typeof forwardedRef === 'function') forwardedRef(node);
            else if (forwardedRef) (forwardedRef as React.MutableRefObject<typeof node>).current = node;
          }}
          className={cn(
            'relative flex items-center justify-start rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 p-1 backdrop-blur-sm gap-1',
            'border border-neutral-200/60 dark:border-neutral-700/60 shadow-inner',
            'overflow-x-auto scrollbar-hide', // يمكنك تعريف scrollbar-hide في التيلويند
            className
          )}
          {...props}
        >
          {children}
        </TabsPrimitive.List>

        {!disableIndicator && (
          <motion.div
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full shadow-[0_0_8px_rgba(91,54,232,0.4)]"
            initial={false}
            animate={indicatorStyle}
            transition={{ 
              duration: 0.3, 
              ease: [0.22, 1, 0.36, 1], // Custom easeOut
            }}
            style={{ transformOrigin: 'left' }}
          />
        )}
      </div>
    );
  }
);
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const prefersReducedMotion = React.useContext(React.createContext(false));
  
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex-1 min-w-[100px] select-none rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-900 data-[state=active]:text-primary-600 dark:data-[state=active]:text-primary-400 data-[state=active]:shadow-sm',
        'hover:bg-neutral-50 dark:hover:bg-neutral-800/80 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-105',
        'text-neutral-700 dark:text-neutral-300 disabled:opacity-50 disabled:pointer-events-none',
        'active:scale-95',
        className
      )}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white/90 dark:bg-neutral-900/80 backdrop-blur-sm',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      className
    )}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  </TabsPrimitive.Content>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };