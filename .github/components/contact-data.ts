/**
 * Contact information data for ContactComponent including office location, phone, email, and business hours.
 * Each item includes gradient styling and animation delays.
 */

import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export interface ContactInfo {
  icon: typeof MapPin | typeof Phone | typeof Mail | typeof Clock;
  title: string;
  content: string;
  href?: string;
  gradient: string;
  bgGradient: string;
  delay: number;
}

export const contactInfo: ContactInfo[] = [
  {
    icon: MapPin,
    title: 'المكتب الرئيسي',
    content: 'القاهرة، جمهورية مصر العربية',
    gradient: 'from-blue-100 to-indigo-200',
    bgGradient: 'from-blue-50 to-indigo-100',
    delay: 0.1,
  },
  {
    icon: Phone,
    title: 'الهاتف',
    content: '+966 50 123 4567',
    href: 'tel:+966501234567',
    gradient: 'from-emerald-100 to-green-200',
    bgGradient: 'from-emerald-50 to-green-100',
    delay: 0.2,
  },
  {
    icon: Mail,
    title: 'البريد الإلكتروني',
    content: 'support@khatwa.com',
    href: 'mailto:support@khatwa.com',
    gradient: 'from-violet-100 to-purple-200',
    bgGradient: 'from-violet-50 to-purple-100',
    delay: 0.3,
  },
  {
    icon: Clock,
    title: 'ساعات العمل',
    content: 'الأحد - الخميس: 9:00 - 18:00',
    gradient: 'from-amber-100 to-orange-200',
    bgGradient: 'from-amber-50 to-orange-100',
    delay: 0.4,
  },
];
