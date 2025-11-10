'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Grid,
  List,
  Download,
  Share2,
  Edit,
  Sparkles,
  Image as ImageIcon,
  Layers,
  Palette,
  Tag,
  Star,
  Eye,
  X,
  Wand2,
  Crop,
  RotateCw,
  Type,
  Zap,
  TrendingUp,
  BookOpen,
  Users,
  Layout,
  Heart,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import StyledButton from '@/components/ui/StyledButton';

interface ImageItem {
  id: string;
  url: string;
  title: string;
  category: string;
  tags: string[];
  colors: string[];
  usage: number;
  favorite: boolean;
  aiGenerated?: boolean;
}

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // بيانات تجريبية للصور
  const images: ImageItem[] = [
    {
      id: '1',
      url: '/images/learning-concept.jpg',
      title: 'مفهوم التعلم',
      category: 'concepts',
      tags: ['تعلم', 'تعليم', 'كتب'],
      colors: ['#3b82f6', '#60a5fa', '#93c5fd'],
      usage: 45,
      favorite: false,
      aiGenerated: false,
    },
    {
      id: '2',
      url: '/images/team-collaboration.jpg',
      title: 'تعاون الفريق',
      category: 'people',
      tags: ['فريق', 'تعاون', 'عمل'],
      colors: ['#10b981', '#34d399', '#6ee7b7'],
      usage: 32,
      favorite: true,
      aiGenerated: false,
    },
    {
      id: '3',
      url: '/images/course-hero.jpg',
      title: 'صورة رئيسية للدورة',
      category: 'hero',
      tags: ['دورة', 'تدريب', 'محاسبة'],
      colors: ['#8b5cf6', '#a78bfa', '#c4b5fd'],
      usage: 67,
      favorite: false,
      aiGenerated: true,
    },
    {
      id: '4',
      url: '/images/student-study.jpg',
      title: 'طالب يدرس',
      category: 'courses',
      tags: ['طالب', 'دراسة', 'مكتبة'],
      colors: ['#f59e0b', '#fbbf24', '#fcd34d'],
      usage: 28,
      favorite: false,
      aiGenerated: false,
    },
  ];

  const categories = [
    { id: 'all', name: 'الكل', icon: Grid },
    { id: 'courses', name: 'للدورات', icon: BookOpen },
    { id: 'hero', name: 'Hero/Banner', icon: Layout },
    { id: 'concepts', name: 'مفاهيم', icon: Sparkles },
    { id: 'people', name: 'أشخاص', icon: Users },
  ];

  // تصفية الصور
  const filteredImages = images.filter((img) => {
    const matchesSearch =
      img.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2 sm:gap-3">
              <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              </div>
              معرض الصور الذكي
            </h1>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
              ابحث عن الصورة المثالية باستخدام الذكاء الاصطناعي
            </p>
          </div>

          {/* شريط البحث والأدوات */}
          <Card className="mb-6 sm:mb-8 shadow-md border border-neutral-200 dark:border-neutral-700">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
                {/* البحث بالوصف AI */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5 pointer-events-none" aria-hidden="true" />
                    <input
                      type="text"
                      placeholder="ابحث بالوصف... مثل: طالب يدرس في المكتبة مع كمبيوتر"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full ps-10 pe-20 py-2.5 sm:py-3 min-h-[44px] border-2 border-neutral-300 dark:border-neutral-600 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-900 dark:text-white text-sm sm:text-base placeholder:text-neutral-400 dark:placeholder:text-neutral-500 transition-all duration-200 ease-out"
                      aria-label="البحث في الصور"
                    />
                    <div className="absolute end-3 top-1/2 transform -translate-y-1/2">
                      <span className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-medium">
                        <Wand2 className="w-3 h-3" aria-hidden="true" />
                        AI
                      </span>
                    </div>
                  </div>
                </div>

                {/* طريقة العرض */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 sm:p-3 min-h-[44px] min-w-[44px] rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                    aria-label="عرض الشبكة"
                    aria-pressed={viewMode === 'grid'}
                    type="button"
                  >
                    <Grid className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 sm:p-3 min-h-[44px] min-w-[44px] rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      viewMode === 'list'
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                    aria-label="عرض القائمة"
                    aria-pressed={viewMode === 'list'}
                    type="button"
                  >
                    <List className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* التصنيفات */}
          <div className="mb-6 sm:mb-8 flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 min-h-[44px] rounded-lg whitespace-nowrap transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                      : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600'
                  }`}
                  aria-label={`تصفية حسب ${cat.name}`}
                  aria-pressed={selectedCategory === cat.id}
                  type="button"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* شبكة الصور */}
          <div
            className={`grid gap-4 sm:gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="group relative"
              >
                <Card className="overflow-hidden shadow-md border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 ease-out">
                  {/* الصورة */}
                  <div className="relative aspect-video bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800">
                    {image.aiGenerated && (
                      <div className="absolute top-2 end-2 z-10">
                        <span className="flex items-center gap-1 bg-primary-600 text-white text-xs px-2 py-1 rounded-full shadow-md">
                          <Sparkles className="w-3 h-3" aria-hidden="true" />
                          AI
                        </span>
                      </div>
                    )}

                    {/* أزرار الإجراءات عند التمرير */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out flex items-center justify-center gap-2">
                      <motion.button
                        onClick={() => setSelectedImage(image)}
                        className="p-2.5 sm:p-3 min-h-[44px] min-w-[44px] bg-white text-neutral-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`عرض ${image.title}`}
                        type="button"
                      >
                        <Eye className="w-5 h-5" aria-hidden="true" />
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setSelectedImage(image);
                          setShowEditor(true);
                        }}
                        className="p-2.5 sm:p-3 min-h-[44px] min-w-[44px] bg-white text-neutral-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`تعديل ${image.title}`}
                        type="button"
                      >
                        <Edit className="w-5 h-5" aria-hidden="true" />
                      </motion.button>
                      <motion.button
                        onClick={() => toggleFavorite(image.id)}
                        className="p-2.5 sm:p-3 min-h-[44px] min-w-[44px] bg-white text-neutral-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={favorites.includes(image.id) ? `إزالة ${image.title} من المفضلة` : `إضافة ${image.title} إلى المفضلة`}
                        type="button"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(image.id) ? 'fill-danger-500 text-danger-500' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </motion.button>
                    </div>

                    {/* نص عرضي للصورة */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
                    </div>
                  </div>

                  <CardContent className="p-3 sm:p-4">
                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white mb-2">
                      {image.title}
                    </h3>

                    {/* الألوان */}
                    <div className="flex gap-1 mb-2 sm:mb-3">
                      {image.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600"
                          style={{ backgroundColor: color }}
                          aria-label={`لون ${color}`}
                          role="img"
                        />
                      ))}
                    </div>

                    {/* العلامات */}
                    <div className="flex flex-wrap gap-1 mb-2 sm:mb-3">
                      {image.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 text-xs rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* إحصائيات */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                        استخدم {image.usage} مرة
                      </span>
                      <button 
                        className="p-1.5 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        aria-label={`تحميل ${image.title}`}
                        type="button"
                      >
                        <Download className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* رسالة عدم وجود نتائج */}
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="text-center py-12 sm:py-16"
            >
              <ImageIcon className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" aria-hidden="true" />
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">
                لا توجد صور تطابق البحث
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                جرب كلمات بحث مختلفة أو اختر تصنيفاً آخر
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* معاينة الصورة */}
      <AnimatePresence>
        {selectedImage && !showEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="image-preview-title"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <h2 id="image-preview-title" className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                    {selectedImage.title}
                  </h2>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    aria-label="إغلاق"
                    type="button"
                  >
                    <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
                  </button>
                </div>

                {/* الصورة */}
                <div className="aspect-video bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 sm:w-24 sm:h-24 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
                </div>

                {/* تفاصيل الصورة */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">التصنيف</p>
                    <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white">{selectedImage.category}</p>
                  </div>
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">الاستخدامات</p>
                    <p className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white">{selectedImage.usage} مرة</p>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-2 font-medium">الألوان الرئيسية</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.colors.map((color, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                        <div
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-neutral-300 dark:border-neutral-600"
                          style={{ backgroundColor: color }}
                          aria-label={`لون ${color}`}
                          role="img"
                        />
                        <span className="text-xs sm:text-sm font-mono text-neutral-700 dark:text-neutral-300">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-2 font-medium">العلامات</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300 rounded-full text-xs sm:text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button className="flex-1 px-4 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="تحميل الصورة" type="button">
                    <Download className="w-4 h-4" aria-hidden="true" />
                    تحميل
                  </button>
                  <button className="flex-1 px-4 py-2.5 sm:py-3 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="مشاركة الصورة" type="button">
                    <Share2 className="w-4 h-4" aria-hidden="true" />
                    مشاركة
                  </button>
                  <button
                    onClick={() => {
                      setShowEditor(true);
                    }}
                    className="px-4 py-2.5 sm:py-3 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    aria-label="تعديل الصورة"
                    type="button"
                  >
                    <Edit className="w-4 h-4" aria-hidden="true" />
                    تعديل
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* محرر الصور البسيط */}
      <AnimatePresence>
        {showEditor && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="editor-title"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto shadow-2xl"
            >
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 id="editor-title" className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                    <div className="p-1.5 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                      <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                    </div>
                    محرر الصور الذكي
                  </h2>
                  <button
                    onClick={() => {
                      setShowEditor(false);
                      setSelectedImage(null);
                    }}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    aria-label="إغلاق المحرر"
                    type="button"
                  >
                    <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
                  </button>
                </div>

                {/* أدوات التحرير */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <button className="flex items-center justify-center gap-2 p-2.5 sm:p-3 min-h-[44px] border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="قص الصورة" type="button">
                    <Crop className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">قص</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-2.5 sm:p-3 min-h-[44px] border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="تدوير الصورة" type="button">
                    <RotateCw className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">تدوير</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-2.5 sm:p-3 min-h-[44px] border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="إضافة نص" type="button">
                    <Type className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">نص</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-2.5 sm:p-3 min-h-[44px] border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="تعديل الألوان" type="button">
                    <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">ألوان</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-2.5 sm:p-3 min-h-[44px] border-2 border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="إدارة الطبقات" type="button">
                    <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-700 dark:text-neutral-300" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300">طبقات</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-2.5 sm:p-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="تحسين بالذكاء الاصطناعي" type="button">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    <span className="text-xs sm:text-sm font-medium">AI تحسين</span>
                  </button>
                </div>

                {/* منطقة التحرير */}
                <div className="aspect-video bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 rounded-lg mb-4 sm:mb-6 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 sm:w-24 sm:h-24 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
                </div>

                {/* أزرار الحفظ */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button className="flex-1 px-4 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="حفظ التغييرات" type="button">
                    <Download className="w-4 h-4" aria-hidden="true" />
                    حفظ التغييرات
                  </button>
                  <button
                    onClick={() => {
                      setShowEditor(false);
                    }}
                    className="px-4 py-2.5 sm:py-3 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    aria-label="إلغاء"
                    type="button"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
