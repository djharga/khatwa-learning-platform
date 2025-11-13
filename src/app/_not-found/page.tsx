'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  BookOpen, 
  GraduationCap, 
  Library,
  ArrowRight,
  HelpCircle,
  FileSearch
} from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Enhanced 404 Not Found Page
 * صفحة 404 محسّنة مع روابط سريعة وبحث
 */
export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // روابط سريعة للصفحات الشائعة
  const quickLinks = [
    { href: '/', label: 'الصفحة الرئيسية', icon: Home, color: 'blue' },
    { href: '/courses', label: 'الكورسات', icon: BookOpen, color: 'green' },
    { href: '/cia', label: 'CIA', icon: GraduationCap, color: 'purple' },
    { href: '/resources', label: 'المكتبة', icon: Library, color: 'orange' },
    { href: '/faq', label: 'الأسئلة الشائعة', icon: HelpCircle, color: 'indigo' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="space-y-4"
        >
          <motion.h1
            className="text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ backgroundSize: '200%' }}
          >
          404
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-100 mb-3">
          الصفحة غير موجودة
        </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
              <br />
              جرب البحث أو استخدم الروابط السريعة أدناه.
        </p>
          </motion.div>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSearch}
          className="max-w-xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن محتوى..."
              className="w-full pr-12 pl-4 py-4 text-lg rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
            />
            <button
              type="submit"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <FileSearch className="w-4 h-4" />
              <span className="hidden sm:inline">بحث</span>
            </button>
          </div>
        </motion.form>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
            روابط سريعة
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600',
                orange: 'from-orange-500 to-orange-600',
                indigo: 'from-indigo-500 to-indigo-600',
              }[link.color];

              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className={`block p-4 rounded-xl bg-gradient-to-r ${colorClasses} text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">{link.label}</span>
                      <ArrowRight className="w-4 h-4 mr-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="pt-8"
        >
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 rounded-xl transition-colors font-medium"
        >
            <ArrowRight className="w-4 h-4 rotate-180" />
            العودة للخلف
          </button>
        </motion.div>
      </div>
    </div>
  );
}
