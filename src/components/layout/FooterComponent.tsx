'use client';

import Link from 'next/link';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowUp,
  Award,
  Shield,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';
import { footerSections, socialLinks, contactInfo } from './layout-data';
import { useState, useEffect } from 'react';

/**
 * Maps social media icon identifiers to their corresponding lucide-react icon components
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
      return Facebook;
  }
};

/**
 * Maps contact icon identifiers to their corresponding lucide-react icon components
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
      return Mail;
  }
};

/**
 * Footer brand section with enhanced design
 */
interface BrandSectionProps {
  contactInfo: typeof contactInfo;
  socialLinks: typeof socialLinks;
}

const BrandSection = ({ contactInfo, socialLinks }: BrandSectionProps) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      {/* Logo and Brand */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-primary-600 dark:bg-primary-500 rounded-xl shadow-lg">
            <span className="text-2xl">🎓</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white leading-tight font-heading">
              خطى التعليمية
            </h3>
            <p className="text-neutral-300 text-base font-medium mt-1">
              منصة التعلم المهني الأولى
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-400 text-base leading-relaxed max-w-md">
        منصة تعليمية متخصصة في المراجعة الداخلية والمحاسبة، نقدم محتوى عالي الجودة
        ومسارات تعليمية متكاملة لتطوير المهارات المهنية والارتقاء بالكفاءات العملية.
      </p>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-2 pt-2">
        {[
          { icon: Award, text: 'شهادات معتمدة' },
          { icon: Shield, text: 'آمن ومضمون' },
          { icon: Clock, text: 'دعم 24/7' },
        ].map((badge, index) => {
          const BadgeIcon = badge.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 bg-white/5 dark:bg-neutral-800/50 rounded-lg border border-white/10 dark:border-neutral-700/50 hover:bg-white/10 dark:hover:bg-neutral-800/70 transition-colors"
            >
              <div className="p-1.5 bg-primary-500/20 rounded-lg">
                <BadgeIcon className="w-4 h-4 text-primary-400" />
              </div>
              <span className="text-sm text-neutral-300 font-medium">{badge.text}</span>
            </div>
          );
        })}
      </div>

      {/* Contact Info */}
      <div className="space-y-2 pt-4">
        {contactInfo.map((info, index) => {
          const IconComponent = getContactIcon(info.icon);
          return (
            <a
              key={index}
              href={info.href}
              className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-200 py-2 group"
              aria-label={info.text}
            >
              <div className="p-2 bg-white/5 dark:bg-neutral-800/50 rounded-lg group-hover:bg-primary-500/20 transition-colors">
                <IconComponent className="w-4 h-4 text-primary-400" aria-hidden="true" />
              </div>
              <span className="text-base font-medium">{info.text}</span>
            </a>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="flex gap-2 pt-4">
        {socialLinks.map((social, index) => {
          const IconComponent = getSocialIcon(social.icon);
          return (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/5 dark:bg-neutral-800/50 hover:bg-primary-500/20 rounded-lg flex items-center justify-center transition-all duration-200 border border-white/10 dark:border-neutral-700/50 hover:border-primary-500/50 hover:scale-105"
              aria-label={social.label}
            >
              <IconComponent className="w-5 h-5 text-neutral-400 hover:text-primary-400 transition-colors" aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Grid of footer navigation links with enhanced design
 */
interface FooterLinksGridProps {
  sections: typeof footerSections;
}

const FooterLinksGrid = ({ sections }: FooterLinksGridProps) => {
  return (
    <div className="lg:col-span-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h4 className="text-lg font-bold text-white border-b border-white/10 dark:border-neutral-700/50 pb-2">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm py-1 block"
                    aria-label={link.text}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Newsletter subscription section with enhanced design
 */
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-white/10 dark:border-neutral-700/50">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        {/* Header */}
        <div className="space-y-3">
          <h4 className="text-2xl font-bold text-white font-heading">
            سجل بريدك ليصلك كل جديد
          </h4>
          <p className="text-neutral-400 text-base leading-relaxed">
            احصل على آخر التحديثات والدورات الجديدة مباشرة في بريدك الإلكتروني
          </p>
        </div>

        {/* Email Input */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
              className="w-full pr-10 pl-4 py-3 bg-white/5 dark:bg-neutral-800/50 border border-white/10 dark:border-neutral-700/50 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              aria-label="البريد الإلكتروني للاشتراك في النشرة الإخبارية"
            />
          </div>
          <button
            onClick={handleSubscribe}
            disabled={isSubscribed || !email}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 min-h-[44px] shadow-md hover:shadow-lg"
            aria-label={isSubscribed ? "تم الاشتراك في النشرة الإخبارية" : "اشتراك في النشرة الإخبارية"}
          >
            {isSubscribed ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>تم الاشتراك!</span>
              </>
            ) : (
              <span>اشتراك</span>
            )}
          </button>
        </div>

        {/* Privacy Notice */}
        <p className="text-sm text-neutral-500 max-w-md mx-auto">
          نحن نحترم خصوصيتك. لن نشارك بريدك الإلكتروني مع أي طرف ثالث
        </p>
      </div>
    </div>
  );
};

/**
 * Footer bottom bar with enhanced design
 */
interface BottomBarProps {
  currentYear: string;
}

const BottomBar = ({ currentYear }: BottomBarProps) => {
  return (
    <div className="relative border-t border-white/10 dark:border-neutral-700/50 bg-neutral-900/50 dark:bg-neutral-950/50 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-neutral-400 text-sm text-center lg:text-right">
            <p>
              © {currentYear} خطى التعليمية. جميع الحقوق محفوظة.
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center flex-wrap justify-center gap-4 text-sm">
            {[
              { href: '/privacy', text: 'سياسة الخصوصية' },
              { href: '/terms', text: 'شروط الاستخدام' },
              { href: '/cookies', text: 'سياسة الكوكيز' },
              { href: '/sitemap', text: 'خريطة الموقع' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-400 hover:text-white transition-colors duration-200"
                aria-label={link.text}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main footer component with enhanced gradient background and modern design
 */
const FooterComponent = () => {
  const currentYear = toEnglishDigits(new Date().getFullYear());

  return (
    <footer className="relative bg-neutral-900 dark:bg-neutral-950 text-white border-t border-neutral-800 dark:border-neutral-800">
      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
