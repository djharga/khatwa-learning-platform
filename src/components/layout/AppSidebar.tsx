'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, BookOpen, FileText, Award, Users, Settings, Brain, FolderOpen,
  BarChart3, HelpCircle, MessageCircle, ChevronDown, ChevronRight,
  Video, CreditCard, Shield, Star, LibraryBig, Calculator,
  ShieldCheck, X, Menu
} from 'lucide-react';
import SidebarToggleButton from '@/components/ui/SidebarToggleButton';
import { useState, useEffect } from 'react';
import { getSidebarItems, isActiveLink } from '@/lib/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const iconMap = {
  home: Home,
  dashboard: Home,
  courses: BookOpen,
  exam: FileText,
  exams: FileText,
  award: Award,
  certificates: Award,
  users: Users,
  settings: Settings,
  brain: Brain,
  folder: FolderOpen,
  reports: BarChart3,
  video: Video,
  admin: Shield,
  help: HelpCircle,
  contact: MessageCircle,
  support: MessageCircle,
  paths: Users,
  resources: LibraryBig,
  subscription: CreditCard,
  calculator: Calculator,
  'internal-auditor': ShieldCheck,
  'financial-management': Calculator,
  'student-exam': FileText,
};

interface AppSidebarProps {
  disabled?: boolean;
}

