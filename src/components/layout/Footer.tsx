'use client';

import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    company: [
      { label: 'عن المنصة', href: '/about' },
      { label: 'الدورات', href: '/courses' },
      { label: 'الشهادات', href: '/certificates' },
      { label: 'المدونة', href: '/blog' },
      { label: 'من نحن', href: '/about' },
    ],
    services: [
      { label: 'الاستشارات', href: '/consulting' },
      { label: 'ملتقى المراجعين', href: '/auditors-fellowship' },
      { label: 'ورش العمل', href: '/workshops' },
      { label: 'مسارات التعلم', href: '/learning-paths' },
      { label: 'الموارد', href: '/resources' },
    ],
    support: [
      { label: 'الدعم الفني', href: '/support' },
      { label: 'الأسئلة الشائعة', href: '/faq' },
      { label: 'اتصل بنا', href: '/contact' },
      { label: 'المجتمع', href: '/community' },
      { label: 'بنك الأسئلة', href: '/question-bank' },
    ],
    legal: [
      { label: 'الخصوصية', href: '/privacy' },
      { label: 'الشروط والأحكام', href: '/terms' },
      { label: 'سياسة الاسترجاع', href: '/refund-policy' },
      { label: 'سياسة الاستخدام', href: '/usage-policy' },
    ],
  };

  const courses = [
    { label: 'أساسيات المالية', href: '/finance-basics' },
    { label: 'المراجعة الداخلية', href: '/internal-audit' },
    { label: 'الإدارة المالية', href: '/financial-management' },
    { label: 'التقارير المالية', href: '/financial-reporting' },
    { label: 'إدارة المخازن', href: '/warehouse-management' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-slate-900 text-gray-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* عن المنصة */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                خطى
              </span>
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              منصة تعليمية متخصصة في المحاسبة والمراجعة المالية، نقدم دورات احترافية ومسارات تعليمية متكاملة.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* الشركة */}
          <div>
            <h4 className="font-semibold text-white mb-4">الشركة</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الخدمات */}
          <div>
            <h4 className="font-semibold text-white mb-4">الخدمات</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الدعم */}
          <div>
            <h4 className="font-semibold text-white mb-4">الدعم</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* الدورات الشائعة */}
          <div>
            <h4 className="font-semibold text-white mb-4">دورات شائعة</h4>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.href}>
                  <Link
                    href={course.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {course.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500">البريد الإلكتروني</p>
                <p className="text-sm text-white">info@khatwa.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500">الهاتف</p>
                <p className="text-sm text-white">+966 xx xxx xxxx</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500">العنوان</p>
                <p className="text-sm text-white">الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © 2025 منصة خطى. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-blue-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
