'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, HelpCircle, MessageCircle, BookOpen, Shield, CreditCard, 
  GraduationCap, Users, Settings, TrendingUp, ChevronDown, ChevronUp,
  Filter, X, Sparkles, Star, Award, Zap
} from 'lucide-react';
import Link from 'next/link';
import { faqs } from '@/components/faq-data';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

// فئات الأسئلة
const categories = [
  { id: 'all', label: 'الكل', icon: HelpCircle, count: faqs.length },
  { id: 'platform', label: 'المنصة', icon: BookOpen, count: 0 },
  { id: 'security', label: 'الأمان', icon: Shield, count: 0 },
  { id: 'certificates', label: 'الشهادات', icon: GraduationCap, count: 0 },
  { id: 'pricing', label: 'الأسعار', icon: CreditCard, count: 0 },
  { id: 'support', label: 'الدعم', icon: MessageCircle, count: 0 },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['all']));

  // تصنيف الأسئلة حسب الفئة (يمكن تحسينه لاحقاً)
  const categorizedFAQs = useMemo(() => {
    return faqs.map((faq, index) => {
      let category = 'platform';
      const question = faq.question.toLowerCase();
      const answer = faq.answer.toLowerCase();
      
      if (question.includes('أمان') || question.includes('حماية') || answer.includes('تشفير') || answer.includes('أمان')) {
        category = 'security';
      } else if (question.includes('شهادة') || answer.includes('شهادة') || answer.includes('اعتماد')) {
        category = 'certificates';
      } else if (question.includes('سعر') || question.includes('ثمن') || question.includes('تكلفة') || answer.includes('استرداد')) {
        category = 'pricing';
      } else if (question.includes('دعم') || question.includes('مساعدة') || answer.includes('دعم')) {
        category = 'support';
      }
      
      return { ...faq, category, originalIndex: index };
    });
  }, []);

  // تحديث عدد الأسئلة في كل فئة
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faqs.length };
    categorizedFAQs.forEach(faq => {
      counts[faq.category || 'platform'] = (counts[faq.category || 'platform'] || 0) + 1;
    });
    return counts;
  }, [categorizedFAQs]);

  // تصفية الأسئلة حسب البحث والفئة
  const filteredFAQs = useMemo(() => {
    let filtered = categorizedFAQs;
    
    // تصفية حسب الفئة
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    
    // تصفية حسب البحث
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, categorizedFAQs]);

  const toggleFAQ = (originalIndex: number) => {
    setOpenIndexes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(originalIndex)) {
        newSet.delete(originalIndex);
      } else {
        newSet.add(originalIndex);
      }
      return newSet;
    });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tl from-white/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6"
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-semibold">مركز المساعدة</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6"
            >
              الأسئلة الشائعة
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed"
            >
              إجابات شاملة على جميع استفساراتك حول منصة خطى التعليمية
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث في الأسئلة الشائعة..."
                  className="w-full pr-12 pl-4 py-4 text-lg rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-blue-200 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
              
              {searchQuery && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-sm text-blue-100"
                >
                  تم العثور على {filteredFAQs.length} سؤال
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Categories Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">التصنيفات</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const count = categoryCounts[category.id] || 0;
              const isActive = selectedCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                      : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700 shadow-md'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                  <span className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-400'
                    }
                  `}>
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{faqs.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">إجمالي الأسئلة</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length - 1}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">فئة</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">دعم متواصل</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Items */}
        {filteredFAQs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              لم يتم العثور على نتائج
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              جرب البحث بكلمات مختلفة أو اختر فئة أخرى
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
            >
              إعادة تعيين البحث
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredFAQs.map((faq, index) => {
                const originalIndex = (faq as any).originalIndex;
                const isOpen = openIndexes.has(originalIndex);
                
                return (
                  <motion.div
                    key={originalIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <button
                      onClick={() => toggleFAQ(originalIndex)}
                      className="w-full px-6 py-5 text-right flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <div className="flex-1 flex items-start gap-4">
                        <div className={`
                          p-2 rounded-lg flex-shrink-0
                          ${isOpen 
                            ? 'bg-blue-100 dark:bg-blue-900/30' 
                            : 'bg-gray-100 dark:bg-neutral-700'
                          }
                        `}>
                          <HelpCircle className={`
                            w-5 h-5
                            ${isOpen 
                              ? 'text-blue-600 dark:text-blue-400' 
                              : 'text-gray-600 dark:text-gray-400'
                            }
                          `} />
                        </div>
                        <div className="flex-1 text-right">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            {faq.question}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {faq.category === 'security' && '🔒 الأمان'}
                            {faq.category === 'certificates' && '🎓 الشهادات'}
                            {faq.category === 'pricing' && '💰 الأسعار'}
                            {faq.category === 'support' && '💬 الدعم'}
                            {faq.category === 'platform' && '📚 المنصة'}
            </span>
                        </div>
                      </div>
                      
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 pt-0 border-t border-gray-200 dark:border-neutral-700">
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full mb-6"
            >
              <MessageCircle className="w-8 h-8" />
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              لم تجد إجابة لسؤالك؟
            </h2>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
              فريق الدعم متاح على مدار الساعة لمساعدتك في أي استفسار أو مشكلة تواجهها. 
              لا تتردد في التواصل معنا مباشرة.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                تواصل معنا الآن
              </Link>
              <Link
                href="/support"
                className="px-8 py-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl font-bold text-lg border-2 border-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Settings className="w-5 h-5" />
                مركز الدعم
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
