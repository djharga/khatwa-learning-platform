/**
 * Static data for layout components including footer sections, social media links, and contact information.
 * Centralizes content for easier maintenance and localization.
 */

export interface FooterSection {
  title: string;
  links: Array<{ href: string; text: string }>;
}

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
  color: string;
  glowColor: string;
}

export interface ContactInfo {
  icon: string;
  text: string;
  href: string;
}

export const footerSections: FooterSection[] = [
  {
    title: "المنصة التعليمية",
    links: [
      { href: "/courses", text: "الدورات التدريبية" },
      { href: "/learning-paths", text: "مسارات التعلم" },
      { href: "/learning-hub", text: "مركز التعلم" },
      { href: "/resources", text: "الموارد التعليمية" },
      { href: "/certificates", text: "الشهادات" },
      { href: "/blog", text: "المدونة" },
    ],
  },
  {
    title: "الدورات",
    links: [
      { href: "/courses/ai-audit", text: "المراجعة بالذكاء الاصطناعي" },
      { href: "/courses/basics", text: "أساسيات المحاسبة" },
      { href: "/courses/cia-preparation", text: "تحضير شهادة CIA" },
      { href: "/financial-management", text: "الإدارة المالية" },
      { href: "/finance-basics", text: "أساسيات المالية" },
      { href: "/financial-reporting", text: "التقارير المالية" },
    ],
  },
  {
    title: "البرامج المالية",
    links: [
      { href: "/procurement-management", text: "إدارة المشتريات" },
      { href: "/warehouse-management", text: "إدارة المخازن" },
      { href: "/inventory-reconciliations", text: "التسويات الجردية" },
      { href: "/restaurant-management", text: "إدارة المطاعم" },
    ],
  },
  {
    title: "المراجعة والاستشارات",
    links: [
      { href: "/internal-audit", text: "المراجعون الداخليون" },
      { href: "/cia", text: "زمالة CIA" },
      { href: "/question-bank", text: "بنك الأسئلة" },
      { href: "/consulting", text: "الاستشارات" },
      { href: "/meeting-room", text: "غرفة الاجتماعات" },
      { href: "/workshops", text: "ورش العمل" },
    ],
  },
  {
    title: "الدعم والمساعدة",
    links: [
      { href: "/support", text: "الدعم الفني" },
      { href: "/contact", text: "تواصل معنا" },
      { href: "/faq", text: "الأسئلة الشائعة" },
      { href: "/community", text: "المجتمع" },
      { href: "/files", text: "الملفات" },
      { href: "/about", text: "من نحن" },
    ],
  },
  {
    title: "القانونية",
    links: [
      { href: "/privacy", text: "سياسة الخصوصية" },
      { href: "/terms", text: "شروط الاستخدام" },
      { href: "/cookies", text: "سياسة الكوكيز" },
      { href: "/refund-policy", text: "سياسة الاسترداد" },
      { href: "/usage-policy", text: "سياسة الاستخدام" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    href: "https://facebook.com/khatwa",
    icon: "facebook",
    label: "فيسبوك",
    color: "hover:text-blue-500",
    glowColor: "hover:shadow-blue-500/25",
  },
  {
    href: "https://twitter.com/khatwa",
    icon: "twitter",
    label: "تويتر",
    color: "hover:text-sky-400",
    glowColor: "hover:shadow-sky-400/25",
  },
  {
    href: "https://linkedin.com/company/khatwa",
    icon: "linkedin",
    label: "لينكد إن",
    color: "hover:text-blue-600",
    glowColor: "hover:shadow-blue-600/25",
  },
  {
    href: "https://youtube.com/@khatwa",
    icon: "youtube",
    label: "يوتيوب",
    color: "hover:text-red-500",
    glowColor: "hover:shadow-red-500/25",
  },
  {
    href: "https://instagram.com/khatwa",
    icon: "instagram",
    label: "إنستغرام",
    color: "hover:text-pink-500",
    glowColor: "hover:shadow-pink-500/25",
  },
];

export const contactInfo: ContactInfo[] = [
  {
    icon: "mail",
    text: "info@khatwa.com",
    href: "mailto:info@khatwa.com",
  },
  {
    icon: "phone",
    text: "+966 50 123 4567",
    href: "tel:+966501234567",
  },
  {
    icon: "map-pin",
    text: "القاهرة، جمهورية مصر العربية",
    href: "https://maps.google.com/?q=القاهرة،+جمهورية+مصر+العربية",
  },
];
