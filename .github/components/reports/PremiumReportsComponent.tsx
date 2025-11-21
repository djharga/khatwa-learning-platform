'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Palette,
  FileText,
  Download,
  Eye,
  Settings,
  Image,
  Type,
  Layout,
  CheckCircle,
  X,
  Sparkles,
} from 'lucide-react';

// Mock data for report templates
const reportTemplates = [
  {
    id: 'financial',
    name: 'تقرير مالي',
    description: 'تقرير شامل عن الأداء المالي',
    preview: '📊 إيرادات: 1,250,000 ريال\n📈 نمو: 15%\n💰 أرباح: 350,000 ريال',
  },
  {
    id: 'performance',
    name: 'تقرير الأداء',
    description: 'تحليل أداء الموظفين والفرق',
    preview: '👥 عدد الموظفين: 45\n⭐ متوسط التقييم: 4.2\n📈 معدل الإنجاز: 92%',
  },
  {
    id: 'analytical',
    name: 'تقرير تحليلي',
    description: 'تحليل بيانات شامل مع رسوم بيانية',
    preview: '📈 اتجاهات السوق\n📊 مقارنات الأداء\n🔍 تحليل المنافسة',
  },
];

// Mock data for sample report content
const sampleReportData = {
  title: 'تقرير الأداء الشهري',
  sections: [
    {
      title: 'المقدمة',
      content: 'هذا التقرير يغطي الأداء الشهري للشركة...',
    },
    {
      title: 'النتائج المالية',
      content: 'الإيرادات بلغت 1,250,000 ريال مع نمو 15%...',
      chart: 'bar', // Placeholder for chart type
    },
    {
      title: 'التوصيات',
      content: 'يُنصح بزيادة الاستثمار في...',
    },
  ],
};

interface Customization {
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  fontSize: string;
  headerText: string;
  footerText: string;
  template: string;
}

