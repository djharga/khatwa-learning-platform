'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/icons/IconSystem';
import { Button } from '@/components/ui/Button';
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

  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null);

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'platinum':
        return 'from-gray-400 to-gray-600';
      case 'gold':
        return 'from-yellow-400 to-yellow-600';
      case 'silver':
        return 'from-gray-300 to-gray-500';
      case 'bronze':
        return 'from-orange-400 to-orange-600';
      default:
        return 'from-blue-400 to-blue-600';
    }
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'platinum':
        return 'crown';
      case 'gold':
        return 'star';
      case 'silver':
        return 'medal';
      case 'bronze':
        return 'award';
      default:
        return 'certificate';
    }
  };

  const downloadCertificate = (certificateId: string) => {
    // Simulate download
    alert(`جاري تحميل الشهادة ${certificateId}`);
  };

  const shareCertificate = (certificateId: string) => {
    // Simulate sharing
    alert(`مشاركة الشهادة ${certificateId}`);
  };

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              شهاداتي
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              جميع الشهادات والإنجازات التي حصلت عليها من منصة خطى
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {certificates.length}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  إجمالي الشهادات
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {certificates.filter(c => c.badge === 'platinum').length}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  شهادات بلاتينية
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {certificates.filter(c => c.badge === 'gold').length}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  شهادات ذهبية
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {Math.round(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length)}%
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  متوسط الدرجات
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <motion.div
                key={certificate.id}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800">
                  {/* Certificate Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getBadgeColor(certificate.badge)} flex items-center justify-center shadow-lg`}>
                      <Icon name={getBadgeIcon(certificate.badge) as any} size="sm" className="text-white" />
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {certificate.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {certificate.courseTitle}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Certificate Preview */}
                    <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <div className="text-center">
                        <Icon name="certificate" size="lg" className="text-blue-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          شهادة معتمدة
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {certificate.certificateId}
                        </p>
                      </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">المدرس:</span>
                        <span className="font-medium">{certificate.instructor}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">تاريخ الإصدار:</span>
                        <span className="font-medium">{certificate.issueDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">الدرجة:</span>
                        <span className="font-medium text-green-600 dark:text-green-400">
                          {certificate.score}%
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        المهارات المكتسبة:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {certificate.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900/20 dark:text-blue-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => downloadCertificate(certificate.certificateId)}
                      >
                        <Icon name="download" size="sm" className="ml-1" />
                        تحميل
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => shareCertificate(certificate.certificateId)}
                      >
                        <Icon name="share" size="sm" className="ml-1" />
                        مشاركة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Achievement Message */}
          {certificates.length > 0 && (
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800">
                <CardContent className="p-8">
                  <Icon name="trophy" size="lg" className="text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    تهانينا على إنجازاتك! 🎉
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    لقد أكملت {certificates.length} دورة بنجاح وحصلت على شهادات معتمدة
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button>
                      مشاركة الإنجازات
                    </Button>
                    <Button variant="outline">
                      استكشاف دورات جديدة
                    </Button>
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
              <Icon name="certificate" size="lg" className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                لم تحصل على شهادات بعد
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                ابدأ رحلتك التعليمية واكمل الدورات للحصول على شهادات معتمدة
              </p>
              <Button>
                استكشاف الدورات
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
