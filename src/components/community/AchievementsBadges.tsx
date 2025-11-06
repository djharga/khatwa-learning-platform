'use client';

import { useState } from 'react';
import { Award, Trophy, Medal, Star, Target, Zap, Crown, Shield, Flame } from 'lucide-react';

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  progress?: number;
  total?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

/**
 * Achievement badges component displaying user's earned and available badges.
 * Gamification element to encourage community engagement and learning progress.
 */
export default function AchievementsBadges() {
  const [activeTab, setActiveTab] = useState<'earned' | 'all'>('earned');

  const badges: Badge[] = [
    {
      id: 1,
      name: 'المبتدئ المتحمس',
      description: 'أكمل أول دورة تدريبية',
      icon: 'star',
      color: 'blue',
      earned: true,
      rarity: 'common',
    },
    {
      id: 2,
      name: 'المناقش النشط',
      description: 'شارك في 10 مناقشات مجتمعية',
      icon: 'flame',
      color: 'orange',
      earned: true,
      progress: 10,
      total: 10,
      rarity: 'common',
    },
    {
      id: 3,
      name: 'محترف التحديات',
      description: 'أكمل 5 تحديات أسبوعية',
      icon: 'trophy',
      color: 'yellow',
      earned: true,
      progress: 5,
      total: 5,
      rarity: 'rare',
    },
    {
      id: 4,
      name: 'خبير المراجعة',
      description: 'احصل على شهادة CIA',
      icon: 'shield',
      color: 'purple',
      earned: true,
      rarity: 'epic',
    },
    {
      id: 5,
      name: 'نجم المجتمع',
      description: 'احصل على 100 تصويت إيجابي',
      icon: 'crown',
      color: 'yellow',
      earned: false,
      progress: 47,
      total: 100,
      rarity: 'epic',
    },
    {
      id: 6,
      name: 'المتعلم المتفاني',
      description: 'ادرس لمدة 100 ساعة',
      icon: 'target',
      color: 'green',
      earned: false,
      progress: 73,
      total: 100,
      rarity: 'rare',
    },
    {
      id: 7,
      name: 'السريع كالبرق',
      description: 'أكمل 3 دورات في شهر واحد',
      icon: 'zap',
      color: 'cyan',
      earned: false,
      progress: 1,
      total: 3,
      rarity: 'rare',
    },
    {
      id: 8,
      name: 'أسطورة خطى',
      description: 'أكمل جميع المسارات التعليمية',
      icon: 'medal',
      color: 'red',
      earned: false,
      progress: 3,
      total: 12,
      rarity: 'legendary',
    },
  ];

  const earnedBadges = badges.filter((b) => b.earned);
  const displayBadges = activeTab === 'earned' ? earnedBadges : badges;

  /**
   * Get icon component based on icon string
   */
  const getIcon = (icon: string, className: string) => {
    const icons: { [key: string]: any } = {
      star: Star,
      trophy: Trophy,
      medal: Medal,
      award: Award,
      target: Target,
      zap: Zap,
      crown: Crown,
      shield: Shield,
      flame: Flame,
    };
    const IconComponent = icons[icon] || Star;
    return <IconComponent className={className} />;
  };

  /**
   * Get color classes based on color string
   */
  const getColorClasses = (color: string, earned: boolean) => {
    const colors: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: {
        bg: earned ? 'bg-blue-100' : 'bg-gray-100',
        text: earned ? 'text-blue-600' : 'text-gray-400',
        border: earned ? 'border-blue-300' : 'border-gray-300',
      },
      orange: {
        bg: earned ? 'bg-orange-100' : 'bg-gray-100',
        text: earned ? 'text-orange-600' : 'text-gray-400',
        border: earned ? 'border-orange-300' : 'border-gray-300',
      },
      yellow: {
        bg: earned ? 'bg-yellow-100' : 'bg-gray-100',
        text: earned ? 'text-yellow-600' : 'text-gray-400',
        border: earned ? 'border-yellow-300' : 'border-gray-300',
      },
      purple: {
        bg: earned ? 'bg-purple-100' : 'bg-gray-100',
        text: earned ? 'text-purple-600' : 'text-gray-400',
        border: earned ? 'border-purple-300' : 'border-gray-300',
      },
      green: {
        bg: earned ? 'bg-green-100' : 'bg-gray-100',
        text: earned ? 'text-green-600' : 'text-gray-400',
        border: earned ? 'border-green-300' : 'border-gray-300',
      },
      cyan: {
        bg: earned ? 'bg-cyan-100' : 'bg-gray-100',
        text: earned ? 'text-cyan-600' : 'text-gray-400',
        border: earned ? 'border-cyan-300' : 'border-gray-300',
      },
      red: {
        bg: earned ? 'bg-red-100' : 'bg-gray-100',
        text: earned ? 'text-red-600' : 'text-gray-400',
        border: earned ? 'border-red-300' : 'border-gray-300',
      },
    };
    return colors[color] || colors.blue;
  };

  /**
   * Get rarity badge styling
   */
  const getRarityBadge = (rarity: Badge['rarity']) => {
    const styles = {
      common: 'bg-gray-100 text-gray-700',
      rare: 'bg-blue-100 text-blue-700',
      epic: 'bg-purple-100 text-purple-700',
      legendary: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
    };
    const labels = {
      common: 'عادي',
      rare: 'نادر',
      epic: 'ملحمي',
      legendary: 'أسطوري',
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[rarity]}`}>
        {labels[rarity]}
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-xl overflow-hidden border-2 border-purple-400">
      {/* Header */}
      <div className="p-5 text-white">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">الشارات والإنجازات</h2>
            <p className="text-sm text-purple-100">اكسب الشارات بإنجاز الأهداف</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center border border-white/30">
            <div className="text-xl font-bold text-white">{earnedBadges.length}</div>
            <div className="text-xs text-purple-100 font-medium">مكتسبة</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center border border-white/30">
            <div className="text-xl font-bold text-white">{badges.length}</div>
            <div className="text-xs text-purple-100 font-medium">إجمالي</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-center border border-white/30">
            <div className="text-xl font-bold text-white">
              {Math.round((earnedBadges.length / badges.length) * 100)}%
            </div>
            <div className="text-xs text-purple-100 font-medium">التقدم</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('earned')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
              activeTab === 'earned'
                ? 'bg-white text-purple-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            }`}
          >
            المكتسبة ({earnedBadges.length})
          </button>
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-2 px-3 rounded-lg font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-purple-700 shadow-lg'
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            }`}
          >
            الكل ({badges.length})
          </button>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="p-4 bg-white">
        <div className="grid grid-cols-2 gap-3">
          {displayBadges.map((badge) => {
            const colors = getColorClasses(badge.color, badge.earned);
            const progressPercent = badge.progress && badge.total 
              ? (badge.progress / badge.total) * 100 
              : 0;

            return (
              <div
                key={badge.id}
                className={`p-3 rounded-xl border-2 transition-all hover:shadow-xl hover:scale-105 ${
                  badge.earned 
                    ? `${colors.border} ${colors.bg} shadow-md` 
                    : 'border-gray-300 bg-gray-100 opacity-60'
                }`}
              >
                {/* Badge Icon */}
                <div className="flex flex-col items-center mb-2">
                  <div
                    className={`p-2.5 rounded-xl ${badge.earned ? colors.bg : 'bg-gray-200'} border-2 ${colors.border} mb-1.5 shadow-sm`}
                  >
                    {getIcon(badge.icon, `w-7 h-7 ${colors.text}`)}
                  </div>
                  {getRarityBadge(badge.rarity)}
                </div>

                {/* Badge Info */}
                <h3 className="font-bold text-gray-900 text-center text-xs mb-1">
                  {badge.name}
                </h3>
                <p className="text-[10px] text-gray-600 text-center mb-2 leading-tight">
                  {badge.description}
                </p>

                {/* Progress Bar (if applicable) */}
                {badge.progress !== undefined && badge.total !== undefined && (
                  <div className="mt-2">
                    <div className="flex justify-between text-[10px] text-gray-700 mb-1 font-bold">
                      <span>التقدم</span>
                      <span className={badge.earned ? 'text-green-600' : 'text-orange-600'}>
                        {badge.progress}/{badge.total}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300 shadow-inner">
                      <div
                        className={`h-full ${
                          badge.earned ? 'bg-gradient-to-r from-green-500 to-emerald-500' : `bg-gradient-to-r from-${badge.color}-500 to-${badge.color}-600`
                        } transition-all shadow-sm`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Earned Status */}
                {badge.earned && (
                  <div className="mt-2 text-center">
                    <span className="text-[10px] bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full font-bold shadow-sm">
                      ✓ مكتسبة
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {displayBadges.length === 0 && (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-700 font-bold">لا توجد شارات بعد</p>
            <p className="text-gray-500 text-sm mt-1">ابدأ رحلتك التعليمية لكسب الشارات</p>
          </div>
        )}
      </div>
    </div>
  );
}

