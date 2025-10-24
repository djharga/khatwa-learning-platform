'use client';

import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Search,
  ChevronUp,
  Sparkles,
  Heart,
} from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';
import { footerSections, socialLinks, contactInfo } from './layout-data';
import { useState, useRef, useEffect } from 'react';
import { Icon, IconWrapper } from '@/components/ui/Icon';

/**
 * Maps social media icon identifiers to their corresponding lucide-react icon components
 * @param iconName - The string identifier for the social icon (e.g., 'facebook')
 * @returns The corresponding lucide-react icon component
 */
const getSocialIcon = (iconName: string) => {
  switch (iconName) {
    case 'facebook':
      return Facebook;
    case 'twitter':
      return Twitter;
    case 'linkedin':
      return Linkedin;
    case 'youtube':
      return Youtube;
    case 'instagram':
      return Instagram;
    default:
      return Facebook; // Fallback
  }
};

/**
 * Maps contact icon identifiers to their corresponding lucide-react icon components
 * @param iconName - The string identifier for the contact icon (e.g., 'mail')
 * @returns The corresponding lucide-react icon component
 */
const getContactIcon = (iconName: string) => {
  switch (iconName) {
    case 'mail':
      return Mail;
    case 'phone':
      return Phone;
    case 'map-pin':
      return MapPin;
    default:
      return Mail; // Fallback
  }
};

/**
 * Footer brand section displaying logo, description, contact information, and social media links with animated hover effects
 */
interface BrandSectionProps {
  contactInfo: typeof contactInfo;
  socialLinks: typeof socialLinks;
}

const BrandSection = ({ contactInfo, socialLinks }: BrandSectionProps) => (
  <div className="lg:col-span-4 space-y-6">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
        <span className="text-3xl">🎓</span>
      </div>
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
          خطى التعليمية
        </h3>
        <p className="text-blue-200 font-medium">
          منصة التعلم المهني الأولى
        </p>
      </div>
    </div>

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-md">
      منصة تعليمية متخصصة في المراجعة الداخلية والمحاسبة، نقدم محتوى عالي الجودة
      ومسارات تعليمية متكاملة لتطوير المهارات المهنية والارتقاء بالكفاءات
      العملية.
    </p>

    {/* Contact Info */}
    <div className="space-y-3">
      {contactInfo.map((info, index) => {
        const IconComponent = getContactIcon(info.icon);
        return (
          <a
            key={index}
            href={info.href}
            className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors px-4 py-3 rounded-xl hover:bg-white/5"
          >
            <Icon icon={IconComponent} size="md" variant="info" className="text-blue-400" />
            <span className="text-sm sm:text-base font-medium">
              {info.text}
            </span>
          </a>
        );
      })}
    </div>

    {/* Social Links */}
    <div className="flex gap-3">
      {socialLinks.map((social, index) => {
        const IconComponent = getSocialIcon(social.icon);
        return (
          <a
            key={index}
            href={social.href}
            className={`w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 ${social.color}`}
            aria-label={social.label}
          >
            <Icon icon={IconComponent} size="md" className="text-white" />
          </a>
        );
      })}
    </div>
  </div>
);

/**
 * Grid of footer navigation links organized by category with animated hover effects and gradient backgrounds
 */
interface FooterLinksGridProps {
  sections: typeof footerSections;
}
const FooterLinksGrid = ({ sections }: FooterLinksGridProps) => (
  <div className="lg:col-span-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
      {sections.map((section) => (
        <div key={section.title} className="space-y-4">
          <h4 className="text-lg sm:text-xl font-bold text-white border-b border-white/20 pb-3">
            {section.title}
          </h4>
          <ul className="space-y-3">
            {section.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"></span>
                  <span className="font-medium">{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

/**
 * Quick search component for footer navigation
 */
const QuickSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const quickLinks = [
    { text: 'الدورات التدريبية', href: '/courses' },
    { text: 'المراجعة الداخلية', href: '/internal-audit' },
    { text: 'المحاسبة', href: '/financial-management' },
    { text: 'الاستشارات', href: '/consulting' },
    { text: 'الدعم الفني', href: '/support' },
  ];

  const filteredLinks = quickLinks.filter((link) =>
    link.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mb-8">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              placeholder="البحث السريع في الموقع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
              className="input-base w-full pr-12 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Icon icon={Search} size="md" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {isExpanded && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 rounded-2xl border border-white/20 overflow-hidden z-10 shadow-xl">
              {filteredLinks.length > 0 ? (
                filteredLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-white hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0"
                  >
                    {link.text}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-400 text-sm">
                  لا توجد نتائج
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Newsletter subscription section with email input and call-to-action button. Includes privacy notice and animated interactions.
 */
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-12 lg:pt-16 border-t border-white/20">
      <QuickSearch />

      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h4 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-3">
            <Icon icon={Sparkles} size="xl" className="text-yellow-400" />
            سجل بريدك ليصلك كل جديد
            <Icon icon={Sparkles} size="xl" className="text-yellow-400" />
          </h4>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            احصل على آخر التحديثات والدورات الجديدة مباشرة في بريدك الإلكتروني
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-base flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400"
          />
          <button
            onClick={handleSubscribe}
            disabled={isSubscribed}
            className="btn-primary px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubscribed ? (
              <span className="flex items-center gap-2">
                <Icon icon={Heart} size="md" className="text-red-400" />
                تم الاشتراك!
              </span>
            ) : (
              'اشتراك مجاني'
            )}
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed flex items-center justify-center gap-2">
          <Icon icon={Heart} size="sm" className="text-red-400" />
          نحن نحترم خصوصيتك. لن نشارك بريدك الإلكتروني مع أي طرف ثالث ولن نرسل
          لك رسائل مزعجة.
          <Icon icon={Heart} size="sm" className="text-red-400" />
        </p>
      </div>
                    </div>
  );
};

/**
 * Footer bottom bar with copyright notice and legal links. Displays year dynamically and includes hover effects.
 */
interface BottomBarProps {
  currentYear: string;
}

const BottomBar = ({ currentYear }: BottomBarProps) => (
  <div className="border-t border-white/20 bg-slate-900/50 mt-12 sm:mt-16 lg:mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="text-gray-300 text-sm sm:text-base font-medium">
          <p>
            © {currentYear} خطى التعليمية. جميع الحقوق محفوظة. صنع بـ ❤️
            للمجتمع التعليمي العربي
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm">
          {[
            { href: '/privacy', text: 'سياسة الخصوصية' },
            { href: '/terms', text: 'شروط الاستخدام' },
            { href: '/cookies', text: 'سياسة الكوكيز' },
            { href: '/sitemap', text: 'خريطة الموقع' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/**
 * Main footer component with gradient background, animated elements, and comprehensive site navigation. Features brand section, link grid, newsletter signup, and bottom bar with legal links. Includes parallax effects and glass morphism styling.
 */
const FooterComponent = () => {
  const currentYear = toEnglishDigits(new Date().getFullYear());

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10"></div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16">
          <BrandSection contactInfo={contactInfo} socialLinks={socialLinks} />
          <FooterLinksGrid sections={footerSections} />
        </div>
        <NewsletterSection />
      </div>
      <BottomBar currentYear={currentYear} />
    </footer>
  );
};

export default FooterComponent;
