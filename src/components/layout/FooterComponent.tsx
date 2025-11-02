'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Sparkles,
  Heart,
  ArrowUp,
  Award,
  Shield,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { toEnglishDigits } from '../../lib/numberUtils';
import { footerSections, socialLinks, contactInfo } from './layout-data';
import { useState, useRef, useEffect } from 'react';

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="lg:col-span-4 space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Logo and Brand */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          className="p-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-xl"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="text-3xl">🎓</span>
        </motion.div>
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-1">
            خطى التعليمية
          </h3>
          <p className="text-indigo-300 font-semibold text-sm sm:text-base">
            منصة التعلم المهني الأولى
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-md">
        منصة تعليمية متخصصة في المراجعة الداخلية والمحاسبة، نقدم محتوى عالي الجودة
        ومسارات تعليمية متكاملة لتطوير المهارات المهنية والارتقاء بالكفاءات العملية.
      </p>

      {/* Trust Badges */}
      <div className="flex flex-wrap gap-3 pt-4">
        {[
          { icon: Award, text: 'شهادات معتمدة', color: 'from-yellow-500 to-orange-500' },
          { icon: Shield, text: 'آمن ومضمون', color: 'from-green-500 to-emerald-500' },
          { icon: Clock, text: 'دعم 24/7', color: 'from-blue-500 to-cyan-500' },
        ].map((badge, index) => {
          const BadgeIcon = badge.icon;
          return (
            <motion.div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className={`p-1.5 bg-gradient-to-br ${badge.color} rounded-lg`}>
                <BadgeIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs text-gray-300 font-medium">{badge.text}</span>
            </motion.div>
          );
        })}
      </div>

      {/* Contact Info - Enhanced */}
      <div className="space-y-3 pt-4">
        {contactInfo.map((info, index) => {
          const IconComponent = getContactIcon(info.icon);
          return (
            <motion.a
              key={index}
              href={info.href}
              className="flex items-center gap-3 text-gray-300 hover:text-white transition-all px-4 py-3 rounded-xl hover:bg-white/10 group"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
              whileHover={{ x: 5 }}
            >
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-indigo-500/30 transition-colors">
                <IconComponent className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300" />
              </div>
              <span className="text-sm sm:text-base font-medium flex-1">{info.text}</span>
            </motion.a>
          );
        })}
      </div>

      {/* Social Links - Enhanced */}
      <div className="flex gap-3 pt-2">
        {socialLinks.map((social, index) => {
          const IconComponent = getSocialIcon(social.icon);
          return (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all border border-white/10 hover:border-white/30 group relative overflow-hidden"
              aria-label={social.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <IconComponent className="w-5 h-5 text-white relative z-10 group-hover:scale-110 transition-transform" />
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="lg:col-span-8"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + sectionIndex * 0.1, duration: 0.4 }}
          >
            <h4 className="text-lg font-bold text-white border-b border-white/20 pb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full"></div>
              {section.title}
            </h4>
            <ul className="space-y-2.5">
              {section.links.map((link, linkIndex) => (
                <motion.li
                  key={linkIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + sectionIndex * 0.1 + linkIndex * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-all text-sm flex items-center gap-2 py-1.5 rounded-lg hover:bg-white/5 group"
                  >
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity group-hover:scale-150"></span>
                    <span className="font-medium group-hover:translate-x-1 transition-transform">
                      {link.text}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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
      ref={ref}
      className="mt-16 sm:mt-20 lg:mt-24 pt-12 sm:pt-16 lg:pt-20 border-t border-white/20"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-300 font-semibold text-sm">النشرة الإخبارية</span>
            <Sparkles className="w-5 h-5 text-yellow-400" />
          </motion.div>
          <h4 className="text-2xl sm:text-3xl font-bold text-white">
            سجل بريدك ليصلك كل جديد
          </h4>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            احصل على آخر التحديثات والدورات الجديدة مباشرة في بريدك الإلكتروني
          </p>
        </div>

        {/* Email Input */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
              className="w-full pr-12 pl-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
            />
          </div>
          <motion.button
            onClick={handleSubscribe}
            disabled={isSubscribed || !email}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: isSubscribed ? 1 : 1.05 }}
            whileTap={{ scale: isSubscribed ? 1 : 0.95 }}
          >
            {isSubscribed ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>تم الاشتراك!</span>
              </>
            ) : (
              <span>اشتراك مجاني</span>
            )}
          </motion.button>
        </div>

        {/* Privacy Notice */}
        <motion.p
          className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed flex items-center justify-center gap-2 flex-wrap"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        >
          <Heart className="w-4 h-4 text-red-400" />
          نحن نحترم خصوصيتك. لن نشارك بريدك الإلكتروني مع أي طرف ثالث
          <Heart className="w-4 h-4 text-red-400" />
        </motion.p>
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      ref={ref}
      className="relative border-t border-white/20 bg-gradient-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-sm mt-12 sm:mt-16 lg:mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-gray-300 text-sm sm:text-base font-medium text-center lg:text-right">
            <p>
              © {currentYear} خطى التعليمية. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              صنع بـ <Heart className="w-3 h-3 inline text-red-400" /> للمجتمع التعليمي العربي
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex items-center flex-wrap justify-center gap-4 text-sm">
            {[
              { href: '/privacy', text: 'سياسة الخصوصية' },
              { href: '/terms', text: 'شروط الاستخدام' },
              { href: '/cookies', text: 'سياسة الكوكيز' },
              { href: '/sitemap', text: 'خريطة الموقع' },
            ].map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-all px-3 py-2 rounded-lg hover:bg-white/5"
                >
                  {link.text}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg shadow-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/60 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          aria-label="العودة إلى الأعلى"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </motion.div>
  );
};

/**
 * Main footer component with enhanced gradient background and modern design
 */
const FooterComponent = () => {
  const currentYear = toEnglishDigits(new Date().getFullYear());

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: -1,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: -1,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
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
