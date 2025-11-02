'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Download,
  Share,
  Eye,
  Calendar,
  CheckCircle,
  Star,
  Crown,
  Medal,
  Trophy,
  Shield,
  QrCode,
  ExternalLink,
  Filter,
  Search,
  Grid,
  List,
  Zap,
  TrendingUp,
  Target,
  Sparkles,
} from 'lucide-react';
import { generateQRCodeFromNumber } from '@/lib/certificates/generateQR';
import { calculateLevel, POINTS_REWARDS, AVAILABLE_BADGES } from '@/lib/gamification/points';

interface Certificate {
  id: string;
  title: string;
  courseName: string;
  instructorName: string;
  issueDate: string;
  expiryDate?: string;
  certificateNumber: string;
  grade?: string;
  status: 'earned' | 'pending' | 'expired';
  type: 'completion' | 'excellence' | 'participation' | 'achievement';
  description: string;
  skills?: string[];
  qrCode?: string;
  verificationUrl?: string;
  template: 'gold' | 'silver' | 'bronze' | 'platinum';
}

export default function CertificatesPage() {
  const [filter, setFilter] = useState<'all' | 'earned' | 'pending' | 'expired'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // بيانات تجريبية للشهادات
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'شهادة إتمام دورة المراجعة الداخلية - المستوى الأساسي',
      courseName: 'المراجعة الداخلية - المستوى الأساسي',
      instructorName: 'د. سارة أحمد',
      issueDate: '2024-02-15',
      certificateNumber: 'CERT-2024-001',
      grade: 'ممتاز (A)',
      status: 'earned',
      type: 'completion',
      description: 'تم إكمال الدورة بنجاح مع الحصول على تقدير ممتاز في جميع الاختبارات والمشاريع العملية',
      skills: ['المراجعة الداخلية', 'تحليل المخاطر', 'إعداد التقارير', 'الامتثال'],
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=CERT-2024-001',
      verificationUrl: 'https://khatwa.edu/verify/CERT-2024-001',
      template: 'gold',
    },
    {
      id: '2',
      title: 'شهادة التفوق في المراجعة الداخلية',
      courseName: 'المراجعة الداخلية - المستوى المتوسط',
      instructorName: 'د. محمد علي',
      issueDate: '2024-02-10',
      certificateNumber: 'CERT-2024-002',
      status: 'earned',
      type: 'excellence',
      description: 'شهادة تفوق للحصول على أعلى الدرجات في الدورة والتميز في التطبيق العملي',
      skills: ['المراجعة المتقدمة', 'إدارة الجودة', 'التدقيق الإلكتروني'],
      verificationUrl: 'https://khatwa.edu/verify/CERT-2024-002',
      template: 'platinum',
    },
    {
      id: '3',
      title: 'شهادة إتمام دورة إدارة المخاطر',
      courseName: 'إدارة المخاطر المتقدمة',
      instructorName: 'د. فاطمة خالد',
      issueDate: '2024-02-20',
      certificateNumber: 'CERT-2024-003',
      status: 'pending',
      type: 'completion',
      description: 'في انتظار إكمال المشروع النهائي واجتياز الاختبار الشامل',
      skills: ['تحليل المخاطر', 'إدارة الأزمات', 'التخطيط الاستراتيجي'],
      template: 'silver',
    },
    {
      id: '4',
      title: 'شهادة المشاركة في ورشة العمل السنوية',
      courseName: 'ورشة عمل المراجعة الداخلية 2024',
      instructorName: 'لجنة الخبراء',
      issueDate: '2024-01-15',
      expiryDate: '2025-01-15',
      certificateNumber: 'CERT-2024-004',
      status: 'earned',
      type: 'participation',
      description: 'شهادة مشاركة في ورشة العمل السنوية للمراجعة الداخلية',
      verificationUrl: 'https://khatwa.edu/verify/CERT-2024-004',
      template: 'bronze',
    },
  ]);

  // بيانات Gamification
  const userPoints = {
    totalPoints: 12500,
    level: calculateLevel(12500),
    certificatesEarned: certificates.filter(c => c.status === 'earned').length,
  };

  // الشارات المكتسبة
  const earnedBadges = AVAILABLE_BADGES.filter(badge => {
    switch (badge.id) {
      case 'first-step':
      case 'certificate-collector':
        return userPoints.certificatesEarned >= 10;
      default:
        return false;
    }
  }).slice(0, 3); // عرض أول 3 شارات فقط كمثال

  // فلترة الشهادات
  const filteredCertificates = certificates.filter(cert => {
    const matchesFilter = filter === 'all' || cert.status === filter;
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.courseName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // الحصول على لون القالب
  const getTemplateColor = (template: string) => {
    switch (template) {
      case 'platinum': return 'from-gray-400 to-gray-600';
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-amber-600 to-amber-800';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  // الحصول على أيقونة نوع الشهادة
  const getCertificateIcon = (type: string) => {
    switch (type) {
      case 'excellence': return <Crown className="w-6 h-6" />;
      case 'completion': return <Medal className="w-6 h-6" />;
      case 'participation': return <Trophy className="w-6 h-6" />;
      case 'achievement': return <Star className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  // مشاركة الشهادة
  const shareCertificate = (certificate: Certificate) => {
    if (navigator.share) {
      navigator.share({
        title: certificate.title,
        text: `حصلت على ${certificate.title}`,
        url: certificate.verificationUrl,
      });
    } else {
      // نسخ رابط التحقق
      navigator.clipboard.writeText(certificate.verificationUrl || '');
      alert('تم نسخ رابط الشهادة');
    }
  };

  // تحميل الشهادة
  const downloadCertificate = async (certificate: Certificate) => {
    try {
      // في التطبيق الحقيقي، سيتم استدعاء API لتحميل الشهادة كـ PDF
      // هنا نحاكي العملية
      
      // إنشاء PDF للشهادة
      const pdfData = {
        title: certificate.title,
        courseName: certificate.courseName,
        studentName: 'أحمد محمد', // سيتم جلبها من المستخدم الحالي
        issueDate: certificate.issueDate,
        certificateNumber: certificate.certificateNumber,
        grade: certificate.grade,
        qrCode: certificate.qrCode,
      };

      // محاكاة إنشاء PDF
      // في الإنتاج، يمكن استخدام مكتبة مثل jsPDF أو html2pdf
      console.log('توليد PDF للشهادة:', pdfData);
      
      // عرض رسالة نجاح
      alert(`تم تحميل شهادة ${certificate.title} بنجاح!\n\nسيتم حفظ الملف في مجلد التحميلات.`);
      
      // في التطبيق الحقيقي:
      // const response = await fetch(`/api/certificates/${certificate.id}/download`);
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = `شهادة_${certificate.certificateNumber}.pdf`;
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('خطأ في تحميل الشهادة:', error);
      alert('حدث خطأ أثناء تحميل الشهادة. يرجى المحاولة مرة أخرى.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            شهاداتي وإنجازاتي
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تابع شهاداتك المعتمدة وأبرز إنجازاتك المهنية في مجال المراجعة الداخلية
          </p>
        </motion.div>

        {/* شريط الأدوات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* البحث والفلترة */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في الشهادات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                {[
                  { id: 'all', label: 'الكل' },
                  { id: 'earned', label: 'مكتسبة' },
                  { id: 'pending', label: 'معلقة' },
                  { id: 'expired', label: 'منتهية' },
                ].map((filterOption) => (
                  <button
                    key={filterOption.id}
                    onClick={() => setFilter(filterOption.id as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === filterOption.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>
            </div>

            {/* تبديل طريقة العرض */}
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* الشهادات */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden border-2 ${
                certificate.status === 'earned' ? 'border-green-200' :
                certificate.status === 'pending' ? 'border-yellow-200' : 'border-gray-200'
              } ${viewMode === 'list' ? 'flex items-center p-6' : ''}`}
            >
              {/* خلفية القالب */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getTemplateColor(certificate.template)} opacity-5`} />

              {/* شارة الحالة */}
              <div className="absolute top-4 right-4 z-10">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  certificate.status === 'earned' ? 'bg-green-100 text-green-800' :
                  certificate.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {certificate.status === 'earned' ? 'مكتسبة' :
                   certificate.status === 'pending' ? 'معلقة' : 'منتهية'}
                </div>
              </div>

              {/* محتوى الشهادة */}
              <div className={`relative z-10 ${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
                {/* رأس الشهادة */}
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${getTemplateColor(certificate.template)} flex items-center justify-center text-white`}>
                    {getCertificateIcon(certificate.type)}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {certificate.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4">
                    {certificate.courseName}
                  </p>

                  {certificate.grade && (
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      <Award className="w-4 h-4" />
                      {certificate.grade}
                    </div>
                  )}
                </div>

                {/* معلومات الشهادة */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">رقم الشهادة:</span>
                    <span className="font-mono text-gray-900">{certificate.certificateNumber}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">تاريخ الإصدار:</span>
                    <span className="text-gray-900">{certificate.issueDate}</span>
                  </div>

                  {certificate.expiryDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">تاريخ الانتهاء:</span>
                      <span className="text-gray-900">{certificate.expiryDate}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">المدرب:</span>
                    <span className="text-gray-900">{certificate.instructorName}</span>
                  </div>
                </div>

                {/* المهارات المكتسبة */}
                {certificate.skills && certificate.skills.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">المهارات المكتسبة:</h4>
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* أزرار الإجراءات */}
                <div className={`flex gap-2 ${viewMode === 'list' ? 'justify-end' : 'justify-center'}`}>
                  <motion.button
                    onClick={() => setSelectedCertificate(certificate)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                    عرض
                  </motion.button>

                  {certificate.status === 'earned' && (
                    <>
                      <motion.button
                        onClick={() => downloadCertificate(certificate)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                        تحميل
                      </motion.button>

                      <motion.button
                        onClick={() => shareCertificate(certificate)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share className="w-4 h-4" />
                        مشاركة
                      </motion.button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* رسالة عدم وجود شهادات */}
        {filteredCertificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'لا توجد شهادات تطابق البحث' : 'لا توجد شهادات بعد'}
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'جرب مصطلحات بحث مختلفة' : 'ابدأ في إكمال دوراتك للحصول على شهاداتك الأولى'}
            </p>
          </motion.div>
        )}

        {/* نافذة عرض الشهادة */}
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* رأس النافذة */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">تفاصيل الشهادة</h3>
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>

              {/* محتوى الشهادة */}
              <div className="p-6">
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${getTemplateColor(selectedCertificate.template)} flex items-center justify-center text-white`}>
                    {getCertificateIcon(selectedCertificate.type)}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedCertificate.title}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {selectedCertificate.description}
                  </p>

                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                    <span>رقم الشهادة: {selectedCertificate.certificateNumber}</span>
                    <span>•</span>
                    <span>تاريخ الإصدار: {selectedCertificate.issueDate}</span>
                  </div>
                </div>

                {/* معلومات مفصلة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">معلومات الدورة</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-900">{selectedCertificate.courseName}</p>
                        <p className="text-sm text-gray-600">المدرب: {selectedCertificate.instructorName}</p>
                      </div>
                    </div>

                    {selectedCertificate.grade && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">التقدير</h4>
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="font-medium text-blue-900">{selectedCertificate.grade}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    {selectedCertificate.skills && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">المهارات المكتسبة</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCertificate.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedCertificate.qrCode && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">رمز التحقق</h4>
                        <div className="bg-gray-50 p-4 rounded-lg text-center">
                          <img
                            src={selectedCertificate.qrCode}
                            alt="QR Code"
                            className="w-24 h-24 mx-auto mb-2"
                          />
                          <p className="text-xs text-gray-600">امسح الرمز للتحقق من الشهادة</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {selectedCertificate.status === 'earned' && (
                    <>
                      <motion.button
                        onClick={() => downloadCertificate(selectedCertificate)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-5 h-5" />
                        تحميل الشهادة
                      </motion.button>

                      <motion.button
                        onClick={() => shareCertificate(selectedCertificate)}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share className="w-5 h-5" />
                        مشاركة الشهادة
                      </motion.button>
                    </>
                  )}

                  <motion.button
                    onClick={() => window.open(selectedCertificate.verificationUrl, '_blank')}
                    className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-5 h-5" />
                    التحقق من الشهادة
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* إحصائيات الشهادات مع Gamification */}
        <div className="mt-12 space-y-6">
          {/* إحصائيات الشهادات */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              إحصائيات الشهادات
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {certificates.filter(c => c.status === 'earned').length}
                </div>
                <div className="text-gray-600">شهادات مكتسبة</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {certificates.filter(c => c.status === 'pending').length}
                </div>
                <div className="text-gray-600">شهادات معلقة</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {certificates.filter(c => c.type === 'excellence').length}
                </div>
                <div className="text-gray-600">شهادات تفوق</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {certificates.filter(c => c.template === 'gold' || c.template === 'platinum').length}
                </div>
                <div className="text-gray-600">شهادات ذهبية</div>
              </div>
            </div>
          </motion.div>

          {/* نظام النقاط والشارات (Gamification) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl p-8 border-2 border-indigo-200 dark:border-indigo-800"
          >
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              نقاطك وإنجازاتك
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* النقاط والمستوى */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">المستوى والنقاط</h3>
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">المستوى {userPoints.level}</span>
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      {userPoints.totalPoints.toLocaleString()} نقطة
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((userPoints.totalPoints % 1000) / 1000) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {1000 - (userPoints.totalPoints % 1000)} نقطة للمستوى التالي
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-3">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {userPoints.certificatesEarned}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">شهادات</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {POINTS_REWARDS.CERTIFICATE_EARNED * userPoints.certificatesEarned}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">نقاط من الشهادات</div>
                  </div>
                </div>
              </div>

              {/* الشارات */}
              <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">الشارات المكتسبة</h3>
                  <Trophy className="w-6 h-6 text-yellow-500" />
                </div>
                
                <div className="space-y-3">
                  {earnedBadges.length > 0 ? (
                    earnedBadges.map((badge, index) => (
                      <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                      >
                        <div className="text-3xl">{badge.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {badge.title}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {badge.description}
                          </div>
                        </div>
                        <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                          +{badge.points}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                      <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>لا توجد شارات بعد</p>
                      <p className="text-xs mt-1">استمر في التعلم لكسب شارات جديدة!</p>
                    </div>
                  )}
                </div>

                {earnedBadges.length < AVAILABLE_BADGES.length && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-400">
                      <Target className="w-4 h-4" />
                      <span>
                        {AVAILABLE_BADGES.length - earnedBadges.length} شارة متاحة لكسبها
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
