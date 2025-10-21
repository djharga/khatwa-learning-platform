'use client';

import { motion } from 'framer-motion';
import { Download, Award, Star, Trophy, Target, Zap } from 'lucide-react';

/**
 * Represents a course completion certificate with score, grade, badges, and download URL
 */
export interface Certificate {
  id: string;
  courseName: string;
  completionDate: string;
  score: number;
  grade: string;
  downloadUrl: string;
  badges: {
    type: 'star' | 'trophy' | 'target' | 'zap';
    label: string;
    points: number;
  }[];
}

/**
 * Props for CertificatesComponent including certificates list and display options
 */
interface CertificatesComponentProps {
  certificates: Certificate[];
  title?: string;
  showDownload?: boolean;
}

/**
 * Certificate card displaying course name, completion date, score with progress bar, achievement badges, and download button. Features gradient header and animated elements.
 */
interface CertificateCardProps {
  certificate: Certificate;
  index: number;
  showDownload: boolean;
  onDownload: (cert: Certificate) => void;
  getBadgeIcon: (type: string) => React.ComponentType;
  getBadgeColor: (type: string) => string;
}

const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate: cert,
  index,
  showDownload,
  onDownload,
  getBadgeIcon,
  getBadgeColor,
}) => (
  <motion.div
    key={cert.id}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ scale: 1.05, y: -6 }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300"
  >
    {/* Certificate Header */}
    <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
      <div className="flex items-center justify-between mb-4">
        <Award className="w-10 h-10" />
        <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
          {cert.grade}
        </span>
      </div>
      <h3 className="text-lg lg:text-xl font-bold mb-2 leading-tight">
        {cert.courseName}
      </h3>
      <p className="text-sm opacity-90 leading-relaxed">
        تم الحصول عليها في{' '}
        {new Date(cert.completionDate).toLocaleDateString('ar-SA')}
      </p>
    </div>

    {/* Certificate Body */}
    <div className="p-8">
      {/* Score */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-700 dark:text-gray-200 mb-2 font-medium">
          <span>الدرجة المحرزة</span>
          <span>{cert.score}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${cert.score}%` }}
            transition={{ delay: index * 0.1 + 0.3, duration: 1 }}
            className="bg-primary h-3 rounded-full"
          />
        </div>
      </div>

      {/* Badges */}
      {cert.badges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-3">
            الشارات والنقاط
          </h4>
          <div className="flex flex-wrap gap-3">
            {cert.badges.map((badge, badgeIndex) => {
              const Icon = getBadgeIcon(badge.type);
              return (
                <motion.div
                  key={badgeIndex}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: index * 0.1 + badgeIndex * 0.1,
                    type: 'spring',
                  }}
                  className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 transition-all duration-300 hover:scale-110"
                >
                  <Icon
                  />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                    {badge.label} (+{badge.points})
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Download Button */}
      {showDownload && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDownload(cert)}
          className="w-full bg-primary text-accent py-4 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 flex items-center justify-center hover:shadow-lg"
        >
          <Download className="w-5 h-5 mr-2" />
          تحميل الشهادة (PDF)
        </motion.button>
      )}
    </div>
  </motion.div>
);

/**
 * Certificates display component showing earned course certificates with scores, grades, and achievement badges. Features animated progress bars, badge icons, and PDF download functionality.
 */
const CertificatesComponent: React.FC<CertificatesComponentProps> = ({
  certificates,
  title = 'شهاداتي',
  showDownload = true,
}) => {
  /**
   * Maps badge type string to corresponding Lucide icon component
   */
  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'star':
        return Star;
      case 'trophy':
        return Trophy;
      case 'target':
        return Target;
      case 'zap':
        return Zap;
      default:
        return Award;
    }
  };

  /**
   * Returns Tailwind color class based on badge type
   */
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'star':
        return 'text-yellow-500';
      case 'trophy':
        return 'text-orange-500';
      case 'target':
        return 'text-green-500';
      case 'zap':
        return 'text-blue-500';
      default:
        return 'text-primary';
    }
  };

  /**
   * Handles certificate PDF download. Currently simulated - needs integration with PDF generation service.
   */
  const handleDownload = async (certificate: Certificate) => {
    if (!certificate.downloadUrl) {
      console.error('رابط تنزيل الشهادة غير متوفر');
      return;
    }

    try {
      const response = await fetch(certificate.downloadUrl);
      if (!response.ok) {
        throw new Error(`فشل تحميل الملف: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      const sanitizedTitle = certificate.courseName.replace(/[^\w-_]+/g, '_');
      link.download = `${sanitizedTitle || 'certificate'}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('حدث خطأ أثناء تنزيل الشهادة:', error);
    }
  };

  return (
    <div className="space-y-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-center leading-tight"
      >
        {title}
      </motion.h2>

      {certificates.length === 0 ? (
        // Empty state when no certificates are available
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <Award className="w-20 h-20 text-gray-400 mx-auto mb-6" />
          <p className="text-gray-700 dark:text-gray-200 text-xl font-semibold mb-2">
            لا توجد شهادات متاحة حالياً
          </p>
          <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
            أكمل الدورات للحصول على شهاداتك
          </p>
        </motion.div>
      ) : (
        // Grid of certificate cards with animated progress bars and badges
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              certificate={cert}
              index={index}
              showDownload={showDownload}
              onDownload={handleDownload}
              getBadgeIcon={getBadgeIcon}
              getBadgeColor={getBadgeColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesComponent;
