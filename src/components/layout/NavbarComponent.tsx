'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Home, BookOpen, Settings, Users, MessageSquare, Menu, X, LogIn, UserPlus } from 'lucide-react';
import UserMenu from './UserMenu';
import { Icon } from '@/components/ui/Icon';

const NavbarComponent = () => {
  const [isMobileMenuOpen, setMobileMenu] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // تحديث من الـ Auth

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/courses', label: 'الدورات', icon: BookOpen },
    { href: '/learning-paths', label: 'المسارات', icon: Settings },
    { href: '/resources', label: 'المكتبة', icon: BookOpen },
    { href: '/community', label: 'المجتمع', icon: Users },
    { href: '/consulting', label: 'الاستشارات', icon: MessageSquare },
  ];

  return (
    <>
      {/* شريط التنقل */}
      <nav className="fixed top-0 right-0 left-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* الشعار */}
            <Link 
              href="/" 
              className="text-2xl font-bold text-slate-900 hover:text-blue-600 transition-colors flex items-center gap-2"
            >
              <span className="text-blue-600">خطى</span>
            </Link>

            {/* روابط سطح المكتب */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label, icon: IconComponent }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2 text-slate-700 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-2 rounded-lg font-medium"
                >
                  <Icon icon={IconComponent} size="sm" className="text-current" />
                  <span>{label}</span>
                </Link>
              ))}
              
              {/* أزرار التسجيل */}
              <div className="flex items-center gap-2 mr-4 pr-4 border-r border-slate-200">
                {isLoggedIn ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="btn-ghost px-5 py-2.5 flex items-center gap-2"
                    >
                      <Icon icon={LogIn} size="sm" className="text-current" />
                      <span>تسجيل الدخول</span>
                    </Link>
                    <Link
                      href="/register"
                      className="btn-primary px-5 py-2.5 flex items-center gap-2"
                    >
                      <Icon icon={UserPlus} size="sm" className="text-white" />
                      <span>التسجيل</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* زر القائمة للجوال */}
            <button
              onClick={() => setMobileMenu(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? (
                <Icon icon={X} size="lg" className="text-current" />
              ) : (
                <Icon icon={Menu} size="lg" className="text-current" />
              )}
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة للجوال */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-200 ease-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 space-y-2 bg-slate-50 border-t border-slate-200">
            {navLinks.map(({ href, label, icon: IconComponent }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-white rounded-lg transition-colors"
              >
                <Icon icon={IconComponent} size="md" className="text-current" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
            
            <div className="border-t border-slate-200 my-2" />
            
            <Link
              href="/login"
              onClick={() => setMobileMenu(false)}
              className="btn-ghost w-full justify-start flex items-center gap-3"
            >
              <Icon icon={LogIn} size="md" className="text-current" />
              <span>تسجيل الدخول</span>
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenu(false)}
              className="btn-primary w-full flex items-center gap-3"
            >
              <Icon icon={UserPlus} size="md" className="text-white" />
              <span>التسجيل</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* مساحة فارغة لتعويض ارتفاع شريط التنقل الثابت */}
      <div className="h-16" />
    </>
  );
};

export default NavbarComponent;
