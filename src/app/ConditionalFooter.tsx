'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Lazy load components for better performance
const FooterComponent = dynamic(() => import('../components/layout/FooterComponent'), {
  ssr: false,
});

const BottomNavigation = dynamic(() => import('../components/layout/BottomNavigation'), {
  ssr: false,
});

const WhatsappFloatButton = dynamic(() => import('../components/WhatsappFloatButton'), {
  ssr: false,
});

const ChatAssistantWidget = dynamic(() => import('../components/ChatAssistantWidget'), {
  ssr: false,
});

/**
 * Conditionally renders FooterComponent based on current page
 * Hidden on lesson pages for full-screen experience
 */
export default function ConditionalFooter() {
  const pathname = usePathname();
  const isLessonPage = pathname?.includes('/lesson/');
  
  if (isLessonPage) {
    return null;
  }
  
  return <FooterComponent />;
}

/**
 * Conditionally renders BottomNavigation for mobile devices
 * Hidden on lesson pages for full-screen experience
 */
export function ConditionalBottomNav() {
  const pathname = usePathname();
  const isLessonPage = pathname?.includes('/lesson/');
  
  if (isLessonPage) {
    return null;
  }
  
  return <BottomNavigation />;
}

/**
 * Conditionally renders widgets (WhatsApp button, Chat assistant)
 * Hidden on lesson pages for full-screen experience
 */
export function ConditionalWidgets() {
  const pathname = usePathname();
  const isLessonPage = pathname?.includes('/lesson/');
  
  if (isLessonPage) {
    return null;
  }
  
  return (
    <>
      <WhatsappFloatButton />
    </>
  );
}

