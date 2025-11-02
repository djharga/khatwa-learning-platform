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
import { Button } from '@/components/ui/Button';

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
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-600" />
              معرض الصور الذكي
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              ابحث عن الصورة المثالية باستخدام الذكاء الاصطناعي
            </p>
          </div>

          {/* شريط البحث والأدوات */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* البحث بالوصف AI */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="ابحث بالوصف... مثل: طالب يدرس في المكتبة مع كمبيوتر"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-800 dark:border-gray-700"
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <span className="flex items-center gap-1 text-xs text-purple-600 font-medium">
                        <Wand2 className="w-3 h-3" />
                        AI
                      </span>
                    </div>
                  </div>
                </div>

                {/* طريقة العرض */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg ${
                      viewMode === 'grid'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg ${
                      viewMode === 'list'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* التصنيفات */}
          <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </motion.button>
              );
            })}
          </div>

          {/* شبكة الصور */}
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {/* الصورة */}
                  <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                    {image.aiGenerated && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="flex items-center gap-1 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                          <Sparkles className="w-3 h-3" />
                          AI
                        </span>
                      </div>
                    )}

                    {/* أزرار الإجراءات عند التمرير */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                      <motion.button
                        onClick={() => setSelectedImage(image)}
                        className="p-3 bg-white text-gray-900 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          setSelectedImage(image);
                          setShowEditor(true);
                        }}
                        className="p-3 bg-white text-gray-900 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Edit className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => toggleFavorite(image.id)}
                        className="p-3 bg-white text-gray-900 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favorites.includes(image.id) ? 'fill-red-500 text-red-500' : ''
                          }`}
                        />
                      </motion.button>
                    </div>

                    {/* نص عرضي للصورة */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {image.title}
                    </h3>

                    {/* الألوان */}
                    <div className="flex gap-1 mb-3">
                      {image.colors.map((color, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* العلامات */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {image.tags.slice(0, 3).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full dark:bg-purple-900/20 dark:text-purple-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* إحصائيات */}
                    <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        استخدم {image.usage} مرة
                      </span>
                      <button className="text-purple-600 hover:text-purple-700">
                        <Download className="w-4 h-4" />
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
              className="text-center py-16"
            >
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                لا توجد صور تطابق البحث
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedImage.title}
                  </h2>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* الصورة */}
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-4 flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-gray-400" />
                </div>

                {/* تفاصيل الصورة */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">التصنيف</p>
                    <p className="font-medium">{selectedImage.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">الاستخدامات</p>
                    <p className="font-medium">{selectedImage.usage} مرة</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">الألوان الرئيسية</p>
                  <div className="flex gap-2">
                    {selectedImage.colors.map((color, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm font-mono">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">العلامات</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedImage.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full dark:bg-purple-900/20 dark:text-purple-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 ml-2" />
                    تحميل
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 ml-2" />
                    مشاركة
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEditor(true);
                    }}
                  >
                    <Edit className="w-4 h-4 ml-2" />
                    تعديل
                  </Button>
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
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Wand2 className="w-6 h-6 text-purple-600" />
                    محرر الصور الذكي
                  </h2>
                  <button
                    onClick={() => {
                      setShowEditor(false);
                      setSelectedImage(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* أدوات التحرير */}
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 dark:border-gray-700 dark:hover:bg-purple-900/20">
                    <Crop className="w-5 h-5" />
                    <span>قص</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 dark:border-gray-700 dark:hover:bg-purple-900/20">
                    <RotateCw className="w-5 h-5" />
                    <span>تدوير</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 dark:border-gray-700 dark:hover:bg-purple-900/20">
                    <Type className="w-5 h-5" />
                    <span>نص</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 dark:border-gray-700 dark:hover:bg-purple-900/20">
                    <Palette className="w-5 h-5" />
                    <span>ألوان</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-purple-50 dark:border-gray-700 dark:hover:bg-purple-900/20">
                    <Layers className="w-5 h-5" />
                    <span>طبقات</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                    <Zap className="w-5 h-5" />
                    <span>AI تحسين</span>
                  </button>
                </div>

                {/* منطقة التحرير */}
                <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg mb-6 flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-gray-400" />
                </div>

                {/* أزرار الحفظ */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Download className="w-4 h-4 ml-2" />
                    حفظ التغييرات
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEditor(false);
                    }}
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
