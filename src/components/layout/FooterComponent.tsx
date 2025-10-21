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
  <motion.div
    className="lg:col-span-4 space-y-6"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <div className="flex items-center gap-4 mb-6">
      <motion.div
        className="relative p-4 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-500 overflow-hidden group"
        whileHover={{ scale: 1.08, rotate: 8 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <span className="text-3xl relative z-10">🎓</span>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
          transition={{ duration: 1.5 }}
        ></motion.div>
      </motion.div>
      <div>
        <motion.h3
          className="text-2xl sm:text-3xl font-bold text-white leading-tight text-shimmer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          خطى التعليمية
        </motion.h3>
        <motion.p
          className="text-blue-200 font-medium"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
        >
          منصة التعلم المهني الأولى
        </motion.p>
      </div>
    </div>

    <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-md">
      منصة تعليمية متخصصة في المراجعة الداخلية والمحاسبة، نقدم محتوى
      عالي الجودة ومسارات تعليمية متكاملة لتطوير المهارات المهنية
      والارتقاء بالكفاءات العملية.
    </p>

    {/* Enhanced Contact Info with Glass Morphism */}
    <div className="space-y-3">
      {contactInfo.map((info, index) => {
        const IconComponent = getContactIcon(info.icon);
        return (
          <motion.a
            key={index}
            href={info.href}
            className="glass-card flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-500 group relative overflow-hidden rounded-xl px-4 py-3 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] border border-white/10 hover:border-white/20"
            whileHover={{ x: 8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <IconComponent className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-all duration-500 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,1)]" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
            <span className="text-sm sm:text-base relative z-10 font-medium">
              {info.text}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-500/10 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
              initial={false}
            ></motion.div>
          </motion.a>
        );
      })}
    </div>

    {/* Enhanced Social Links with Colored Glows */}
    <div className="flex gap-3">
      {socialLinks.map((social, index) => {
        const IconComponent = getSocialIcon(social.icon);
        return (
          <motion.a
            key={index}
            href={social.href}
            whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`relative w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-500 group overflow-hidden ${social.color} hover:border hover:border-white/30`}
            aria-label={social.label}
          >
            <motion.div
              className={`absolute inset-0 rounded-xl ${social.glowColor.replace('hover:shadow-', 'shadow-').replace('0.5', '0.6')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            ></motion.div>
            <IconComponent className="w-5 h-5 transition-all duration-500 group-hover:scale-125 relative z-10 drop-shadow-[0_0_4px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_currentColor]" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
              initial={false}
            ></motion.div>
          </motion.a>
        );
      })}
    </div>
  </motion.div>
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
      {sections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <motion.h4
            className="text-lg sm:text-xl font-bold text-white border-b border-white/20 pb-3 hover:text-blue-300 transition-all duration-500 relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {section.title}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md -z-10"
              initial={false}
            ></motion.div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
          </motion.h4>
          <ul className="space-y-3">
            {section.links.map((link, linkIndex) => (
              <motion.li
                key={linkIndex}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: sectionIndex * 0.1 + linkIndex * 0.05,
                }}
                viewport={{ once: true }}
              >
                <Link
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-all duration-500 text-sm sm:text-base flex items-center gap-3 group hover:translate-x-2 relative overflow-hidden rounded-lg px-3 py-2 hover:bg-gradient-to-r hover:from-blue-500/15 hover:to-purple-500/5 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-transparent hover:border-white/10"
                >
                  <motion.span
                    className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_4px_rgba(59,130,246,0.6)] group-hover:shadow-[0_0_10px_rgba(59,130,246,1)] group-hover:scale-150"
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                  ></motion.span>
                  <span className="relative z-10 font-medium">
                    {link.text}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/8 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                    initial={false}
                  ></motion.div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
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

  const filteredLinks = quickLinks.filter(link =>
    link.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-md mx-auto">
        <motion.div
          className="relative"
          animate={{ height: isExpanded ? 'auto' : '60px' }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <motion.input
              type="text"
              placeholder="البحث السريع في الموقع..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
              className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-white/30 transition-all duration-500 text-sm"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          <AnimatePresence>
            {isExpanded && searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden z-10"
              >
                {filteredLinks.length > 0 ? (
                  filteredLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="block px-4 py-3 text-white hover:bg-white/20 transition-colors duration-300 border-b border-white/10 last:border-b-0"
                      >
                        {link.text}
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-400 text-sm">
                    لا توجد نتائج
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
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
    <motion.div
      className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-12 lg:pt-16 border-t border-white/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      viewport={{ once: true }}
    >
      <QuickSearch />

      <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
        <div className="space-y-4">
          <motion.h4
            className="text-2xl sm:text-3xl font-bold text-white hover:text-blue-300 hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all duration-500 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="w-8 h-8 text-yellow-400" />
            سجل بريدك ليصلك كل جديد
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </motion.h4>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
            احصل على آخر التحديثات والدورات الجديدة مباشرة في بريدك الإلكتروني
          </p>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto"
          whileHover={{ scale: 1.02 }}
        >
          <motion.input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="glass-card flex-1 px-4 sm:px-6 py-3 sm:py-4 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-white/30 focus:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:border-white/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500 text-sm sm:text-base backdrop-blur-md"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <motion.button
            onClick={handleSubscribe}
            disabled={isSubscribed}
            className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 text-white rounded-2xl font-bold transition-all duration-500 hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] hover:scale-105 focus:ring-4 focus:ring-blue-400/50 overflow-hidden group text-shimmer disabled:cursor-not-allowed"
            whileHover={!isSubscribed ? { scale: 1.08, rotate: 2 } : {}}
            whileTap={!isSubscribed ? { scale: 0.95 } : {}}
          >
            <AnimatePresence mode="wait">
              {isSubscribed ? (
                <motion.span
                  key="subscribed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative z-10 flex items-center gap-2"
                >
                  <Heart className="w-5 h-5 text-red-400" />
                  تم الاشتراك!
                </motion.span>
              ) : (
                <motion.span
                  key="subscribe"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative z-10"
                >
                  اشتراك مجاني
                </motion.span>
              )}
            </AnimatePresence>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            ></motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
              transition={{ duration: 1.2 }}
              initial={false}
            ></motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
          </motion.button>
        </motion.div>

        <motion.p
          className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <Heart className="w-4 h-4 text-red-400" />
          نحن نحترم خصوصيتك. لن نشارك بريدك الإلكتروني مع أي طرف ثالث ولن
          نرسل لك رسائل مزعجة.
          <Heart className="w-4 h-4 text-red-400" />
        </motion.p>
      </div>
    </motion.div>
  );
};

/**
 * Footer bottom bar with copyright notice and legal links. Displays year dynamically and includes hover effects.
 */
interface BottomBarProps {
  currentYear: string;
}

const BottomBar = ({ currentYear }: BottomBarProps) => (
  <motion.div
    className="glass-card border-t border-white/20 bg-black/30 mt-12 sm:mt-16 lg:mt-20 backdrop-blur-sm"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 sm:gap-6">
        <motion.div
          className="text-gray-300 text-sm sm:text-base font-medium hover:text-white transition-all duration-500 group relative"
          whileHover={{ scale: 1.02 }}
        >
          <p>© {currentYear} خطى التعليمية. جميع الحقوق محفوظة. صنع بـ ❤️ للمجتمع التعليمي العربي</p>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md -z-10"
            initial={false}
          ></motion.div>
        </motion.div>

        <motion.div
          className="flex items-center gap-4 sm:gap-6 text-sm"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { href: '/privacy', text: 'سياسة الخصوصية' },
            { href: '/terms', text: 'شروط الاستخدام' },
            { href: '/cookies', text: 'سياسة الكوكيز' },
            { href: '/sitemap', text: 'خريطة الموقع' },
          ].map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={link.href}
                className="text-gray-400 hover:text-white transition-all duration-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] px-3 py-2 rounded-lg hover:bg-blue-500/15 border border-transparent hover:border-white/20 relative group overflow-hidden"
              >
                <span className="relative z-10 font-medium">
                  {link.text}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-500/20 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                  initial={false}
                ></motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </motion.div>
);

/**
 * Main footer component with gradient background, animated elements, and comprehensive site navigation. Features brand section, link grid, newsletter signup, and bottom bar with legal links. Includes parallax effects and glass morphism styling.
 */
const FooterComponent = () => {
  const currentYear = toEnglishDigits(new Date().getFullYear());

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden parallax-slow">
      {/* Enhanced Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-blue-800/10 to-purple-800/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.15),transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none"></div>

      {/* Enhanced Floating Elements with Parallax */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-white/8 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-20 right-20 w-24 h-24 bg-blue-400/15 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-400/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      ></motion.div>

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
