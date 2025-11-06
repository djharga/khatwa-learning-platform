'use client';

import { usePathname } from 'next/navigation';
import FooterComponent from '../components/layout/FooterComponent';
import BottomNavigation from '../components/layout/BottomNavigation';
import WhatsappFloatButton from '../components/WhatsappFloatButton';
import ChatAssistantWidget from '../components/ChatAssistantWidget';

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isLessonPage = pathname?.includes('/lesson/');
  
  if (isLessonPage) {
    return null;
  }
  
  return <FooterComponent />;
}

export function ConditionalBottomNav() {
  const pathname = usePathname();
  const isLessonPage = pathname?.includes('/lesson/');
  
  if (isLessonPage) {
    return null;
  }
  
  return <BottomNavigation />;
}

export function ConditionalWidgets() {
  const pathname = usePathname();
  const isLessonPage = pathname?.includes('/lesson/');
  
  if (isLessonPage) {
    return null;
  }
  
  return (
    <>
      <WhatsappFloatButton />
      <ChatAssistantWidget />
      <footer className="text-center p-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} خطى للتدريب والاستشارات. جميع
        الحقوق محفوظة.
        <br />
        تصميم: ICODE - تطوير بواسطة WINDSURFER AI
      </footer>
    </>
  );
}

