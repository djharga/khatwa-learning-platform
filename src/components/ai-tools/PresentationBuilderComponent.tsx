'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  Palette,
  Type,
  Eye,
  Edit,
  Plus,
  Trash2,
  Move,
  Download,
  BarChart3,
  Clock,
  Image,
  PieChart,
  Zap,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  SkipForward,
  SkipBack,
} from 'lucide-react';

interface Slide {
  id: string;
  title: string;
  content: string;
  type: 'title' | 'content' | 'chart' | 'image';
  chartData?: any;
  imageUrl?: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
}

interface ColorScheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

interface Font {
  id: string;
  name: string;
  family: string;
}

const PresentationBuilderComponent = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('professional');
  const [selectedColorScheme, setSelectedColorScheme] = useState<string>('blue');
  const [selectedFont, setSelectedFont] = useState<string>('arial');
  const [slides, setSlides] = useState<Slide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [stats, setStats] = useState({
    totalSlides: 0,
    estimatedTime: 0,
    wordCount: 0,
  });

  const templates: Template[] = [
    {
      id: 'professional',
      name: 'احترافي',
      description: 'تصميم كلاسيكي للعروض الرسمية',
      preview: 'bg-gradient-to-br from-blue-600 to-purple-600',
    },
    {
      id: 'creative',
      name: 'إبداعي',
      description: 'تصميم عصري مع لمسات فنية',
      preview: 'bg-gradient-to-br from-pink-500 to-orange-500',
    },
    {
      id: 'simple',
      name: 'بسيط',
      description: 'تصميم نظيف ومباشر',
      preview: 'bg-gradient-to-br from-gray-600 to-gray-800',
    },
  ];

  const colorSchemes: ColorScheme[] = [
    {
      id: 'blue',
      name: 'أزرق',
      primary: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#60A5FA',
    },
    {
      id: 'green',
      name: 'أخضر',
      primary: '#10B981',
      secondary: '#047857',
      accent: '#34D399',
    },
    {
      id: 'purple',
      name: 'بنفسجي',
      primary: '#8B5CF6',
      secondary: '#7C3AED',
      accent: '#A78BFA',
    },
  ];

  const fonts: Font[] = [
    { id: 'arial', name: 'Arial', family: 'Arial, sans-serif' },
    { id: 'times', name: 'Times New Roman', family: 'Times New Roman, serif' },
    { id: 'calibri', name: 'Calibri', family: 'Calibri, sans-serif' },
  ];

  // Mock data for generated slides
  const mockSlides: Slide[] = [
    {
      id: '1',
      title: 'مقدمة',
      content: 'نظرة عامة على التقرير والأهداف الرئيسية',
      type: 'title',
    },
    {
      id: '2',
      title: 'البيانات الرئيسية',
      content: 'تحليل البيانات والإحصائيات المهمة',
      type: 'content',
    },
    {
      id: '3',
      title: 'الرسوم البيانية',
      content: 'تمثيل بصري للنتائج',
      type: 'chart',
      chartData: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل'],
        datasets: [{
          data: [12, 19, 3, 5],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        }],
      },
    },
    {
      id: '4',
      title: 'الخاتمة',
      content: 'الملخص والتوصيات المستقبلية',
      type: 'content',
    },
  ];

  const generatePresentation = () => {
    if (!uploadedFile) return;

    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      setSlides(mockSlides);
      setStats({
        totalSlides: mockSlides.length,
        estimatedTime: mockSlides.length * 2, // 2 minutes per slide
        wordCount: mockSlides.reduce((acc, slide) => acc + slide.content.split(' ').length + slide.title.split(' ').length, 0),
      });
      setIsGenerating(false);
    }, 3000);
  };

  const addSlide = (type: Slide['type']) => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'شريحة جديدة',
      content: 'محتوى الشريحة',
      type,
    };
    setSlides([...slides, newSlide]);
  };

  const deleteSlide = (id: string) => {
    setSlides(slides.filter(slide => slide.id !== id));
  };

  const reorderSlides = (fromIndex: number, toIndex: number) => {
    const newSlides = [...slides];
    const [moved] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, moved);
    setSlides(newSlides);
  };

  const exportPresentation = (format: 'pptx' | 'pdf') => {
    // Simulate export
    alert(`تم تصدير العرض كـ ${format === 'pptx' ? 'PowerPoint' : 'PDF'}`);
  };

  const renderSlidePreview = (slide: Slide) => {
    const colorScheme = colorSchemes.find(c => c.id === selectedColorScheme) || colorSchemes[0];
    const font = fonts.find(f => f.id === selectedFont) || fonts[0];

    return (
      <div
        className="w-full h-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col justify-center"
        style={{
          background: `linear-gradient(135deg, ${colorScheme.primary}20, ${colorScheme.secondary}20)`,
          fontFamily: font.family,
        }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: colorScheme.primary }}>
          {slide.title}
        </h2>
        <div className="flex-1">
          {slide.type === 'title' && (
            <p className="text-lg" style={{ color: colorScheme.secondary }}>
              {slide.content}
            </p>
          )}
          {slide.type === 'content' && (
            <div className="space-y-2">
              {slide.content.split('\n').map((line, idx) => (
                <p key={idx} className="text-base" style={{ color: colorScheme.secondary }}>
                  • {line}
                </p>
              ))}
            </div>
          )}
          {slide.type === 'chart' && (
            <div className="flex items-center justify-center h-full">
              <PieChart className="w-16 h-16" style={{ color: colorScheme.accent }} />
              <span className="ml-4 text-sm" style={{ color: colorScheme.secondary }}>
                رسم بياني تفاعلي
              </span>
            </div>
          )}
          {slide.type === 'image' && (
            <div className="flex items-center justify-center h-full">
              <Image className="w-16 h-16" style={{ color: colorScheme.accent }} />
              <span className="ml-4 text-sm" style={{ color: colorScheme.secondary }}>
                صورة توضيحية
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
          منشئ العروض التقديمية الذكي
        </h1>
        <p className="text-lg text-neutral max-w-3xl mx-auto">
          حوّل تقاريرك إلى عروض PowerPoint احترافية بمساعدة الذكاء الاصطناعي
        </p>
      </motion.div>

      {/* Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <div className="text-center">
          <Upload className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">رفع التقرير</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            ارفع تقريرك (PDF, Word, أو Text) لبدء إنشاء العرض التقديمي
          </p>
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg cursor-pointer hover:shadow-lg transition-all"
          >
            اختر ملف
          </label>
          {uploadedFile && (
            <p className="mt-4 text-sm text-green-600">
              <CheckCircle className="w-4 h-4 inline mr-2" />
              تم رفع: {uploadedFile.name}
            </p>
          )}
        </div>
      </motion.div>

      {/* Template and Customization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Templates */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            القوالب
          </h3>
          <div className="space-y-3">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                }`}
              >
                <div className={`w-full h-12 rounded ${template.preview} mb-2`}></div>
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Color Schemes */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            نظام الألوان
          </h3>
          <div className="space-y-3">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setSelectedColorScheme(scheme.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  selectedColorScheme === scheme.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                }`}
              >
                <div className="flex space-x-2 space-x-reverse mb-2">
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: scheme.primary }}></div>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: scheme.secondary }}></div>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: scheme.accent }}></div>
                </div>
                <h4 className="font-medium">{scheme.name}</h4>
              </button>
            ))}
          </div>
        </div>

        {/* Fonts */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Type className="w-5 h-5 mr-2" />
            الخطوط
          </h3>
          <div className="space-y-3">
            {fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => setSelectedFont(font.id)}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  selectedFont === font.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                }`}
              >
                <h4 className="font-medium" style={{ fontFamily: font.family }}>{font.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300" style={{ fontFamily: font.family }}>
                  نموذج نص
                </p>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Generate Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button
          onClick={generatePresentation}
          disabled={!uploadedFile || isGenerating}
          className={`px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center mx-auto ${
            !uploadedFile || isGenerating
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg transform hover:scale-105'
          }`}
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
              جاري إنشاء العرض...
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 mr-3" />
              إنشاء العرض التقديمي
            </>
          )}
        </button>
      </motion.div>

      {/* Slides Editor */}
      {slides.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">محرر الشرائح</h3>
              <div className="flex space-x-2 space-x-reverse">
                <button
                  onClick={() => setIsPreviewMode(!isPreviewMode)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Eye className="w-4 h-4 inline mr-2" />
                  {isPreviewMode ? 'وضع التحرير' : 'معاينة'}
                </button>
                <button
                  onClick={() => addSlide('content')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  إضافة شريحة
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isPreviewMode ? (
              <div className="space-y-6">
                <div className="flex justify-center space-x-4 space-x-reverse">
                  <button
                    onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
                    disabled={currentSlideIndex === 0}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                    {currentSlideIndex + 1} / {slides.length}
                  </span>
                  <button
                    onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
                    disabled={currentSlideIndex === slides.length - 1}
                    className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
                {renderSlidePreview(slides[currentSlideIndex])}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {slides.map((slide, index) => (
                  <div key={slide.id} className="relative group">
                    <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => deleteSlide(slide.id)}
                        className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">شريحة {index + 1}</span>
                      <div className="flex space-x-1 space-x-reverse">
                        <button className="p-1 text-gray-500 hover:text-purple-500">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-purple-500">
                          <Move className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {renderSlidePreview(slide)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Statistics and Export */}
      {slides.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-500 mr-3" />
              <h3 className="text-lg font-semibold">الإحصائيات</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>عدد الشرائح:</span>
                <span className="font-medium">{stats.totalSlides}</span>
              </div>
              <div className="flex justify-between">
                <span>الوقت المقدر:</span>
                <span className="font-medium">{stats.estimatedTime} دقيقة</span>
              </div>
              <div className="flex justify-between">
                <span>عدد الكلمات:</span>
                <span className="font-medium">{stats.wordCount}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 text-blue-500 mr-3" />
              <h3 className="text-lg font-semibold">معلومات العرض</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>القالب:</span>
                <span className="font-medium">
                  {templates.find(t => t.id === selectedTemplate)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>الألوان:</span>
                <span className="font-medium">
                  {colorSchemes.find(c => c.id === selectedColorScheme)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>الخط:</span>
                <span className="font-medium">
                  {fonts.find(f => f.id === selectedFont)?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Download className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold">التصدير</h3>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => exportPresentation('pptx')}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                تصدير كـ PowerPoint
              </button>
              <button
                onClick={() => exportPresentation('pdf')}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                تصدير كـ PDF
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PresentationBuilderComponent;