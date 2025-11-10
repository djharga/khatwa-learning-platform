'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Download,
  Share2,
  Crown,
  Star,
  Medal,
  Trophy,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Linkedin,
  Twitter,
  Eye,
  FileText,
  Sparkles,
  Target,
} from 'lucide-react';
import Image from 'next/image';
import StyledButton from '@/components/ui/StyledButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export default function StudentCertificatesPage() {
  const [certificates] = useState([
    {
      id: '1',
      title: 'أساسيات المراجعة الداخلية',
      courseTitle: 'أساسيات المراجعة الداخلية',
      instructor: 'د. أحمد محمد',
      issueDate: '2025-08-15',
      score: 95,
      status: 'completed',
      certificateId: 'CERT-2025-001',
      description: 'إكمال دورة أساسيات المراجعة الداخلية بنجاح',
      skills: ['فهم المخاطر', 'تقييم الرقابة', 'الإجراءات المراجعية'],
      badge: 'gold',
    },
    {
      id: '2',
      title: 'تحليل المخاطر المتقدم',
      courseTitle: 'تحليل المخاطر في المحاسبة',
      instructor: 'د. فاطمة علي',
      issueDate: '2025-09-20',
      score: 92,
      status: 'completed',
      certificateId: 'CERT-2025-002',
      description: 'إكمال دورة تحليل المخاطر المتقدمة بنجاح',
      skills: ['تحليل المخاطر الكمي', 'تقييم التأثير', 'استراتيجيات التخفيف'],
      badge: 'silver',
    },
    {
      id: '3',
      title: 'الامتثال والحوكمة',
      courseTitle: 'الامتثال والحوكمة',
      instructor: 'د. محمد حسن',
      issueDate: '2025-10-10',
      score: 88,
      status: 'completed',
      certificateId: 'CERT-2025-003',
      description: 'إكمال دورة الامتثال والحوكمة بنجاح',
      skills: ['معايير SOX', 'حوكمة الشركات', 'الامتثال التنظيمي'],
      badge: 'bronze',
    },
    {
      id: '4',
      title: 'CIA Part 1 - الجزء الأول',
      courseTitle: 'تحضير امتحان CIA الجزء الأول',
      instructor: 'د. سارة أحمد',
      issueDate: '2025-09-05',
      score: 96,
      status: 'completed',
      certificateId: 'CIA-2025-001',
      description: 'اجتياز امتحان CIA Part 1 بنجاح',
      skills: ['المعايير المهنية', 'الأخلاقيات', 'إدارة المخاطر'],
      badge: 'platinum',
    },
  ]);

  const getBadgeConfig = (badge: string) => {
    switch (badge) {
      case 'platinum':
        return {
          gradient: 'from-gray-400 via-gray-500 to-gray-600',
          bgGradient: 'from-gray-50 to-gray-100',
          borderColor: 'border-gray-300',
          icon: Crown,
          label: 'بلاتيني',
        };
      case 'gold':
        return {
          gradient: 'from-yellow-400 via-amber-500 to-yellow-600',
          bgGradient: 'from-yellow-50 to-amber-100',
          borderColor: 'border-yellow-300',
          icon: Star,
          label: 'ذهبي',
        };
      case 'silver':
        return {
          gradient: 'from-gray-300 via-gray-400 to-gray-500',
          bgGradient: 'from-gray-50 to-gray-100',
          borderColor: 'border-gray-300',
          icon: Medal,
          label: 'فضي',
        };
      case 'bronze':
        return {
          gradient: 'from-orange-400 via-orange-500 to-orange-600',
          bgGradient: 'from-orange-50 to-orange-100',
          borderColor: 'border-orange-300',
          icon: Medal,
          label: 'برونزي',
        };
      default:
        return {
          gradient: 'from-blue-400 via-blue-500 to-blue-600',
          bgGradient: 'from-blue-50 to-blue-100',
          borderColor: 'border-blue-300',
          icon: Award,
          label: 'عادي',
        };
    }
  };

  const downloadCertificate = (certificateId: string) => {
    alert(`جاري تحميل الشهادة ${certificateId}`);
  };

  const shareCertificate = (certificateId: string) => {
    alert(`مشاركة الشهادة ${certificateId}`);
  };

  const avgScore = Math.round(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="max-w-7xl mx-auto"
        >
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-6 sm:mb-8 relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-warning-600 via-warning-700 to-warning-600 text-white p-6 sm:p-8 lg:p-12 shadow-lg"
          >
            <div className="absolute top-0 end-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block p-3 sm:p-4 bg-white/20 backdrop-blur-md rounded-xl sm:rounded-2xl mb-3 sm:mb-4"
              >
                <Trophy className="w-10 h-10 sm:w-12 sm:h-12" aria-hidden="true" />
              </motion.div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">
                شهاداتي
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-yellow-100">
                جميع الشهادات والإنجازات التي حصلت عليها من منصة خطى
              </p>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-600"></div>
                <CardContent className="p-4 sm:p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <p className="text-blue-100 text-xs sm:text-sm font-medium mb-1">
                        إجمالي الشهادات
                      </p>
                      <p className="text-3xl sm:text-4xl font-extrabold">
                        {certificates.length}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <Award className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-blue-100">شهادات معتمدة</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-warning-600 via-warning-700 to-warning-600"></div>
                <CardContent className="p-4 sm:p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <p className="text-yellow-100 text-xs sm:text-sm font-medium mb-1">
                        شهادات ذهبية
                      </p>
                      <p className="text-3xl sm:text-4xl font-extrabold">
                        {certificates.filter(c => c.badge === 'gold').length}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <Star className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-yellow-100">مستوى ممتاز</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary-innovate-600 via-secondary-innovate-700 to-secondary-innovate-600"></div>
                <CardContent className="p-4 sm:p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <p className="text-purple-100 text-xs sm:text-sm font-medium mb-1">
                        شهادات بلاتينية
                      </p>
                      <p className="text-3xl sm:text-4xl font-extrabold">
                        {certificates.filter(c => c.badge === 'platinum').length}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <Crown className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-100">أعلى مستوى</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-success-600 via-success-700 to-success-600"></div>
                <CardContent className="p-4 sm:p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div>
                      <p className="text-green-100 text-xs sm:text-sm font-medium mb-1">
                        متوسط الدرجات
                      </p>
                      <p className="text-3xl sm:text-4xl font-extrabold">
                        {avgScore}%
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <Target className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-green-100">أداء ممتاز</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {certificates.map((certificate, idx) => {
              const badgeConfig = getBadgeConfig(certificate.badge);
              const Icon = badgeConfig.icon;
              return (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.05, duration: 0.2, ease: 'easeOut' }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="relative group"
                >
                  <Card className="h-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 ease-out border border-neutral-200 dark:border-neutral-700 relative">
                    {/* Badge */}
                    <div className="absolute top-3 end-3 sm:top-4 sm:end-4 z-20">
                      <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${badgeConfig.gradient} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" aria-hidden="true" />
                      </div>
                    </div>

                    <CardHeader className="pb-3 sm:pb-4 relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pe-3 sm:pe-4">
                          <CardTitle className="text-lg sm:text-xl font-extrabold mb-2 text-neutral-900 dark:text-white">
                            {certificate.title}
                          </CardTitle>
                          <CardDescription className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                            {certificate.courseTitle}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4 sm:space-y-5 relative z-10 p-4 sm:p-6">
                      {/* Certificate Preview */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`relative bg-gradient-to-br ${badgeConfig.bgGradient} dark:from-warning-900/20 dark:to-warning-800/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border-2 ${badgeConfig.borderColor} dark:border-warning-800 cursor-pointer overflow-hidden transition-all duration-200 ease-out ${
                          (certificate.certificateId.startsWith('CIA-') || certificate.title.includes('CIA') || certificate.title.includes('زمالة')) ? 'min-h-[220px] sm:min-h-[260px] bg-white dark:bg-neutral-800' : ''
                        }`}
                      >
                        {/* Check if it's a CIA certificate */}
                        {(certificate.certificateId.startsWith('CIA-') || certificate.title.includes('CIA') || certificate.title.includes('زمالة')) ? (
                          <div className="relative w-full h-full min-h-[200px] sm:min-h-[240px] rounded-lg overflow-hidden">
                            <Image
                              src="/assets/certifed.jpg"
                              alt={certificate.title}
                              fill
                              priority
                              quality={95}
                              className="object-contain"
                              style={{ objectPosition: 'center', padding: '8px' }}
                            />
                          </div>
                        ) : (
                          <div className="relative z-10 text-center">
                            <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-warning-500 dark:text-warning-400" aria-hidden="true" />
                            <p className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-2">
                              شهادة معتمدة
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                              {certificate.certificateId}
                            </p>
                          </div>
                        )}
                      </motion.div>

                      {/* Certificate Details */}
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center justify-between p-2 sm:p-3 min-h-[48px] bg-primary-50 dark:bg-primary-900/20 rounded-lg sm:rounded-xl transition-all duration-200 ease-out hover:bg-primary-100 dark:hover:bg-primary-900/30">
                          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                            <span className="text-xs sm:text-sm font-semibold">المدرس:</span>
                          </div>
                          <span className="font-bold text-neutral-900 dark:text-white text-xs sm:text-sm">{certificate.instructor}</span>
                        </div>

                        <div className="flex items-center justify-between p-2 sm:p-3 min-h-[48px] bg-success-50 dark:bg-success-900/20 rounded-lg sm:rounded-xl transition-all duration-200 ease-out hover:bg-success-100 dark:hover:bg-success-900/30">
                          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-success-600 dark:text-success-400" aria-hidden="true" />
                            <span className="text-xs sm:text-sm font-semibold">التاريخ:</span>
                          </div>
                          <span className="font-bold text-neutral-900 dark:text-white text-xs sm:text-sm">{certificate.issueDate}</span>
                        </div>

                        <div className="flex items-center justify-between p-2 sm:p-3 min-h-[48px] bg-secondary-innovate-50 dark:bg-secondary-innovate-900/20 rounded-lg sm:rounded-xl transition-all duration-200 ease-out hover:bg-secondary-innovate-100 dark:hover:bg-secondary-innovate-900/30">
                          <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-innovate-600 dark:text-secondary-innovate-400" aria-hidden="true" />
                            <span className="text-xs sm:text-sm font-semibold">الدرجة:</span>
                          </div>
                          <span className="font-extrabold text-xl sm:text-2xl text-secondary-innovate-600 dark:text-secondary-innovate-400">
                            {certificate.score}%
                          </span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white mb-2 sm:mb-3">
                          المهارات المكتسبة:
                        </p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {certificate.skills.map((skill, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + idx * 0.05 + index * 0.03, duration: 0.2, ease: 'easeOut' }}
                              className="px-2 sm:px-3 py-1 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xs font-bold rounded-full shadow-sm"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 sm:gap-3 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => downloadCertificate(certificate.certificateId)}
                          className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                          aria-label={`تحميل شهادة ${certificate.title}`}
                          type="button"
                        >
                          <Download className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                          <span className="text-sm sm:text-base">تحميل</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => shareCertificate(certificate.certificateId)}
                          className="px-3 sm:px-4 py-2 sm:py-2.5 min-h-[44px] min-w-[44px] bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 hover:border-primary-400 dark:hover:border-primary-500 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                          aria-label={`مشاركة شهادة ${certificate.title}`}
                          type="button"
                        >
                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Achievement Message */}
          {certificates.length > 0 && (
            <motion.div
              className="mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.8, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative bg-gradient-to-br from-warning-50 via-warning-100/50 to-warning-50 dark:from-warning-900/20 dark:via-warning-800/20 dark:to-warning-900/20">
                <CardContent className="p-4 sm:p-6 lg:p-8 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                    <div className="p-4 sm:p-6 bg-gradient-to-br from-warning-500 to-warning-600 rounded-full shadow-lg">
                      <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-white" aria-hidden="true" />
                    </div>
                    <div className="flex-1 text-center md:text-start">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white mb-2">
                        تهانينا على إنجازاتك! 🎉
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 mb-4">
                        لقد أكملت {certificates.length} دورة بنجاح وحصلت على شهادات معتمدة
                      </p>
                      <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-2 sm:gap-3">
                        <button className="px-4 sm:px-6 py-2 sm:py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="مشاركة الإنجازات" type="button">
                          <Share2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                          <span className="text-sm sm:text-base">مشاركة الإنجازات</span>
                        </button>
                        <button className="px-4 sm:px-6 py-2 sm:py-2.5 min-h-[44px] bg-white dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 hover:border-primary-400 dark:hover:border-primary-500 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="استكشاف دورات جديدة" type="button">
                          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                          <span className="text-sm sm:text-base">استكشاف دورات جديدة</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Empty State */}
          {certificates.length === 0 && (
            <motion.div
              className="text-center py-12 sm:py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div className="inline-block mb-4">
                <Award className="w-20 h-20 sm:w-24 sm:h-24 mx-auto text-neutral-300 dark:text-neutral-600" aria-hidden="true" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                لم تحصل على شهادات بعد
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-6">
                أكمل الدورات للحصول على شهادات معتمدة
              </p>
              <button className="px-6 py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label="استكشاف الدورات" type="button">
                <Target className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span className="text-sm sm:text-base">استكشاف الدورات</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
