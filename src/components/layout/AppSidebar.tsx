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
  ShieldCheck, X
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

  // تحديد role المستخدم أو استخدام 'student' كافتراضي
  const userRole = user?.role || 'student';
  const isAuthenticatedUser = isAuthenticated && !authLoading;

  const [openCategories, setOpenCategories] = useState<string[]>(['learning', 'account']);
  // استخدام قيمة أولية متسقة لتجنب مشاكل hydration
  // على الشاشات الكبيرة، الافتراضي يكون مفتوح لتجنب layout shift
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem('sidebarOpen');
      if (saved !== null) return saved === 'true';
      // على الشاشات الكبيرة، الافتراضي يكون مفتوح
      return window.innerWidth >= 1024;
    } catch {
      return false;
    }
  });
  const [isMounted, setIsMounted] = useState(false);

  // تهيئة الحالة بعد mount لتجنب مشاكل hydration
  useEffect(() => {
    setIsMounted(true);
    // قراءة الحالة من localStorage أو استخدام حجم الشاشة
    try {
      const saved = localStorage.getItem('sidebarOpen');
      let initialValue: boolean;
      if (saved !== null) {
        initialValue = saved === 'true';
      } else {
        // استخدام حجم الشاشة كافتراضي - على الشاشات الكبيرة يكون مفتوح
        initialValue = window.innerWidth >= 1024;
      }
      setIsOpen(initialValue);
      // إرسال الحدث فوراً بعد التهيئة لإعلام LayoutWrapper
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('sidebarStateChange', { 
          detail: { isOpen: initialValue },
          bubbles: true 
        }));
      }, 0);
    } catch {
      // في حالة الخطأ، نستخدم القيمة الافتراضية
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
      // إرسال حدث مخصص مع تفاصيل الحالة الجديدة لـ LayoutWrapper
      window.dispatchEvent(new CustomEvent('sidebarStateChange', { 
        detail: { isOpen },
        bubbles: true 
      }));
    } catch (error) {
      console.warn('Failed to save sidebar state:', error);
    }
  }, [isOpen, isMounted]);

  // إغلاق Sidebar تلقائياً عند تغيير الصفحة (على الموبايل)
  useEffect(() => {
    if (!isMounted) return;
    
    // إغلاق Sidebar على الشاشات الصغيرة عند التنقل
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

  // الحصول على عناصر التنقل بناءً على role المستخدم وحالة الاشتراك
  // استخدام 'student' كافتراضي إذا لم يكن المستخدم مسجل دخول
  const navigationItems = getSidebarItems(
    isAuthenticatedUser ? userRole : 'student',
    hasSubscription && !subscriptionLoading
  );
  const isActive = (href: string) => isActiveLink(href, pathname);

  const NavigationItem = ({ item, active, idx }: any) => {
    const IconComp = iconMap[item.icon as keyof typeof iconMap] || Home;
    return (
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 5 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : { delay: idx * 0.03, duration: 0.2 }}
      >
        <Link
          href={item.href}
          className={`group flex items-center gap-3 p-3 rounded-lg text-sm transition-all duration-200 ease-out ${
            active
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400'
          }`}
        >
          <div
            className={`p-1.5 rounded-md transition-all ${
              active
                ? 'bg-white/25'
                : 'bg-neutral-100 dark:bg-neutral-700 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40'
            }`}
          >
            <IconComp
              className={`w-4 h-4 ${
                active ? 'text-white' : 'text-neutral-600 dark:text-neutral-400 group-hover:text-primary-500'
              }`}
            />
          </div>
          <span className="flex-1 font-medium">{item.name}</span>
          {active && <div className="w-2 h-2 rounded-full bg-white" />}
        </Link>
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
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-3.5 rounded-lg text-sm font-semibold text-neutral-900 dark:text-white bg-neutral-50/60 dark:bg-neutral-800/40 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 shadow-sm transition-all"
      >
        <span className="flex items-center gap-3">
          <ChevronRight
            className={`w-4 h-4 text-primary-500 transition-transform ${
              expanded ? 'rotate-0' : '-rotate-90'
            }`}
          />
          {section.title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 transition-transform ${
            expanded ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="space-y-1 ps-5"
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
    <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md">
      <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400 tracking-tight">
        خطي التعليمية
      </h2>
      <button
        onClick={onClose}
        className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-primary-500"
      >
        <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
      </button>
    </div>
  );

  const SidebarFooter = () => (
    <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md text-center">
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        © 2024 منصة خطي التعليمية
      </p>
    </div>
  );
  // لا نعرض أي شيء حتى يتم mount لتجنب مشاكل hydration
  if (!isMounted) {
    return null;
  }

  // عرض حالة التحميل إذا كانت البيانات ما زالت تُحمل
  if (authLoading || subscriptionLoading) {
    return (
      <>
        {!isOpen && (
          <div className="hidden lg:block">
            <SidebarToggleButton
              isOpen={isOpen}
              onClick={() => setIsOpen(true)}
              variant="floating"
            />
          </div>
        )}
        <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
            className="hidden lg:flex flex-col fixed start-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-e border-neutral-200 dark:border-neutral-700 shadow-xl z-40"
          >
              <SidebarHeader onClose={() => setIsOpen(false)} />
              <nav className="flex-1 overflow-y-auto p-4 space-y-4 flex items-center justify-center">
                <div className="text-center text-neutral-500 dark:text-neutral-400">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-2"></div>
                  <p className="text-sm">جاري التحميل...</p>
                </div>
              </nav>
              <SidebarFooter />
            </motion.aside>
          )}
        </AnimatePresence>
      </>
    );
  }

  // إذا لم يكن هناك عناصر تنقل، لا تعرض الـ sidebar
  if (!navigationItems || navigationItems.length === 0) {
    return null;
  }

  return (
    <>
      {!isOpen && (
        <div className="hidden lg:block">
          <SidebarToggleButton
            isOpen={isOpen}
            onClick={() => setIsOpen(true)}
            variant="floating"
          />
        </div>
      )}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { x: 0, opacity: 1 } : { x: -320, opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25 }}
            className="hidden lg:flex flex-col fixed start-0 top-16 h-[calc(100vh-4rem)] w-80 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-e border-neutral-200 dark:border-neutral-700 shadow-xl z-40"
          >
            <SidebarHeader onClose={() => setIsOpen(false)} />
            <nav className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
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
        )}
      </AnimatePresence>
    </>
  );
};

export default AppSidebar;