const PremiumReportsComponent = () => {
  const [customization, setCustomization] = useState<Customization>({
    logo: null,
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    fontFamily: 'Arial',
    fontSize: '16px',
    headerText: 'تقرير احترافي',
    footerText: '© 2024 الشركة',
    template: 'financial',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomization(prev => ({ ...prev, logo: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      alert('تم تصدير التقرير كـ PDF بنجاح!');
    }, 2000);
  };

  const selectedTemplate = reportTemplates.find(t => t.id === customization.template);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-20 transition-all duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
              Premium Reports
            </h1>
            <p className="text-gray-600 mt-2 text-lg leading-relaxed">
              تقارير احترافية مع هوية مخصصة
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPreview(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center"
          >
            <Eye className="w-5 h-5 mr-2" />
            معاينة التقرير
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customization Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Logo Upload */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Image className="w-5 h-5 mr-2 text-blue-600" />
              شعار الشركة
            </h3>
            <div className="space-y-4">
              {customization.logo ? (
                <div className="text-center">
                  <img src={customization.logo} alt="Logo" className="w-20 h-20 mx-auto rounded-lg border" />
                  <button
                    onClick={() => setCustomization(prev => ({ ...prev, logo: null }))}
                    className="mt-2 text-red-600 text-sm hover:text-red-800"
                  >
                    إزالة الشعار
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => logoInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">انقر لرفع الشعار</p>
                </div>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
          </motion.div>

          {/* Color Picker */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2 text-purple-600" />
              نظام الألوان
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون الأساسي</label>
                <input
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => setCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون الثانوي</label>
                <input
                  type="color"
                  value={customization.secondaryColor}
                  onChange={(e) => setCustomization(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-full h-10 rounded-lg border border-gray-300"
                />
              </div>
            </div>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Type className="w-5 h-5 mr-2 text-green-600" />
              الخطوط والأحجام
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الخط</label>
                <select
                  value={customization.fontFamily}
                  onChange={(e) => setCustomization(prev => ({ ...prev, fontFamily: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Verdana">Verdana</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">حجم الخط</label>
                <select
                  value={customization.fontSize}
                  onChange={(e) => setCustomization(prev => ({ ...prev, fontSize: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="14px">صغير (14px)</option>
                  <option value="16px">متوسط (16px)</option>
                  <option value="18px">كبير (18px)</option>
                  <option value="20px">كبير جداً (20px)</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Header & Footer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Layout className="w-5 h-5 mr-2 text-orange-600" />
              الرأس والتذييل
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نص الرأس</label>
                <input
                  type="text"
                  value={customization.headerText}
                  onChange={(e) => setCustomization(prev => ({ ...prev, headerText: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="أدخل نص الرأس"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نص التذييل</label>
                <input
                  type="text"
                  value={customization.footerText}
                  onChange={(e) => setCustomization(prev => ({ ...prev, footerText: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="أدخل نص التذييل"
                />
              </div>
            </div>
          </motion.div>

          {/* Template Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-red-600" />
              قالب التقرير
            </h3>
            <div className="space-y-2">
              {reportTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setCustomization(prev => ({ ...prev, template: template.id }))}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    customization.template === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-800">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Export Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
            disabled={isExporting}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                جاري التصدير...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                تصدير كـ PDF
              </>
            )}
          </motion.button>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 sticky top-6"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-2 text-blue-600" />
              معاينة التقرير
            </h3>

            {/* Report Preview */}
            <div
              className="border border-gray-200 rounded-xl p-6 bg-gray-50"
              style={{
                fontFamily: customization.fontFamily,
                fontSize: customization.fontSize,
                color: '#374151',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between mb-6 p-4 rounded-lg"
                style={{ backgroundColor: customization.primaryColor + '20' }}
              >
                <div className="flex items-center">
                  {customization.logo && (
                    <img src={customization.logo} alt="Logo" className="w-12 h-12 mr-4 rounded" />
                  )}
                  <h2
                    className="text-xl font-bold"
                    style={{ color: customization.primaryColor }}
                  >
                    {customization.headerText}
                  </h2>
                </div>
                <div
                  className="text-sm"
                  style={{ color: customization.secondaryColor }}
                >
                  تاريخ التقرير: {new Date().toLocaleDateString('ar-SA')}
                </div>
              </div>

              {/* Report Title */}
              <h1
                className="text-2xl font-bold text-center mb-8"
                style={{ color: customization.primaryColor }}
              >
                {selectedTemplate?.name || 'تقرير'}
              </h1>

              {/* Report Content */}
              <div className="space-y-6">
                {sampleReportData.sections.map((section, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <h3
                      className="text-lg font-semibold mb-3"
                      style={{ color: customization.secondaryColor }}
                    >
                      {section.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {section.content}
                    </p>
                    {section.chart && (
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-gray-600">📊 رسم بياني {section.chart === 'bar' ? 'عمودي' : 'دائري'}</p>
                        {/* Placeholder for chart */}
                        <div className="mt-2 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                className="mt-8 pt-4 border-t text-center text-sm"
                style={{ color: customization.secondaryColor }}
              >
                {customization.footerText}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">معاينة كاملة للتقرير</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>

              {/* Full Report Preview */}
              <div
                className="border border-gray-200 rounded-xl p-8 bg-white"
                style={{
                  fontFamily: customization.fontFamily,
                  fontSize: customization.fontSize,
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between mb-8 p-6 rounded-lg"
                  style={{ backgroundColor: customization.primaryColor + '20' }}
                >
                  <div className="flex items-center">
                    {customization.logo && (
                      <img src={customization.logo} alt="Logo" className="w-16 h-16 mr-6 rounded" />
                    )}
                    <h2
                      className="text-2xl font-bold"
                      style={{ color: customization.primaryColor }}
                    >
                      {customization.headerText}
                    </h2>
                  </div>
                  <div
                    className="text-sm"
                    style={{ color: customization.secondaryColor }}
                  >
                    تاريخ التقرير: {new Date().toLocaleDateString('ar-SA')}
                  </div>
                </div>

                {/* Report Title */}
                <h1
                  className="text-3xl font-bold text-center mb-10"
                  style={{ color: customization.primaryColor }}
                >
                  {selectedTemplate?.name || 'تقرير'}
                </h1>

                {/* Report Content */}
                <div className="space-y-8">
                  {sampleReportData.sections.map((section, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg">
                      <h3
                        className="text-xl font-semibold mb-4"
                        style={{ color: customization.secondaryColor }}
                      >
                        {section.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                        {section.content}
                      </p>
                      {section.chart && (
                        <div className="bg-white p-6 rounded-lg text-center border">
                          <p className="text-gray-600 mb-4">📊 رسم بياني تفصيلي</p>
                          {/* Placeholder for detailed chart */}
                          <div className="mt-4 h-32 bg-gradient-to-r from-blue-300 to-purple-300 rounded flex items-end justify-around p-4">
                            <div className="bg-white w-8 h-16 rounded-t"></div>
                            <div className="bg-white w-8 h-24 rounded-t"></div>
                            <div className="bg-white w-8 h-20 rounded-t"></div>
                            <div className="bg-white w-8 h-28 rounded-t"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div
                  className="mt-12 pt-6 border-t text-center text-sm"
                  style={{ color: customization.secondaryColor }}
                >
                  {customization.footerText}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumReportsComponent;