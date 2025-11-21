'use client';

import { motion } from 'framer-motion';
import { Shield, Target, Zap, Award, CheckCircle, Star } from 'lucide-react';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earned: boolean;
  earnedDate?: string;
  criteria: string;
}

const BadgeSystem: React.FC = () => {
  const badges: Badge[] = [
    {
      id: 'accuracy_master',
      title: 'سيد الدقة',
      description: 'حقق دقة 95% أو أعلى في اختبار واحد',
      icon: <Target className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      earned: true,
      earnedDate: '2023-10-15',
      criteria: 'دقة ≥ 95%',
    },
    {
      id: 'speed_demon',
      title: 'السرعة المحترفة',
      description: 'أكمل اختباراً في أقل من الوقت المخصص بنسبة 20%',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500',
      earned: true,
      earnedDate: '2023-10-12',
      criteria: 'توفير ≥ 20% من الوقت',
    },
    {
      id: 'consistency_king',
      title: 'ملك الاتساق',
      description: 'حافظ على أداء متسق في 5 اختبارات متتالية',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      earned: false,
      criteria: '5 اختبارات متتالية بأداء مستقر',
    },
    {
      id: 'improvement_star',
      title: 'نجم التحسن',
      description: 'حسن من أدائك بنسبة 25% خلال شهر',
      icon: <Star className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      earned: true,
      earnedDate: '2023-10-10',
      criteria: 'تحسن ≥ 25% شهرياً',
    },
    {
      id: 'perfectionist',
      title: 'الكمالي',
      description: 'أكمل اختباراً بدون أي أخطاء',
      icon: <Award className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      earned: false,
      criteria: 'دقة 100%',
    },
    {
      id: 'dedication',
      title: 'المخلص',
      description: 'أكمل 10 اختبارات في أسبوع واحد',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      earned: false,
      criteria: '10 اختبارات أسبوعياً',
    },
  ];

  const earnedBadges = badges.filter((badge) => badge.earned);
  const totalBadges = badges.length;
  const completionRate = Math.round((earnedBadges.length / totalBadges) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-primary">
            نظام الشارات المهنية
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-200">
            {earnedBadges.length} من {totalBadges} مكتسبة
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-gradient-to-r from-primary to-primary-dark h-3 rounded-full"
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
          {completionRate}% من الشارات مكتسبة
        </p>
      </motion.div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-lg ${
              badge.earned
                ? 'border-transparent bg-gradient-to-br ' +
                  badge.color +
                  ' text-white shadow-md'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400'
            }`}
          >
            {/* Badge Icon */}
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                badge.earned ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <div className={badge.earned ? 'text-white' : 'text-gray-400'}>
                {badge.icon}
              </div>
            </div>

            {/* Badge Content */}
            <h4
              className={`font-bold text-lg mb-2 ${badge.earned ? 'text-white' : 'text-gray-700 dark:text-gray-400'}`}
            >
              {badge.title}
            </h4>
            <p
              className={`text-sm mb-3 ${badge.earned ? 'text-white/90' : 'text-gray-600 dark:text-gray-500'}`}
            >
              {badge.description}
            </p>

            {/* Criteria */}
            <div
              className={`text-xs px-2 py-1 rounded-full inline-block ${
                badge.earned
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {badge.criteria}
            </div>

            {/* Earned Date */}
            {badge.earned && badge.earnedDate && (
              <div className="absolute top-4 left-4 text-xs bg-white/20 px-2 py-1 rounded-full">
                مكتسب {badge.earnedDate}
              </div>
            )}

            {/* Lock Icon for Unearned */}
            {!badge.earned && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-gray-400 rounded-sm"></div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Recent Achievements */}
      {earnedBadges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6"
        >
          <h4 className="text-lg font-semibold text-green-800 dark:text-green-500 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            آخر الإنجازات
          </h4>
          <div className="space-y-3">
            {earnedBadges
              .slice(-3)
              .reverse()
              .map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center space-x-3 space-x-reverse bg-white/50 dark:bg-gray-800/50 rounded-lg p-3"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br ${badge.color}`}
                  >
                    <div className="text-white">{badge.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-semibold text-green-800 dark:text-green-200">
                      {badge.title}
                    </h5>
                    <p className="text-sm text-green-600 dark:text-green-300">
                      {badge.earnedDate}
                    </p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BadgeSystem;
