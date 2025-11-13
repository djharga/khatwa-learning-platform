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
  Award,
  Shield,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';
import { footerSections, socialLinks, contactInfo } from './layout-data';
import { useState } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="lg:col-span-4 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Logo and Brand */}
      <div className="mb-8">
        <motion.div 
          className="flex items-center gap-3 mb-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="p-3.5 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl shadow-lg relative overflow-hidden"
            whileHover={{ 
              boxShadow: '0 10px 25px rgba(99, 102, 241, 0.3)',
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-2xl relative z-10 block" style={{ fontSize: '1.75rem' }}>🎓</span>
          </motion.div>
          <div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent leading-tight">
              خطى التعليمية
            </h3>
            <p className="text-neutral-200 text-base font-medium mt-2">
              منصة التعلم المهني الأولى
            </p>
          </div>
        </motion.div>
      </div>

      {/* Description - Enhanced spacing and line-height */}
      <p className="text-neutral-300 text-base leading-loose max-w-md mb-4">
        منصة تعليمية متخصصة في المراجعة الداخلية والمحاسبة، نقدم محتوى عالي الجودة
        ومسارات تعليمية متكاملة لتطوير المهارات المهنية والارتقاء بالكفاءات العملية.
      </p>

      {/* Trust Badges - Enhanced contrast, no glow, unified height, clean hover */}
      <div className="flex flex-wrap gap-3 pt-2">
        {[
          { icon: Award, text: 'شهادات معتمدة', bgColor: 'bg-yellow-500/20', iconBgColor: 'bg-yellow-500/20', iconColor: 'text-yellow-400', hoverStyle: 'hover:bg-yellow-500/30' },
          { icon: Shield, text: 'آمن ومضمون', bgColor: 'bg-green-500/20', iconBgColor: 'bg-green-500/20', iconColor: 'text-green-400', hoverStyle: 'hover:bg-green-500/30' },
          { icon: Clock, text: 'دعم 24/7', bgColor: 'bg-blue-500/20', iconBgColor: 'bg-blue-500/20', iconColor: 'text-blue-400', hoverStyle: 'hover:bg-blue-500/30' },
        ].map((badge, index) => {
          const BadgeIcon = badge.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: index === 0 ? 'rgba(234, 179, 8, 0.3)' : index === 1 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(59, 130, 246, 0.3)',
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 ${badge.bgColor} rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer`}
            >
              <div className={`p-1.5 ${badge.iconBgColor} rounded-lg`}>
                <BadgeIcon className={`w-5 h-5 ${badge.iconColor}`} strokeWidth={2} />
              </div>
              <span className="text-sm text-neutral-200 font-medium">{badge.text}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Contact Info - Unified icon sizes, improved spacing and colors */}
      <div className="space-y-3 pt-4">
        {contactInfo.map((info, index) => {
          const IconComponent = getContactIcon(info.icon);
          return (
            <motion.a
              key={index}
              href={info.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 text-neutral-200 hover:text-white transition-colors duration-200 py-2.5 group"
              aria-label={info.text}
            >
              <motion.div 
                className="p-2 bg-primary-500/10 rounded-lg group-hover:bg-primary-500/20 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
              >
                <IconComponent className="w-5 h-5 text-primary-300 group-hover:text-primary-200 transition-colors" aria-hidden="true" strokeWidth={2} />
              </motion.div>
              <span className="text-base font-medium">{info.text}</span>
            </motion.a>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="flex gap-2 pt-4">
        {socialLinks.map((social, index) => {
          const IconComponent = getSocialIcon(social.icon);
          return (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
              whileHover={{ 
                scale: 1.1,
              }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-to-br from-white/10 to-white/5 hover:from-primary-500/30 hover:to-purple-500/30 rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-primary-400/50 relative overflow-hidden group hover-glow-primary-xs transition-glow"
              aria-label={social.label}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <IconComponent className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors relative z-10" aria-hidden="true" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
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
    <motion.div 
      className="lg:col-span-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, sectionIndex) => (
          <motion.div 
            key={section.title} 
            className="flex flex-col h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + sectionIndex * 0.1 }}
          >
            <div className="relative bg-gradient-to-br from-white/5 via-white/3 to-transparent rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group h-full flex flex-col">
              {/* Top border - subtle white line with 10% opacity */}
              <div className="absolute top-0 right-0 left-0 h-px bg-white/10" />
              <h4 className="text-lg font-extrabold text-white pb-3 mb-5 relative min-h-[2.5rem]">
                <span className="relative z-10 block">{section.title}</span>
              </h4>
              <ul className="space-y-2.5 flex-1">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="text-neutral-200 hover:text-white transition-all duration-200 text-sm py-2 block relative group/link leading-relaxed font-normal"
                      aria-label={link.text}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span>{link.text}</span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
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
    <motion.div 
      className="mt-8 pt-8 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-2xl mx-auto">
        {/* Glassmorphism Container */}
        <div className="relative bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-elevation-4 hover:shadow-elevation-5 overflow-hidden group hover-glow-primary-sm">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)] opacity-50" />
          
          <div className="relative z-10 text-center space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <motion.h4 
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent font-heading heading-tech text-shadow-primary"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                سجل بريدك ليصلك كل جديد
              </motion.h4>
              <motion.p 
                className="text-neutral-300 text-base leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                احصل على آخر التحديثات والدورات الجديدة مباشرة في بريدك الإلكتروني
              </motion.p>
            </div>

            {/* Email Input */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="relative flex-1">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-300 z-10" />
                <input
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                  className="w-full pr-10 pl-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200 hover:bg-white/15 relative z-0 focus-glow-primary"
                  aria-label="البريد الإلكتروني للاشتراك في النشرة الإخبارية"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-400/10 to-purple-500/0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              <motion.button
                onClick={handleSubscribe}
                disabled={isSubscribed || !email}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px] shadow-primary-md hover:shadow-primary-lg hover-glow-primary-md focus-glow-primary relative overflow-hidden group/btn"
                aria-label={isSubscribed ? "تم الاشتراك في النشرة الإخبارية" : "اشتراك في النشرة الإخبارية"}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 -translate-x-full group-hover/btn:translate-x-full" />
                <span className="relative z-10 flex items-center gap-2">
                  {isSubscribed ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>تم الاشتراك!</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      <span>اشتراك</span>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>

            {/* Privacy Notice */}
            <motion.p 
              className="text-sm text-neutral-400 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              نحن نحترم خصوصيتك. لن نشارك بريدك الإلكتروني مع أي طرف ثالث
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
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
    <motion.div 
      className="relative bg-gradient-to-r from-neutral-900/80 via-purple-950/50 to-neutral-900/80 backdrop-blur-sm mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <motion.div 
            className="text-neutral-300 text-sm text-center lg:text-right"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p>
              © {currentYear} <span className="bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent font-semibold">خطى التعليمية</span>. جميع الحقوق محفوظة.
            </p>
          </motion.div>

          {/* Legal Links */}
          <div className="flex items-center flex-wrap justify-center gap-4 text-sm">
            {[
              { href: '/privacy', text: 'سياسة الخصوصية' },
              { href: '/terms', text: 'شروط الاستخدام' },
              { href: '/cookies', text: 'سياسة الكوكيز' },
              { href: '/sitemap.xml', text: 'خريطة الموقع' },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-neutral-300 hover:text-white transition-all duration-200 relative group/link px-2 py-1"
                  aria-label={link.text}
                >
                  <span className="relative z-10">{link.text}</span>
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-gradient-to-r from-primary-400 to-purple-400 group-hover/link:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Main footer component with enhanced gradient background and modern design
 */
const FooterComponent = () => {
  const currentYear = toEnglishDigits(new Date().getFullYear());

  return (
    <footer className="relative bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-950 text-white overflow-hidden">
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-20" />
      {/* Gradient Overlay for Depth - Improved contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
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
