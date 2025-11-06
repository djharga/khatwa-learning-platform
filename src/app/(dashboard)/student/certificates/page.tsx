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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-600 via-amber-600 to-orange-600 text-white p-8 lg:p-12"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block p-4 bg-white/20 backdrop-blur-md rounded-2xl mb-4"
              >
                <Trophy className="w-12 h-12" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2">
                شهاداتي
              </h1>
              <p className="text-lg md:text-xl text-yellow-100">
                جميع الشهادات والإنجازات التي حصلت عليها من منصة خطى
              </p>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600"></div>
                <CardContent className="p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-blue-100 text-sm font-medium mb-1">
                        إجمالي الشهادات
                      </p>
                      <p className="text-4xl font-extrabold">
                        {certificates.length}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <Award className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-blue-100">شهادات معتمدة</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-600"></div>
                <CardContent className="p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-yellow-100 text-sm font-medium mb-1">
                        شهادات ذهبية
                      </p>
                      <p className="text-4xl font-extrabold">
                        {certificates.filter(c => c.badge === 'gold').length}
                      </p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <Star className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-yellow-100">مستوى ممتاز</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-fuchsia-600"></div>
                <CardContent className="p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-purple-100 text-sm font-medium mb-1">
                        شهادات بلاتينية
                      </p>
                      <p className="text-4xl font-extrabold">
                        {certificates.filter(c => c.badge === 'platinum').length}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <Crown className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-purple-100">أعلى مستوى</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="shadow-xl border-0 overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600"></div>
                <CardContent className="p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-green-100 text-sm font-medium mb-1">
                        متوسط الدرجات
                      </p>
                      <p className="text-4xl font-extrabold">
                        {avgScore}%
                      </p>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="p-3 bg-white/20 backdrop-blur-md rounded-xl"
                    >
                      <Target className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <p className="text-sm text-green-100">أداء ممتاز</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate, idx) => {
              const badgeConfig = getBadgeConfig(certificate.badge);
              const Icon = badgeConfig.icon;
              return (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 20, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, type: "spring", stiffness: 150 }}
                  whileHover={{ scale: 1.05, y: -10, rotate: 2 }}
                  className="relative group"
                >
                  <Card className="h-full overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border-2 border-gray-200 relative">
                    {/* Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${badgeConfig.gradient} flex items-center justify-center shadow-2xl`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                    </div>

                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <CardTitle className="text-xl font-extrabold mb-2 text-gray-900">
                            {certificate.title}
                          </CardTitle>
                          <CardDescription className="text-sm font-semibold">
                            {certificate.courseTitle}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-5 relative z-10">
                      {/* Certificate Preview */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`relative bg-gradient-to-br ${badgeConfig.bgGradient} rounded-2xl p-8 border-2 ${badgeConfig.borderColor} cursor-pointer overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 text-center">
                          <Sparkles className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
                          <p className="text-lg font-bold text-gray-900 mb-2">
                            شهادة معتمدة
                          </p>
                          <p className="text-xs text-gray-600 font-mono">
                            {certificate.certificateId}
                          </p>
                        </div>
                        {/* Decorative corner elements */}
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-yellow-500 opacity-50"></div>
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-yellow-500 opacity-50"></div>
                      </motion.div>

                      {/* Certificate Details */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                          <div className="flex items-center gap-2 text-gray-700">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            <span className="text-sm font-semibold">المدرس:</span>
                          </div>
                          <span className="font-bold text-gray-900">{certificate.instructor}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-semibold">التاريخ:</span>
                          </div>
                          <span className="font-bold text-gray-900">{certificate.issueDate}</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Target className="w-5 h-5 text-purple-600" />
                            <span className="text-sm font-semibold">الدرجة:</span>
                          </div>
                          <span className="font-extrabold text-2xl text-purple-600">
                            {certificate.score}%
                          </span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div>
                        <p className="text-sm font-bold text-gray-900 mb-3">
                          المهارات المكتسبة:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {certificate.skills.map((skill, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + idx * 0.1 + index * 0.05 }}
                              className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg"
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => downloadCertificate(certificate.certificateId)}
                          className="group relative overflow-hidden flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Download className="w-5 h-5 relative z-10 group-hover:animate-bounce" />
                          <span className="relative z-10">تحميل</span>
                          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05, y: -2, rotate: 5 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => shareCertificate(certificate.certificateId)}
                          className="group relative overflow-hidden px-4 py-3 bg-white border-2 border-gray-300 hover:border-indigo-400 text-gray-700 hover:text-indigo-600 rounded-xl font-bold shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
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
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Card className="shadow-2xl border-0 overflow-hidden relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-300/30 to-orange-300/30 rounded-full blur-3xl"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 360]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="p-6 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full shadow-2xl"
                    >
                      <Trophy className="w-16 h-16 text-white" />
                    </motion.div>
                    <div className="flex-1 text-center md:text-right">
                      <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                        تهانينا على إنجازاتك! 🎉
                      </h3>
                      <p className="text-gray-700 mb-4">
                        لقد أكملت {certificates.length} دورة بنجاح وحصلت على شهادات معتمدة
                      </p>
                      <div className="flex justify-center md:justify-start gap-3">
                        <StyledButton size="large" variant="primary">
                          <Share2 className="w-5 h-5 inline-block mr-2" />
                          مشاركة الإنجازات
                        </StyledButton>
                        <StyledButton size="large" variant="secondary">
                          <ExternalLink className="w-5 h-5 inline-block mr-2" />
                          استكشاف دورات جديدة
                        </StyledButton>
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
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Award className="w-24 h-24 mx-auto text-gray-300" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                لم تحصل على شهادات بعد
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                أكمل الدورات للحصول على شهادات معتمدة
              </p>
              <StyledButton size="large" variant="primary" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <Target className="w-5 h-5 ml-2" />
                استكشاف الدورات
              </StyledButton>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