const AppSidebar = ({ disabled = false }: AppSidebarProps) => {
  const pathname = usePathname();
  const { isAuthenticated, user, isLoading: authLoading } = useAuth();
  const { data: subscriptionData, isLoading: subscriptionLoading } = useSubscription();
  const hasSubscription = subscriptionData?.hasSubscription || false;
  const prefersReducedMotion = useReducedMotion();

  const userRole = user?.role || 'student';
  const isAuthenticatedUser = isAuthenticated && !authLoading;

  const [openCategories, setOpenCategories] = useState<string[]>(['learning', 'account']);
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('sidebarOpen');
      if (saved !== null) return saved === 'true';
      return window.innerWidth >= 1024;
    } catch {
      return false;
    }
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('sidebarOpen');
      let initialValue: boolean;
      if (saved !== null) {
        initialValue = saved === 'true';
      } else {
        initialValue = window.innerWidth >= 1024;
      }
      setIsOpen(initialValue);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('sidebarStateChange', { 
          detail: { isOpen: initialValue },
          bubbles: true 
        }));
      }, 0);
    } catch {
      const defaultValue = window.innerWidth >= 1024;
      setIsOpen(defaultValue);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('sidebarStateChange', { 
          detail: { isOpen: defaultValue },
          bubbles: true 
        }));
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const resizeHandler = () => {
      if (window.innerWidth < 1024) setIsOpen(false);
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    try {
      localStorage.setItem('sidebarOpen', String(isOpen));
      window.dispatchEvent(new CustomEvent('sidebarStateChange', { 
        detail: { isOpen },
        bubbles: true 
      }));
    } catch (error) {
      console.warn('Failed to save sidebar state:', error);
    }
  }, [isOpen, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    if (window.innerWidth < 1024 && isOpen) {
      setIsOpen(false);
    }
  }, [pathname, isMounted, isOpen]);

  useEffect(() => {
    if (disabled) return;
    const keyHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsOpen((p) => !p);
      }
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [disabled]);

  const toggleCategory = (cat: string) =>
    setOpenCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const navigationItems = getSidebarItems(
    isAuthenticatedUser ? userRole : 'student',
    hasSubscription && !subscriptionLoading,
    isAuthenticatedUser
  );
  const isActive = (href: string) => isActiveLink(href, pathname);

  const NavigationItem = ({ item, active, idx }: any) => {
    const IconComp = iconMap[item.icon as keyof typeof iconMap] || Home;
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, x: -5 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: idx * 0.03, duration: 0.2 }}
      >
        <motion.div
          whileHover={!active ? { x: 4, scale: 1.01 } : {}}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <Link
            href={item.href}
            className={`group flex items-center gap-4 p-4 rounded-xl text-sm transition-all duration-200 ease-out min-h-[48px] ${
              active
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25 border border-primary-500/40'
                : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-600 border border-transparent hover:border-neutral-200 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2'
            }`}
            aria-current={active ? 'page' : undefined}
            aria-label={item.name}
            dir="rtl"
          >
            <div
              className={`p-2.5 rounded-lg transition-all duration-200 ease-out ${
                active
                  ? 'bg-white/20'
                  : 'bg-neutral-100 group-hover:bg-primary-50'
              }`}
            >
              <IconComp
                className={`w-5 h-5 transition-colors duration-200 ease-out ${
                  active ? 'text-white' : 'text-neutral-600 group-hover:text-primary-600'
                }`}
                strokeWidth={2}
                aria-hidden="true"
              />
            </div>
            <span className="flex-1 font-semibold">{item.name}</span>
            {active && (
              <motion.div 
                className="w-2 h-2 rounded-full bg-white shadow-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            )}
          </Link>
        </motion.div>
      </motion.div>
    );
  };

  const CategorySection = ({ section, expanded, toggle, idx }: any) => (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 5 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { delay: idx * 0.05 }}
      className="space-y-2"
    >
      <motion.button
        onClick={toggle}
        className={`w-full flex items-center justify-between p-4 rounded-xl text-sm font-bold text-neutral-900 border transition-all duration-200 ease-out min-h-[48px] focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 ${
          expanded 
            ? 'bg-primary-50 border-primary-300 shadow-md' 
            : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100 hover:border-neutral-300'
        }`}
        whileHover={prefersReducedMotion ? {} : { scale: 1.01, y: -1 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        aria-expanded={expanded}
        aria-controls={`sidebar-section-${section.title}`}
        aria-label={`${expanded ? 'إغلاق' : 'فتح'} قسم ${section.title}`}
        dir="rtl"
      >
        <span className="flex items-center gap-3">
          <ChevronRight
            className={`w-[18px] h-[18px] text-primary-600 transition-transform duration-[200ms] ease-out ${
              expanded ? 'rotate-0' : '-rotate-90'
            }`}
            strokeWidth={2.5}
            aria-hidden="true"
          />
          {section.title}
        </span>
        <ChevronDown
          className={`w-[18px] h-[18px] text-neutral-500 transition-transform duration-[200ms] ease-out ${
            expanded ? 'rotate-180' : 'rotate-0'
          }`}
          strokeWidth={2.5}
          aria-hidden="true"
        />
      </motion.button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { 
              duration: 0.2,
              ease: [0, 0, 0.2, 1],
              opacity: { duration: 0.2 }
            }}
            style={{ overflow: 'hidden' }}
            className="space-y-2 ps-6"
            id={`sidebar-section-${section.title}`}
            role="region"
            aria-label={`عناصر ${section.title}`}
          >
            {section.items.map((item: any, i: number) => (
              <NavigationItem key={item.href} item={item} active={isActive(item.href)} idx={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const SidebarHeader = ({ onClose }: { onClose: () => void }) => (
    <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-gradient-to-r from-white to-neutral-50/50">
      <h2 className="text-xl font-extrabold text-primary-600 tracking-tight" dir="rtl">
        خطي التعليمية
      </h2>
      <motion.button
        onClick={onClose}
        className="p-2.5 rounded-xl hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 transition-all duration-[200ms] ease-out min-h-[44px] min-w-[44px] flex items-center justify-center"
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label="إغلاق القائمة الجانبية"
      >
        <X className="w-5 h-5 text-neutral-600" strokeWidth={2.5} aria-hidden="true" />
      </motion.button>
    </div>
  );

  const SidebarFooter = () => (
    <div className="p-5 border-t border-neutral-200 bg-white text-center space-y-3">
      <p className="text-xs font-medium text-neutral-600">
        © 2024 منصة خطي التعليمية
      </p>
    </div>
  );

  if (!isMounted) {
    return null;
  }

  if (authLoading || subscriptionLoading) {
    return (
      <>
        {/* زر التبديل على كل الشاشات */}
        <div className="block">
          <SidebarToggleButton
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            variant="floating"
          />
        </div>
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Overlay للموبايل */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-[55] lg:hidden backdrop-blur-sm"
                aria-hidden="true"
              />
              
              {/* Sidebar - يظهر على كل الشاشات */}
              <motion.aside
                initial={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { 
                  duration: 0.3,
                  ease: [0, 0, 0.2, 1]
                }}
                className="flex flex-col fixed start-0 top-16 h-[calc(100vh-4rem)] w-80 border-e border-neutral-200 z-[60] rounded-r-2xl shadow-2xl"
                style={{
                  backgroundColor: 'rgb(255, 255, 255)',
                }}
              >
                <SidebarHeader onClose={() => setIsOpen(false)} />
                <nav className="flex-1 overflow-y-auto p-5 space-y-5 flex items-center justify-center">
                  <div className="text-center text-neutral-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                    <p className="text-sm">جاري التحميل...</p>
                  </div>
                </nav>
                <SidebarFooter />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (!navigationItems || navigationItems.length === 0) {
    return (
      <>
        <div className="block">
          <SidebarToggleButton
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            variant="floating"
          />
        </div>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 z-[55] lg:hidden backdrop-blur-sm"
                aria-hidden="true"
              />
              
              <motion.aside
                initial={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { 
                  duration: 0.3,
                  ease: [0, 0, 0.2, 1]
                }}
                className="flex flex-col fixed start-0 top-16 h-[calc(100vh-4rem)] w-80 border-e border-neutral-200 z-[60] rounded-r-2xl shadow-2xl"
                style={{
                  backgroundColor: 'rgb(255, 255, 255)',
                }}
              >
                <SidebarHeader onClose={() => setIsOpen(false)} />
                <nav className="flex-1 overflow-y-auto p-5 space-y-5 flex items-center justify-center">
                  <div className="text-center text-neutral-500">
                    <p className="text-sm">لا توجد عناصر تنقل متاحة</p>
                  </div>
                </nav>
                <SidebarFooter />
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      {/* زر التبديل - يظهر على جميع الشاشات */}
      <div className="block">
        <SidebarToggleButton
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          variant="floating"
        />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay للموبايل فقط */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-[55] lg:hidden backdrop-blur-sm"
              aria-hidden="true"
            />
            
            {/* Sidebar - يظهر على جميع الشاشات */}
            <motion.aside
              initial={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { 
                duration: 0.3,
                ease: [0, 0, 0.2, 1]
              }}
              className="flex flex-col fixed start-0 top-16 h-[calc(100vh-4rem)] w-80 border-e border-neutral-200 z-[60] rounded-r-2xl shadow-2xl"
              style={{
                backgroundColor: 'rgb(255, 255, 255)',
              }}
            >
              <SidebarHeader onClose={() => setIsOpen(false)} />
              <nav 
                className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar" 
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#cbd5e1 transparent'
                }}
              >
                {navigationItems.map((sec: any, i: number) => (
                  <CategorySection
                    key={sec.category || i}
                    section={sec}
                    expanded={openCategories.includes(sec.category)}
                    toggle={() => toggleCategory(sec.category)}
                    idx={i}
                  />
                ))}
              </nav>
              <SidebarFooter />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSidebar;
